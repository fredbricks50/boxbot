<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

use App\Models\deposit;
use App\Models\Coins;
use App\Models\User;

use App\Mail\DepositMail;
use Illuminate\Support\Facades\Mail;


class DepositController extends Controller
{
    //
    public function deposit(Request $request){
        
        $data = $request->all();
            
        

        if($request->isMethod('POST')){
                     
            $datecreated =  date("d-m-Y");

            $depositdetails = [
                'user_id'=> Auth::User()->id,
                'gateway'=> $data['wallet'],
                'amount'=> $data['amount'],
                'deposit_status'=>0,
            ];
          
            $deposited = deposit::create($depositdetails);

            if($deposited){
                //mail user 
                //email subscription user
                $mailData = [
                    'title' => 'Deposit Request',
                    'body' => '<p>Your Deposit of $'.$data['amount'].' has been recieved and will be confirmed shortly</p>
                    <p><strong>Note</strong></p>
                    <ul>
                        <li>Make sure you have sent the said amount to the wallet provided in the dashboard</li>
                        <li>Wait to confirm your deposit has been confirmed in the block chain</li>
                    </ul>',
                    'username'=> Auth::User()->username
                ];
                Mail::to(Auth::User()->email)->send(new DepositMail($mailData));

                //email admin
                $mailData = [
                    'title' => 'New Deposit Request',
                    'body' => '<p>'.Auth::User()->username.' just Deposited  $'.$data['amount'].' </p>
                    
                    <a href="https://ctxai.org/user/login" style="background-color: teal; color: white;padding-top: 5px ;
                    padding-bottom: 5px ;
                    padding-left: 10px ;
                    padding-right: 10px ; text-decoration: none; margin: auto;"> Login </a>',
                    'username'=> "Admin"
                ];
                Mail::to(env('ADMIN_EMAIL'))->send(new DepositMail($mailData));

                return redirect()->intended('user/deposits')->with('deposit_success', 'Your Deposit Request has been made successfully, Your Live account will be updated when payment is confirmed.');
            }
            //check if current password entered is correct
            
        }
        $user = User::where('id', Auth::User()->id)->first()->toArray();
        
        $wallets = Coins::query()->get()->toArray();

        $deposits = deposit::where('user_id',Auth::User()->id)->orderBy('id','desc')->get()->toArray();
        return view('user.deposit')->with(compact('deposits'))->with(compact('user','wallets'));
    }

    public function deposits(){
        $user = User::where('id', Auth::User()->id)->first()->toArray();
        
        $wallets = Coins::query()->get()->toArray();
        $deposits = deposit::where('user_id',Auth::User()->id)->orderBy('id','desc')->get()->toArray();
        return view('user.deposit')->with(compact('deposits'))->with(compact('user','wallets'));
    }

    public function getwallet(Request $request){

        $data = $request->all();
        
        if($wallet = Coins::where('coin_name',$data['wallet'])->first()->toArray()){
            return $wallet;
            // return Response::json($wallet);
        }


    }
}
