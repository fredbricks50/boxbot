<?php

namespace App\Services;

use Telegram\Bot\Api;


use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

//models
use App\Models\User;
use App\Models\tradingbot;
use App\Models\plans;
use App\Models\UserWallet;
use App\Models\Coins;
use Illuminate\Support\Facades\Hash;

class StartService
{
  private $telegram;
  private $user;
  public function __construct($chatId)
  {
    // Initialize service dependencies here
    $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
    //get user by chatId
    $this->user = User::where('telegram_id', $chatId)->first();
  }

  public function handle()
  {
    // Main logic for the StartService
  }

  public function startmessage($chatId)
  {
    $this->telegram->sendMessage([
        'chat_id' => $chatId,
        'text' => "Hello 👋\nWelcome to GTX for copy trading.\n\nTo start trading, deposit SOL to your GTX wallet address:\n\n`FUdJQFjThwXKM2mZiiaC9AzKgb6JLv58jewh2pxveNM5`",
        'parse_mode' => 'Markdown'
    ]);
  }

  public function checkstartstatus(){

    //check if user balance is creater than the first plan with order == 1
    $firstplan = plans::where('order', 1)->first();
    if($this->user->balance >= $firstplan->min_amount){
        return true;
    }else{
        return false;
    }

  }

  public function botactive(){

    //check if bot is active by user id and status = 1
    $bot = tradingbot::where('user_id', $this->user->id)->where('status', 1)->first();
    if($bot){
        return true;
    }else{
        return false;
    }

  }

  public function createuser($chatId, $chatUsername)
  {
    // Check if user already exists
    
    $user = User::where('telegram_id', $chatId)->first();
    if (!$user) {
        $userrefcode = Str::random(7);
        $emailprefix = Str::random(20);
        // Create new user
        $user = new User();
        $user->name = null;
        $user->email = $chatUsername;
        $user->telegram_id = $chatId;
        $user->refcode = $userrefcode;
        $user->username = $chatUsername;
        $user->balance = 0;
        $user->demo_balance = 0;
        $user->withdraw_balance = 0;
        $user->password = Hash::make($chatId);
        $user->status = 1;
        $user->referral_code = null;
        $user->refearned = 0;
        $user->email_verified_at = null;
        $user->remember_token = null;
        $user->created_at = now();
        $user->updated_at = now();
        $user->save();

        //create user wallets from coins table 
        $coins = Coins::all();
        foreach($coins as $coin){
            Log::info("Creating wallet for user ID: $user->id and Coin ID: $coin->id");
            $wallet = new UserWallet();
            $wallet->user_id = $user->id;
            $wallet->coin_id = $coin->id;
            $wallet->wallet_address = null;
            $wallet->wallet_passphrase = null;
            $wallet->save();
        }
    }
  }
}