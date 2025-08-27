<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Mail\WithdrawMail;
use App\Models\User;
use App\Models\withdraw;
use App\Models\Coins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

use App\Mail\Sendotp;

class WithdrawController extends Controller
{
    //
    public function getUserDetails(){
        $user = User::where('id', Auth::User()->id)->first()->toArray();
        
        $wallets = Coins::query()->get()->toArray();
        return compact('user','wallets');
    }

    public function sendwithdrawotp(Request $request){
        $data = $request->all();
        $permitted_chars = '0123456789';
        $remember_token = substr(str_shuffle($permitted_chars), 0,5);
        $userUpdated = User::where('id',Auth::User()->id)->update(['remember_token'=>$remember_token]);
       
        if($userUpdated){
           
            $user = User::where('id',Auth::User()->id)->first()->toArray();
           
            //email admin
            $mailData = [
                'title' => 'Verification Code',
                'body' => '<p>A Withdrawal of $'.$data['withdrawamount'].' to the '.$data['walletname'].' wallet  <strong>'.$data['walletaddress'].'</strong> was requested on your account</p>

                    <p>Your verification code is</p>
                
                    <p style="color: #19282b; font-size: 20px; line-height: 28.8px;"><b>'.$remember_token.'</b></p>
                 
                   
                    </br>
                    ',
                'username'=> $user['username']
            ];
           
            
            Mail::to($user['email'])->send(new Sendotp($mailData));
            return "true";
           
        }else{
            return "false";
        }

                    
    }
    public function withdraw(Request $request){
        $data = $request->all();
        //page session
        Session::put('page', 'withdraw');

        // dd(Auth::User()->id);
        $withdraws = withdraw::where('user_id',Auth::User()->id)->orderBy('id','desc')->get()->toArray();

        $user = User::where('id',Auth::User()->id)->first()->toArray();

        if($request->isMethod('POST')){
           
            

            $withdrawdetails = [
                'user_id'=> Auth::User()->id,
                'gateway'=> $data['walletname'],
                'amount'=> $data['amount'],
                'userwallet_id'=> $data['walletaddress'],
                'withdraw_status'=>0
            ];

            $useractive = User::where('id',Auth::User()->id)->where('status',1)->exists();

            if($useractive){
                if($user['balance'] >= $data['amount']){

                    $userotp = User::where('id',Auth::User()->id)->where('remember_token',$data['withdrawotp'])->exists();

                    if($userotp){
                        $withdrawn = withdraw::create($withdrawdetails);
    
                        $newbalance = $user['balance'] - $data['amount'];
        
                        $updated = User::where('id',Auth::User()->id)->update(['balance'=> $newbalance]);
        
                        if($updated){
        
                            //email withdraw user
                            $mailData = [
                                'title' => 'Withdrawal Request',
                                'body' => '<p>Your Withdrawal of $'.$data['amount'].' to the '.$data['walletname'].' wallet  <strong>'.$data['walletaddress'].'</strong> has been recieved and will be processed shortly</p>
                                ',
                                'username'=> Auth::User()->username
                            ];
                            Mail::to($user['email'])->send(new WithdrawMail($mailData));
        
                            //email withdraw admin
                            $mailData = [
                                'title' => 'New Withdrawal Request',
                                'body' => '<p>'.Auth::User()->username.'Just made a Withdrawal of $'.$data['amount'].' to the '.$data['walletname'].' wallet  <strong>'.$data['walletaddress'].'</strong> has been made and needs approval</p>
                                ',
                                'username'=> "Admin"
                            ];
                            Mail::to(env('ADMIN_EMAIL'))->send(new WithdrawMail($mailData));
                            
                            return redirect()->to('user/withdraw')->with('withdraw_success', 'Your withdrawal was successful')->with($this->getUserDetails());
                        }else{
                            return redirect()->to('user/withdraw')->with('error_message', 'error occured')->with($this->getUserDetails());
                        }
                    }else{
                        return redirect()->to('user/withdraw')->with('error_message', 'Wrong OTP , Please try again')->with($this->getUserDetails());
                    }
                    
                    
                }else{
                    return redirect()->to('user/withdraw')->with('error_message', 'Your do not have enough funds in wallet!')->with($this->getUserDetails());
                }

            }else{
                return redirect()->to('user/withdraw')->with('error_message', 'Unable to Withdraw , Please contact support')->with($this->getUserDetails());
            }
           

            
            
        }

        return view('user.withdraw')->with(compact('withdraws','user'))->with($this->getUserDetails());
    }
}
