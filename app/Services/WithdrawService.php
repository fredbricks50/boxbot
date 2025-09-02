<?php
namespace App\Services;

use Telegram\Bot\Api;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Coins;
use App\Models\deposit;
use App\Models\withdraw;

use Illuminate\Support\Facades\Mail;
use App\Mail\DepositMail;
use App\Mail\WithdrawMail;

class WithdrawService
{
  private $telegram;
  private $user;
  public function __construct($chatId)
  {
    // Initialize service dependencies here
    $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
    //get user by chatId
    $this->user = User::where('telegram_id', (string)$chatId)->first();
  }

  public function userbalance(){

    return $this->user->balance;

  }

  public function getpaymentgateways(){

    $coins = Coins::all();
    $paymentgateways = [];
    foreach ($coins as $coin) {
        $paymentgateways[] = [
            [
                'text' => $coin->coin_name,
                'callback_data' => (string) $coin->id
            ]
        ];
    }
    
    return $paymentgateways;
  }

  public function getgateway($coinId){

    $coin = Coins::where('id', $coinId)->first();
    if($coin){
        return $coin;
    }else{
        return null;
    }

  }

  public function recordwithdraw($amount, $paymentgateway, $walletaddress){
        //arrange withdraw details to create
        $withdrawdetails = [
            'user_id'=> $this->user->id,
            'gateway'=> $paymentgateway,
            'gatewayname'=> $paymentgateway,
            'amount'=> $amount,
            'userwallet_id'=> $walletaddress,
            'withdraw_status'=>0
        ];
        $useractive = User::where('id',$this->user->id)->where('status',1)->exists();

        if($useractive){
            if($this->user->balance >= $amount){

                 if ($amount >= 0) {
                    $withdrawn = withdraw::create($withdrawdetails);

                    //update the user balance on withdrawal
                    $newbalance = $this->user->balance - $amount;

                    // if ($newbalance >= 0) {
                    //     $updated = User::where('id',$this->user->id)->update(['balance'=> $newbalance,'remember_token'=>null, 'email_verified_at' => null]);
                    // }
                    if($newbalance >= 0){

                        //email withdraw admin
                        $mailData = [
                            'title' => 'New Withdrawal Request',
                            'body' => '<p>'.$this->user->username.'Just made a Withdrawal of '.$amount.' to the '.$paymentgateway.' wallet  <strong>'.$walletaddress.'</strong> has been made and needs approval</p>
                            ',
                            'username'=> "Admin"
                        ];
                        Mail::to(env('ADMIN_EMAIL'))->send(new WithdrawMail($mailData));
                        

                        return true;
                    }else{
                        return false;
                    }
                }
                
            }else{
                return false;
            }

        }else{
            return false;
        }

  }
}