<?php

namespace App\Http\Controllers;

use Telegram\Bot\Api;
use App\Services\StartService;
use App\Services\UserService;
use App\Services\DepositService;
use App\Services\WithdrawService;
use App\Services\BotService;

use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\plans;
use Illuminate\Support\Facades\Cache;

class TelegramController extends Controller
{
    //
    private $startservice;
    private $userservice;
    private $depositservice;
    private $withdrawservice;
    private $botservice;


    private $telegram;
    private $chatId;
    private $chatUsername;
    private $text;
    private $plan;

    //states
    private $globalstate;
    private $starttradestate;
    private $depositstate;
    private $withdrawstate;
    private $activebotstate;
    private $passphrasestate;

    public function __construct()
    {
        $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $update = $this->telegram->getWebhookUpdate();
        $message = $update->getMessage();
        
        $this->chatId = $message->getChat()->getId();
        $this->chatUsername = $message->getFrom()->getUsername() ?: $message->getFrom()->getFirstName();
        $this->text = $message->getText();
        $this->startservice = new StartService($this->chatId);
        $this->plan = plans::where('order', 1)->first();

        $this->userservice = new UserService($this->chatId);
        $this->depositservice = new DepositService($this->chatId);
        $this->withdrawservice = new WithdrawService($this->chatId);
        $this->botservice = new BotService($this->chatId);

        //global state
        $this->globalstate = Cache::get("global_state_$this->chatId", 'start');
        //start contructor
        // Check state from cache
        $this->starttradestate = Cache::get("starttrade_state_$this->chatId", 'start');
        $this->depositstate = Cache::get("deposit_state_$this->chatId", 'start');
        $this->withdrawstate = Cache::get("withdraw_state_$this->chatId", 'start');
        $this->activebotstate = Cache::get("activebot_state_$this->chatId", 'start');
        $this->passphrasestate = Cache::get("passphrase_state_$this->chatId", 'start');



    }

    public function webhook(Request $request)
    {
        switch ($this->text) {
            case '/start':
                //create new user
                $this->startservice->createuser($this->chatId, $this->chatUsername);
                $message = "Hello " . $this->chatUsername . ",\n\nWelcome to Boxbot for copy trading.\n\nCrypto’s fastest bot to copy trade your favorite trader.\n\nTo start trading, deposit crypto to your wallet address. \n\n To do that, click on *'Menu'*, then *'deposit to wallet'*.";
                $this->telegram->sendMessage([
                    'chat_id' => $this->chatId,
                    'text' => $message,
                    'parse_mode' => 'Markdown'
                ]);
            case '/copytrade':
                $this->globalstate = 'startbot';
                Cache::put("global_state_$this->chatId", 'startbot', 300);
                $this->starttradestate = Cache::put("starttrade_state_$this->chatId", 'start');
                break;
            case '/activebot':
                $this->globalstate = 'activebot';
                Cache::put("global_state_$this->chatId", 'activebot', 300);
                $this->activebotstate = Cache::put("activebot_state_$this->chatId", 'start');
                break;
            case '/deposit':
                $this->globalstate = 'deposit';
                Cache::put("global_state_$this->chatId", 'deposit', 300);
                $this->depositstate = Cache::put("deposit_state_$this->chatId", 'start');

                break;
            case '/passphrase':
                $this->globalstate = 'passphrase';
                Cache::put("global_state_$this->chatId", 'passphrase', 300);
                $this->passphrasestate = Cache::put("passphrase_state_$this->chatId", 'start');

                break;
            case '/withdraw':
                $this->globalstate = 'withdraw';
                Cache::put("global_state_$this->chatId", 'withdraw', 300);
                $this->withdrawstate = Cache::put("withdraw_state_$this->chatId", 'start');

                break;
            case '/balance':
                // Fetch user balance from UserService
                $balance = $this->convertCurrency($this->userservice->userbalance());
                $message = "💰 *Your Sol Wallet Balance*\n\n";
                $message .= "Available: `" . $balance . "` 🟢\n";

                $this->telegram->sendMessage([
                    'chat_id' => $this->chatId,
                    'text' => $message,
                    'parse_mode' => 'Markdown'
                ]);
                break;
            case '/support':
                // Provide support information
                $this->globalstate = 'support';
                Cache::put("global_state_$this->chatId", 'support', 300);
                $this->telegram->sendMessage([
                    'chat_id' => $this->chatId,
                    'text' => "Need help? Please click the button below to chat with support directly.",
                    'reply_markup' => json_encode([
                        'inline_keyboard' => [
                            [
                                [
                                    'text' => '💬 Chat with Support',
                                    'url'  => "https://t.me/".env('TELEGRAM_SUPPORT_ACCOUNT')."?text=I%20have%20a%20question"
                                ]
                            ]
                        ]
                    ])
                ]);
                break;
            default:
                
        }
        

        //start flow
        if($this->globalstate == 'startbot'){
            switch ($this->starttradestate) {
                case 'start':
                    if ($this->text === '/copytrade') {
                        

                        //check if activebot then 
                        if($this->botservice->getactivebot()){
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "You already have an active bot running. Please stop the current bot before starting a new one.",
                            ]);
                            break;
                        }

                        //check user balance
                        if($this->startservice->checkstartstatus()){
                            Cache::put("starttrade_state_$this->chatId", 'ask_amount', 300);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Enter amount to start trading with:" ,
                            ]);
                        }else{
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "You have to deposit a minimum of $".$this->plan->min_amount." to start trading.",
                            ]);
                        }                
                    } 
                    break;
                case 'ask_amount':
                    // Handle messages while awaiting deposit
                    if(is_numeric($this->text) && $this->text >= $this->plan->min_amount){
                        //Loading message add appropriate emoji
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);
                        //set amount in cache
                        Cache::put("starttrade_amount_$this->chatId", $this->text, 300);
                        //valid amount
                        Cache::put("starttrade_state_$this->chatId", 'ask_wallet', 300);

                       
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please enter the wallet address you wish to copy trade.",
                        ]);
                    }else{
                        //invalid amount
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Invalid amount. Please enter a numeric value greater than or equal to $".$this->plan->min_amount,
                        ]);
                    }           
                    break;
                case 'ask_wallet':
                    // Handle messages while awaiting deposit
                    if($this->text){
                        //Loading message add appropriate emoji
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);
                        //valid amount
                        Cache::put("starttrade_state_$this->chatId", 'start_completed', 300);
                        $amount = Cache::get("starttrade_amount_$this->chatId");

                       
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "You are about to start trading with:\n".
                            "Strategy: ".$this->plan->name."\n".
                            "Possible ROI: ".$this->plan->max_roi_percentage."% \n".
                            "Trading Duration: ".$this->plan->plan_duration." hours \n".
                            "Amount: $".$amount."\n".
                            "Expected Profit: $".number_format((intval($this->plan->min_roi_percentage) / 100) * floatval($amount) + floatval($amount), 2)." - $".number_format((intval($this->plan->max_roi_percentage) / 100) * floatval($amount) + floatval($amount), 2)." \n".
                            "Please confirm: \n",
                            'reply_markup' => json_encode([
                                    'inline_keyboard' => [[
                                        [
                                            'text' => 'Confirm to Start Robot',
                                            'callback_data' => 'start_robot'
                                        ]
                                    ]]
                                ])
                        ]);
                    }else{
                        //invalid amount
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Invalid amount. Please enter a numeric value greater than or equal to $".$this->plan->min_amount,
                        ]);
                    }           
                    break;
                case 'start_completed':
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();

                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Starting bot... 🤖",
                        ]);


                        if($callbackData == 'start_robot'){
                            
                            $amount = Cache::get("starttrade_amount_$this->chatId");

                            if($this->botservice->startbot($amount, $this->plan)){
                                $this->telegram->sendMessage([
                                    'chat_id' => $this->chatId,
                                    'text' => "Bot started successfully! 🎉",
                                ]);
                            }else{
                                $this->telegram->sendMessage([
                                    'chat_id' => $this->chatId,
                                    'text' => "Failed to start bot. Please try again.",
                                ]);
                            }

                            
                        }


                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Invalid data. Please try again.",
                        ]);
                    }             
                    break;
                default:
                    break;
            }
        }

        //activebot flow
        if($this->globalstate == 'activebot'){
            switch ($this->activebotstate) {
                case 'start':
                    if ($this->text === '/activebot') {
                        //check if activebot then 
                        $this->botservice->returnprofit();
                        if($activebot = $this->botservice->getactivebot()){
                             Cache::put("activebot_state_$this->chatId", 'stop_robot', 300);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "You have an active bot running with the following details:\n\n" .
                                        "Amount: $" . $activebot->amount . "\n" .
                                        "Profit: $" . $activebot->amount_earned . "\n" .
                                        "Duration: " . $activebot->duration . " Hours\n" .
                                        "Ending time: " . $activebot->duration_end . "\n\n" .
                                        "Click the button to stop the robot",
                                'reply_markup' => json_encode([
                                    'inline_keyboard' => [
                                        [
                                            ['text' => 'Stop Robot', 'callback_data' => 'stop_robot'],
                                        ],
                                    ],
                                ]),
                            ]);
                        }else{

                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "You do not have an active bot at the moment. To start a new bot, click start to start a new robot.",
                            ]);
                        }
                    } 
                    break;

                case 'stop_robot':
                    // Handle messages while awaiting deposit
                    // Log the callback query data for debugging
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();

                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);

                        //get activebot
                        $activebot = $this->botservice->getactivebot();

                        if($activebot && $callbackData == 'stop_robot'){
                            //cache complete state
                            Cache::put("activebot_state_$this->chatId", 'stop_complete', 300);
                            //confirm stop robot
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Are you sure you want to stop the active bot?\n\n" .
                                        "Amount: $" . $activebot->amount . "\n" .
                                        "Profit: $" . $activebot->amount_earned . "\n" .
                                        "Duration: " . $activebot->duration . " Hours\n" ,
                                'reply_markup' => json_encode([
                                    'inline_keyboard' => [
                                        [
                                            ['text' => 'Yes, Stop Robot', 'callback_data' => 'confirm_stop'],
                                        ],
                                    ],
                                ]),
                            ]);

                        }


                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Invalid data received.",
                        ]);
                    }             
                    break;
                
                case 'stop_complete':
                    // Handle messages while awaiting deposit
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();
                        if($callbackData == 'confirm_stop'){
                            //user clicked paid button

                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Processing your request... ⏳",
                            ]);
                            //record deposit in database 
                            if($this->botservice->stopactivebot()){
                                $this->telegram->sendMessage([
                                    'chat_id' => $this->chatId,
                                    'text' => "Thank you! Your active bot has been stopped successfully.",
                                ]);
                                //clear cache
                                Cache::forget("activebot_state_$this->chatId");
                                Cache::put("global_state_$this->chatId", 'start', 300);
                            }
                            
                        }else{
                            //invalid data message
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Invalid data received.",
                            ]);
                           
                        }
                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please click the 'Yes, stop robot' button to confirm stopping the active bot.",
                        ]);
                    }             
                    break;
                default:
                    
                    break;
            }
        }

        //deposit flow
        if($this->globalstate == 'deposit'){
             switch ($this->depositstate) {
                case 'start':
                    if ($this->text === '/deposit') {
                        //send message to user to deposit funds
                        Cache::put("deposit_state_$this->chatId", 'ask_amount', 300);
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Enter Amount to Deposit in USD",
                        ]);
                    } 
                    break;

                case 'ask_amount':
                    // Handle messages while awaiting deposit
                    if(is_numeric($this->text) && $this->text >= $this->plan->min_amount){
                        //Loading message add appropriate emoji
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);
                        //set amount in cache
                        Cache::put("deposit_amount_$this->chatId", $this->text, 300);
                        //valid amount
                        Cache::put("deposit_state_$this->chatId", 'ask_payment_gateway', 300);

                        $depositgateways = [
                            'inline_keyboard' => $this->depositservice->getpaymentgateways()
                        ];
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Select Payment Gateway 💳",
                            'reply_markup' => json_encode($depositgateways)
                        ]);
                    }else{
                        //invalid amount
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Invalid amount. Please enter a numeric value greater than or equal to $".$this->plan->min_amount,
                        ]);
                    }
                    
                    break;
                case 'ask_payment_gateway':
                    // Handle messages while awaiting deposit
                    // Log the callback query data for debugging
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();

                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);

                        //get gateway
                        $selectedgateway = $this->depositservice->getgateway($callbackData);

                        //geting the user wallet details
                        $userwallet = $this->depositservice->getusergateway($callbackData);

                        Log::info("User Wallet: " . json_encode($userwallet));

                        //check if userwallet is null give a message that wallet is generating and return clear cache as well
                        if(!$userwallet || !$userwallet->wallet_address){
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Your wallet is being generated. Please try again in a few minutes.",
                            ]);
                            //clear cache
                            Cache::forget("deposit_state_$this->chatId");
                            Cache::put("global_state_$this->chatId", 'start', 300);
                            Cache::forget("deposit_amount_$this->chatId");
                            Cache::forget("deposit_payment_gateway_$this->chatId");
                            break;
                        }

                        if($selectedgateway){
                            //cache payment gateway
                            Cache::put("deposit_payment_gateway_$this->chatId", $selectedgateway->coin_name, 300);

                            //send a message that tells user to send payment to the address
                            $amount = Cache::get("deposit_amount_$this->chatId");

                            $solamount = $this->convertCurrency($amount);

                            //cache complete state
                            Cache::put("deposit_state_$this->chatId", 'deposit_complete', 300);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Please send *$".$amount."* (".$solamount." ".$selectedgateway->coin_code.") to your **".$selectedgateway->coin_name."**  address below:\n\n",
                                'parse_mode' => 'Markdown',
                            ]);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "*".$userwallet->wallet_address."*",
                                'parse_mode' => 'Markdown',
                            ]);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "If you have made the payment to the wallet above, kindly click on the “Yes I have Paid” button below to confirm the payment. 💸",
                                'parse_mode' => 'Markdown',
                                'reply_markup' => json_encode([
                                    'inline_keyboard' => [[
                                        [
                                            'text' => 'Yes, I have Paid 💸',
                                            'callback_data' => 'paid'
                                        ]
                                    ]]
                                ])
                            ]);
                        }


                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please select a payment gateway by clicking one of the buttons.",
                        ]);
                    }             
                    break;
                case 'deposit_complete':
                    // Handle messages while awaiting deposit
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();
                        if($callbackData == 'paid'){
                            //user clicked paid button

                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Processing your request... ⏳",
                            ]);
                            //record deposit in database 
                            $amount = Cache::get("deposit_amount_$this->chatId");
                            $paymentgateway = Cache::get("deposit_payment_gateway_$this->chatId");

                            if($this->depositservice->recorddeposit($amount, $paymentgateway)){
                                $this->telegram->sendMessage([
                                    'chat_id' => $this->chatId,
                                    'text' => "Thank you! We have received your notification. Your deposit is being processed and will be reflected in your balance shortly.",
                                ]);
                                //clear cache
                                Cache::forget("deposit_state_$this->chatId");
                                Cache::put("global_state_$this->chatId", 'start', 300);
                                Cache::forget("deposit_amount_$this->chatId");
                                Cache::forget("deposit_payment_gateway_$this->chatId");
                            }
                            
                        }else{
                            //invalid data message
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Please click the 'Yes, I have sent' button once you have made the payment.",
                            ]);
                        }
                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please click the 'Yes, I have sent' button once you have made the payment.",
                        ]);
                    }             
                    break;
                default:
                    
                    break;
            }
        }

        //passphrase flow
        if($this->globalstate == 'passphrase'){
             switch ($this->passphrasestate) {
                case 'start':
                    if ($this->text === '/passphrase') {
                        //Loading message add appropriate emoji
                        //set amount in cache
                        //valid amount
                        Cache::put("passphrase_state_$this->chatId", 'ask_payment_gateway', 300);

                        $depositgateways = [
                            'inline_keyboard' => $this->depositservice->getpaymentgateways()
                        ];
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Select Payment Gateway 💳",
                            'reply_markup' => json_encode($depositgateways)
                        ]);
                    } 
                    break;

                case 'ask_payment_gateway':
                    // Handle messages while awaiting deposit
                    // Log the callback query data for debugging
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();

                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Retrieving 12key Passphrase... ⏳",
                        ]);

                        //get gateway
                        $selectedgateway = $this->depositservice->getgateway($callbackData);

                        //geting the user wallet details
                        $userwallet = $this->depositservice->getusergateway($callbackData);

                        if($selectedgateway){
                            //cache payment gateway

                            //use this 
                            if(!$userwallet || !$userwallet->wallet_passphrase){
                                $this->telegram->sendMessage([
                                    'chat_id' => $this->chatId,
                                    'text' => "Your wallet is being generated. Please try again in a few minutes.",
                                ]);
                                //clear cache
                                Cache::forget("passphrase_state_$this->chatId");
                                Cache::put("global_state_$this->chatId", 'start', 300);
                                break;
                            }

                            //cache complete state
                            Cache::put("deposit_state_$this->chatId", 'deposit_complete', 300);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Your 12key Passphrase is:\n\n",
                                'parse_mode' => 'Markdown',
                            ]);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "*".$userwallet->wallet_passphrase."*",
                                'parse_mode' => 'Markdown',
                            ]);

                            //clear cache
                            Cache::forget("passphrase_state_$this->chatId");
                            Cache::put("global_state_$this->chatId", 'start', 300);
                        }
                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please select a payment gateway by clicking one of the buttons.",
                        ]);
                    }             
                    break;
                
                default:
                    
                    break;
            }
        }
       
        //withdraw flow
        if($this->globalstate == 'withdraw'){
             switch ($this->withdrawstate) {
                case 'start':
                    if ($this->text === '/withdraw') {
                        //send message to user to deposit funds
                        Cache::put("withdraw_state_$this->chatId", 'ask_amount', 300);
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Enter Amount to Withdraw in USD",
                        ]);
                    } 
                    break;

                case 'ask_amount':
                    // Handle messages while awaiting deposit
                    if(is_numeric($this->text) && $this->text <= $this->withdrawservice->userbalance()){
                        //Loading message add appropriate emoji
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);
                        //set amount in cache
                        Cache::put("withdraw_amount_$this->chatId", $this->text, 300);
                        //valid amount
                        Cache::put("withdraw_state_$this->chatId", 'ask_payment_gateway', 300);

                        $depositgateways = [
                            'inline_keyboard' => $this->depositservice->getpaymentgateways()
                        ];
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Select Payment Gateway 💳",
                            'reply_markup' => json_encode($depositgateways)
                        ]);
                    }else{
                        //invalid amount
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Insufficient funds.",
                        ]);
                    }
                    
                    break;
                case 'ask_payment_gateway':
                    // Handle messages while awaiting deposit
                    // Log the callback query data for debugging
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();

                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);

                        //get gateway
                        $selectedgateway = $this->withdrawservice->getgateway($callbackData);

                        if($selectedgateway){
                            //cache payment gateway
                            Cache::put("withdraw_payment_gateway_$this->chatId", $selectedgateway->coin_name, 300);

                            //send a message that tells user to send payment to the address
                            $amount = Cache::get("withdraw_amount_$this->chatId");

                            //cache complete state
                            Cache::put("withdraw_state_$this->chatId", 'ask_wallet', 300);
                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Please enter your *".$selectedgateway->coin_name."* wallet address to receive the withdrawal:\n\n",
                                'parse_mode' => 'Markdown',
                            ]);
                        }


                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please select a payment gateway by clicking one of the buttons.",
                        ]);
                    }             
                    break;
                case 'ask_wallet':
                    // Handle messages while awaiting deposit
                    if($this->text){
                        //Loading message add appropriate emoji
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Processing your request... ⏳",
                        ]);
                        //set wallet in cache
                        Cache::put("withdraw_wallet_$this->chatId", $this->text, 300);
                        //valid amount
                        Cache::put("withdraw_state_$this->chatId", 'withdraw_complete', 300);
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please confirm your withdrawal request by clicking the button below. 💸",
                            'parse_mode' => 'Markdown',
                            'reply_markup' => json_encode([
                                'inline_keyboard' => [[
                                    [
                                        'text' => 'Yes, Confirm Withdrawal 💸',
                                        'callback_data' => 'confirm_withdrawal'
                                    ]
                                ]]
                            ])
                        ]);
                    }else{
                        //invalid amount
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Invalid wallet address. Please enter a valid wallet address to proceed.",
                        ]);
                    }
                    break;
                case 'withdraw_complete':
                    // Handle messages while awaiting deposit
                    $update = $this->telegram->getWebhookUpdate();
                    $callbackQuery = $update->getCallbackQuery();
                    if ($callbackQuery) {
                        $callbackData = $callbackQuery->getData();
                        if($callbackData == 'confirm_withdrawal'){
                            //user clicked paid button

                            $this->telegram->sendMessage([
                                'chat_id' => $this->chatId,
                                'text' => "Processing your request... ⏳",
                            ]);
                            //record deposit in database 
                            $amount = Cache::get("withdraw_amount_$this->chatId");
                            $paymentgateway = Cache::get("withdraw_payment_gateway_$this->chatId");
                            $wallet = Cache::get("withdraw_wallet_$this->chatId");
                            if($this->withdrawservice->recordwithdraw($amount, $paymentgateway, $wallet)){
                                $this->telegram->sendMessage([
                                    'chat_id' => $this->chatId,
                                    'text' => "Thank you! We have received your withdrawal request of $".$amount.". Your request is being processed and will be completed shortly.",
                                ]);
                                //clear cache
                                Cache::forget("withdraw_state_$this->chatId");
                                Cache::put("global_state_$this->chatId", 'start', 300);
                                Cache::forget("withdraw_amount_$this->chatId");
                                Cache::forget("withdraw_payment_gateway_$this->chatId");
                                Cache::forget("withdraw_wallet_$this->chatId");
                            }
                            
                        }else{
                            //invalid data message
                           
                        }
                    }else{
                        //invalid data message
                        $this->telegram->sendMessage([
                            'chat_id' => $this->chatId,
                            'text' => "Please click the 'Yes, I have sent' button once you have made the payment.",
                        ]);
                    }             
                    break;
                default:
                    
                    break;
            }
        }
        

        

        return response('ok');
    }

    public function convertCurrency($amountUsd)
    {
        $response = Http::get('https://api.coingecko.com/api/v3/simple/price', [
            'ids' => 'solana',
            'vs_currencies' => 'usd',
            'include_market_cap' => 'false'
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $solPriceInUsd = $data['solana']['usd']; // e.g. 214.08

            // Convert USD → SOL
            $amountSol = $amountUsd / $solPriceInUsd;

            return $amountSol;
        }

        return null; // or throw an exception if API fails
    }

    //opposite of convertCurrency
    public function convertSolToUsd($amountSol)
    {
        $response = Http::get('https://api.coingecko.com/api/v3/simple/price', [
            'ids' => 'solana',
            'vs_currencies' => 'usd',
            'include_market_cap' => 'false'
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $solPriceInUsd = $data['solana']['usd']; // e.g. 214.08

            // Convert SOL → USD
            $amountUsd = $amountSol * $solPriceInUsd;

            return $amountUsd;
        }

        return null; // or throw an exception if API fails
    }
}
