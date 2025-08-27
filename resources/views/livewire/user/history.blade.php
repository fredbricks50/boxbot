<?php

use Livewire\Volt\Component;


use Livewire\Attributes\On;
use Livewire\Attributes\Url;
use Carbon\Carbon;

//models
use App\Models\User;
use App\Models\Trade;
use App\Models\tradingbot;
use App\Models\deposit;
use App\Models\withdraw;

new class extends Component {

    #[Url(except: '',as: 't')]
    public ?string $historytab = '' ;

    public bool $tradedealsdrawer = false;

    public $selectedTab = 'trade-history-tab';
    public array $trades = [];
    public object $deposits ;
    public object $withdraws;

    public int $selectedtrade ;
    public array $selectedtradedetails;
    public array $selectedtradedeals ;


    public function updatedTradedealsdrawer($value)
    {
        if(!$value){
            $this->reset(['selectedtrade', 'selectedtradedeals']);
        }
    }

    public function updatedSelectedTab()
    {
        if($this->selectedTab === 'withdraw-history-tab'){
            $this->historytab = 'withdraw';
        }elseif($this->selectedTab === 'deposit-history-tab'){
            $this->historytab = 'deposit';
        }else{
            $this->historytab = '';
        }
    }

    public function updatedSelectedtrade($value)
    {
        if($value){
            $selectedtrades = Trade::where('bot_id', $this->selectedtrade)->get()->toArray()[0];
            $this->selectedtradedeals = json_decode($selectedtrades['trades'], true);

            $trade = tradingbot::where('id', $this->selectedtrade)->get()->toArray()[0];

            if($trade['status'] == 0){
                if($selectedtrades['stopped_robot_at_position'] != null){
                   
                    $this->selectedtradedeals = array_reverse(array_slice($this->selectedtradedeals, 0, $selectedtrades['stopped_robot_at_position']));
                }else{
                    $this->selectedtradedeals = array_reverse($this->selectedtradedeals);
                }
                
            }else{
             
                for ($i = 0; $i < count($this->selectedtradedeals); $i++) {
                    $timerEndsAt = $this->selectedtradedeals[$i]['timer_ends_at'];
                    // $timerEndsAt = Carbon::createFromFormat('Y-m-d H:i:s', $timerEndsAt)->valueOf();
                    $now = Carbon::now()->valueOf();
                    
                    if ($now <= $timerEndsAt) {
                        $this->selectedtradedeals = array_reverse(array_slice($this->selectedtradedeals, 0, $i));
                        break; 
                    }
                }
            }
            

            $this->selectedtradedetails = tradingbot::where('id', $this->selectedtrade)->get()->toArray()[0];
        }
    }

    public function mount()
    {
        if($this->historytab === 'withdraw'){
            $this->selectedTab = 'withdraw-history-tab';
        }elseif($this->historytab === 'deposit'){
            $this->selectedTab = 'deposit-history-tab';
        }else{
            $this->selectedTab = 'trade-history-tab';
        }
        $this->trades = tradingbot::join('plans', 'tradingbots.strategy_id', '=', 'plans.id')
        ->select('plans.*', 'tradingbots.*')->orderBy('tradingbots.id','desc')
        ->where([
            'tradingbots.user_id' => Auth::User()->id,])
        ->get()->toArray();

        $this->deposits = deposit::where('user_id', Auth::User()->id)->orderBy('id', 'desc')->get();

        $this->withdraws = withdraw::where('user_id', Auth::User()->id)->orderBy('id', 'desc')->get();

        

    }

}; ?>

<div class="flex flex-col gap-4 lg:px-5 px-1 pt-5"
    x-data="{ 
            selectedtrade : $wire.entangle('selectedtrade').live,
            selectedtradedeals : $wire.entangle('selectedtradedeals').live,
            closedealdrawer() {
                $wire.tradedealsdrawer = false;
                this.selectedtrade = null;
                this.selectedtradedeals = null;
            },
            opendealdrawer(trade) {
                this.selectedtrade = trade;
                $wire.tradedealsdrawer = true;
            },
    }">
    <div class="flex">
        <h3 class="p-2 font-bold">Account History</h3>
    </div>
    <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:pb-0 pb-[100px] max-h-[80vh]">
        <div class="lg:col-span-2">
            <x-tabs wire:model.live="selectedTab" label-div-class="history-tabs border-b-2 border-b-base-content/10 flex overflow-x-auto">
                <x-tab name="trade-history-tab" label="Trades" icon="s-chart-bar">
                    <div class="container mx-auto py-2 pb-[200px] lg:max-h-[75vh] max-h-[63vh]  overflow-y-scroll">
                        @forelse ($trades as $trade)
                            <div class="bg-base-300 p-3 w-full rounded-md mb-3 border border-base-content/10">
                                <div class="flex w-full text-[#98a4b3] text-xs mb-1 items-center justify-between">
                                    <div class="flex flex-col">
                                        {{-- <span
                                            class="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-2xl text-xs font-bold bg-[#48495a] ">Robot</span> --}}
                                        <x-badge value="{{ $trade['status'] ? 'Active' : 'Ended' }}" class="{{ $trade['status'] ? 'badge-success' : 'badge-error' }} badge-sm" />
                                    </div>
                                    <div class="flex flex-col items-end gap-1">
                                        {{ ucfirst($trade['account_type']) }} Account
                                       
                                    </div>
                                </div>
                                <x-card class="!p-3 mt-2 border border-base-content/10">
                                    <div class="flex justify-between items-center">
                                        <div class="flex flex-col">
                                            <span>Amount</span>
                                            <span class="font-bold">@money($trade['amount'])</span>
                                        </div>
                                        <div class="flex flex-col items-end gap-1">
                                            <span class="item-end font-bold text-sm">Profit <span class="text-[#20c075] text-sm font-bold">+@money($trade['amount_earned'])</span></span>
                                            <x-button @click="opendealdrawer({{ $trade['id'] }})" label="Check Orders"  class="btn-xs btn-outline border-primary" icon-right="m-chevron-double-right"/>
                                        </div>
                                    </div>
                                </x-card>
                            </div>
                        @empty
                            <div class="bg-base-300 p-3 w-full rounded-md mb-3 text-center">
                                <p class="text-xs text-[#98a4b3]">No history available</p>
                            </div>
                        @endforelse
                    </div>
                </x-tab>
                <x-tab name="deposit-history-tab" label="Deposits" icon="c-arrow-down-tray">
                    <div class="container mx-auto py-2 lg:max-h-[75vh] max-h-[63vh]  overflow-y-scroll">
                        @php
                            $depositheaders = [
                                ['key' => 'gateway', 'label' => 'Gateway'],
                                ['key' => 'amount', 'label' => 'Amount', 'format' => ['currency', '2.', '$ '],'class' => 'w-32'],
                                ['key' => 'deposit_status', 'label' => 'Status'],
                                ['key' => 'created_at', 'label' => 'Date', 'format' => ['date', 'd/m/Y']],
                            ];
                        @endphp
                        <x-table :headers="$depositheaders" :rows="$deposits" striped class="!w-[140%] sm:!w-full" >
                            @scope('cell_gateway', $deposit)
                                <div class="flex flex-row items-center">
                                    @if ($deposit->gateway == 'ReferralBonus')
                                        <span class="ml-2">Referral Bonus</span>
                                    @else
                                        <img src="/images/coins/{{$deposit->gateway}}.svg" alt="" class="w-5"/>
                                        <span class="ml-2">{{ strtoupper($deposit->gatewayname) }}</span>
                                    @endif
                                    {{-- <span class="ml-2">{{ strtoupper($deposit->gatewayname) }}</span> --}}
                                </div>
                            @endscope
                            @scope('cell_deposit_status', $deposit)
                                 <x-badge value="{{ $deposit->deposit_status === 1 ? 'Confirmed' : ($deposit->deposit_status === 0 ? 'Pending' : 'Declined') }}" class="{{ $deposit->deposit_status === 1 ? 'badge-success' : ($deposit->deposit_status === 0 ? 'badge-error' : 'badge-warning') }} badge-xs" />
                            @endscope
                        </x-table>
                    </div>
                </x-tab>
                <x-tab name="withdraw-history-tab" label="Withdrawals" icon="c-arrow-up-tray">
                    <div>
                        @php
                            $withdrawheaders = [
                                ['key' => 'gateway', 'label' => 'Gateway','class'=>'sticky left-0 bg-base-100'],
                                ['key' => 'amount', 'label' => 'Amount', 'format' => ['currency', '2.', '$ ']],
                                ['key' => 'userwallet_id', 'label' => 'Wallet','class' => '!max-w-[350px] !min-w-[350px]'],
                                ['key' => 'withdraw_status', 'label' => 'Status'],
                                ['key' => 'created_at', 'label' => 'Date', 'format' => ['date', 'd/m/Y']],
                            ];
                        @endphp
                        <x-table :headers="$withdrawheaders" :rows="$withdraws" striped class="!w-[140%] sm:!w-full">
                            @scope('cell_gateway', $withdraw)
                                <div class="flex flex-row items-center">
                                    <img src="/images/coins/{{strtolower($withdraw->gateway)}}.svg" alt="" class="w-5"/>
                                    <span class="ml-2">{{ strtoupper($withdraw->gatewayname) }}</span>
                                </div>
                            @endscope
                            @scope('cell_withdraw_status', $withdraw)
                                <x-badge
                                    value="{{ $withdraw->withdraw_status === 1 ? 'Confirmed' : ($withdraw->withdraw_status === 0 ? 'Pending' : 'Declined') }}"
                                    class="{{ $withdraw->withdraw_status === 1 ? 'badge-success' : ($withdraw->withdraw_status === 0 ? 'badge-error' : 'badge-warning') }} badge-xs"
                                />
                            @endscope

                            <x-slot:empty>
                                {{-- <img src="/images/notransactions.gif" class="w-30 align-center" /> --}}
                                <x-icon name="o-cube" label="No Withdrawals Yet" />
                            </x-slot:empty>
                        </x-table>
                    </div>
                </x-tab>
            </x-tabs>
        </div>
        <div class="col">
        </div>
    </div>

    {{-- Trades deals  --}}
    <x-drawer wire:model.live="tradedealsdrawer" class="w-full lg:w-1/3 !h-dvh !p-0" right>
        <x-header title="History" separator class="!mb-0 p-3" size="text-lg">
            <x-slot:actions>
                <x-button @click="closedealdrawer" icon="o-x-mark" class="btn-ghost" />
            </x-slot:actions>
        </x-header>
        <div class="px-3">
            @if($selectedtrade)
                <div class="container mx-auto py-2 lg:max-h-[85vh] max-h-[83vh]  overflow-y-scroll ">
                    @forelse ($selectedtradedeals as $trade)
                        <div class="bg-base-300 py-3 px-6 w-full rounded-md mb-3 border border-base-content/10">
                            <div class="flex w-full text-xs mb-2 items-center">
                                <div class="flex-1">
                                    <span
                                        class="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-2xl text-xs font-bold bg-base-100 border border-base-content/10 ">Robot</span>
                                </div>
                                <div class="flex flex-col items-end gap-1">
                                    {{-- <span>{{ $trade['trade_position'] }}</span> --}}
                                    <div class="flex-none">{{ ucfirst($selectedtradedetails['account_type']) }} Account</div>
                                    {{-- <div>{{ $trade['timer_ends_at'] }}</div> --}}
                                    {{-- <div class="flex-none">{{ date('d-m-Y', strtotime($trade['time_ended_at'])) }}</div> --}}
                                </div>
                            </div>
                            <div class="mb-1">
                                <p class="text-sm font-medium ">Traded</p>
                            </div>
                            <div class="flex items-center">
                                <div class="flex-1 text-md font-bold ">
                                    @if ($trade['type'] === 'currency')
                                        <img class="inline" src="{{ str_starts_with($trade['image_url'], 'https://olympbot.com/icons/assets/') ? '/images/coins/' . str_replace('https://olympbot.com/icons/assets/', '', $trade['image_url']) : $trade['image_url'] }}">
                                    @else
                                        <img class="inline" width="24" height="24" src="{{ str_starts_with($trade['image_url'], 'https://olympbot.com/icons/assets/') ? '/images/coins/' . str_replace('https://olympbot.com/icons/assets/', '', $trade['image_url']) : $trade['image_url'] }}">
                                    @endif
                                    <span>{{ $trade['asset_display_name'] }} </span>
                                    @if ($trade['action'] === 'BUY')
                                        <span class="text-xs font-bold text-[#16C784]"> BUY</span>
                                    @else
                                        <span class="text-xs font-bold text-[#ea3943]"> SELL</span>
                                    @endif
                                </div>
                                <div class="flex-none text-[#20c075] text-sm font-bold">+@money(floatval($trade['profit']))</div>
                            </div>
                        </div>
                    @empty
                        <div class="bg-base-300 p-3 w-full rounded-md mb-3 text-center border border-base-content/10">
                            <p class="text-xs text-[#98a4b3]">No history available</p>
                        </div>
                    @endforelse
                </div>
            @else
                <div class="flex w-full flex-col gap-4">
                    <div class="skeleton h-30 w-full"></div>
                    <div class="skeleton h-30 w-full"></div>
                    <div class="skeleton h-30 w-full"></div>
                    <div class="skeleton h-30 w-full"></div>
                    <div class="skeleton h-30 w-full"></div>
                    <div class="skeleton h-30 w-full"></div>
                </div>
            @endif
            

            
        </div>
    </x-drawer>
</div>
