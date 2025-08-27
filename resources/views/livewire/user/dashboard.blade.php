<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Title;
use Livewire\Attributes\On;
use Illuminate\Support\Facades\Session;
use Livewire\Attributes\Url;
use Carbon\Carbon;

use App\Services\TradingAssets;
use Livewire\Attributes\Locked;

use App\Models\plans;
use App\Models\tradingbot;
use App\Models\Trade;
use Mary\Traits\Toast;
use App\Models\User;

new
#[Title('Dashboard')]
class extends Component {

    #[Url(except: '',as: 'p')]
    public ?string $dashboardtab = '' ;
    public $selectedPage = '';

    public function updatedSelectedTab()
    {
        if($this->selectedPage === 'strategy'){
            $this->dashboardtab= 'strategy';
        }else{
            $this->dashboardtab= '';
        }
    }

    use Toast;
    public string $selectedTab = 'users-tab';

    //drawers
    public bool $robotdrawer = false;
    public bool $StrategyModal = false;
    public bool $howitworksModal = false;
    public $strategytab = "spot-strategy";

    public $plans;
    public $assetservice;
    public $selectedPair;
    protected array $tradingassets = [];


    //Get details
    public bool $isActiveTrade = false;
    public object $activebottable;
    public array $activebot = [];
    public array $activebottrades = [];
    public int $currentprofit = 0;

    public int $currenttradeposition = 0;
    public array $currentactivetrade = [];
    public $currenttradepos;

    public $amount_earned = 0;
    public $amount_earned_percentage = 0;

    //get strategies
    public array $strategies;
    public array $selectedStrategy = [];

    //form data
    public string $amount;
    public float $userlivebalance ;
    public float $userdemobalance;

    public bool $isMobile = false; 

    public $tradefee = 0.01; // 1% trade fee

   

    public function mount()
    {
        if (session()->pull('just_signed_up')) {
            $this->howitworksModal = true;
        }
        //Calculate Returns
        $this->returnprofit();
        //setting up active bots
        $this->activebot = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => Auth::User()->id,
            'tradingbots.status' => 1,])
        ->get()->toArray();

        

        if($this->dashboardtab=== 'strategy'){
            $this->selectedPage = 'strategy';
        }else{
            $this->selectedPage = '';
        }

        
        $this->plans = plans::query()->orderBy('order','asc')->get()->toArray();

        $this->selectedTab = $this->plans[0]['id'].'-tab';
        // $this->selectedCoin = $this->coins[0]['id'];

        // $this->assetservice = new TradingAssets();

        //get trading assets 
        $this->tradingassets = TradingAssets::all();

        // check if a session called current_trading_pair exists if not then create one and assign it to the first trading pair in the array
        if (Session::has('current_trading_pair')) {
            //search for the trading pair in the array with symbol as session current_trading_pair 
            $this->selectedPair = collect($this->tradingassets)
                ->firstWhere('symbol', Session::get('current_trading_pair')) ?? $this->tradingassets[0];
        }else{
            $this->selectedPair = $this->tradingassets[0];
            Session::put('current_trading_pair', $this->selectedPair->symbol);
        }

        

        if(count($this->activebot) > 0){
            $this->activebottable = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
            ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
            ->where([
                'tradingbots.user_id' => Auth::User()->id,
                'tradingbots.status' => 1,])
            ->get();

            
            $this->isActiveTrade = true;
            
            $this->activebottrades = json_decode(Trade::where('bot_id', $this->activebot[0]['id'])->get()->toArray()[0]['trades'], true);

            //get currenttradeposition
            $duration_max_minutes = $this->activebot[0]['plan_duration'] * 60;
            $duration_segment_minutes = $duration_max_minutes / $this->activebot[0]['duration']; //this should give 288 minutes for 24 hours and 5minutes
            
            $startduration = strtotime($this->activebot[0]['duration_start']);
            $duration_start = Carbon::createFromFormat('d-m-Y H:i:s', date("d-m-Y H:i:s", $startduration));

            
            for ($i = 0; $i < count($this->activebottrades); $i++) {
                $timerEndsAt = $this->activebottrades[$i]['timer_ends_at'];
                // $timerEndsAt = Carbon::createFromFormat('Y-m-d H:i:s', $timerEndsAt)->valueOf();
                $now = Carbon::now()->valueOf();
                
                if ($now <= $timerEndsAt) {
                    $this->currenttradepos = $this->activebottrades[$i];
                    break; 
                }else{
                    $this->currentprofit = $this->activebottrades[$i]['profit'] + $this->currentprofit;
                }
            }

            $this->amount_earned = $this->activebot[0]['amount_earned'] ;
            $this->amount_earned_percentage = $this->activebot[0]['amount_earned'] / $this->activebot[0]['amount'] * 100;



            //get currenttrade 
            $this->currentactivetrade = $this->activebottrades[$this->currenttradepos['trade_position']];

            if($this->selectedPage === 'strategy'){
                $this->robotdrawer = false;
            }else{
                $this->robotdrawer = true;
            }
            


        }else{
            if($this->selectedPage === 'strategy'){
                $this->StrategyModal = false;
            }else{
                $this->StrategyModal = false;
            }
            
        }

        $this->strategies = plans::where('status', 1)->orderBy('order','asc')->get()->toArray();
        


    }

    #[On('openlivemodal')] 
    public function handleopenlivemodal()
    {
        $this->robotdrawer = false;
    }

    #[Computed]
    public function getTradingPairData(): array
    {   
        return $this->tradingassets;
    }

    public function selectPair($pair)
    {
        Session::put('current_trading_pair', $pair);
        $this->tradingassets = TradingAssets::all();
        $this->selectedPair = collect($this->tradingassets)
                ->firstWhere('symbol', Session::get('current_trading_pair')) ?? $this->tradingassets[0];
        
        $this->dispatch('reloadchart');
        
    }

    public function selectStrategy()
    {
        $this->dispatch('selected-strategy', strategy: $this->selectedStrategy);
    }

    
    public function openDepositModal()
    {
        $this->dispatch('open-deposit-modal');
    }

    #[On('open-deposit-modal')]
    public function openDepositModalRobot()
    {
        $this->robotdrawer = false;
    }

    #[On('reload-chart-desktop')] 
    public function reloadchartdesktop($selectedpair)
    {
        $this->robotdrawer = false;
        Session::put('current_trading_pair', $selectedpair);
        $this->tradingassets = TradingAssets::all();
        $this->selectedPair = collect($this->tradingassets)
                ->firstWhere('symbol', Session::get('current_trading_pair')) ?? $this->tradingassets[0];
        $this->dispatch('reloadchart');
    }

    #[On('currenttradeposchange')] 
    public function currenttradeposchanged($tradepos)
    {
        $this->currentactivetrade = $this->activebottrades[$tradepos['trade_position']];
        $previousposition = $this->activebottrades[$tradepos['trade_position']-1];
        $this->amount_earned = $this->amount_earned + $previousposition['profit']; ;
        $this->amount_earned_percentage = $this->amount_earned / $this->activebot[0]['amount'] * 100;

        Session::put('current_trading_pair', $tradepos['asset_name']);
        $this->tradingassets = TradingAssets::all();
        $this->selectedPair = collect($this->tradingassets)
                ->firstWhere('symbol', Session::get('current_trading_pair')) ?? $this->tradingassets[0];
        
        $this->dispatch('reloadchart');
    }

    public function returnprofit(){
        $activebot = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => Auth::User()->id,
            'tradingbots.status' => 1,])
        ->get()->toArray();
        
        // dd(rand(0,2));
        if(!empty($activebot)){
            $activebottrades = json_decode(Trade::where('bot_id', $activebot[0]['id'])->get()->toArray()[0]['trades'], true);


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
            if($profit_limit_exceed === "yes"){
                
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
                    if($trading_type === "live"){

                        $newuser_balance = Auth::User()->balance + $random_amount_earned + $amount;
                        if ($newuser_balance >= 0) {
                            $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                        }
                    }else{
                        $newuserdemo_balance = Auth::User()->demo_balance + $random_amount_earned + $amount;
                        if ($newuserdemo_balance >= 0) {
                            $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
                        }
                    }

                }else{
                    //update amount earned in the trading bot

                    //get max roi amount 
                    $max_amount_earned = ($max_roi/100) * $amount;
                    $final_amount_earned =  $amount_earned;

                    if($final_amount_earned > $max_amount_earned){

                        //update tradingbot with max amount earnable
                        $tradingbot_updated = tradingbot::where('id',$tradingbot_id)->update(['amount_earned'=> $max_amount_earned,'status'=>2]);

                        if($trading_type === "live"){

                            $newuser_balance = Auth::User()->balance + $max_amount_earned + $amount;
                            if ($newuser_balance >= 0) {
                                $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                            }
                        }else{
                            $newuserdemo_balance = Auth::User()->demo_balance + $max_amount_earned + $amount;
                            if ($newuserdemo_balance >= 0) {
                                $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
                            }
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

                        $newuser_balance = Auth::User()->balance + $random_amount_earned + $amount;
                        if ($newuser_balance >= 0) {
                            $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                        }
                    }else{
                        $newuserdemo_balance = Auth::User()->demo_balance + $random_amount_earned + $amount;
                        if ($newuserdemo_balance >= 0) {
                            $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
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
                            $newuser_balance = Auth::User()->balance + $max_amount_earned + $amount;
                            if ($newuser_balance >= 0) {
                                $balance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuser_balance]);
                            }
                        }else{
                            $newuserdemo_balance = Auth::User()->demo_balance + $max_amount_earned + $amount;
                            if ($newuserdemo_balance >= 0) {
                                $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);
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
    }

    #[On('select-strategy')] 
    public function selectStrategyAgain()
    {
        $this->StrategyModal = true;
        $this->robotdrawer = false;
        $this->dispatch('select-strategy-selected');
    }



}; ?>

<div class="min-h-screen flex flex-col gap-4 lg:px-5 px-1 {{ Auth::User()->mode === 1 ? 'lg:pt-6' : 'lg:pt-10' }} pt-4"
    x-data="{ 
        activebottrades: @js($activebottrades),
        currenttradeposition: @js($currenttradeposition ),
        tradeamount: @js($isActiveTrade ? $activebot[0]['amount'] : 0),
        currentactivetrade:$wire.entangle('currentactivetrade').live,
        amount_earned:$wire.entangle('amount_earned').live,
        amount_earned_percentage:$wire.entangle('amount_earned_percentage').live, 
        selectedStrategy: $wire.entangle('selectedStrategy').live,
        demobalance: $wire.entangle('userdemobalance').live,
        livebalance: $wire.entangle('userlivebalance').live,
        formatCurrency(value) {
            const num = parseFloat(value);
            if (isNaN(num)) {
                return '$0.00';
            }
            return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        formatimage(value){
            if (value.includes('https://olympbot.com/icons/assets/')) {
                return '/images/coins/' + value.replace('https://olympbot.com/icons/assets/', '');
            }
            return value;

        }
    
    }"
    
    
    x-on:select-strategy-selected.window="loading=false;" 
    >
    
    <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:pb-0 pb-[100px]">
        @if($selectedPage != 'strategy')
        <div class="lg:col-span-2" id="ActiveBotCover">
            <div class="tradingview-widget-container relative w-full h-[500px] hidden lg:block"
                x-data="{ 
                    symbol: $wire.entangle('selectedPair.symbol').live,
                    chartloading: false,
                    loadChart() {
                            const containerId = 'tv_chart_container';
                            const container = document.getElementById(containerId);

                            this.chartloading = true;

                            if (!window.TradingView) {
                                // Retry after a short delay if TradingView script isn't ready
                                setTimeout(() => this.loadChart(), 100);
                            }

                            // Clear chart container before rendering new widget
                            container.innerHTML = '';

                            // Slight delay ensures TradingView gets fresh container
                            setTimeout(() => {
                                new TradingView.widget({
                                    autosize: true,
                                    symbol: this.symbol,
                                    interval: 'D',
                                    timezone: 'Etc/UTC',
                                    theme: 'dark',
                                    style: '2',
                                    locale: 'en',
                                    allow_symbol_change: true,
                                    support_host: 'https://www.tradingview.com',
                                    container_id: containerId
                                });
                            }, 100); 
                        }
                    }"
                x-init="
                    loadChart()
                "
                x-on:reloadchart.window="
                    loadChart()
                " 
                class="relative">
                <div x-show="chartloading" x-cloak class="w-full h-full absolute inset-0 z-0 bg-gray-900/70 flex items-center justify-center">
                    <img src="/images/chartloading.svg" class="w-full h-full object-cover" alt="" >
                    {{-- <div class="text-white text-lg animate-pulse">Loading chart...</div> --}}
                </div>
                <div id="tv_chart_container" style="height:100%;width:100%"></div>
            </div>
            <div class="ActiveBotDesktop mt-4 lg:block hidden" id="ActiveBotDesktop">
                <x-card class="!p-0">
                    <div class="Activeheader w-full flex justify-between items-center bg-base-300 p-4 border-b border-base-content/10">
                        <h2 class="text-sm font-semibold">Active Trades</h2>
                        {{-- <x-button label="Share & Earn" icon="s-share" class="btn-primary btn-xs [&>.block>svg]:w-3" /> --}}

                    </div>
                    <div class="activebotcontainer min-h-[400px]">
                        @if($isActiveTrade)
                        @php
                            $botheader = [
                                ['key' => 'id', 'label' => 'Current Position'],
                                ['key' => 'amount', 'label' => 'Investment', 'format' => ['currency', '2.', '$ ']],
                                ['key' => 'amount_earned', 'label' => 'Bot Profit'],
                                ['key' => 'status', 'label' => 'Status'],
                                ['key' => 'name', 'label' => 'Action' ],
                            ];
                        @endphp
                        
                        <x-bot-table :headers="$botheader" :rows="$activebottable" striped >
                            @scope('cell_id', $activebot)
                                <div class="flex flex-row items-center gap-2">
                                    {{-- <img src="/images/coins/{{strtolower($withdraw->gateway)}}.png" alt="" class="w-5"/>
                                    <span class="ml-2">{{ strtoupper($withdraw->gateway) }}</span> --}}
                                    <img class="inline" id="trading_image" width="30px" :src="formatimage(currentactivetrade['image_url'])" alt=""> 
                                    <div class="flex flex-col">
                                        <p class="inline font-bold" x-text="currentactivetrade['asset_display_name']"></p>
                                        <p class="px-2 py-1 bg-base-300 rounded text-xs font-bold w-fit border-base-content/10 border" :class="currentactivetrade['action'] == 'BUY' ? 'text-[#20c075]' : 'text-[#ff0000]'" x-text="currentactivetrade['action']"></p>
                                        {{-- <p class="text-gray-200 text-xs"> {{$activebot->name}}</p> --}}
                                    </div>
                                    
                                </div>
                            @endscope

                            @scope('cell_amount', $activebot)
                                <div class="flex flex-row items-center gap-2">
                                    <x-icon name="s-arrow-turn-down-right" class="w-5 h-5 !text-gray-200" />
                                    <div class="flex flex-col">
                                        <p class="inline font-bold" x-text="formatCurrency(tradeamount)"></p>
                                        <p class="text-gray-400 font-bold" x-text="formatCurrency(Number(tradeamount) + Number(amount_earned))" > </p>
                                    </div>
                                    
                                </div>
                            @endscope

                            @scope('cell_amount_earned', $activebot)
                                <div class="flex flex-row items-center gap-2">
                                    <div class="flex flex-col">
                                        <p class="inline font-bold text-sm" x-text="formatCurrency(amount_earned)">  </p>
                                        <p class="text-green-400 font-xs"><x-icon name="o-chevron-up" class="w-4 h-4" />
                                            <span x-text="amount_earned_percentage.toFixed(2)"></span>
                                            %</p>
                                    </div>
                                    
                                </div>
                            @endscope
                            
                            @scope('cell_status', $activebot)
                                <x-badge value="{{ $activebot->status ? 'Active' : 'Ended' }}" class="{{ $activebot->status ? 'badge-soft !text-green-400' : 'badge-error' }} badge-sm" />
                            @endscope

                            @scope('cell_name', $activebot)
                                <x-button label="View Bot" icon="s-eye" class="btn-soft btn-xs [&>.block>svg]:w-3" wire:click="robotdrawer = true"/>
                            @endscope

                            <x-slot:empty>
                                {{-- <img src="/images/notransactions.gif" class="w-30 align-center" /> --}}
                                <x-icon name="o-cube" label="No Withdrawals Yet" />
                            </x-slot:empty>
                        </x-bot-table>
                        @else
                            <div class="flex flex-col justify-center items-center pt-20">
                                <x-icon name="o-wallet" class="text-4xl text-gray-400 w-14" />
                                <p class="text-sm text-center">You don’t have any active trades</p>
                                <x-button label="Start New Trade" @click="$wire.StrategyModal = true" class="btn-primary btn-sm px-6 mt-6"/>
                            </div>
                        @endif

                    </div>

                </x-card>
            </div>
            <div class="ActiveBotMobile mt-4 block lg:hidden" id="ActiveBotMobile">
                <x-card class="!p-0">
                    <div class="Activeheader w-full flex justify-between items-center bg-base-300 p-4 border-b border-base-content/10">
                        <h2 class="text-sm font-semibold">Active Trades</h2>
                        {{-- <x-button label="Share & Earn" icon="s-share" class="btn-primary btn-xs [&>.block>svg]:w-3" /> --}}

                    </div>
                    <div class="activebotcontainer pt-4 min-h-[70vh]">
                        @if($isActiveTrade)
                        <div class="grid grid-cols-2 gap-3">
                            <div class="col-span-1 bg-base-300 p-3 rounded border-base-content/10 border">
                                <div class="flex flex-col gap-2">
                                    <p class="text-sm font-bold">Profit Margin</p>
                                    <span class="text-xs font-bold">{{ $activebot[0]['min_roi_percentage'] }}% - {{ $activebot[0]['max_roi_percentage'] }}%</span>
                                </div>
                            </div>
                            <div class="col-span-1 bg-base-300 p-3 rounded border-base-content/10 border">
                                <div class="flex flex-col gap-2">
                                    <p class="text-sm font-bold">Trade Fee</p>
                                    <span class="text-xs font-bold text-error">@money($activebot[0]['amount_earned'] * 0.01)</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex mt-2">
                            <div class="bg-base-300 p-3 w-full rounded-md mb-3 border-base-content/10 border" wire:click="robotdrawer = true">
                                <div class="flex w-full text-[#98a4b3] text-xs mb-1 items-center justify-between">
                                    <div class="flex flex-col">
                                        <div class="flex flex-row items-center gap-2">
                                            {{-- <img src="/images/coins/{{strtolower($withdraw->gateway)}}.png" alt="" class="w-5"/>
                                            <span class="ml-2">{{ strtoupper($withdraw->gateway) }}</span> --}}
                                            <img class="inline" id="trading_image" width="30px" :src="formatimage(currentactivetrade['image_url'])" alt=""> 
                                            <div class="flex flex-col">
                                                <p class="inline font-bold" x-text="currentactivetrade['asset_display_name']"></p>
                                                <p class="px-2 py-1 bg-base-100 rounded font-bold w-fit border-base-content/10 border" :class="currentactivetrade['action'] == 'BUY' ? 'text-[#20c075]' : 'text-[#ff0000]'" x-text="currentactivetrade['action']"></p>
                                                {{-- <p class="text-gray-200 text-xs"> {{$activebot[0]['name']}}</p> --}}
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-end gap-1">
                                        <x-icon name="c-chevron-right" class="w-8 h-8" />
                                    </div>
                                </div>
                                <x-card class="!p-3 mt-2">
                                    <div class="flex justify-between items-center">
                                        <div class="flex flex-col">
                                            <span>Investment</span>
                                            <span class="font-bold">@money($activebot[0]['amount'])</span>
                                        </div>
                                        <div class="flex flex-col items-end gap-1">
                                            <span class="item-end font-bold text-lg">Profit <span class="text-[#20c075] text-sm font-bold">+@money($activebot[0]['amount_earned'])</span></span>
                                            <span class="text-green-500 text-sm"> <x-icon name="o-chevron-up" class="w-4 h-4" />{{ number_format(($activebot[0]['amount_earned'] / $activebot[0]['amount']) * 100, 2) }}%</span>
                                        </div>
                                    </div>
                                </x-card>
                            </div>
                        </div>
                        @else
                            <div class="flex flex-col justify-center items-center pt-20">
                                <x-icon name="o-wallet" class="text-4xl text-gray-400 w-14" />
                                <p class="text-sm text-center">You don’t have any active trades</p>
                                <x-button label="Start New Trade" @click="$wire.StrategyModal = true" class="btn-primary btn-sm px-6 mt-6"/>
                            </div>
                        @endif
                    </div>

                </x-card>
            </div>
        </div>
        <div class="col hidden md:block" id="BotStrategyCoverdesktop">
            <x-card class="!p-2" title="Strategy" subtitle="Select a strategy that matches your capital and let our AI bot work for you." separator progress-indicator>
                    
                <x-tabs
                    wire:model="strategytab"
                    active-class="bg-primary rounded-lg !text-white"
                    label-class="font-semibold !h-auto !py-1 w-[50%]"
                    label-div-class="bg-primary/10 rounded-lg w-full p-1"
                >
                    <x-tab name="spot-strategy" label="AI Strategies" icon="s-square-3-stack-3d">
                        <div class="flex flex-col gap-4">
                            @php 
                                $planid = 0;
                            @endphp
                            @forelse ($strategies as $strategy )
                                @if($strategy['risk_type'] != "HOT")
                                    <div class="flex-1 md:flex-none relative cursor-pointerd" @click="selectedStrategy = @js($strategy); $wire.StrategyModal = false; $wire.robotdrawer = true; $wire.selectStrategy();">
                                        <div class="flex gap-4 items-center border px-3 py-3 bg-base-300 rounded-md ] hover:border-primary border-base-content/10 cursor-pointer" >
                                            <div class="flex-1">
                                                <div class="flex flex-row items-center gap-2 pb-2">
                                                    @if($planid == 0)
                                                    <x-hugeicons-stack-star class="bg-primary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 1)
                                                    <x-hugeicons-chart-bar-line class="bg-secondary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 2)
                                                    <x-hugeicons-chart-line-data-01 class="bg-info text-white rounded-md p-2 w-9 h-9" />
                                                    @else
                                                    <x-hugeicons-chart-minimum class="bg-warning text-white rounded-md p-2 w-9 h-9" />
                                                    @endif
        
                                                    @php
                                                        $planid++;
                                                    @endphp
                                                    <h2 class="font-bold mb-1" x-text="'{{ $strategy['name'] }}'"></h2>
                                                    @if($planid === 2)
                                                        <x-badge value="Popular" class="badge-success badge-sm" />
                                                    @endif
                                                </div>
                                                
                                                
                                                <p class="text-xs mb-1">
                                                    <x-icon name="s-banknotes" class="w-4"/> Profit Range: <span x-text="'{{ $strategy['min_roi_percentage'] }}'"></span>% to <span x-text="'{{ $strategy['max_roi_percentage'] }}'"></span>% in  <span x-text="'{{ $strategy['plan_duration'] }}'"></span>hrs
                                                </p>
                                                <p class="text-xs">
                                                    <x-icon name="s-currency-dollar" class="w-4"/> Minimum Amount: At least <span x-text="'@money($strategy['min_amount'])'"></span></p>
                                            </div>
                                            <div class="flex-none w-4 justify-self-end">
                                                <x-icon name="o-chevron-right" class="text-lg"/>
                                            </div>
                                        </div>
                                    </div> 
                                @endif
                            @empty
                                <div class="flex flex-col justify-center items-center">
                                    <x-icon name="o-exclamation-triangle" class="text-4xl text-primary" />
                                    <p class="text-sm text-center">No strategies available</p>
                                </div>
                            @endforelse
                        </div>
                    </x-tab>
                    <x-tab name="hot-strategy" label="Hot Deals" icon="o-sparkles">
                        {{-- <div class="flex flex-col gap-4">
                            @php 
                                $planid = 0;
                            @endphp
                            @forelse ($strategies as $strategy )
                                @if($strategy['risk_type'] === "HOT")
                                    <div class="flex-1 md:flex-none relative cursor-pointerd" @click="selectedStrategy = @js($strategy); $wire.StrategyModal = false; $wire.robotdrawer = true; $wire.selectStrategy();">
                                        <div class="flex gap-4 items-center border px-3 py-3 bg-base-300 rounded-md hover:border-primary border-base-content/10" >
                                            <div class="flex-1">
                                                <div class="flex flex-row items-center gap-2 pb-2">
                                                    @if($planid === 0)
                                                    <x-hugeicons-stack-star class="bg-primary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 1)
                                                    <x-hugeicons-chart-bar-line class="bg-secondary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 2)
                                                    <x-hugeicons-chart-line-data-01 class="bg-info text-white rounded-md p-2 w-9 h-9" />
                                                    @else
                                                        <x-hugeicons-chart-minimum class="bg-warning text-white rounded-md p-2 w-9 h-9" />
                                                    @endif
        
                                                    @php
                                                        $planid++;
                                                    @endphp
                                                    <h2 class="font-bold mb-1" x-text="'{{ $strategy['name'] }}'"></h2>
                                                    @if($planid === 2)
                                                        <x-badge value="Popular" class="badge-success badge-sm" />
                                                    @endif
                                                </div>
                                                
                                                <p class="text-xs mb-1">
                                                    <x-icon name="s-banknotes" class="w-4"/> Profit Range: <span x-text="'{{ $strategy['min_roi_percentage'] }}'"></span>% to <span x-text="'{{ $strategy['max_roi_percentage'] }}'"></span>% in  <span x-text="'{{ $strategy['plan_duration'] }}'"></span>hrs
                                                </p>
                                                <p class="text-xs">
                                                    <x-icon name="s-currency-dollar" class="w-4"/> Minimum Amount: At least <span x-text="'@money($strategy['min_amount'])'"></span></p>
                                            </div>
                                            <div class="flex-none w-4 justify-self-end">
                                                <x-icon name="o-chevron-right" class="text-lg"/>
                                            </div>
                                        </div>
                                    </div> 
                                @endif
                            @empty
                                <div class="flex flex-col justify-center items-center">
                                    <x-icon name="o-exclamation-triangle" class="text-4xl text-primary" />
                                    <p class="text-sm text-center">No strategies available</p>
                                </div>
                            @endforelse
                            @if($planid === 0)
                                <div class="flex flex-col justify-center items-center">
                                    <x-icon name="o-exclamation-triangle" class="text-4xl text-primary w-10" />
                                    <p class="text-lg text-center">No Hot Deals yet , check back later</p>
                                </div>
                            @endif
                        </div> --}}
                        <div class="w-full p-6 mb-2 bg-base-100 rounded-lg shadow-md">
                            <div class="inline-flex items-center bg-lime-400 text-black font-semibold text-xs px-2 py-1 rounded-md mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                HOT DEAL
                            </div>

                            <h2 class="text-2xl font-bold leading-snug mb-4">
                                Enjoy a <span class="text-primary font-semibold">50%</span> Deposit Bonus with {{ strtoupper(config('app.name')) }}
                            </h2>
                            <h5 class="text-sm font-bold leading-snug mb-4">
                                Fund your account with <span class="text-primary font-semibold">$5,000 </span> or more and receive a <span class="text-primary font-semibold">50% bonus</span> instantly to boost your trading power.
                            </h5>

                            <ul class="space-y-2 text-sm">
                                <li class="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    No terms and conditions
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Instant Bonus
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Tradeable
                                </li>
                            </ul>
                        </div>

                        <div class="flex flex-col gap-4"> 
                            <div class="timer_cover flex justify-center w-auto">
                                <div x-data="hotcountdownTimer()" x-init="init()" class="timer_cover flex justify-center w-auto">
                                    <div class="timer_counter flex-none">
                                        <div class="grid grid-flow-col gap-3 text-center auto-cols-max">

                                        <template x-for="unit in ['days', 'hours', 'minutes', 'seconds']">
                                            <div class="flex flex-col p-2 bg-base-100 rounded-box border-base-content/10 border">
                                            <span class="countdown text-3xl">
                                                <span :style="'--value:' + $data[unit]" x-text="$data[unit]"></span>
                                            </span>
                                            <span class="text-xs" x-text="unit"></span>
                                            </div>
                                        </template>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="flex flex-row gap-2 w-full mt-3">
                            <x-button label="Deposit Now" class="rounded-lg flex-1 btn-primary btn-lg" @click="loading = true; $wire.StrategyModal = false; $wire.openDepositModal();" />
                            {{-- <x-button label="Cancel" icon="o-x-mark" class="flex-1 btn-secondary btn-sm" wire:click="$set('LiveModeModal', false)" /> --}}
                        </div>
                    </x-tab>
                </x-tabs>
                   
                
                {{-- <x-button label="Save" wire:click="save" /> --}}
            </x-card>

            {{-- <x-card class="mt-2 bg-base-300 !p-2">
                <div class="bg-base-300 top-4 rounded-lg w-full max-h-[30vh] overflow-y-scroll scroll-0">
                    @foreach ($this->getTradingPairData() as $pair)
                        <div wire:click="selectPair('{{$pair->symbol}}')" x-on:click="open = false"
                            class="flex items-center mb-2 hover:bg-primary p-3 rounded-lg space-x-3 cursor-pointer {{ $selectedPair->symbol === $pair->symbol ? 'bg-primary' : '' }}">
                            <div class="flex-none text-end">
                                @if ($pair->assetType === 'currency')
                                    <img src="https://olympbot.com/icons/assets/{{ $pair->image }}">
                                @else
                                    <img width="24" height="24" src="/images/coins/{{ $pair->image }}">
                                @endif
                            </div>
                            <div class="flex-1">
                                <span class="text-sm font-bold">{{ $pair->name }}</span>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-white bg-[#526058] py-1 px-2 border-[#146234] text-xs rounded-lg w-fit" x-text="['Long', 'Sideways'][Math.floor(Math.random() * 2)]"></p>
                            </div>
                            <div class="flex-none text-end">
                                <div
                                    class="w-12 h-6 bg-[#28BD66] border border-[#146234] text-xs rounded-lg content-center text-center">
                                    {{ $pair->percentage }}
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </x-card> --}}
        </div>
        @else
        <div class="col" id="BotStrategyCover">
            <x-card class="!p-2" title="Strategy" subtitle="Select a strategy that matches your capital and let our AI bot work for you." separator progress-indicator>
                <x-tabs
                    wire:model="strategytab"
                    active-class="bg-primary rounded-lg !text-white"
                    label-class="font-semibold !h-auto !py-1 w-[50%]"
                    label-div-class="bg-primary/10 rounded-lg w-full p-1"
                >
                    <x-tab name="spot-strategy" label="AI Strategies" icon="s-square-3-stack-3d">
                        <div class="flex flex-col gap-4">
                            @php 
                                $planid = 0;
                            @endphp
                            @forelse ($strategies as $strategy )
                                @if($strategy['risk_type'] != "HOT")
                                    <div class="flex-1 md:flex-none relative cursor-pointerd" @click="selectedStrategy = @js($strategy); $wire.StrategyModal = false; $wire.robotdrawer = true; $wire.selectStrategy();">
                                        <div class="flex gap-4 items-center border px-3 py-3 bg-base-300 rounded-md hover:border-primary border-base-content/10" >
                                            <div class="flex-1">
                                                <div class="flex flex-row items-center gap-2 pb-2">
                                                    @if($planid === 0)
                                                    <x-hugeicons-stack-star class="bg-primary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 1)
                                                    <x-hugeicons-chart-bar-line class="bg-secondary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 2)
                                                    <x-hugeicons-chart-line-data-01 class="bg-info text-white rounded-md p-2 w-9 h-9" />
                                                    @else
                                                        <x-hugeicons-chart-minimum class="bg-warning text-white rounded-md p-2 w-9 h-9" />
                                                    @endif
        
                                                    @php
                                                        $planid++;
                                                    @endphp
                                                    <h2 class="font-bold mb-1" x-text="'{{ $strategy['name'] }}'"></h2>
                                                    @if($planid === 2)
                                                        <x-badge value="Popular" class="badge-success badge-sm" />
                                                    @endif
                                                </div>
                                                
                                                <p class="text-xs mb-1">
                                                    <x-icon name="s-banknotes" class="w-4"/> Profit Range: <span x-text="'{{ $strategy['min_roi_percentage'] }}'"></span>% to <span x-text="'{{ $strategy['max_roi_percentage'] }}'"></span>% in  <span x-text="'{{ $strategy['plan_duration'] }}'"></span>hrs
                                                </p>
                                                <p class="text-xs">
                                                    <x-icon name="s-currency-dollar" class="w-4"/> Minimum Amount: At least <span x-text="'@money($strategy['min_amount'])'"></span></p>
                                            </div>
                                            <div class="flex-none w-4 justify-self-end">
                                                <x-icon name="o-chevron-right" class="text-lg"/>
                                            </div>
                                        </div>
                                    </div> 
                                @endif
                            @empty
                                <div class="flex flex-col justify-center items-center">
                                    <x-icon name="o-exclamation-triangle" class="text-4xl text-primary" />
                                    <p class="text-sm text-center">No strategies available</p>
                                </div>
                            @endforelse
                        </div>
                    </x-tab>
                    <x-tab name="hot-strategy" label="Hot Deals" icon="o-sparkles">
                        {{-- <div class="flex flex-col gap-4">
                            @php 
                                $planid = 0;
                            @endphp
                            @forelse ($strategies as $strategy )
                                @if($strategy['risk_type'] === "HOT")
                                    <div class="flex-1 md:flex-none relative cursor-pointerd" @click="selectedStrategy = @js($strategy); $wire.StrategyModal = false; $wire.robotdrawer = true; $wire.selectStrategy();">
                                        <div class="flex gap-4 items-center border px-3 py-3 bg-base-300 rounded-md hover:border-primary border-base-content/10 ]" >
                                            <div class="flex-1">
                                                <div class="flex flex-row items-center gap-2 pb-2">
                                                    @if($planid === 0)
                                                    <x-hugeicons-stack-star class="bg-primary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 1)
                                                    <x-hugeicons-chart-bar-line class="bg-secondary text-white rounded-md p-2 w-9 h-9"/>
                                                    @elseif ($planid === 2)
                                                    <x-hugeicons-chart-line-data-01 class="bg-info text-white rounded-md p-2 w-9 h-9" />
                                                    @else
                                                        <x-hugeicons-chart-minimum class="bg-warning text-white rounded-md p-2 w-9 h-9" />
                                                    @endif
        
                                                    @php
                                                        $planid++;
                                                    @endphp
                                                    <h2 class="font-bold mb-1" x-text="'{{ $strategy['name'] }}'"></h2>
                                                    @if($planid === 2)
                                                        <x-badge value="Popular" class="badge-success badge-sm" />
                                                    @endif
                                                </div>
                                                
                                                <p class="text-xs mb-1">
                                                    <x-icon name="s-banknotes" class="w-4"/> Profit Range: <span x-text="'{{ $strategy['min_roi_percentage'] }}'"></span>% to <span x-text="'{{ $strategy['max_roi_percentage'] }}'"></span>% in  <span x-text="'{{ $strategy['plan_duration'] }}'"></span>hrs
                                                </p>
                                                <p class="text-xs">
                                                    <x-icon name="s-currency-dollar" class="w-4"/> Minimum Amount: At least <span x-text="'@money($strategy['min_amount'])'"></span></p>
                                            </div>
                                            <div class="flex-none w-4 justify-self-end">
                                                <x-icon name="o-chevron-right" class="text-lg"/>
                                            </div>
                                        </div>
                                    </div> 
                                @endif
                            @empty
                                <div class="flex flex-col justify-center items-center">
                                    <x-icon name="o-exclamation-triangle" class="text-4xl text-primary" />
                                    <p class="text-sm text-center">No strategies available</p>
                                </div>
                            @endforelse
                            @if($planid === 0)
                                <div class="flex flex-col justify-center items-center">
                                    <x-icon name="o-exclamation-triangle" class="text-4xl text-primary w-10" />
                                    <p class="text-lg text-center">No Hot Deals yet , check back later</p>
                                </div>
                            @endif
                        </div> --}}
                        <div class="w-full p-6 mb-2 bg-base-100 rounded-lg shadow-md">
                            <div class="inline-flex items-center bg-lime-400 text-black font-semibold text-xs px-2 py-1 rounded-md mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                HOT DEAL
                            </div>

                            <h2 class="text-2xl font-bold leading-snug mb-4">
                                Enjoy a <span class="text-primary font-semibold">50%</span> Deposit Bonus with {{ strtoupper(config('app.name')) }}
                            </h2>
                            <h5 class="text-sm font-bold leading-snug mb-4">
                            Fund your account with <span class="text-primary font-semibold">$5,000 </span> or more and receive a <span class="text-primary font-semibold">50% bonus</span> instantly to boost your trading power.
                            </h5>
                            
                            

                            <ul class="space-y-2 text-sm">
                                <li class="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    No terms and conditions
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Instant Bonus
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Tradeable
                                </li>
                            </ul>
                        </div>

                        <div class="flex flex-col gap-4"> 
                            <div class="timer_cover flex justify-center w-auto">
                                <div x-data="hotcountdownTimer()" x-init="init()" class="timer_cover flex justify-center w-auto">
                                    <div class="timer_counter flex-none">
                                        <div class="grid grid-flow-col gap-3 text-center auto-cols-max">

                                        <template x-for="unit in ['days', 'hours', 'minutes', 'seconds']">
                                            <div class="flex flex-col p-2 bg-base-100 rounded-box border-base-content/10 border">
                                            <span class="countdown text-3xl">
                                                <span :style="'--value:' + $data[unit]" x-text="$data[unit]"></span>
                                            </span>
                                            <span class="text-xs" x-text="unit"></span>
                                            </div>
                                        </template>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="flex flex-row gap-2 w-full mt-3">
                            <x-button label="Deposit Now" class="rounded-lg flex-1 btn-primary btn-lg" @click="loading = true; $wire.StrategyModal = false; $wire.openDepositModal();" />
                            {{-- <x-button label="Cancel" icon="o-x-mark" class="flex-1 btn-secondary btn-sm" wire:click="$set('LiveModeModal', false)" /> --}}
                        </div>
                        
                    </x-tab>
                </x-tabs>
                   
                
                {{-- <x-button label="Save" wire:click="save" /> --}}
            </x-card>

            {{-- <x-card class="mt-2 !p-2">
                <div class="bg-base-300 top-4 rounded-lg w-full max-h-[30vh] overflow-y-scroll scroll-0">
                    @foreach ($this->getTradingPairData() as $pair)
                        <div wire:click="selectPair('{{$pair->symbol}}')" x-on:click="open = false"
                            class="flex items-center mb-2 hover:bg-primary p-3 rounded-lg space-x-3 cursor-pointer {{ $selectedPair->symbol === $pair->symbol ? 'bg-primary text-white' : '' }}">
                            <div class="flex-none text-end">
                                @if ($pair->assetType === 'currency')
                                    <img src="https://olympbot.com/icons/assets/{{ $pair->image }}">
                                @else
                                    <img width="24" height="24" src="/images/coins/{{ $pair->image }}">
                                @endif
                            </div>
                            <div class="flex-1">
                                <p class="text-xs font-bold">{{ $pair->name }}</p>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-white bg-[#526058] py-1 px-2 border-[#146234] text-xs rounded-lg w-fit" x-text="['Long', 'Sideways'][Math.floor(Math.random() * 2)]"></p>
                            </div>
                            <div class="flex-none text-end">
                                <div
                                    class="w-12 h-6 bg-[#28BD66] border border-[#146234] text-xs rounded-lg content-center text-center">
                                    {{ $pair->percentage }}
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </x-card> --}}
        </div>
        @endif
    </div>
    
    <style>
        .modal-box #how-to-start-earning-real-money .text-xl {
            font-size:1rem!important;
        }
        .strategy-modal form button {
            height:50px!important;
            width:50px!important;
        }
        .strategy-modal form button svg {
            height:30px!important;
            width:30px!important;
        }
    </style>
    {{-- Strategy Modal --}}
    <x-modal without-trap-focus wire:model="StrategyModal" title="Start New Robot" class="backdrop-blur strategy-modal 
        lg:[&>.modal-box]:w-[30%]
        [&>.modal-box]:w-full
        [&>.modal-box]:fixed
        lg:[&>.modal-box]:static
        [&>.modal-box]:bottom-0
        lg:[&>.modal-box]:bottom-20
        [&>.modal-box]:min-h-[80%]
        lg:[&>.modal-box]:min-h-auto
        [&>.modal-box]:rounded-b-none
        lg:[&>.modal-box]:rounded-b-lg
        ">
        <div class="flex flex-row justify-center w-full py-2 z-2">
            <x-button
            class="rounded-xl btn-xs btn-soft bg-[#db36c592] text-white [&>.block>svg]:w-3 shadow-lg" 
            wire:click="howitworksModal = true;">
                <x-icon name="m-tag"  class="w-3"/>
                <span>How it works</span>
                <x-icon name="o-chevron-right" class="w-3"/>
            </x-button>
        </div>
        <x-tabs
            wire:model="strategytab"
            active-class="bg-primary rounded-lg !text-white"
            label-class="font-semibold !h-auto !py-1 w-[50%]"
            label-div-class="bg-primary/10 rounded-lg w-full p-1"
        >
            <x-tab name="spot-strategy" label="AI Strategies" icon="s-square-3-stack-3d">
                <div class="flex flex-col gap-4">
                    @php 
                        $planid = 0;
                    @endphp
                    @forelse ($strategies as $strategy )
                        @if($strategy['risk_type'] != "HOT")
                            <div class="flex-1 md:flex-none relative cursor-pointerd" @click="selectedStrategy = @js($strategy); $wire.StrategyModal = false; $wire.robotdrawer = true; $wire.selectStrategy();">
                                <div class="flex gap-4 items-center border px-3 py-3 bg-base-300 rounded-md  hover:border-primary border-base-content/10 " >
                                    <div class="flex-1">
                                        <div class="flex flex-row items-center gap-2 pb-2">
                                            @if($planid === 0)
                                            <x-hugeicons-stack-star class="bg-primary text-white rounded-md p-2 w-9 h-9"/>
                                            @elseif ($planid === 1)
                                            <x-hugeicons-chart-bar-line class="bg-secondary text-white rounded-md p-2 w-9 h-9"/>
                                            @elseif ($planid === 2)
                                            <x-hugeicons-chart-line-data-01 class="bg-info text-white rounded-md p-2 w-9 h-9" />
                                            @else
                                            <x-hugeicons-chart-minimum class="bg-warning text-white rounded-md p-2 w-9 h-9" />
                                            @endif

                                            @php
                                                $planid++;
                                            @endphp
                                            <h2 class="font-bold mb-1" x-text="'{{ $strategy['name'] }}'"></h2>
                                            @if($planid === 2)
                                                <x-badge value="Popular" class="badge-success badge-sm" />
                                            @endif
                                        </div>
                                        
                                        <p class="text-xs mb-1">
                                            <x-icon name="s-banknotes" class="w-4"/> Profit Range: <span x-text="'{{ $strategy['min_roi_percentage'] }}'"></span>% to <span x-text="'{{ $strategy['max_roi_percentage'] }}'"></span>% in  <span x-text="'{{ $strategy['plan_duration'] }}'"></span>hrs
                                        </p>
                                        <p class="text-xs">
                                            <x-icon name="s-currency-dollar" class="w-4"/> Minimum Amount: At least <span x-text="'@money($strategy['min_amount'])'"></span></p>
                                    </div>
                                    <div class="flex-none w-4 justify-self-end">
                                        <x-icon name="o-chevron-right" class="text-lg"/>
                                    </div>
                                </div>
                            </div> 
                        @endif
                    @empty
                        <div class="flex flex-col justify-center items-center">
                            <x-icon name="o-exclamation-triangle" class="text-4xl text-primary" />
                            <p class="text-sm text-center">No strategies available</p>
                        </div>
                    @endforelse
                </div>
                
            </x-tab>
            <x-tab name="hot-strategy" label="Hot Deals" icon="o-sparkles">
                    {{-- @php 
                        $planid = 0;
                    @endphp
                    @forelse ($strategies as $strategy )
                        @if($strategy['risk_type'] === "HOT")
                            <div class="flex-1 md:flex-none relative cursor-pointerd" @click="selectedStrategy = @js($strategy); $wire.StrategyModal = false; $wire.robotdrawer = true; $wire.selectStrategy();">
                                <div class="flex gap-4 items-center border px-3 py-3 bg-base-300 rounded-md  hover:border-primary border-base-content/10" >
                                    <div class="flex-1">
                                        <div class="flex flex-row items-center gap-2 pb-2">
                                            @if($planid === 0)
                                            <x-hugeicons-stack-star class="bg-primary text-white rounded-md p-2 w-9 h-9"/>
                                            @elseif ($planid === 1)
                                            <x-hugeicons-chart-bar-line class="bg-secondary text-white rounded-md p-2 w-9 h-9"/>
                                            @elseif ($planid === 2)
                                            <x-hugeicons-chart-line-data-01 class="bg-info text-white rounded-md p-2 w-9 h-9" />
                                            @else
                                            <x-hugeicons-chart-minimum class="bg-warning text-white rounded-md p-2 w-9 h-9" />
                                            @endif

                                            @php
                                                $planid++;
                                            @endphp
                                            <h2 class="font-bold mb-1" x-text="'{{ $strategy['name'] }}'"></h2>
                                            @if($planid === 2)
                                                <x-badge value="Popular" class="badge-success badge-sm" />
                                            @endif
                                        </div>
                                        
                                        <p class="text-xs mb-1">
                                            <x-icon name="s-banknotes" class="w-4"/> Profit Range: <span x-text="'{{ $strategy['min_roi_percentage'] }}'"></span>% to <span x-text="'{{ $strategy['max_roi_percentage'] }}'"></span>% in  <span x-text="'{{ $strategy['plan_duration'] }}'"></span>hrs
                                        </p>
                                        <p class="text-xs">
                                            <x-icon name="s-currency-dollar" class="w-4"/> Minimum Amount: At least <span x-text="'@money($strategy['min_amount'])'"></span></p>
                                    </div>
                                    <div class="flex-none w-4 justify-self-end">
                                        <x-icon name="o-chevron-right" class="text-lg"/>
                                    </div>
                                </div>
                            </div> 
                        @endif
                    @empty
                        <div class="flex flex-col justify-center items-center">
                            <x-icon name="o-exclamation-triangle" class="text-4xl text-primary" />
                            <p class="text-sm text-center">No strategies available</p>
                        </div>
                    @endforelse
                    @if($planid === 0)
                        <div class="flex flex-col justify-center items-center">
                            <x-icon name="o-exclamation-triangle" class="text-4xl text-primary w-10" />
                            <p class="text-lg text-center">No Hot Deals yet , check back later</p>
                        </div>
                    @endif --}}
                <div class="w-full p-6 mb-2 bg-base-100 rounded-lg shadow-md">
                    <div class="inline-flex items-center bg-lime-400 text-black font-semibold text-xs px-2 py-1 rounded-md mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        HOT DEAL
                    </div>

                    <h2 class="text-2xl font-bold leading-snug mb-4">
                        Enjoy a <span class="text-primary font-semibold">50%</span> Deposit Bonus with {{ strtoupper(config('app.name')) }}
                    </h2>
                    <h5 class="text-sm font-bold leading-snug mb-4">
                        Fund your account with <span class="text-primary font-semibold">$5,000 </span> or more and receive a <span class="text-primary font-semibold">50% bonus</span> instantly to boost your trading power.
                    </h5>

                    <ul class="space-y-2 text-sm">
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            No terms and conditions
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Instant Bonus
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Tradeable
                        </li>
                    </ul>
                </div>

                <div class="flex flex-col gap-4"> 
                    <div class="timer_cover flex justify-center w-auto">
                        <div x-data="hotcountdownTimer()" x-init="init()" class="timer_cover flex justify-center w-auto">
                            <div class="timer_counter flex-none">
                                <div class="grid grid-flow-col gap-3 text-center auto-cols-max">

                                <template x-for="unit in ['days', 'hours', 'minutes', 'seconds']">
                                    <div class="flex flex-col p-2 bg-base-100 rounded-box border-base-content/10 border">
                                    <span class="countdown text-3xl">
                                        <span :style="'--value:' + $data[unit]" x-text="$data[unit]"></span>
                                    </span>
                                    <span class="text-xs" x-text="unit"></span>
                                    </div>
                                </template>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="flex flex-row gap-2 w-full mt-3">
                    <x-button label="Deposit Now" class="rounded-lg flex-1 btn-primary btn-lg" @click="loading = true; $wire.StrategyModal = false; $wire.openDepositModal();" />
                    {{-- <x-button label="Cancel" icon="o-x-mark" class="flex-1 btn-secondary btn-sm" wire:click="$set('LiveModeModal', false)" /> --}}
                </div>
                
            </x-tab>
        </x-tabs>
    </x-modal>

    <style>
        .modal-box #how-to-start-earning-real-money .text-xl {
            font-size:1rem!important;
        }
        .how-it-works-modal button {
            height:50px!important;
            width:50px!important;
        }
        .how-it-works-modal button svg {
            height:30px!important;
            width:30px!important;
        }
    </style>
    {{-- How it works --}}
    <x-modal x-cloak wire:model="howitworksModal" size="!text-sm" title="How it works" class="backdrop-blur-lg how-it-works-modal text-sm 
        lg:[&>.modal-box]:w-[30%]
        [&>.modal-box]:w-full
        [&>.modal-box]:p-5
        [&>.modal-box]:fixed
        lg:[&>.modal-box]:static
        [&>.modal-box]:bottom-0
        lg:[&>.modal-box]:bottom-20
        [&>.modal-box]:h-[85vh]
        lg:[&>.modal-box]:h-[90vh]
        [&>.modal-box]:rounded-b-none
        lg:[&>.modal-box]:rounded-b-lg
        [&>.modal-box]:bg-base-300
        ">
        <div class="flex flex-col justify-center mb-4">
            <br>

            <h6>Below are steps on how you can use the {{ config('app.name') }} robot and make profits.</h6>
            <br>

            <h1><b>How to start the robot?</b></h1>
            <p>
                Step 1:Select a strategy, strategy depends on your trade amount, select the strategy that
                matches your trade amount. </br>
                Step 2:Input a trade amount. </br>
                Step 3: You’re set! Click on start robot, the robot trades for you and accumulates profits every
                5 minutes.
            </p>
            <br>
            <h1><b>Important things to take note!</b></h1>
            <p>
                1.⁠ ⁠Your capital is always returned after every trade.</br>
                2.⁠ ⁠You can choose to stop the robot anytime.</br>
                3.⁠ ⁠The robot accumulates profits every 5 minutes.</br>
                4.⁠ ⁠You don’t have to do anything after starting the robot,the robot automatically trades and
                generates profits for you every 5 minutes until it reach its profit limit.</br>
                5.⁠ ⁠There is Live and Demo accounts, if you are ready to make real profits you can make
                deposits to your live account and use the robot.</br>
                </br>
                You can always contact us if you need further assistance using the {{ config('app.name') }} bot.

            </p>

        </div>
        {{-- <img src="/assets/img/howto.gif" alt="" class="w-full"> --}}
        {{-- <div class="carousel w-full !h-[80vh]">
            <div id="slide1" class="carousel-item relative w-full  h-auto">
                <img
                src="{{ asset('assets/img/slide1.gif') }}"
                class="w-full" />
                <p class="absolute bottom-0 w-full text-white z-10 bg-gradient-to-r from-purple-800 via-pink-500 to-red-500 px-4 py-2 rounded-t-xl shadow-lg transform hover:scale-105 transition-transform duration-300 text-center">🌟 Deposit to Live Account and Unlock New Opportunities! 🌟</p>
                <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" class="btn btn-circle">❮</a>
                <a href="#slide2" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" class="carousel-item relative w-full h-auto">
                <img
                src="{{ asset('assets/img/slide2.gif') }}"
                class="w-full" />
                <p class="absolute bottom-0 w-full text-white z-10 bg-gradient-to-r from-purple-800 via-pink-500 to-red-500 px-4 py-2 rounded-t-xl shadow-lg transform hover:scale-105 transition-transform duration-300 text-center">Activate the robot to start generating profits every 5 minutes.</p>
                <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" class="btn btn-circle">❮</a>
                <a href="#slide3" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" class="carousel-item relative w-full h-auto">
                <img
                src="{{ asset('assets/img/slide3.gif') }}"
                class="w-full" />
                <p class="absolute bottom-0 w-full text-white z-10 bg-gradient-to-r from-purple-800 via-pink-500 to-red-500 px-4 py-2 rounded-t-xl shadow-lg transform hover:scale-105 transition-transform duration-300 text-center">Withdraw your funds after the end of each trade.</p>
                <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" class="btn btn-circle">❮</a>
                <a href="#slide4" class="btn btn-circle">❯</a>
                </div>
            </div>
        </div>  --}}
    </x-modal>

    
     
    {{-- Robot Drawer --}}
    <x-drawer wire:model="robotdrawer" class="w-full lg:w-1/3 !p-0 !bg-base-300 h-auto sticky bottom-0 inset-x-0 min-h-screen flex flex-col " style="bottom: env(safe-area-inset-bottom);" right>
        <x-header title="{{ $isActiveTrade ? 'Active' : 'Setup' }} Robot" separator class="!mb-0 px-4 pt-4 sticky top-0 z-50 bg-base-300" size="text-lg">
            <x-slot:actions>
                <x-icon name="m-x-mark" class="text-lg cursor-pointer" wire:click="robotdrawer = false"  />
                {{-- <x-button icon="m-x-mark" class="bg-none btn-sm" wire:click="robotdrawer = false" /> --}}
            </x-slot:actions>
        </x-header>
        <div class="px-4 pb-4 robot-container" >
            <livewire:user.drawers.robot  key="robotdrawer"/>
        </div>
    </x-drawer>
</div>

@script
<script>
    window.hotcountdownTimer = function () {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      interval: null,
      targetKey: 'countdown_target_time1',
      durationInDays: 10,

      init() {
        let stored = localStorage.getItem(this.targetKey);
        let now = new Date();

        // If no target time or expired, set a new target time
        if (!stored || new Date(stored) <= now) {
          let newTarget = new Date(now.getTime() + this.durationInDays * 24 * 60 * 60 * 1000);
          localStorage.setItem(this.targetKey, newTarget.toISOString());
        }

        this.startCountdown();
      },

      startCountdown() {
        this.interval = setInterval(() => {
          let target = new Date(localStorage.getItem(this.targetKey));
          let now = new Date();
          let diff = target - now;

          if (diff <= 0) {
            // Reset for next cycle
            let newTarget = new Date(now.getTime() + this.durationInDays * 24 * 60 * 60 * 1000);
            localStorage.setItem(this.targetKey, newTarget.toISOString());
            return;
          }

          let secondsTotal = Math.floor(diff / 1000);
          let days = Math.floor(secondsTotal / (3600 * 24));
          let hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
          let minutes = Math.floor((secondsTotal % 3600) / 60);
          let seconds = secondsTotal % 60;

          this.days = String(days).padStart(2, '0');
          this.hours = String(hours).padStart(2, '0');
          this.minutes = String(minutes).padStart(2, '0');
          this.seconds = String(seconds).padStart(2, '0');
        }, 1000);
      }
    }
  }
</script>
@endscript
