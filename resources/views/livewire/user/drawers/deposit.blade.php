<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Title;
use Livewire\Attributes\Validate;
use Livewire\Attributes\On;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Locked;

use Mary\Traits\Toast;


use App\Models\Coins;
use App\Models\deposit;
use App\Models\User;

//mails
use App\Mail\DepositMail;
use Illuminate\Support\Facades\Mail;

new class extends Component {
    use Toast;

    public $coins ;


    public float $amount;
    public float $minimumdeposit;

    // #[Locked] 
    public $selectedCoin = null;

    public function mount()
    {
        $this->coins = Coins::query()->get()->toArray();
        $this->minimumdeposit = 100;
        // $this->selectedCoin = $this->coins[0]['id'];
    }

    protected function rules()
    {
        return [
            'amount' => 'required|numeric|gte:'.$this->minimumdeposit,
            'selectedCoin' => 'required'
        ];
    }

    protected function messages(){
        return [
            'amount.required' => 'Amount is required',
            'amount.numeric' => 'Amount must be a number',
            'amount.gte' => "Amount must be greater than or equal to $ {$this->minimumdeposit}",
            'selectedCoin.required' => 'Payment Method is required',
        ];
    }
    
    public function copyToClipboard()
    {
        $this->success(
            'Payment Wallet copied to clipboard',
            timeout: 3000,
            position: 'toast-top toast-middle'
        );
    }

    public function proceed(){
        $this->validateOnly('amount');
    }

    public function confirmDeposit($walletcode,$walletname){
        $this->validate();

        $datecreated =  date("d-m-Y");

        $depositdetails = [
            'user_id'=> Auth::User()->id,
            'gateway'=> $walletcode,
            'gatewayname'=> $walletname,
            'amount'=> $this->amount,
            'deposit_status'=>0,
        ];
        
        if ($this->amount >= 0) {
            $deposited = deposit::create($depositdetails);

            if($deposited){
                //mail user 
                //email subscription user
                $mailData = [
                    'title' => 'Deposit Request',
                    'body' => '<p>Your Deposit of $'.$this->amount.' has been recieved and will be confirmed shortly</p>
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
                    'body' => '<p>'.Auth::User()->username.' just Deposited  $'.$this->amount.' </p>
                    
                    <a href="https://ctxai.org/user/login" style="background-color: teal; color: white;padding-top: 5px ;
                    padding-bottom: 5px ;
                    padding-left: 10px ;
                    padding-right: 10px ; text-decoration: none; margin: auto;"> Login </a>',
                    'username'=> "Admin"
                ];
                Mail::to(env('ADMIN_EMAIL'))->send(new DepositMail($mailData));

            }

            $this->success(
                'Your deposit is being processed, your account will be automatically credited once it’s confirmed.',
                timeout: 10000,
                position: 'toast-top toast-middle'
            );

            //reset properties
            $this->reset('amount','selectedCoin');
            //console.log amount with js
            
            //dispatch event
            $this->dispatch('confirmdepositsuccessfull');

            return $this->redirect('/user/history/?t=deposit', navigate: true);
        }else{
            $this->error(
                'Deposit amount must be greater than or equal to $'.$this->minimumdeposit,
                timeout: 5000,  
                position: 'toast-top toast-middle');
        }
    }

    
}; ?>




<div class="flex flex-col gap-2" x-data="{
        depositStep: 1,
        depositStep1:1,
        minDeposit: $wire.minimumdeposit,
        wallets: $wire.coins,
        proceedbtn: false,
        amount:$wire.entangle('amount').live,
        selectedCoin: $wire.entangle('selectedCoin'),
        selectedwallet:'',
        getwalletcode:'',
        getwalletname:'',
        proceed(){
            if(this.amount >= this.minDeposit){
                let selected = this.wallets.find(wallet => wallet.id === this.selectedCoin);
                this.selectedwallet =  selected ? selected.coin_wallet : '';
                this.getwalletcode = selected ? selected.coin_code.toLowerCase() : '';
                this.getwalletname = selected ? selected.coin_name : '';
                this.depositStep = 2;
            }
        },
        formatCurrency(value) {
            const num = parseFloat(value);
            if (isNaN(num)) {
                return '$0.00';
            }
            return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    }"
    x-init="
        $watch('amount',value => { 
                proceedbtn = value >= minDeposit && selectedCoin ;
                depositStep1 = value >= minDeposit ? 2 : 1;
            } 
        ),
        $watch('selectedCoin',value => { 
                proceedbtn = amount >= minDeposit && value ;
            } 
        )

    "
    x-on:confirmdepositsuccessfull.window="
        depositStep = 1;
        amount = null;
        selectedCoin = null;
        "
        
    >
        <div x-show="depositStep === 1" x-transition>
            <div class="mt-0" x-show="depositStep1 === 1 || depositStep1 === 2">
                <x-input label="Enter Amount" wire:model.blur="amount" type="number" placeholder="0.00" hint="Minimum deposit is ${{ $minimumdeposit }}" required class="!input-lg  !input-primary" />
            </div>
            <div class="mt-6" x-show="depositStep1 === 2">
                <label for="deposit_payment_method" class="text-xs block mb-3 font-normal">Select Payment Method</label>
                <div class="flex-1 md:flex-none">
                    <div class="bg-base-300 border rounded-lg border-base-content/10 w-full h-auto z-10 p-2 mt-1 max-h-[45vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200">
                        @foreach ($coins as $coin)
                            <div @click="selectedCoin = {{ $coin['id'] }};proceed();$dispatch('generateqr',selectedwallet)" class="hover:bg-base-100 flex items-center space-x-3 px-2 py-2 rounded-md cursor-pointer" :class="selectedCoin === {{ $coin['id'] }}?'bg-base-100 border border-base-content/10 w-full':''">
                                <div class="flex-1 flex items-center space-x-2">
                                    <img class="inline w-8" src="/images/coins/{{ strtolower($coin['coin_code']) }}.svg" alt="" srcset="">
                                    <p class="inline"> {{ $coin['coin_name'] }}</p>
                                </div>
                                <div class="flex-none w-5 text-end">
                                    <template x-if="selectedCoin === {{ $coin['id'] }}">
                                        <x-heroicon-c-check-circle class="w-full text-success"/>
                                        {{-- <img class="inline" src="{{ asset('userassets/icons/check-circle-mobile.svg') }}"> --}}
                                    </template>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
            {{-- <div class="mt-6">
                <x-button @click="proceed();$dispatch('generateqr',selectedwallet)" label="Proceed" class="btn-primary w-full sticky bottom-0" type="submit" wire:click="proceed" spinner x-bind:disabled="!proceedbtn"/>  
            </div> --}}
        </div>

        <div x-show="depositStep === 2" x-transition x-data="qrCodeGenerator()" @generateqr.window="generateQRCode($event.detail); " >
            <div class="flex items-center space-x-6 container md:max-w-full">
                <x-button @click="depositStep = 1" label="Back" icon="c-chevron-left" class="btn-outline btn-sm btn-primary"/>
            </div>
            <x-hr target="confirmDeposit" />
            
            <div class="container h-auto">
                <div class="text-center mt-4 md:mt-24 lg:mt-4">
                    <p class=" text-sm my-6">Scan QR code or copy wallet address below</p>
                </div>
                <div class="my-4 text-center flex items-center justify-center">
                    <div class="w-30 h-30 bg-[#FFFFFF] flex overflow-hidden rounded-lg">
                        <img :src="qrcodeDataUrl" alt="QR Code" x-show="qrcodeDataUrl" class="w-full h-full object-cover transition-transform duration-300 ease-in-out" />
                    </div>
                </div>
                <div class="text-center">
                    <template x-if="amount">
                        <p class=" text-sm font-semibold my-2">Send <span x-text="formatCurrency(amount)"></span> to the wallet address provided below</p>
                    </template>
                    
                </div>

                <template x-if="getwalletcode !=''">
                    <div class="flex flex-row gap-2 justify-center items-center">
                        <img :src="'/images/coins/'+getwalletcode+'.svg'" alt="" class="w-8"/>
                        <p x-text="getwalletname" class="text-lg"></p>
                    </div>
                </template>

                <div class="flex mt-6 border border-base-content/10 rounded-md focus:outline-0">
                    <div class="flex-1"><input class="w-full text-xs rounded-md rounded-tr-none rounded-br-none px-4 py-3 bg-base-300 "
                        x-model="selectedwallet" x-ref="walletaddress" type="text" readonly></div>
                    <div @click="navigator.clipboard.writeText($refs.walletaddress.value);showToast('Wallet Copied', 'success')"  class="flex-none w-12 rounded-tr-md rounded-br-md bg-base-300 flex items-center justify-center cursor-pointer">
                        <x-hugeicons-copy-01 class="w-10"/>
                    </div>
                </div>

                <div class="border border-primary shadow-lg ring-1 ring-primary rounded-lg p-4 mt-6" role="alert" tabindex="-1" aria-labelledby="hs-actions-label">
                    <div class="flex">
                    <div class="shrink-0">
                        <x-hugeicons-information-circle class="text-error"/>
                    </div>
                    <div class="ms-2">
                        <div class="text-sm dark:text-white">
                        <span class="font-bold">NB</span>: If you have made the payment to the wallet above, kindly click on the “Yes I have Paid” button below to confirm the payment.
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <x-button 
                    @click="
                        $wire.confirmDeposit(getwalletcode,getwalletname); 
                        resetMaryMoneyInput()
                    " 
                    label="Yes I have Paid" class="btn-primary w-full sticky bottom-0" type="submit" spinner="confirmDeposit" />
            </div>
        </div>
        
    </div>


@push('scripts')
<script>
    function resetMaryMoneyInput() {
        const input = document.querySelector('[x-ref="myInput"]');
        if (input) {
            input.value = 0;
            new Currency(input, {"init":true,"maskOpts":{"locales":"en-US"}});
        } else {
            console.log("Input not found");
        }
    }
    function qrCodeGenerator() {
        return {
            qrcodetext: '',
            qrcodeDataUrl: '',

            async generateQRCode(qrtext) {
                if (!qrtext.trim()) {
                    this.qrcodeDataUrl = '';
                    return;
                }

                try {
                    this.qrcodeDataUrl = await window.generateQRCodeImage(qrtext, {
                        width: 500,
                        height: 500,
                        margin: 1,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                    });
                } catch (e) {
                    console.error('QR Code generation failed:', e);
                }
            }
        }
    }
</script>
@endpush