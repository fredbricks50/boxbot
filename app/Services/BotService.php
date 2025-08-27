<?php
namespace App\Services;

use Telegram\Bot\Api;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Coins;
use App\Models\deposit;
use App\Models\tradingbot;
use App\Models\plans;

use Illuminate\Support\Facades\Mail;
use App\Mail\DepositMail;
use App\Models\Trade;

class BotService
{
  private $telegram;
  private $user;
  private $currenttradepos;
  private $currentprofit;
  public function __construct($chatId)
  {
    // Initialize service dependencies here
    $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
    //get user by chatId
    $this->user = User::where('telegram_id', $chatId)->first();

  }

  public function returnprofit(){
    if(!$this->user){
        return false;
    }
    $activebot = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => $this->user->id,
            'tradingbots.status' => 1,])
        ->get()->toArray();

    if(!empty($activebot)){
        $activebottrades = json_decode(Trade::where('bot_id', $activebot[0]['id'])->get()->toArray()[0]['trades'], true);

        for ($i = 0; $i < count($activebottrades); $i++) {
            $timerEndsAt = $activebottrades[$i]['timer_ends_at'];
            // $timerEndsAt = Carbon::createFromFormatMs('Y-m-d H:i:s', $timerEndsAt)->valueOf();
            $now = Carbon::now()->valueOf();
            
            if ($now <= $timerEndsAt) {
                $this->currenttradepos = $activebottrades[$i];
                break; 
            }else{
                $this->currentprofit = $activebottrades[$i]['profit'] + $this->currentprofit;
            }
            
        }


        $currentdate    = strtotime(date("Y-m-d H:i:s"));

        $currentDateTime = Carbon::createFromFormat('Y-m-d H:i:s', date("Y-m-d H:i:s"));

        // dd($activebot[0]);
        $max_roi = $activebot[0]['max_roi_percentage'];
        $min_roi = $activebot[0]['min_roi_percentage'];
        $duration = $activebot[0]['plan_duration'];
        $duration_start = Carbon::createFromFormat('Y-m-d H:i:s', $activebot[0]['duration_start']);
        $duration_end = Carbon::createFromFormat('Y-m-d H:i:s', $activebot[0]['duration_end']); 
        $amount = $activebot[0]['amount'];
        $profit_limit_exceed = $activebot[0]['profit_limit_exceed'];
        $tradingbot_id = $activebot[0]['id'];
        $trading_type = $activebot[0]['account_type'];
        $tradingbot_amountearned = $activebot[0]['amount_earned'];


        // $totalDuration = $currentDateTime->diffInMinutes($duration_start);
        // dd(range(3, 5, 0.15));
        

        //profit will exceed
        
        //profit will not exceed
        //calculate number of 5 minutes in the plan duration
        $duration_min = $duration * 60;
        $duration_in_5 = $duration_min / 5;
        

        $percentage_in_5 = $max_roi / $duration_in_5;

        $totalDurationMin = $duration_start->diffInMinutes($currentDateTime);
        // dd($totalDurationMin,$duration_start,$currentDateTime);

        $amount_earned = (($percentage_in_5 * floor($totalDurationMin/5) )/100)* $amount;

        $profit_amount_earned = 0;
        for ($i = 0; $i < count($activebottrades); $i++) {
            $timerEndsAt = $activebottrades[$i]['timer_ends_at'];
            // $timerEndsAt = Carbon::createFromFormat('Y-m-d H:i:s', $timerEndsAt)->valueOf();
            $now = Carbon::now()->valueOf();
            
            if ($now <= $timerEndsAt) {
                $this->currenttradepos = $activebottrades[$i];
                break; 
            }else{
                $profit_amount_earned = $profit_amount_earned + $activebottrades[$i]['profit'];
            }
        }

        



        // dd($amount,$percentage_in_5,$totalDurationMin,floor($totalDurationMin/5),$amount_earned);
        if($currentDateTime->gt($duration_end)){
            // dd("here");
            //generate a random profit number from 
            $profitrange = range($min_roi, $max_roi, 0.15);
            $randomprofit = $profitrange[array_rand($profitrange)];

            $random_amount_earned = ($randomprofit/100) * $amount;

            //update amount earned in the trading bot
            $demobalance_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $random_amount_earned,'status'=>0]);
            if($trading_type === "live"){

                $newuser_balance = $this->user->balance + $random_amount_earned + $amount;
                if ($newuser_balance >= 0) {
                    $balance_updated = User::where('id',$this->user->id)->update(['balance'=> $newuser_balance]);
                }
            }else{
                $newuserdemo_balance = $this->user->demo_balance + $random_amount_earned + $amount;
                if ($newuserdemo_balance >= 0) {
                    $demobalance_updated = User::where('id',$this->user->id)->update(['demo_balance'=> $newuserdemo_balance]);
                }
            }

        }else{
            
          //update amount earned in the trading bot

          //get max roi amount 
          $max_amount_earned = ($max_roi/100) * $amount;
          $final_amount_earned =  $profit_amount_earned;

          if($final_amount_earned > $max_amount_earned){
              
              //update tradingbot with max amount earnable
              $tradingbot_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $max_amount_earned,'status'=>2]);

              if($trading_type === "live"){
                  $newuser_balance = $this->user->balance + $max_amount_earned + $amount;
                  if ($newuser_balance >= 0) {
                      $balance_updated = User::where('id',$this->user->id)->update(['balance'=> $newuser_balance]);
                  }
              }else{
                  $newuserdemo_balance = $this->user->demo_balance + $max_amount_earned + $amount;
                  if ($newuserdemo_balance >= 0) {
                      $demobalance_updated = User::where('id',$this->user->id)->update(['demo_balance'=> $newuserdemo_balance]);
                  }
              }
          }else{
              // dd($profit_amount_earned);
              

              //reduce the value to 2 decimal places
              $final_amount_earned = round($final_amount_earned,2);

              // dd($final_amount_earned);
              //if amount earned not exceeded just update the trading bots 
              $tradingbot_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=>$final_amount_earned]);
              // dd(tradingbot::find($tradingbot_id)->amount_earned);
          }                
        }
    }

  }

  public function userbalance(){
    return $this->user->balance;
  }


  public function getactivebot(){
    //check if user has active bot
    $activebot = tradingbot::where('user_id', $this->user->id)
                ->where('status', 1)
                ->first();

    return $activebot ;

  }

  public function startbot($amount,$plan){
    //record bot activation
    $duration_start = now()->format('Y-m-d H:i:s');
    $duration_end = now()->addHours((int)$plan->plan_duration)->format('Y-m-d H:i:s');


    $tradeinterval = 5;
    $randomval = 'no';
    $tradingbotdetails = [
        'user_id'=> $this->user->id,
        'amount'=> $amount,
        'amount_earned'=> 0,
        'duration'=> $plan->plan_duration,
        'duration_start'=> $duration_start,
        'duration_end'=> $duration_end,
        'strategy_id'=>$plan->id,
        'profit_limit_exceed'=> $randomval,
        'account_type' => 'live',
        'status'=>1,
    ];
    
    //Setup the trading bot trades 
    $tradeArray = $this->generateTrades($tradeinterval, $amount, $plan->max_roi_percentage, $plan)['tradesArray'];
    $total_amount_earned = $this->generateTrades($tradeinterval, $amount, $plan->max_roi_percentage, $plan)['total_amount_earned'];
        
    
    if($this->user->status === "1" || $this->user->status === 1){
        //update userbalance
        $new_balance =  $this->user->balance - $amount;
        if($new_balance >= 0){
            $balance_updated = User::where('id',$this->user->id)->update(['balance'=> $new_balance]);

            $trading = tradingbot::create($tradingbotdetails);

            $tradeEntry = Trade::create([
                'user_id' => $this->user->id,
                'bot_id' => $trading->id,
                'total_amount_earned' => $total_amount_earned,
                'trades' => json_encode($tradeArray)
            ]);

            if($balance_updated && $trading && $tradeEntry){
                return true;
            }else{
                return false;
            }
        }
        
        //create robot trades
        
        
    }else{
        return false;
    }
  }

  private function generateTrades($duration, $amount, $max_roi,$plan){
    $cryptoTradingPair = [
        [
            "name" => "BTC/USDT",
            "percentage" => "91%",
            "assetType" => "coin",
            "symbol" => "BTCUSDT",
            "image" => "btc.png"
        ],
        [
            "name" => "ETH/USDT",
            "percentage" => "95%",
            "assetType" => "coin",
            "symbol" => "ETHUSDT",
            "image" => "eth.png"
        ],
        [
            "name" => "LTC/USDT",
            "percentage" => "95%",
            "assetType" => "coin",
            "symbol" => "LTCUSDT",
            "image" => "ltc.png"
        ],
        [
            "name" => "SOL/USDT",
            "percentage" => "98%",
            "assetType" => "coin",
            "symbol" => "SOLUSDT",
            "image" => "sol.png"
        ],
        [
            "name" => "XRP/USDT",
            "percentage" => "93%",
            "assetType" => "coin",
            "symbol" => "XRPUSDT",
            "image" => "xrp.png"
        ],
        [
            "name" => "DOGE/USDT",
            "percentage" => "83%",
            "assetType" => "coin",
            "symbol" => "DOGEUSDT",
            "image" => "doge.png"
        ],
        [
            "name" => "BCH/USDT",
            "percentage" => "89%",
            "assetType" => "coin",
            "symbol" => "BCHUSDT",
            "image" => "bch.png"
        ],
        [
            "name" => "DAI/USDT",
            "percentage" => "97%",
            "assetType" => "coin",
            "symbol" => "DAIUSDT",
            "image" => "dai.png"
        ],
        [
            "name" => "BNB/USDT",
            "percentage" => "87%",
            "assetType" => "coin",
            "symbol" => "BNBUSDT",
            "image" => "bnb.png"
        ],
        [
            "name" => "ADA/USDT",
            "percentage" => "93%",
            "assetType" => "coin",
            "symbol" => "ADAUSDT",
            "image" => "ada.png"
        ],
        [
            "name" => "AVAX/USDT",
            "percentage" => "99%",
            "assetType" => "coin",
            "symbol" => "AVAXUSDT",
            "image" => "avax.png"
        ],
        [
            "name" => "TRX/USDT",
            "percentage" => "90%",
            "assetType" => "coin",
            "symbol" => "TRXUSDT",
            "image" => "trx.png"
        ],
        [
            "name" => "MATIC/USDT",
            "percentage" => "91%",
            "assetType" => "coin",
            "symbol" => "MATICUSDT",
            "image" => "matic.png"
        ],
        [
            "name" => "ATOM/USDT",
            "percentage" => "96%",
            "assetType" => "coin",
            "symbol" => "ATOMUSDT",
            "image" => "atom.png"
        ],
        [
            "name" => "LINK/USDT",
            "percentage" => "87%",
            "assetType" => "coin",
            "symbol" => "LINKUSDT",
            "image" => "link.png"
        ],
        [
            "name" => "DASH/USDT",
            "percentage" => "87%",
            "assetType" => "coin",
            "symbol" => "DASHUSDT",
            "image" => "dash.png"
        ],
        [
            "name" => "XLM/USDT",
            "percentage" => "93%",
            "assetType" => "coin",
            "symbol" => "XLMUSDT",
            "image" => "xlm.png"
        ],
        [
            "name" => "NEO/USDT",
            "percentage" => "93%",
            "assetType" => "coin",
            "symbol" => "NEOUSDT",
            "image" => "neo.png"
        ],
        [
            "name" => "BAT/USDT",
            "percentage" => "83%",
            "assetType" => "coin",
            "symbol" => "BATUSDT",
            "image" => "bat.png"
        ],
        [
            "name" => "ETC/USDT",
            "percentage" => "86%",
            "assetType" => "coin",
            "symbol" => "ETCUSDT",
            "image" => "etc.png"
        ],
        [
            "name" => "ZEC/USDT",
            "percentage" => "94%",
            "assetType" => "coin",
            "symbol" => "ZECUSDT",
            "image" => "zec.png"
        ],
        [
            "name" => "ONT/USDT",
            "percentage" => "96%",
            "assetType" => "coin",
            "symbol" => "ONTUSDT",
            "image" => "ont.png"
        ],
        [
            "name" => "STX/USDT",
            "percentage" => "96%",
            "assetType" => "coin",
            "symbol" => "STXUSDT",
            "image" => "stx.png"
        ],
        [
            "name" => "MKR/USDT",
            "percentage" => "95%",
            "assetType" => "coin",
            "symbol" => "MKRUSDT",
            "image" => "mkr.png"
        ],
        [
            "name" => "AAVE/USDT",
            "percentage" => "90%",
            "assetType" => "coin",
            "symbol" => "AAVEUSDT",
            "image" => "aave.png"
        ],
        [
            "name" => "XMR/USDT",
            "percentage" => "99%",
            "assetType" => "coin",
            "symbol" => "XMRUSDT",
            "image" => "xmr.png"
        ],
        [
            "name" => "YFI/USDT",
            "percentage" => "95%",
            "assetType" => "coin",
            "symbol" => "YFIUSDT",
            "image" => "yfi.png"
        ]
    ];

    $forexTradingPair = [
        [
            "name" => "EUR/USD",
            "percentage" => "99%",
            "assetType" => "currency",
            "symbol" => "EURUSD",
            "image" => "EURUSD_OTC.svg"
        ],
        [
            "name" => "AUD/CAD",
            "percentage" => "96%",
            "assetType" => "currency",
            "symbol" => "AUDCAD",
            "image" => "AUDCAD.svg"
        ],
        [
            "name" => "GBP/USD",
            "percentage" => "85%",
            "assetType" => "currency",
            "symbol" => "GBPUSD",
            "image" => "GBPUSD_OTC.svg"
        ],
        [
            "name" => "GBP/NZD",
            "percentage" => "89%",
            "assetType" => "currency",
            "symbol" => "GBPNZD",
            "image" => "GBPNZD.svg"
        ],
        [
            "name" => "USD/JPY",
            "percentage" => "97%",
            "assetType" => "currency",
            "symbol" => "USDJPY",
            "image" => "USDJPY_OTC.svg"
        ],
        [
            "name" => "EUR/GBP",
            "percentage" => "95%",
            "assetType" => "currency",
            "symbol" => "EURGBP",
            "image" => "EURGBP.svg"
        ],
        [
            "name" => "GBP/CHF",
            "percentage" => "90%",
            "assetType" => "currency",
            "symbol" => "GBPCHF",
            "image" => "GBPCHF.svg"
        ],
        [
            "name" => "GBP/CAD",
            "percentage" => "88%",
            "assetType" => "currency",
            "symbol" => "GBPCAD",
            "image" => "GBPCAD.svg"
        ],
        [
            "name" => "NASDAQ",
            "percentage" => "92%",
            "assetType" => "currency",
            "symbol" => "NQ",
            "image" => "NQ.svg"
        ],
        [
            "name" => "CAC 40",
            "percentage" => "94%",
            "assetType" => "currency",
            "symbol" => "CAC40",
            "image" => "FCE.svg"
        ],
        [
            "name" => "FTSE 100",
            "percentage" => "96%",
            "assetType" => "currency",
            "symbol" => "FTSE",
            "image" => "Z.svg"
        ],
        [
            "name" => "AUD/JPY",
            "percentage" => "93%",
            "assetType" => "currency",
            "symbol" => "AUDJPY",
            "image" => "AUDJPY.svg"
        ],
        [
            "name" => "CAD/CHF",
            "percentage" => "77%",
            "assetType" => "currency",
            "symbol" => "CADCHF",
            "image" => "CADCHF.svg"
        ],
        [
            "name" => "CAD/JPY",
            "percentage" => "85%",
            "assetType" => "currency",
            "symbol" => "CADJPY",
            "image" => "CADJPY.svg"
        ],
        [
            "name" => "EUR/AUD",
            "percentage" => "97%",
            "assetType" => "currency",
            "symbol" => "EURAUD",
            "image" => "EURAUD.svg"
        ],
        [
            "name" => "EUR/JPY",
            "percentage" => "91%",
            "assetType" => "currency",
            "symbol" => "EURJPY",
            "image" => "EURJPY.svg"
        ],
        [
            "name" => "EUR/CAD",
            "percentage" => "99%",
            "assetType" => "currency",
            "symbol" => "EURCAD",
            "image" => "EURCAD.svg"
        ],
        [
            "name" => "GPB/JPY",
            "percentage" => "83%",
            "assetType" => "currency",
            "symbol" => "GBPJPY",
            "image" => "GBPJPY.svg"
        ],
        [
            "name" => "NZD/CAD",
            "percentage" => "90%",
            "assetType" => "currency",
            "symbol" => "NZDCAD",
            "image" => "NZDCAD.svg"
        ],
        [
            "name" => "NZD/CHF",
            "percentage" => "98%",
            "assetType" => "currency",
            "symbol" => "NZDCHF",
            "image" => "NZDCHF.svg"
        ],
        [
            "name" => "NZD/JPY",
            "percentage" => "95%",
            "assetType" => "currency",
            "symbol" => "NZDJPY",
            "image" => "NZDJPY.svg"
        ],
        [
            "name" => "USD/MXN",
            "percentage" => "95%",
            "assetType" => "currency",
            "symbol" => "USDMXN",
            "image" => "USDMXN.svg"
        ],
        [
            "name" => "USD/SGD",
            "percentage" => "98%",
            "assetType" => "currency",
            "symbol" => "USDSGD",
            "image" => "USDSGD.svg"
        ],
        [
            "name" => "NZD/USD",
            "percentage" => "96%",
            "assetType" => "currency",
            "symbol" => "NZDUSD",
            "image" => "NZDUSD_OTC.svg"
        ],
        [
            "name" => "USD/CHF",
            "percentage" => "91%",
            "assetType" => "currency",
            "symbol" => "USDCHF",
            "image" => "USDCHF_OTC.svg"
        ],
        [
            "name" => "AUD/CHF",
            "percentage" => "96%",
            "assetType" => "currency",
            "symbol" => "AUDCHF",
            "image" => "AUDCHF.svg"
        ],
        [
            "name" => "CHF/JPY",
            "percentage" => "99%",
            "assetType" => "currency",
            "symbol" => "CHFJPY",
            "image" => "CHFJPY.svg"
        ]
    ];

    $duration_start = Carbon::createFromFormat('Y-m-d H:i:s', now()->format('Y-m-d H:i:s'));
    $duration_end = Carbon::createFromFormat('Y-m-d H:i:s', now()->addHours((int)$plan->plan_duration)->format('Y-m-d H:i:s')); 

    $total5DurationMin = $duration_start->diffInMinutes($duration_end)/5;

    $maxProfitPossible = (intval($max_roi) / 100) * floatval($amount);
    $randomlyGeneratedProfitValues = $this->generateRandomFloatsWithSumConstrained($total5DurationMin, $maxProfitPossible)['normalized_number'];
    $total_amount_earned = $this->generateRandomFloatsWithSumConstrained($total5DurationMin, $maxProfitPossible)['total_amount_earned'];

    $tradesArray = [];
    $timerEndsAt = 0;
    $timerStartAt = 0;

    for($i = 0; $i < count($randomlyGeneratedProfitValues); $i++) {
        if ($i === 0) {
            $timerStart = Carbon::now()->addSeconds(8);
            $timerStartAt = $timerStart->valueOf();
            $timerEndsAt =  $timerStart->addMinutes(intval($duration))->valueOf();
        }

        if ($i > 0) {
            $timerStart = Carbon::createFromTimestampMs($timerEndsAt);
            $timerStartAt = $timerStart->addSeconds(8)->valueOf();
            $timerEndsAt = $timerStart->addMinutes(intval($duration))->valueOf();
        }

        $action = '';
        $randomActionValue = mt_rand(1, 20);

        if ($randomActionValue % 2 === 0) {
            $action = 'BUY';
        } else {
            $action = 'SELL';
        }

        $randomval = mt_rand(0, 2);
        //check if timeStartAt is weekend or weekday 
        //if weekend set randomval to 0 else generate random value
        $st = Carbon::createFromTimestampMs($timerStartAt);
        if ($st->isWeekend()) {
            $randomval = 0;
        }


        if ($randomval === 0) {
            $randomCryptoAsset = rand(0, count($cryptoTradingPair) - 1);
            array_push($tradesArray, [
                'asset_name' => $cryptoTradingPair[$randomCryptoAsset]['symbol'],
                'asset_display_name' => $cryptoTradingPair[$randomCryptoAsset]['name'],
                'percentage' => $cryptoTradingPair[$randomCryptoAsset]['percentage'],
                'image_url' => "/images/coins/" . $cryptoTradingPair[$randomCryptoAsset]['image'],
                'profit' => $randomlyGeneratedProfitValues[$i],
                'type' => 'coin',
                'action' => $action,
                'timer_starts_at' => $timerStartAt,
                'timer_ends_at' => $timerEndsAt,
                'trade_position' => $i,
            ]);
        } else {
            $randomForexAsset = rand(0, count($forexTradingPair) - 1);
            array_push($tradesArray, [
                'asset_name' => $forexTradingPair[$randomForexAsset]['symbol'],
                'asset_display_name' => $forexTradingPair[$randomForexAsset]['name'],
                'percentage' => $forexTradingPair[$randomForexAsset]['percentage'],
                'image_url' => "/images/coins/" . $forexTradingPair[$randomForexAsset]['image'],
                'profit' => $randomlyGeneratedProfitValues[$i],
                'type' => 'currency',
                'action' => $action,
                'timer_starts_at' => $timerStartAt,
                'timer_ends_at' => $timerEndsAt,
                'trade_position' => $i,
            ]);
        }
    }

    return [
        'tradesArray' => $tradesArray,
        'total_amount_earned' => $total_amount_earned
    ];
  }

  function generateRandomFloatsWithSumConstrained($count, $target) {
      $randomNumbers = [];
      $sum = 0.0;

      // Generate random numbers and compute the sum
      for ($i = 0; $i < $count; $i++) {
          $value = mt_rand(0, 8000) / 1000; // Between 0.000 and 8.000
          $randomNumbers[] = $value;
          $sum += $value;
      }

      // Normalize to match the target sum
      $normalized = collect($randomNumbers)->map(function ($num) use ($sum, $target) {
          return ($num / $sum) * $target;
      });

      return [
          'normalized_number' => $normalized->toArray(),
          'total_amount_earned' => $normalized->sum(),
      ];
  }

  public function stopactivebot(){
    //
    $tradingbot = tradingbot::where('user_id', $this->user->id)->where('status', 1)->get()->first()->toArray();

    if($tradingbot['status'] == 1){

        $newuserbalance = $this->user->balance + $tradingbot['amount_earned'] + $tradingbot['amount'];
        if ($newuserbalance >= 0) {
            $demobalance_updated = User::where('id',$this->user->id)->update(['balance'=> $newuserbalance]);
            $tradingbot_updated = tradingbot::where('id',$tradingbot['id'])->update(['status'=> 0]);
            if($demobalance_updated && $tradingbot_updated){
                return true;
            }else{
                return false;
            } 
        } 
    }else{
      return false;
    }
  }
}