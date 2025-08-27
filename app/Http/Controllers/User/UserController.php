<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;

//models
use App\Models\User;
use App\Models\Coins;
use App\Models\plans;
use App\Models\tradingbot;

class UserController extends Controller
{
    public function getUserDetails(){
       
        
        $wallets = Coins::query()->get()->toArray();

        //returns on robot here
        $tradingbots = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => Auth::User()->id,
            'tradingbots.status' => 1,])
        ->get()->toArray();


        // dd(rand(0,2));
        if(!empty($tradingbots)){

            $currentdate    = strtotime(date("d-m-Y H:i:s"));

            $currentDateTime = Carbon::createFromFormat('d-m-Y H:i:s', date("d-m-Y H:i:s"));

            // dd($tradingbots[0]);
            $max_roi = $tradingbots[0]['max_roi_percentage'];
            $min_roi = $tradingbots[0]['min_roi_percentage'];
            $duration = $tradingbots[0]['plan_duration'];
            $duration_start = Carbon::createFromFormat('d-m-Y H:i:s', $tradingbots[0]['duration_start']);
            $duration_end = Carbon::createFromFormat('d-m-Y H:i:s', $tradingbots[0]['duration_end']); 
            $amount = $tradingbots[0]['amount'];
            $profit_limit_exceed = $tradingbots[0]['profit_limit_exceed'];
            $tradingbot_id = $tradingbots[0]['id'];
            $trading_type = $tradingbots[0]['account_type'];
            $tradingbot_amountearned = $tradingbots[0]['amount_earned'];


            // $totalDuration = $currentDateTime->diffInMinutes($duration_start);
            // dd(range(3, 5, 0.15));
            

            //profit will exceed
            if($profit_limit_exceed == "yes"){
                //calculate number of 5 minutes in the plan duration
                $duration_min = $duration * 60;
                $duration_in_5 = $duration_min / 5;

                $percentage_in_5 = $max_roi / $duration_in_5;

                $totalDurationMin = $duration_start->diffInMinutes($currentDateTime);

                // dd($totalDurationMin,$duration_start,$currentDateTime);

                //generate a random  multiplyer
                $multiplierrange = 2;
                $randommultiplier = 2;

                //the magic
                $amount_earned = ((($percentage_in_5 * floor($totalDurationMin/5) )* $randommultiplier)/100)* $amount;


                

                if($currentDateTime->gt($duration_end)){
                    //generate a random profit number from 
                    $profitrange = range($min_roi, $max_roi, 0.15);
                    $randomprofit = $profitrange[array_rand($profitrange)];

                    $random_amount_earned = ($randomprofit/100) * $amount;

                    //update amount earned in the trading bot
                    $demobalance_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $random_amount_earned,'status'=>0]);
                    if($trading_type == "live"){

                        $newuser_balance = Auth::User()->balance + $random_amount_earned + $amount;
                        $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                    }else{
                        $newuserdemo_balance = Auth::User()->demo_balance + $random_amount_earned + $amount;
                        $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
                    }

                }else{
                    //update amount earned in the trading bot

                    //get max roi amount 
                    $max_amount_earned = ($max_roi/100) * $amount;
                    $final_amount_earned =  $amount_earned;

                    if($final_amount_earned > $max_amount_earned){

                        //update tradingbot with max amount earnable
                        $tradingbot_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $max_amount_earned,'status'=>2]);

                        if($trading_type == "live"){

                            $newuser_balance = Auth::User()->balance + $max_amount_earned + $amount;
                            $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                        }else{
                            $newuserdemo_balance = Auth::User()->demo_balance + $max_amount_earned + $amount;
                            $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
                        }
                    }else{

                        //if amount earned not exceeded just update the trading bots 
                        $tradingbot_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $final_amount_earned]);
                    }

                    
                }

            }else{
                //profit will not exceed
                //calculate number of 5 minutes in the plan duration
                $duration_min = $duration * 60;
                $duration_in_5 = $duration_min / 5;
                

                $percentage_in_5 = $max_roi / $duration_in_5;

                $totalDurationMin = $duration_start->diffInMinutes($currentDateTime);
                // dd($totalDurationMin,$duration_start,$currentDateTime);

                $amount_earned = (($percentage_in_5 * floor($totalDurationMin/5) )/100)* $amount;


                // dd($amount,$percentage_in_5,$totalDurationMin,floor($totalDurationMin/5),$amount_earned);
                if($currentDateTime->gt($duration_end)){
                    //generate a random profit number from 
                    $profitrange = range($min_roi, $max_roi, 0.15);
                    $randomprofit = $profitrange[array_rand($profitrange)];

                    $random_amount_earned = ($randomprofit/100) * $amount;

                    //update amount earned in the trading bot
                    $demobalance_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $random_amount_earned,'status'=>0]);
                    if($trading_type == "live"){

                        $newuser_balance = Auth::User()->balance + $random_amount_earned + $amount;
                        $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                    }else{
                        $newuserdemo_balance = Auth::User()->demo_balance + $random_amount_earned + $amount;
                        $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
                    }

                }else{
                    //update amount earned in the trading bot

                    //get max roi amount 
                    $max_amount_earned = ($max_roi/100) * $amount;
                    $final_amount_earned =  $amount_earned;

                    if($final_amount_earned > $max_amount_earned){

                        //update tradingbot with max amount earnable
                        $tradingbot_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $max_amount_earned,'status'=>2]);

                        if($trading_type == "live"){

                            $newuser_balance = Auth::User()->balance + $max_amount_earned + $amount;
                            $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                        }else{
                            $newuserdemo_balance = Auth::User()->demo_balance + $max_amount_earned + $amount;
                            $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
                        }
                    }else{

                        //if amount earned not exceeded just update the trading bots 
                        $tradingbot_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $final_amount_earned]);
                    }

                    
                }


            }
        }
        

        $user = User::where('id', Auth::User()->id)->first()->toArray();

        return compact('user','wallets');
    }

    public function selectaccount(Request $request, $accounttype = null){
        Session::put('account_type', $accounttype);
        return Redirect::back();
    }
    //
    public function dashboard(Request $request){
        $details = $this->getUserDetails();
        
        //page session
        Session::put('page', 'dashboard');
        return view('user.dashboard')->with($details);
    }

    public function robot(Request $request){
        //page session
        Session::put('page', 'robot');
        
        $firstplan = plans::query()->orderBy('order','asc')->get()->first()->toArray();
        $plans = plans::query()->orderBy('order','asc')->get()->toArray();

        $data = $request->all();
        // $tradingbots = tradingbot::where([
        //     'user_id' => Auth::User()->id,
        //     'status' => 1,])->get()->toArray();

        $tradingbots = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => Auth::User()->id,
            'tradingbots.status' => 1,])
        ->get()->toArray();

        // dd($tradingbots);

        // $tradingbotDontExist = tradingbot::where([
        //     'user_id' => Auth::User()->id,
        //     'status' => 1
        // ])->doesntExist();

        // dd($tradingbotDontExist);
        

        if($request->isMethod('POST')){
            $plan = plans::where('id', $data['strategy_id'])->get()->first()->toArray();
            

            $duration_start = date("d-m-Y H:i:s");
            $d=strtotime('+'.$plan['plan_duration'].' Hours');
            $duration_end = date("d-m-Y H:i:s", $d);

            $randomval = rand(0,2);
            if($randomval == 1){
                $randomval = "yes";
            }elseif($randomval==0){
                $randomval = "no";
            }else{
                $randomval = "no";
            }
            $tradingbotdetails = [
                'user_id'=> Auth::User()->id,
                'amount'=> $data['amount'],
                'amount_earned'=> 0,
                'duration'=> $data['duration'],
                'duration_start'=> $duration_start,
                'duration_end'=> $duration_end,
                'strategy_id'=> $data['strategy_id'],
                'profit_limit_exceed'=> $randomval,
                'account_type'=>Session::get('account_type'),
                'status'=>1,
            ];
            // dd($tradingbotdetails);
            

            $useractive = User::where('id',Auth::User()->id)->where('status',1)->exists();
         
            //checking if demo balance is greater than amount inputed
            if(Session::get('account_type') == "demo" && Auth::User()->demo_balance >= $data['amount'] && $data['amount'] >= $plan['min_amount'] ){
               

            
                    if($useractive){
                         //update user demo balance
                        $new_demobalance = Auth::User()->demo_balance - $data['amount'];
                        $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $new_demobalance]);
                        $trading = tradingbot::create($tradingbotdetails);
                        return redirect()->intended('user/robot')->with('robot_success', 'Robot started successfully')->with(compact('tradingbots'));
                    }else{
                        return redirect()->intended('user/robot')->with('robot_error', 'Unable to trade now, Please contact support to learn more')->with(compact('tradingbots'));
                    }
               
                    
             
            }elseif(Session::get('account_type') == "live" && Auth::User()->balance >= $data['amount'] && $data['amount'] >= $plan['min_amount'] ){
       
                    if($useractive){
                         //update userbalance
                        $new_balance = Auth::User()->balance - $data['amount'];
                        $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $new_balance]);

                     $trading = tradingbot::create($tradingbotdetails);
                     return redirect()->intended('user/robot')->with('robot_success', 'Robot started successfully')->with(compact('tradingbots'));
                    }else{
                        return redirect()->intended('user/robot')->with('robot_error', 'Unable to trade now, Please contact support to learn more')->with(compact('tradingbots'));
                    }
           
                
            }else{
                return redirect()->to('user/robot')->withErrors(['msg' => 'Not up to the minimum'])->with(compact('tradingbots'));
            }
          
            

        }

        // dd($firstplan);

        return view('user.robot')->with($this->getUserDetails())->with(compact('firstplan','plans','tradingbots'));
    }

    public function stoprobot(Request $request){
        $data = $request->all();
        // dd($data);
        if($request->isMethod('POST')){
            $tradingbot = tradingbot::where('id', $data['tradingbot_id'])->get()->first()->toArray();

            if($tradingbot['account_type']== "live" & $tradingbot['status'] == 1){

                $newuserbalance = Auth::User()->balance + $tradingbot['amount_earned'] + $tradingbot['amount'];
                $demobalance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuserbalance]);
    
                $tradingbot_updated = tradingbot::where('id',$data['tradingbot_id'])->update(['status'=> 0]);
            }elseif($tradingbot['account_type']== "demo" & $tradingbot['status'] == 1){
                $newuserdemo_balance = Auth::User()->demo_balance + $tradingbot['amount_earned'] + $tradingbot['amount'];
                $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
    
                $tradingbot_updated = tradingbot::where('id',$data['tradingbot_id'])->update(['status'=> 0]);
            }
           

        }

         //page session
         Session::put('page', 'robot');

         $tradingbots = tradingbot::where('user_id', Auth::User()->id)->orderBy('id','desc')->get()->toArray();
         return view('user.tradingbot')->with($this->getUserDetails())->with(compact('tradingbots'));
    }

    public function getCurrentEarned(Request $request){
        $this->getUserDetails();
        $data = $request->all();
        $tradingbot = tradingbot::where('id', $data['tradingbot_id'])->get()->first()->toArray();
        return $tradingbot['amount_earned'];
    }

    public function account(Request $request){
        // dd(Auth::User());
        //page session
        Session::put('page', 'account');
        return view('user.account')->with($this->getUserDetails());
    }

    public function deposit(Request $request){
        //page session
        Session::put('page', 'deposit');
        return view('user.deposit')->with($this->getUserDetails());
    }

    public function withdraw(Request $request){
        //page session
        Session::put('page', 'withdraw');
        return view('user.withdraw')->with($this->getUserDetails());
    }

    public function tradingbot(Request $request){
        //page session
        Session::put('page', 'robot');

        $tradingbots = tradingbot::where('user_id', Auth::User()->id)->orderBy('id','desc')->get()->toArray();
        return view('user.tradingbot')->with($this->getUserDetails())->with(compact('tradingbots'));
    }
}
