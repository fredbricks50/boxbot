<?php

use Livewire\Volt\Component;

use Carbon\Carbon;

//models
use App\Models\User;
use App\Models\tradingbot;
use App\Models\plans;

new class extends Component {

    public function mount()  
    {
        //returns on robot here
        $tradingbots = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => Auth::User()->id,
            'tradingbots.status' => 1,])
        ->get()->toArray();


        // dd(rand(0,2));
        if(!empty($tradingbots)){

            $currentdate    = strtotime(date("Y-m-d H:i:s"));

            $currentDateTime = Carbon::createFromFormat('Y-m-d H:i:s', date("Y-m-d H:i:s"));

            // dd($tradingbots[0]);
            $max_roi = $tradingbots[0]['max_roi_percentage'];
            $min_roi = $tradingbots[0]['min_roi_percentage'];
            $duration = $tradingbots[0]['plan_duration'];
            $duration_start = Carbon::createFromFormat('Y-m-d H:i:s', $tradingbots[0]['duration_start']);
            $duration_end = Carbon::createFromFormat('Y-m-d H:i:s', $tradingbots[0]['duration_end']); 
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
    }
}; ?>

<div>
</div>
