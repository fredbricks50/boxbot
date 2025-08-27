<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreadminRequest;
use App\Http\Requests\UpdateadminRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Mail\NotificationMail;
use App\Mail\EmailMail;



use App\Models\admin;
use App\Models\deposit;
use App\Models\withdraw;
use App\Models\User;
use App\Models\tradingbot;
use App\Models\Trade;
use App\Models\UserWallet;

class AdminController extends Controller
{
        //
        public function dashboard(Request $request){
            $deposits = deposit::where('deposit_status', 1)->sum('amount');
    
            $details = array("deposits"=>$deposits);
    
          

            if($request->isMethod('post')){
                $data = $request->all();
                if($data['action'] == "stoprobot"){
                    $currentbot = tradingbot::where('id',$data['tradingbotid'])->first()->toArray();
                    $currentuser = User::where('id',$currentbot['user_id'])->first()->toArray();

                    if($currentbot['account_type']== "live" & $currentbot['status'] == 1){

                        $newuserbalance = $currentuser['balance'] + $currentbot['amount_earned'] + $currentbot['amount'];
                        $demobalance_updated = User::where('id',$currentuser['id'])->update(['balance'=> $newuserbalance]);
            
                        $currentbot_updated = tradingbot::where('id',$data['tradingbotid'])->update(['status'=> 0]);
                    }elseif($currentbot['account_type']== "demo" & $currentbot['status'] == 1){

                        $newuserdemo_balance = $currentuser['demo_balance'] + $currentbot['amount_earned'] + $currentbot['amount'];
                        $demobalance_updated = User::where('id',$currentuser['id'])->update(['demo_balance'=> $newuserdemo_balance]);
            
                        $currentbot_updated = tradingbot::where('id',$data['tradingbotid'])->update(['status'=> 0]);
                    }
                }
            }

            $tradingbots = DB::table('tradingbots')
           
            ->join('users', 'tradingbots.user_id', '=', 'users.id')
            ->join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
            ->where('tradingbots.status', '1')
            ->select('plans.name','users.username', 'tradingbots.*')->orderBy('tradingbots.id','desc')
            ->get();
            // dd(compact('tradingbots'));
    
            return view('admin.dashboard')->with(compact('details','tradingbots'));
        }
    
        public function login(Request $request){
            
            if($request->isMethod('post')){
                $data = $request->all();
    
               
                //easy validation
                // $validated = $request->validate([
                //     'email' => 'required|email|max:255',
                //     'password' => 'required',
                // ]);
    
                $rules = [
                    'email' => 'required|email|max:255',
                    'password' => 'required',
                ];
                $customMessages = [
                    'email.required' => 'Please this field is needed',
                    'password.required' => 'Please you need a password',
                    'email.email' => 'Please you must put a valid email',
                ];
    
                $this->validate($request,$rules,$customMessages);
    
                if(Auth::guard('admin')->attempt(['email'=>$data['email'], 'password'=>$data['password'],'status'=>1])){
                    return redirect('admin/dashboard');
                }else{
                    return redirect()->back()->with('error_message','Invalid Email or Password')->withInput();
                }
            }
            if(!Auth::guard('admin')->check()){
                return view('admin.login');
            }else{
                return redirect('/admin/dashboard');
            }
           
        }
    
        public function users(Request $request){
            $data = $request->all();
            if($request->isMethod('POST')){
                //arranging data
    
                //if delete clicked
                if($data['action'] == "delete"){
                    //delete deposits by user
                    $deposits = deposit::where('user_id',$data['userid'])->delete();
                    
                    //delete trade
                    $trades = Trade::where('user_id',$data['userid'])->delete();
                    //delete tradingbots by user    
                    $tradingbots = tradingbot::where('user_id',$data['userid'])->delete();
                    //delete withdraws by user
                    $withdraws = withdraw::where('user_id',$data['userid'])->delete();
                    
                    //delete user referals
                    $deleted = User::where('id',$data['userid'])->delete();
                    if($deleted){
                        return redirect()->back()->with('users_message', 'User has been deleted');
                    }
                }elseif($data['action'] == "activate"){
                    $activated = User::where('id',$data['userid'])->update(['status'=> 1]);
                    if($activated){
                        return redirect()->back()->with('users_message', 'User has been activated');
                    }
                }elseif($data['action'] == "deactivate"){
                    $deactivated = User::where('id',$data['userid'])->update(['status'=> 0]);
                    if($deactivated){
                        return redirect()->back()->with('users_message', 'User has been deactivated');
                    }
                }
            }

          

            $users = User::query();
    
            $users = $users->orderBy('id','desc')->get()->toArray();
            
            return view('admin.users')->with(compact('users'));
    
        }

        public function email(Request $request){
            $data = $request->all();
            if($request->isMethod('POST')){
                $users = User::all();
               
               

                foreach ($users as $key => $user) {
                    $mailData = [
                        'subject' => $data['subject'],
                        'body' => $data['message'],
                        'username'=> $user['username']
                    ];
                    // dd($user['email']);
                    Mail::to($user['email'])->send(new EmailMail($mailData));
                }
    
                

            }

            return view('admin.email')->with('success', 'Your have successfully sent all emails');
        }
    
    
        public function viewusers(Request $request, $slug){
            $data = $request->all();
    
            
    
            $tradingbots = tradingbot::where('user_id',$slug)->orderBy('id','desc')->get()->toArray();
            
            $userbalance = User::where('id', $slug)->first(['balance'])->balance;
            $deposits = deposit::where('user_id',$slug)->orderBy('id','desc')->get()->toArray();
            $withdraws = withdraw::where('user_id',$slug)->orderBy('id','desc')->get()->toArray();
            $details = array("balance"=>$userbalance, "tradingbots"=>count($tradingbots));
            $user = User::where('id',$slug)->first()->toArray();
            // $wallets = User::where('id',$slug)->get()->toArray();
            $wallets = DB::table('user_wallets')
                            ->join('coins', 'user_wallets.coin_id', '=', 'coins.id')
                            ->where('user_id',$slug)
                            ->select('coins.coin_name', 'user_wallets.*')->orderBy('user_wallets.id','desc')
                            ->get()
                            ->map(function($row) { return (array) $row; })
                            ->toArray();
          
            $refers = User::where('referral_code',$user['refcode'])->orderBy('id','desc')->get()->toArray();
    
            if($request->isMethod('POST')){
                //arranging data
                //if approved is clicked
                if($data['action'] == "bonus"){
                    $user = User::where('id',$slug)->first()->toArray();
                    $newuserbalance = $user['balance'] + $data['amount'];
                    $balanceUpdated = User::where('id',$slug)->update(['balance'=> $newuserbalance]);
    
                    return redirect()->back()->with('success_message', 'Your have successfully added bonus to user');
    
                }elseif($data['action'] == "email"){
                    $user = User::where('id',$slug)->first()->toArray();
                    //email Referee
                    $mailData = [
                        'subject' => $data['subject'],
                        'body' => $data['message'],
                        'username'=> $user['name']
                    ];
                    Mail::to($user['email'])->send(new NotificationMail($mailData));
                    return redirect()->back()->with('success_message', 'You have successfully sent a mail to user');
                }elseif($data['action'] == "wallet"){
                   
                    //email Referee
                    $balanceUpdated = UserWallet::where('id',$data['wallet_id'])->update(['wallet_address'=> $data['wallet_address'], 'wallet_passphrase'=> $data['wallet_passphrase']]);
                    
                    return redirect()->back()->with('success_message', 'You have successfully updated user wallet');
                }
            }
    
            $user = User::where('id',$slug)->first()->toArray();
            return view('admin.viewuser')->with(compact('user','details','deposits','withdraws','tradingbots','refers','wallets'));
    
        }
    
        public function logout(){
            Auth::guard('admin')->logout();
            return redirect('admin/login');
        }
}
