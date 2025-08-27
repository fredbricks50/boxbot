<?php

use Livewire\Volt\Component;
use Livewire\Attributes\On;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

use Mary\Traits\Toast;

use App\Models\Trade;
use App\Models\tradingbot;
use App\Models\User;
use App\Models\plans;
use App\Models\deposit;

new class extends Component {
    use Toast;
    //modals
    public bool $strategymodal = false;
    public bool $StopRobotModal = false;
    public bool $chartModal = false;
    //get user
    public array $user;
    public array $selectedStrategy = [];
    public bool $LiveModeModal = false;

    //form data
    public string $amount;
    public float $userlivebalance ;
    public float $userdemobalance;
    public string $planduration = '24 Hours';
    public float $walletbalance ;

    //Get details
    public bool $isActiveTrade = false;

    public array $activebot = [];
    public array $activebottrades = [];

    public int $currenttradeposition = 0;
    public array $currentactivetrade = [];
    public $currenttradepos ;
    public $currentprofit = 0;
    public $accounttype;


    public int $mode = 0;

    //get strategies
    public array $strategies;

    public $selectedPair;

    public array $myChart = [];

    public $profittopup = 0;

    //watch for mode property change and get the session account type to demo if false or live if true and refreshing the page
    public function updatedAccounttype()
    {
        if($this->accounttype === "0" || $this->accounttype === 0){
            // dd('Demo Mode');
            //update the user mode column to 0
            User::where('id', Auth::User()->id)->update(['mode' => 0]);
            $this->user = User::where('id', Auth::User()->id)->first()->toArray();
            $this->mode = $this->user['mode'] === 0 || $this->user['mode'] === "0" ? false : true;
            $this->walletbalance = auth()->user()->demo_balance;
            $this->error(
                'Switched to Demo Mode',
                timeout: 3000,
                position: 'toast-top toast-end'
            );
        }else{
            if(!deposit::where('user_id', Auth::User()->id)->where('deposit_status', 1)->exists()){
                $this->mode = false;
                $this->accounttype = 0;
                $this->LiveModeModal = true;
            }else{

                //update the user mode column to 1
                User::where('id', Auth::User()->id)->update(['mode' => 1]);
                $this->user = User::where('id', Auth::User()->id)->first()->toArray();
                $this->mode = $this->user['mode'] === 0 || $this->user['mode'] === "0"  ? false : true;
                $this->walletbalance = auth()->user()->balance;
                $this->success(
                    'Switched to Live Mode',
                    timeout: 3000,
                    position: 'toast-top toast-end'
                );
            }
            
        }
        $this->dispatch('modereset');
        $this->dispatch('robotmodereset');
    }

    public function openDepositModal()
    {
        $this->dispatch('open-deposit-modal');
        // $this->dispatch('openlivemodal');

    }



    #[On('selected-strategy')] 
    public function strategySelected($strategy)
    {
        $this->selectedStrategy = $strategy;
    }

    public function mount()
    {
        //setting up strategy details 
        $this->user = User::where('id', Auth::User()->id)->first()->toArray();

        $this->selectedStrategy = plans::query()->orderBy('order','asc')->get()->first()->toArray();
        $this->strategies = plans::query()->orderBy('order','asc')->get()->toArray();

        $this->userlivebalance = floatval($this->user['balance']);
        $this->userdemobalance = floatval($this->user['demo_balance']);

        $this->mode = $this->user['mode'];
        //end setting up details wire:
        $this->accounttype = $this->mode;

        //getting active trade 
        if($this->mode === 1 || $this->mode === "1" || $this->mode === true){
            $this->walletbalance = auth()->user()->balance;
        }else {
            $this->walletbalance = auth()->user()->demo_balance;
        }

        $this->activebot = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => Auth::User()->id,
            'tradingbots.status' => 1,])
        ->get()->toArray();


        if(count($this->activebot) > 0){
            $this->isActiveTrade = true;
            $this->activebottrades = json_decode(Trade::where('bot_id', $this->activebot[0]['id'])->get()->toArray()[0]['trades'], true);

           

            //get currenttradeposition
            $duration_max_minutes = $this->activebot[0]['plan_duration'] * 60;
            $duration_segment_minutes = $duration_max_minutes / $this->activebot[0]['duration']; //this should give 288 minutes for 24 hours and 5minutes
            
            $startduration = strtotime($this->activebot[0]['duration_start']);
            $duration_start = Carbon::createFromFormat('Y-m-d H:i:s', date("Y-m-d H:i:s", $startduration));

            $currentDateTime = Carbon::now();

            $totalDurationMin = $duration_start->diffInMinutes($currentDateTime);

            // $this->js("console.log('start time min {$duration_start1}')");
           

            for ($i = 0; $i < count($this->activebottrades); $i++) {
                $timerEndsAt = $this->activebottrades[$i]['timer_ends_at'];
                // $timerEndsAt = Carbon::createFromFormatMs('Y-m-d H:i:s', $timerEndsAt)->valueOf();
                $now = Carbon::now()->valueOf();
                
                if ($now <= $timerEndsAt) {
                    $this->currenttradepos = $this->activebottrades[$i];
                    break; 
                }else{
                    
                    $this->currentprofit = $this->activebottrades[$i]['profit'] + $this->currentprofit;
                }
                
            }



            //get currenttrade 
            $this->currentactivetrade = $this->activebottrades[$this->currenttradepos['trade_position']];

            $this->selectedPair = $this->currenttradepos['asset_name'];

            //set chat data wire
            $this->myChart = [
                'type' => 'doughnut',
                'data' => [
                    'labels' => ['Invested', 'Gross'],
                    'datasets' => [
                        [
                            'label' => '',
                            'data' => [$this->activebot[0]['amount'],$this->activebot[0]['amount'] + $this->activebot[0]['amount_earned']],
                            'backgroundColor' => [
                                'rgb(255, 99, 132)',
                                'rgb(32, 192, 117)',
                            ],
                            'hoverOffset' => 4,
                            'borderWidth' => 0,
                            'cutout' => '90%',
                        ]
                    ]
                ],
                'options' => [
                    'plugins' => [
                        'legend' => [
                            'labels' => [
                                'color' => 'white', // <-- sets the text color of the legend
                            ]
                        ]
                    ]
                ]
            ];


            $duration_min = $this->activebot[0]['plan_duration'] * 60;
            $duration_in_5 = $duration_min / 5;
            

            $percentage_in_5 =$this->activebot[0]['max_roi_percentage'] / $duration_in_5;

            $totalDurationMin = $duration_start->diffInMinutes($currentDateTime);
            // dd($totalDurationMin,$duration_start,$currentDateTime);

            // $amount_earned = (($percentage_in_5 * floor($totalDurationMin/5) )/100)* $this->activebot[0]['amount'];

            // $this->profittopup = $amount_earned;
        }

        // dd($this->activebot);

        


    }

    protected function rules()
    {
        return [
            'amount' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) {
                    if ($value > $this->walletbalance) {
                        $fail('The amount exceeds your wallet balance.');
                    }
                },
                function ($attribute, $value, $fail) {
                    if ($value < $this->selectedStrategy['min_amount']) {
                        $fail('The Selected Strategy requires amount greater than or equal to ' . $this->formatCurrency($this->selectedStrategy['min_amount']));
                    }
                },
            ]
        ];
    }

    protected function messages(){
        return [
            'amount.required' => 'Amount is required',
            'amount.numeric' => 'Amount must be a number',
        ];
    }

    //write a public function to convert a string to a number and then to a money format
    public function formatCurrency($value) {
        return '$' . number_format($value, 2);
    }

    #[On('modereset')] 
    public function modereset()
    {
        $this->user = User::where('id', Auth::User()->id)->first()->toArray();
        $this->userlivebalance = floatval($this->user['balance']);
        $this->userdemobalance = floatval($this->user['demo_balance']);
        $this->mode = $this->user['mode'];
        $this->accounttype = $this->mode;
        // $this->dispatch('$refresh');
        $this->dispatch('resetform');
    }

    public function startrobot(){
        $this->validate();
        $duration_start = now()->format('Y-m-d H:i:s');
        $duration_end = now()->addHours((int)$this->selectedStrategy['plan_duration'])->format('Y-m-d H:i:s');

        // $duration_start = date("Y-m-d H:i:s");
        // $d=strtotime('+'.$this->selectedStrategy['plan_duration'].' Hours');
        // $duration_end = date("Y-m-d H:i:s", $d);

        $tradeinterval = 5;
        $randomval = 'no';
        $tradingbotdetails = [
            'user_id'=> Auth::User()->id,
            'amount'=> $this->amount,
            'amount_earned'=> 0,
            'duration'=> $tradeinterval,
            'duration_start'=> $duration_start,
            'duration_end'=> $duration_end,
            'strategy_id'=> $this->selectedStrategy['id'],
            'profit_limit_exceed'=> $randomval,
            'account_type' => $this->mode === 1 || $this->mode === "1" || $this->mode === true ? 'live' : 'demo',
            'status'=>1,
        ];
        
        //Setup the trading bot trades 
        $tradeArray = $this->generateTrades($tradeinterval, $this->amount, $this->selectedStrategy['max_roi_percentage'])['tradesArray'];
        $total_amount_earned = $this->generateTrades($tradeinterval, $this->amount, $this->selectedStrategy['max_roi_percentage'])['total_amount_earned'];
            
        
        if(Auth::User()->status === "1" || Auth::user()->status === 1){
            //update userbalance
            $new_balance = $this->mode === 1 || $this->mode === "1" || $this->mode === true ? Auth::User()->balance - $this->amount : Auth::User()->demo_balance - $this->amount;
            $updatebalance = $this->mode === 1 || $this->mode === "1" || $this->mode === true ?'balance':'demo_balance';

            if($new_balance >= 0){
                $balance_updated = User::where('id',Auth::User()->id)->update([$updatebalance=> $new_balance]);

                $trading = tradingbot::create($tradingbotdetails);

                $tradeEntry = Trade::create([
                    'user_id' => auth()->user()->id,
                    'bot_id' => $trading->id,
                    'total_amount_earned' => $total_amount_earned,
                    'trades' => json_encode($tradeArray)
                ]);
            }
            

            

            //create robot trades
            
            
        }else{
            $this->addError('form', 'Something went wrong, please try again.');
            $this->error(
                'Unable to trade now, Please contact support to learn more',
                timeout: 3000,
                position: 'toast-top toast-center'
            );
        }

        $this->dispatch('robotstarted');

        
    }

    private function generateTrades($duration, $amount, $max_roi)
    {
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
        $duration_end = Carbon::createFromFormat('Y-m-d H:i:s', now()->addHours((int)$this->selectedStrategy['plan_duration'])->format('Y-m-d H:i:s')); 

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

    public function StopRobot(){
        $tradingbot = tradingbot::where('id', $this->activebot[0]['id'])->get()->first()->toArray();

        if($tradingbot['account_type']== "live" & $tradingbot['status'] == 1){

            $newuserbalance = Auth::User()->balance + $this->currentprofit + $tradingbot['amount'];
            if ($newuserbalance >= 0) {
                $demobalance_updated = User::where('id',Auth::User()->id)->update(['balance'=> $newuserbalance]);
                $tradingbot_updated = tradingbot::where('id',$this->activebot[0]['id'])->update(['status'=> 0, 'amount_earned'=> $this->currentprofit]);
                //update the close position
                Trade::where('user_id',Auth::User()->id)->where('bot_id',$this->activebot[0]['id'])->update(['stopped_robot_at_position'=> $this->currenttradeposition]);
            }
            

            
        }elseif($tradingbot['account_type']== "demo" & $tradingbot['status'] == 1){

            $newuserdemo_balance = Auth::User()->demo_balance + $this->currentprofit + $tradingbot['amount'];

            if ($newuserdemo_balance >= 0) {
                $demobalance_updated = User::where('id',Auth::User()->id)->update(['demo_balance'=> $newuserdemo_balance]);

                $tradingbot_updated = tradingbot::where('id',$this->activebot[0]['id'])->update(['status'=> 0, 'amount_earned'=> $this->currentprofit]);

                //update the close position
                Trade::where('user_id',Auth::User()->id)->where('bot_id',$this->activebot[0]['id'])->update(['stopped_robot_at_position'=> $this->currenttradeposition]);
            }
        }

        $this->dispatch('robotstopped');
    }

    #[On('robot-stopped-done')] 
    public function robotstoppeddone()
    {
        return $this->redirect('/user/dashboard', navigate: true);
    }

    #[On('robot-started-done')] 
    public function robotstarteddone()
    {
        $this->success(
                'Robot Started Successfully',
                timeout: 3000,
                position: 'toast-top toast-middle'
            );
        return $this->redirect('/user/dashboard', navigate: true);
    }

    public function changeChart($pair)
    {
        $this->selectedPair = $pair;
        // $this->dispatch('$refresh');
        $this->dispatch('reloadchartm');
        
    }

    public function changeChartDesktop($pair)
    {
        
        $this->selectedPair = $pair;
        // $this->dispatch('$refresh');
        $this->dispatch('reload-chart-desktop',selectedpair: $pair);
    }

    public function selectStrategy()
    {
        $this->dispatch('select-strategy');
    }
}; ?>

<div 
    x-data="{ 
                selectedStrategy: $wire.entangle('selectedStrategy').live,
                demobalance: $wire.entangle('userdemobalance').live,
                livebalance: $wire.entangle('userlivebalance').live,
                selectedPair: $wire.entangle('selectedPair').live,
                get avatarUrl() {
                    return this.selectedStrategy.image ? '/images/plans/' + this.selectedStrategy.image : '{{ asset('userassets/icons/strategy-image.svg') }}';
                },
                formatCurrency(value) {
                    const num = parseFloat(value);
                    if (isNaN(num)) {
                        return '$0.00';
                    }
                    return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                },
                stopinprocess:false,
                stoploading:false,                
    }"
    >
    @if(!$isActiveTrade)
        <div 
            x-data="{
                progress: 0,
                startLoading() {
                const interval = setInterval(() => {
                    if (this.progress >= 100) {
                        this.stoploading = true;
                        setTimeout(() => {
                            $dispatch('robot-started-done');
                        }, 1000);
                        clearInterval(interval);
                    } else {
                        this.progress += 1;
                    }
                }, 10);
                }
            }" 
            {{-- x-init="startLoading()" --}}
            x-on:robotstarted.window="
                stopinprocess = true;
                startLoading();
            "
            x-show="stopinprocess"
            class="flex flex-col items-center justify-center"
        >
            <div>
                <div class="flex w-full justify-center mb-5">
                    <x-icon x-show="!stoploading" name="c-minus-circle" class="w-1/4 text-gray-400"/>
                    <x-heroicon-c-check-circle class="w-1/4 text-success" x-show="stoploading"/>
                </div>
                <div class="w-full flex justify-center my-2">
                    <progress 
                        class="progress progress-success w-[70%]" 
                        :value="progress" 
                        max="100"
                    ></progress>
                </div>
                <h1 class="font-bold text-lg text-center" x-show="!stoploading">
                    Robot is opening positons
                </h1>
                <h1 class="font-bold text-lg text-center" x-show="stoploading">
                    Robot Started Successfully
                </h1>
            </div>
        </div>
        <div class="h-auto" x-show="!stopinprocess">
            <x-form wire:submit="startrobot" class="!gap-0">
                <x-errors title="Oops!" icon="o-face-frown" class="py-0 [&>.grip]:gap-0"/>
                <div class="mx-auto w-full">
                    <div class="flex flex-row items-end justify-end">
                        @if($mode === 1)
                            <p class="text-sm font-bold">Live Balance <span x-text="formatCurrency(livebalance)"></span></p>
                        @else
                            <p class="text-sm font-bold">Demo Balance <span x-text="formatCurrency(demobalance)"></span></p>
                        @endif
                    </div>
                    <div class="flex mt-3 space-x-2">
                        <div class="flex-1">
                            <x-input  label="Amount" wire:model="amount" prefix="$" type="number" placeholder="0.00" required class="!input-lg  !input-primary"/>
                        </div>
                        <div class="flex-1">
                            <x-group
                                label="Account"
                                :options="[
                                    ['custom_key' => '1', 'other_name' => 'Live'],
                                    ['custom_key' => '0', 'other_name' => 'Demo']
                                ]"
                                required
                                option-value="custom_key"
                                option-label="other_name"
                                wire:model.live="accounttype"
                                class="[&:checked]:!btn-primary btn-lg w-1/2 text-sm" />
                        </div>
                    </div>
                    <div class="flex mt-3 space-x-2">
                        <div class="flex-1">
                            <x-input label="Duration" icon="o-user" value="{{ $selectedStrategy['plan_duration'] ?? 0 }} Hours" readonly class="!input-mg" />
                        </div>
                        <div class="flex-1 text-center pt-0.5">
                            <label for="exchange" class="text-sm font-bold block my-2">Exchange</label>
                            <div class="w-full text-sm self-center text-center border border-base-content/10 px-4 py-2.5 bg-base-100 rounded-md focus:outline focus:outline-[#28949B]">
                                <img class="inline" src="{{ asset('userassets/icons/binance-logo.svg') }}" alt="binance-logo">
                            </div>
                        </div>
                        <div class="flex-1 text-center pt-0.5">
                            <label for="broker" class="text-sm font-bold block my-2">Broker</label>
                            <div class="w-full text-sm text-center self-center border border-base-content/10 px-4 py-2.5 bg-base-100 rounded-md focus:outline focus:outline-[#28949B]">
                                <img class="inline" src="{{ asset('userassets/icons/fxpro.svg') }}" alt="">
                            </div>
                        </div>
                    </div>
                    {{-- Select strategy --}}
                    <div class="mt-3">
                        <label for="deposit_amount" class="text-xs block mb-3 font-normal">Selected Strategy</label>
                        <div class="flex-1 md:flex-none relative cursor-pointer" @click="loading = true;$wire.selectStrategy();">
                            <div class="flex gap-4 items-center border border-none px-4 py-4 bg-base-100 rounded-md">
                                <div class="flex-1">
                                    <h2 class="font-bold mb-1" x-text="selectedStrategy.name"></h2>
                                    <p class="text-xs mb-1">
                                        <x-icon name="s-banknotes" class="w-4"/> Profit Range: <span x-text="selectedStrategy.min_roi_percentage"></span>% to <span x-text="selectedStrategy.max_roi_percentage"></span>% in  <span x-text="selectedStrategy.plan_duration"></span>hrs</p>
                                    <p class="text-xs">
                                        <x-icon name="s-currency-dollar" class="w-4"/> Minimum Amount: At least <span x-text="formatCurrency(selectedStrategy.min_amount)"></span></p>
                                </div>
                                <div class="flex-none w-4 justify-self-end">
                                    <x-icon name="o-chevron-down" class="text-lg"/>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div class="mt-3">
                        <label for="deposit_amount" class="text-xs block mb-3 font-normal">Powered By</label>
                        <div class="flex mt-3 space-x-2">
                            <div class="flex-1 text-left pt-0.5">
                                <div class="w-full text-sm self-center text-center border border-base-content/10 px-4 py-1 bg-base-100 rounded-md focus:outline focus:outline-[#28949B]">
                                    <img class="inline" src="{{ asset('images/gemini.png') }}" alt="binance-logo">
                                </div>
                            </div>
                            <div class="flex-1 text-left pt-0.5">
                                <div class="w-full text-sm self-center text-center border border-base-content/10 px-4 py-2.5 bg-base-100 rounded-md focus:outline focus:outline-[#28949B]">
                                    <img class="inline" src="{{ asset('images/openainew.png') }}" alt="binance-logo">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="deposit_amount" class="text-xs block mb-3 font-normal">Profit Return</label>
                        <div class="flex items-center space-x-3 border border-base-content/10 px-4 py-4 bg-base-100 rounded-md">
                            <div class="flex-none w-12">
                                <x-icon name="o-rocket-launch" class="text-lg w-full"/>
                            </div>
                            <div class="flex-1">
                                <h2 class="font-bold mb-1">Profit & Capital</h2>
                                <p class="text-xs mb-1"><x-icon name="s-check" class="w-4"/> Profit is made every 5 minutes.</p>
                                <p class="text-xs"><x-icon name="s-check" class="w-4"/>  Capital Returned After Trade: Yes</p>
                            </div>
                        </div>
                    </div>
                </div>
                {{-- <x-slot:actions>
                    <x-button label="Start Trade" class="btn-primary w-full sticky bottom-0" type="submit" spinner="startrobot" />
                </x-slot:actions> --}}
                {{-- @click="stopinprocess = true" --}}
                {{-- <div class="dock !bottom-[env(safe-area-inset-bottom)] fixed p-4 w-full z-50 inset-x-0">
                    <x-button label="Start Robot" class="btn-primary max-w-full sticky bottom-0" type="submit" spinner="startrobot" />
                </div> --}}
                <footer class="sticky bottom-0 py-4 shadow z-50 bg-base-300">
                    <x-button label="Start Robot" class="btn-primary w-full" type="submit" spinner="startrobot" />
                </footer>

            </x-form>

            {{-- Livemode Modal --}}

                <x-modal x-cloak wire:model="LiveModeModal" title="Switch to Live Mode" class=" backdrop-blur-xs 
                    lg:[&>.modal-box]:w-[100%]
                    [&>.modal-box]:w-full
                    [&>.modal-box]:fixed
                    lg:[&>.modal-box]:static
                    [&>.modal-box]:bottom-0
                    lg:[&>.modal-box]:bottom-20
                    [&>.modal-box]:min-h-[70%]
                    lg:[&>.modal-box]:min-h-auto
                    [&>.modal-box]:rounded-b-none
                    lg:[&>.modal-box]:rounded-b-lg
                    ">
                    <div class="flex">
                        <img src="{{ asset('images/livemode.png') }}" class="w-full" alt="">
                    </div>

                    <div class="flex flex-col gap-2 mt-4">
                        <p class="text-xl font-bold text-center">Start trading on Live Account</p>
                        <p class="text-sm text-center font-bold text-gray-400">When you're ready to try making real profits, just switch to a real account. All you need to do is make a deposit to get started</p>
                        <div class="flex flex-row gap-2 w-full">
                            <x-button label="Deposit" class="rounded-lg flex-1 btn-primary btn-lg" @click="loading = true; $wire.LiveModeModal = false; $wire.openDepositModal();" />
                            {{-- <x-button label="Cancel" icon="o-x-mark" class="flex-1 btn-secondary btn-sm" wire:click="$set('LiveModeModal', false)" /> --}}
                        </div>
                    </div>

                
                    
                </x-modal>
            
        </div>
    @else
        <div x-cloak class="w-full">
            {{-- @php(dump($activebottrades[287])). --}}
            <div x-data="countdown()" 
                x-init="
                    start();
                    $watch('currenttradepos',value => { 
                            $dispatch('currenttradeposchange', { tradepos: value })
                        } 
                    )
                    "
               
                >
                {{-- Active Trade drawer detail --}}
                <div class="mx-auto w-full h-auto">
                    <div id="timer_loading" class="text-center my-4" x-show="searchingforsignal">
                        <img src="{{ asset('homeassets/img/searchingsignal.gif') }}" class="w-12 inline object-cover scale-[1.2]" alt=""/>
                        <p class="text-xs font-semibold mt-4">Robot is searching for signals...</p>
                    </div>
                    <div class="flex my-2" x-show="!searchingforsignal">
                        <div class="w-full">
                            <div id="trading-indicator" class="mb-2 w-full">
                                <div class="flex justify-center">
                                    <img src="{{ asset('homeassets/img/robottradingnew.gif') }}" class=" rounded-md inline w-13 object-cover scale-[2.0]" alt="">
                                </div>
                                <div class="text-center mt-2">
                                    <p class="text-xs font-semibold">Robot is now trading...</p>
                                </div>
                            </div>
                            <div class="timer_cover flex justify-center w-auto">
                                <div class="timer_counter flex-none">
                                    <div class="grid grid-flow-col gap-3 text-center auto-cols-max">
                                        <div class="flex flex-col p-2 bg-base-100 rounded-box border-base-content/10 border">
                                            <span class="countdown text-2xl">
                                                <span :style="'--value:'+minutes" aria-live="polite" :aria-label="minutes"><span x-text="minutes"></span></span>
                                            </span>
                                            min
                                        </div> 
                                        <div class="flex flex-col p-2 bg-base-100 rounded-box border-base-content/10 border">
                                            <span class="countdown text-2xl">
                                                <span :style="'--value:'+seconds" aria-live="polite" :aria-label="seconds"><span x-text="seconds"></span></span>
                                            </span>
                                            sec
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex mt-2" x-show="!searchingforsignal">
                        <div class="bg-base-100 p-3 w-full rounded-md mb-3 border-base-content/10 border">
                            <div class="flex w-full text-xs mb-1 items-center justify-between">
                                <div class="flex flex-col">
                                    <div class="flex flex-row items-center gap-2">
                                        {{-- <img src="/images/coins/{{strtolower($withdraw->gateway)}}.png" alt="" class="w-5"/>
                                        <span class="ml-2">{{ strtoupper($withdraw->gateway) }}</span> --}}
                                        <img class="inline" id="trading_image" width="30px" :src="formatimage(currenttradepos.image_url)" alt=""> 
                                        <div class="flex flex-col">
                                            <p class="inline font-bold" x-text="currenttradepos.asset_display_name"></p>
                                            <p class="text-base-content/35 text-xs"> {{$activebot[0]['name']}}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-1">
                                    <span class="item-end font-bold text-sm">{{ ucfirst($activebot[0]['account_type']) }} Account</span>
                                    <p class="px-2 py-1 bg-base-300 rounded font-bold" :class="currenttradepos.action == 'BUY' ? 'text-[#20c075]' : 'text-[#ff0000]'" x-text="currenttradepos.action"></p>
                                </div>
                            </div>
                            <x-card class="!p-3 mt-2 bg-base-300 border-base-content/10 border">
                                <div class="flex justify-between items-center">
                                    <div class="flex flex-col">
                                        <span>Investment</span>
                                        <span class="font-bold">@money($activebot[0]['amount'])</span>
                                    </div>
                                    <div class="flex flex-col items-end gap-1">
                                        <span class="item-end font-bold text-sm">Profit <span class="text-[#20c075] text-sm font-bold" x-text="formatCurrency(amount_earned)"></span></span>
                                        <span class="text-green-500 text-sm"> <x-icon name="o-chevron-up" class="w-4 h-4" />
                                            <span x-text="profitpercent"></span>
                                            %
                                        </span>
                                    </div>
                                </div>
                            </x-card>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="col-span-1 bg-base-100 p-3 rounded-md border-base-content/10 border">
                            <div class="flex flex-col gap-2">
                                <p class="text-sm font-bold">Expected Profit</p>
                                <span class="text-xs font-bold">{{ $activebot[0]['min_roi_percentage'] }}% - {{ $activebot[0]['max_roi_percentage'] }}%</span>
                            </div>
                        </div>
                        <div class="col-span-1 bg-base-100 p-3 rounded-md border-base-content/10 border" >
                            <div class="flex flex-col gap-2">
                                <p class="text-sm font-bold"><span x-text="currenttradepos.type == 'currency' ? 'Broker' : 'Exchange'"></span></p>
                                <img x-show="!searchingforsignal" :src="currenttradepos.type == 'currency' ? '/images/fxpro.svg' : '/images/binancelogo.svg'" class="w-20"/>
                            </div>
                        </div>
                    </div>
        
                    <div class="mt-4 mb-15">

                        {{-- <x-card class="!bg-base-100">
                            <div class="flex py-2 border-b-2 border-b-[#2A2B39]">
                                <div class="flex-1 text-sm ">Account</div>
                                <div class="flex-1 text-end text-sm ">{{ $activebot && $activebot[0]['account_type'] === 'demo' ? 'Demo' : 'Live' }} Account</div>
                            </div>
                            <div class="flex py-2 border-b-2 border-b-[#2A2B39]">
                                <div class="flex-1 text-sm ">Amount</div>
                                <div id="details_amount" class="flex-1 text-end text-sm ">@money($activebot[0]['amount'])</div>
                            </div>
                            <div class="flex py-2 border-b-2 border-b-[#2A2B39]">
                                <div class="flex-1 text-sm ">Strategy</div>
                                <div id="details_strategy" class="flex-1 text-end text-sm ">{{ $activebot[0]['name'] }}</div>
                            </div>
                            <div class="flex py-2 border-b-2 border-b-[#2A2B39]">
                                <div class="flex-1 text-sm ">Profit Limit</div>
                                <div id="details_profit_limit" class="flex-1 text-end text-sm ">{{ $activebot[0]['max_roi_percentage'] }}%</div>
                            </div>
                        </x-card> --}}

                        <div class="!bg-base-100 h-full !p-2 rounded-lg border-base-content/10 border">
                            <div class="flex flex-row h-full w-[100%]">
                                <div class="w-[60%]">
                                    <canvas id="myChart1" height="300"></canvas>
                                   
                                </div>
                                <div class="w-[40%] flex flex-col gap-2">
                                    <div class="col-span-1 bg-base-300 p-3 rounded-md w-full border-base-content/10 border">
                                        <div class="flex flex-col gap-2">
                                            <p class="text-sm font-bold">Positions Opened</p>
                                            <span class="text-xs font-bold">
                                                <span x-text="currenttradepos.trade_position"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-span-1 bg-base-300 p-3 rounded-md w-full border-base-content/10 border">
                                        <div class="flex flex-col gap-2">
                                            <p class="text-sm font-bold">Strategy</p>
                                            <span class="text-xs font-bold">
                                                {{-- <span x-text="currenttradepos.trade_position">{{$activebot[0]['name']}}</span> --}}
                                                <span>{{ ucfirst($activebot[0]['name']) }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-span-1 bg-base-300 p-3 rounded-md w-full border-base-content/10 border">
                                        <div class="flex flex-col gap-2">
                                            <p class="text-sm font-bold">Trade Fee 1%</p>
                                            <span class="text-xs font-bold text-error">-<span x-text="formatCurrency(amount_earned * 0.01)"></span></span>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        
                        
                    </div>
                </div>
                {{-- Stop robot button and chart --}}
                
                {{-- Chart modal --}}
                <x-modal wire:model="chartModal" class="backdrop-blur-xs strategy-modal 
                    lg:[&>.modal-box]:w-[30%]
                    [&>.modal-box]:w-full
                    [&>.modal-box]:!p-0
                    [&>.modal-box]:fixed
                    lg:[&>.modal-box]:static
                    [&>.modal-box]:bottom-0
                    lg:[&>.modal-box]:bottom-20
                    [&>.modal-box]:min-h-[90%]
                    lg:[&>.modal-box]:min-h-auto
                    [&>.modal-box]:rounded-b-none
                    lg:[&>.modal-box]:rounded-b-lg
                    ">
                    <p class="w-full p-3 text-lg font-bold">Trade Chart</p>
                    <div
                        x-data="{ 
                            symbol: $wire.entangle('selectedPair').live,
                            chartloading: false,
                            loadChart() {
                                    const containerId = 'tv_chart_container_mobile';
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
                                            container_id: containerId
                                        });
                                    }, 100); 
                                }
                            }"
                        x-init="
                            loadChart()
                        "
                        x-on:reloadchartm.window="
                            loadChart();
                        " 
                        class="relative h-[82vh] w-full">
                        <div x-show="chartloading" x-cloak class="w-full h-full absolute inset-0 z-0 bg-gray-900/70 flex items-center justify-center">
                            <img src="/images/chartloading.svg" class="w-full h-full object-cover" alt="" >
                            {{-- <div class="text-white text-lg animate-pulse">Loading chart...</div> --}}
                        </div>
                        <div id="tv_chart_container_mobile" style="height:100%;width:100%"></div>
                    </div>
                </x-modal>

                {{-- Stop Robot Modal --}}
                <x-modal wire:model="StopRobotModal" class="backdrop-blur-xs strategy-modal 
                    ">
                    <p class="w-full p-3 text-lg font-bold">Stop Robot</p>
                    <div 
                        x-data="{
                            progress: 0,
                            startLoading() {
                            const interval = setInterval(() => {
                                if (this.progress >= 100) {
                                this.stoploading = true;
                                setTimeout(() => {
                                    $dispatch('robot-stopped-done');
                                }, 3000);
                                clearInterval(interval);
                                } else {
                                this.progress += 1;
                                }
                            }, 10);
                            }
                        }" 
                        {{-- x-init="startLoading()" --}}
                        x-on:robotstopped.window="
                            startLoading();
                        "
                    >
                        <div x-show="stopinprocess">
                            <div class="flex w-full justify-center mb-5">
                                <x-icon x-show="!stoploading" name="c-minus-circle" class="w-1/4 text-[#FB4B4E]"/>
                                <x-heroicon-c-check-circle class="w-1/4 text-success" x-show="stoploading"/>
                            </div>
                            <div class="w-full flex justify-center mt-2">
                                <progress 
                                    class="progress progress-success w-[70%]" 
                                    :value="progress" 
                                    max="100"
                                ></progress>
                            </div>
                            <h1 class="font-bold text-lg text-center" x-show="!stoploading">
                                Robot is closing all open positons
                            </h1>
                            <h1 class="font-bold text-lg text-center" x-show="stoploading">
                                Robot Stopped Successfully
                            </h1>
                        </div>
                    
                    </div>
                    

                    <div x-show="!stopinprocess" class="p-5 flex flex-row w-full items-center justify-center">
                        <div class="flex flex-col justify-center items-center gap-4">
                            {{-- <x-hugeicons-robotic  class="size-[2em]"/> --}}
                            <h1 class="font-bold text-center">Are you sure you want to stop robot at</br> 
                                <span class="text-[#20c075]" x-text="formatCurrency(amount_earned - (amount_earned * 0.01))"></span> Profit
                            </h1>

                            <x-card class="!bg-base-100 w-full">
                                <div class="flex py-2 border-b-2 border-b-[#2A2B39]">
                                    <div class="flex-1 text-sm ">Account</div>
                                    <div class="flex-1 text-end text-sm ">{{ $activebot && $activebot[0]['account_type'] === 'demo' ? 'Demo' : 'Live' }} Account</div>
                                </div>
                                <div class="flex py-2 border-b-2 border-b-[#2A2B39]">
                                    <div class="flex-1 text-sm ">Amount</div>
                                    <div id="details_amount" class="flex-1 text-end text-sm " x-text="formatCurrency(amount_earned - (amount_earned * 0.01))"></div>
                                </div>
                                <div class="flex py-2 border-b-2 border-b-[#2A2B39]">
                                    <div class="flex-1 text-sm ">Strategy</div>
                                    <div id="details_strategy" class="flex-1 text-end text-sm ">{{ $activebot[0]['name'] }}</div>
                                </div>
                            </x-card>
                            <x-button label="Confirm Stop Robot" class="btn bg-[#FB4B4E] text-white w-full" @click="stopinprocess = true" wire:click="StopRobot" spinner="StopRobot"/>
                            {{-- wire:click="StopRobot" spinner="StopRobot" --}}

                            <p class="text-gray-400 text-sm text-center">Actual profits may vary with market volatility and are calculated after the bot is closed</p>
                        </div>
                    </div>
                </x-modal>
            </div>
        </div>
        <footer>

        </footer>
        <footer class="sticky bottom-0 py-4 shadow z-50 bg-base-300">
            <div class="grid grid-cols-5 gap-2 max-w-full">
                <div class="col-span-1 block">
                    <x-button icon="c-arrow-trending-up"  class="btn-success w-full lg:hidden block" @click="$wire.chartModal = true; $wire.changeChart(selectedPair)"/>
                    <x-button icon="c-arrow-trending-up"  class="btn-success w-full lg:block hidden" @click="$wire.changeChartDesktop(selectedPair)"/>
                </div>
                <div class="col-span-4">
                    <x-button label="Stop Robot" class="bg-[#FB4B4E] text-white w-full" wire:click="StopRobotModal = true"/>
                </div>
            </div>
        </footer>
        
    @endif
</div>

@if($isActiveTrade)

@script
<script>
    window.countdown = function (startTime) {
      return {
        activebot: @js($activebot[0]),
        amount_earned:0, 
        profitpercent:0,
        currentprofit:$wire.entangle('currentprofit').live,
        profittopup:@js($profittopup),
        activebottrades: @js($activebottrades),
        currenttradeposition: $wire.entangle('currenttradeposition').live,
        currentactivetrade: @js($currentactivetrade),
        currenttradepos :@js($currenttradepos),
        selectedPair: @js($selectedPair),
        searchingforsignal:false,
        searchtime: 0,
        time: 0,
        minutes: '00',
        seconds: '00',
        topup: false,
        profitin5min:0,
        start() {
            
            if(this.topup == false){
                // console.log(this.activebottrades);
                this.amount_earned = Number(this.activebot.amount_earned);
                this.profitpercent = (this.amount_earned / this.activebot.amount * 100).toFixed(2);

            }



            
            this.currenttradeposition = this.currenttradepos.trade_position;
            
            let dateend  = new Date(this.currenttradepos.timer_ends_at);

            let datestart  = new Date(this.currenttradepos.timer_starts_at);
            
            var datecurrenttime = new Date();

            // const dateprevious = new Date(previousactiveendtime);
            // const formattedprevious = dateprevious.toLocaleString();
            // console.log( Math.floor((Math.abs(datecurrenttime - dateprevious))/ 1000));

            if(dateend >= datecurrenttime && datestart <= datecurrenttime){
                const diffMs = Math.abs(datecurrenttime - dateend); // difference in milliseconds
                const diffSeconds = Math.floor(diffMs / 1000);
                const minutes = Math.floor(diffSeconds / 60);
                const seconds = diffSeconds % 60;


                this.searchingforsignal = false;
                this.time = minutes * 60 + seconds;
                // console.log(this.time);

                this.updateDisplay();
                let starttradetimer = setInterval(() => {
                    if (this.time > 0) {
                        this.time--;
                        this.updateDisplay();
                    }else{
                        this.searchingforsignal = true;
                        this.time = 0;
                        clearInterval(starttradetimer);
                        
                        this.amount_earned = this.amount_earned+this.currenttradepos.profit;
                        this.profitpercent = (this.amount_earned / this.activebot.amount * 100).toFixed(2);
                        this.currentprofit = this.amount_earned;
                        this.currenttradepos = this.activebottrades[this.currenttradepos.trade_position + 1];
                        
                        this.topup = true;
                        this.selectedPair = this.currenttradepos.asset_name;
                        this.start();

                        renderChart();
                        
                        // this.$dispatch('robotstopped');
                    }
                }, 1000);
            }else{
                const diffMs = Math.abs(datecurrenttime - datestart); // difference in milliseconds
                const diffSeconds = Math.floor(diffMs / 1000);
                const minutes = Math.floor(diffSeconds / 60);
                const seconds = diffSeconds % 60;

                this.searchingforsignal = true;
                this.searchtime = minutes * 60 + seconds;
                let searchingcountdown = setInterval(() => {
                    if (this.searchtime > 0) {
                        this.searchtime--;
                    }else{
                        this.searchingforsignal = false;
                        this.searchtime = 0;
                        clearInterval(searchingcountdown);
                        // this.currenttradepos = this.activebottrades[this.currenttradeposition + 1];
                        this.start();
                        // $wire.changeChart(this.selectedPair);
                        // this.$dispatch('robotstopped');
                    }
                }, 1000);

            }
            
            // var differencinmin = Math.floor((currenttime - previoustime) / 1000);

            // console.log(differencinmin);

            // console.log(new Date(this.thistimestamp).toLocaleString());
            
            
        },
        updateDisplay() {
          const mins = Math.floor(this.time / 60);
          const secs = this.time % 60;
          this.minutes = String(mins).padStart(2, '0');
          this.seconds = String(secs).padStart(2, '0');
        }
      }
    }

    

    // const ctx = document.getElementById('myChart1');

    // let myChart; 

    // const existingChart = Chart.getChart(ctx);
    // if (existingChart) {
    //   existingChart.destroy();
    // }


    // myChart = new  Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //     labels: ['Invested', 'Gross'],
    //     datasets: [{
    //         label: '',
    //         data: [{{ $activebot[0]['amount'] }}, {{ $activebot[0]['amount'] + $activebot[0]['amount_earned'] }}],
    //         backgroundColor: [
    //             'rgb(255, 99, 132)',
    //             'rgb(32, 192, 117)',
    //         ],
    //         hoverOffset: 4,
    //         borderWidth: 0,
    //         cutout: '90%',
    //     }]
    //     },
    //     options: {
    //         plugins: {
    //             legend: {
    //                 labels: {
    //                     color: '#636b77', // <-- sets the text color of the legend
    //                 }
    //             }
    //         }
    //     }
    // });

    let myChart;

    function renderChart() {
        const ctx = document.getElementById('myChart1');
        if (!ctx) return;

        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Invested', 'Gross'],
                datasets: [{
                    label: '',
                    data: [{{ $activebot[0]['amount'] }}, {{ $activebot[0]['amount'] + $activebot[0]['amount_earned'] }}],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(32, 192, 117)',
                    ],
                    hoverOffset: 4,
                    borderWidth: 0,
                    cutout: '90%',
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#636b77',
                        }
                    }
                }
            }
        });
    }
    

    // Trigger on initial page load
    // window.addEventListener('load', renderChart);

     // After SPA navigation and DOM update
     document.addEventListener('livewire:navigated', () => {
        renderChart();
    });

    Livewire.hook('message.processed', (message, component) => {
        
        renderChart();
    });

    $wire.on('reloadchartm', () => {
        renderChart();
    });
</script>

@endscript

@endif

