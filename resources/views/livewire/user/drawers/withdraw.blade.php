<?php

use Livewire\Volt\Component;
use Mary\Traits\Toast;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

use App\Models\Coins;
use App\Models\withdraw;
use App\Models\User;

use App\Mail\Sendotp;
use App\Mail\WithdrawMail;

use PragmaRX\Google2FA\Google2FA;

new class extends Component {
    use Toast;
    public $coins ;
    public float $amount;
    public $selectedCoin = null;
    public $selectedCoinname;
    public $selectedCoincode;
    public $withdrawwallet;
    public string $selectedTab = 'manual-withdraw';
    public float $minimumwithdraw = 10;
    public $cooldownUntil;
    public $user;

    public $otppin ;
    public $twofaotppin ;

    public function mount()
    {
        $this->user = Auth::user();
        $this->coins = Coins::query()->get()->toArray();
        // $this->selectedCoin = $this->coins[0]['id'];
    }

    protected function rules()
    {
        return [
            'amount' => 'required|numeric|lte:'.Auth::user()->balance.'|gte:'.$this->minimumwithdraw,
            'selectedCoin' => 'required',
            'withdrawwallet' => 'required'
        ];
    }

    protected function messages(){
        return [
            'amount.required' => 'Amount is required',
            'amount.numeric' => 'Amount must be a number',
            'amount.gte' => "Amount must be greater than or equal to $ {$this->minimumwithdraw}",
            'amount.lte' => "Insufficient Balance",
            'selectedCoin.required' => 'Payment method is required',
            'withdrawwallet.required' => 'Wallet address is required',
        ];
    }

    public function proceed(){
        $this->validate();

        // dd($this->user->google2fa_secret);

        if (($this->user->two_factor_enabled && $this->user->google2fa_secret) === false) {
            //send email otp
            $this->sendotp();
        }else{
            $this->dispatch('startcountdown');
        }
    }

    public function sendotp(){
        $remember_token = str_pad(mt_rand(0, 99999), 5, '0', STR_PAD_LEFT);

        $datenow = date('Y-m-d H:i:s');
        $currentDateTime = Carbon::now();
        $user = User::where('id',Auth::User()->id)->first()->toArray();
        $timedifference = $user['email_verified_at'] ? Carbon::parse($user['email_verified_at'])->diffInMinutes($currentDateTime) : 0;

        $userUpdated = User::where('id',Auth::User()->id)->update(['remember_token'=>$remember_token, 'email_verified_at' => $datenow]);

         //email admin
        $mailData = [
            'title' => 'Verification Code',
            'body' => '
                <p>Your verification code is</p>
            
                <p style="color: #19282b; font-size: 40px; line-height: 28.8px;"><b>'.$remember_token.'</b></p>
            
            
                </br>
                ',
            'username'=> $user['username']
        ];
    
        Mail::to($user['email'])->send(new Sendotp($mailData));
       
        // if($user['email_verified_at'] == null){
            
        
        //     if($userUpdated){
            
               

        //     }
        // }else{
        //     //email admin
        //     $mailData = [
        //         'title' => 'Verification Code',
        //         'body' => '
        //             <p>Your verification code is</p>
                
        //             <p style="color: #19282b; font-size: 40px; line-height: 28.8px;"><b>'.$user['remember_token'].'</b></p>
                
                
        //             </br>
        //             ',
        //         'username'=> $user['username']
        //     ];
        
        //     Mail::to($user['email'])->send(new Sendotp($mailData));
        // }
        // if($timedifference > 5 || $user['email_verified_at'] == null){
        //     $userUpdated = User::where('id',Auth::User()->id)->update(['remember_token'=>$remember_token, 'email_verified_at' => $datenow]);
        
        //     if($userUpdated){
            
        //         //email admin
        //         $mailData = [
        //             'title' => 'Verification Code',
        //             'body' => '
        //                 <p>Your verification code is</p>
                    
        //                 <p style="color: #19282b; font-size: 40px; line-height: 28.8px;"><b>'.$remember_token.'</b></p>
                    
                    
        //                 </br>
        //                 ',
        //             'username'=> $user['username']
        //         ];
            
        //         Mail::to($user['email'])->send(new Sendotp($mailData));

        //     }
        // }

        $this->dispatch('startcountdown');

        $this->success(
            'OTP sent to your email',
            timeout: 3000,
            position: 'toast-top toast-end'
        );
    }

    public function confirmwithdraw(){
        $this->validate();

        //arrange withdraw details to create
        $withdrawdetails = [
            'user_id'=> Auth::User()->id,
            'gateway'=> $this->selectedCoincode,
            'gatewayname'=> $this->selectedCoinname,
            'amount'=> $this->amount,
            'userwallet_id'=> $this->withdrawwallet,
            'withdraw_status'=>0
        ];
        
        $useractive = User::where('id',Auth::User()->id)->where('status',1)->exists();

        if($useractive){
            if(Auth::User()->balance >= $this->amount){

                 if (($this->user->two_factor_enabled && $this->user->google2fa_secret) === false) {
                    $userotp = User::where('id',Auth::User()->id)->where('remember_token',$this->otppin)->exists();

                    if($userotp){
                        if ($this->amount >= 0) {
                            $withdrawn = withdraw::create($withdrawdetails);

                            //update the user balance on withdrawal
                            $newbalance = Auth::User()->balance - $this->amount;

                            if ($newbalance >= 0) {
                                $updated = User::where('id',Auth::User()->id)->update(['balance'=> $newbalance,'remember_token'=>null, 'email_verified_at' => null]);
                            }
                            if($updated){

                                //email withdraw user
                                $mailData = [
                                    'title' => 'Withdrawal Request',
                                    'body' => '<p>Your Withdrawal of $'.$this->amount.' to the '.$this->selectedCoinname.' wallet  <strong>'.$this->withdrawwallet.'</strong> has been recieved and will be processed shortly</p>
                                    ',
                                    'username'=> Auth::User()->username
                                ];
                                Mail::to(Auth::User()->email)->send(new WithdrawMail($mailData));

                                //email withdraw admin
                                $mailData = [
                                    'title' => 'New Withdrawal Request',
                                    'body' => '<p>'.Auth::User()->username.'Just made a Withdrawal of $'.$this->amount.' to the '.$this->selectedCoinname.' wallet  <strong>'.$this->withdrawwallet.'</strong> has been made and needs approval</p>
                                    ',
                                    'username'=> "Admin"
                                ];
                                Mail::to(env('ADMIN_EMAIL'))->send(new WithdrawMail($mailData));
                                
                                $this->success(
                                    'Your withdrawals is now being processed and should arrive at your wallet within 30 minutes max.',
                                    timeout: 10000,
                                    position: 'toast-top toast-middle'
                                );

                                //reset properties
                                $this->reset('amount','selectedCoin');
                                //console.log amount with js
                                
                                //dispatch event
                                $this->dispatch('confirmwithdrawsuccessfull');

                                return $this->redirect('/user/history/?t=withdraw', navigate: true);
                            }else{
                                $this->error(
                                    'Error Occured while processing your request',
                                    timeout: 3000,
                                    position: 'toast-top toast-end'
                                );
                            }
                        }
                    }else{
                        $this->dispatch('resetotp');
                        $this->reset('otppin');
                        $this->otppin = null;
                        $this->error(
                            'Invalid OTP',
                            timeout: 3000,
                            position: 'toast-top toast-end'
                        );
                    }
                }else{

                    $google2fa = new Google2FA();

                    if ($google2fa->verifyKey($this->user->google2fa_secret, $this->twofaotppin)) {
                        if ($this->amount >= 0) {
                            $withdrawn = withdraw::create($withdrawdetails);

                            //update the user balance on withdrawal
                            $newbalance = Auth::User()->balance - $this->amount;

                            if ($newbalance >= 0) {
                                $updated = User::where('id',Auth::User()->id)->update(['balance'=> $newbalance,'remember_token'=>null, 'email_verified_at' => null]);
                            }
                            if($updated){

                                //email withdraw user
                                $mailData = [
                                    'title' => 'Withdrawal Request',
                                    'body' => '<p>Your Withdrawal of $'.$this->amount.' to the '.$this->selectedCoinname.' wallet  <strong>'.$this->withdrawwallet.'</strong> has been recieved and will be processed shortly</p>
                                    ',
                                    'username'=> Auth::User()->username
                                ];
                                Mail::to(Auth::User()->email)->send(new WithdrawMail($mailData));

                                //email withdraw admin
                                $mailData = [
                                    'title' => 'New Withdrawal Request',
                                    'body' => '<p>'.Auth::User()->username.'Just made a Withdrawal of $'.$this->amount.' to the '.$this->selectedCoinname.' wallet  <strong>'.$this->withdrawwallet.'</strong> has been made and needs approval</p>
                                    ',
                                    'username'=> "Admin"
                                ];
                                Mail::to(env('ADMIN_EMAIL'))->send(new WithdrawMail($mailData));
                                
                                $this->success(
                                    'Your withdrawals is now being processed and should arrive at your wallet within 30 minutes max.',
                                    timeout: 10000,
                                    position: 'toast-top toast-middle'
                                );

                                //reset properties
                                $this->reset('amount','selectedCoin');
                                //console.log amount with js
                                
                                //dispatch event
                                $this->dispatch('confirmwithdrawsuccessfull');

                                return $this->redirect('/user/history/?t=withdraw', navigate: true);
                            }else{
                                $this->error(
                                    'Error Occured while processing your request',
                                    timeout: 3000,
                                    position: 'toast-top toast-end'
                                );
                            }
                        }
                    }else{
                        $this->dispatch('resetotp');
                        $this->reset('twofaotppin');
                        $this->error(
                            'Invalid OTP',
                            timeout: 3000,
                            position: 'toast-top toast-end'
                        );
                    }
                }  
                
            }else{
                $this->error(
                    'Insufficient Balance',
                    timeout: 3000,
                    position: 'toast-top toast-end'
                );
            }

        }else{
            $this->error(
                'Not Authorised to carry out this transaction Please contact support',
                timeout: 3000,
                position: 'toast-top toast-center'
            );
        }
        

        
    }
}; ?>

<div>
    <x-header title="Withdraw" separator class="!mb-0" progress-indicator="completewithdraw">
        <x-slot:actions>
            <x-button @click="withdrawchecked = !withdrawchecked" icon="o-x-mark" class="btn" />
        </x-slot:actions>
    </x-header>
    <div class="pt-2">
        <x-tabs wire:model="selectedTab" active-class="bg-[#424264] rounded-lg !text-white"
            label-class="font-semibold !h-auto !py-1 w-[50%]" label-div-class="bg-primary/10 rounded-lg w-full p-1">
            <x-tab name="manual-withdraw" label="Instant Withdrawal">
                <div>
                    <div class="flex flex-col gap-2" x-data="{
                        withdrawStep: 1,
                        withdrawStep1:1,
                        minwithdraw: $wire.minimumwithdraw,
                        userbalance: {{ Auth::user()->balance }},
                        walletaddress:'',
                        wallets: $wire.coins,
                        proceedbtn: false,
                        amount:$wire.entangle('amount'),
                        selectedCoin: $wire.entangle('selectedCoin'),
                        selectedCoinname: $wire.entangle('selectedCoinname'),
                        selectedCoincode: $wire.entangle('selectedCoincode'),
                        selectedwallet:'',
                        getwalletcode:'',
                        getwalletname:'',
                        withdrawprocessing:false,
                        proceed(){
                            if(this.amount >= this.minwithdraw){
                                let selected = this.wallets.find(wallet => wallet.id === this.selectedCoin);
                                this.selectedwallet =  selected ? selected.coin_wallet : '';
                                this.getwalletcode = selected ? selected.coin_code.toLowerCase() : '';
                                this.getwalletname = selected ? selected.coin_name : '';
                                
                            }
                        },
                        formatCurrency(value) {
                            const num = parseFloat(value);
                            if (isNaN(num)) {
                                return '$0.00';
                            }
                            return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        },
                        checkSteps() {
                            if (this.amount >= this.minwithdraw) {
                                this.withdrawStep1 = 2;

                                if (this.selectedCoin) {
                                    this.withdrawStep1 = 3;
                                } else {
                                    this.withdrawStep1 = 2;
                                }
                            } else {
                                this.withdrawStep1 = 1;
                                this.selectedCoin = '';
                                this.finalInput = '';
                            }
                        }
                    }" x-init="
                        $watch('amount',value => { 
                                proceedbtn = value >= minwithdraw && selectedCoin && walletaddress ;
                                checkSteps();
                            } 
                        ),
                        $watch('selectedCoin',value => { 
                                proceedbtn = amount >= minwithdraw && value && walletaddress;
                                checkSteps()
                            } 
                        ),
                        $watch('walletaddress',value => { 
                                proceedbtn = amount >= minwithdraw && selectedCoin && value;
                            } 
                        )
                
                    " x-on:startcountdown.window="
                                            withdrawStep = 2;
                                        " 
                        x-on:confirmwithdrawsuccessfull.window="
                        withdrawStep = 1;
                        amount = null;
                        selectedCoin = null;
                        walletaddress = '';
                        ">
                        <div x-show="withdrawStep === 1" x-transition>
                            <div class="flex flex-row justify-between">
                                <span>
                                    <p class="text-sm font-bold">Available Balance</p>
                                </span>
                                <span>
                                    <p x-text="formatCurrency(userbalance)" class=" text-lg font-bold"></p>
                                </span>
                            </div>
                            <div class="mt-0">
                                <x-input label="Enter Amount" wire:model.blur="amount" prefix="USD" type="number"
                                    placeholder="0.00" required
                                    class="!input-lg {{ $amount < $minimumwithdraw && $amount > 0 ? '!input-error' : '!input-primary' }}"
                                    hint="Minimum withdrawal is ${{ $minimumwithdraw }}" />
                                @if ($amount < $minimumwithdraw && $amount> 0)
                                    <div class="fieldset-label text-error">Minimum withdraw is @money($minimumwithdraw)</div>
                                    @endif
                            </div>
                            <div class="mt-6" x-show="withdrawStep1 >= 2">
                                <label for="withdraw_payment_method" class=" text-xs block mb-3 font-normal">Select Payment
                                    Method</label>
                                <div class="flex-1 md:flex-none">
                                    <div
                                        class="bg-base-300 border rounded-lg border-base-content/10 w-full max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200 z-10 p-2 mt-1">
                                        @foreach ($coins as $coin)
                                        <div @click="selectedCoin = {{ $coin['id'] }};selectedCoincode = '{{ $coin['coin_code'] }}'; selectedCoinname = '{{ $coin['coin_name'] }}';"
                                            class="hover:bg-base-100 flex items-center space-x-3 px-2 py-2 rounded-md  cursor-pointer"
                                            :class="selectedCoin === {{ $coin['id'] }}?'bg-base-100 border border-base-content/10 w-full':''">
                                            <div class="flex-1 flex items-center space-x-2">
                                                <img class="inline w-8"
                                                    src="/images/coins/{{ strtolower($coin['coin_code']) }}.svg" alt=""
                                                    srcset="">
                                                <p class="inline"> {{ $coin['coin_name'] }}</p>
                                            </div>
                                            <div class="flex-none w-5 text-end">
                                                <template x-if="selectedCoin === {{ $coin['id'] }}">
                                                    <x-heroicon-c-check-circle class="w-full text-success" />
                                                    {{-- <img class="inline"
                                                        src="{{ asset('userassets/icons/check-circle-mobile.svg') }}"> --}}
                                                </template>
                                            </div>
                                        </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6" x-show="withdrawStep1 === 3">
                                <x-input label="Enter Wallet Address" wire:model="withdrawwallet" x-model="walletaddress"
                                    hint="Please confirm wallet address before proceeding" required
                                    class="!input-lg  !input-primary" />
                            </div>

                            <footer class="sticky bottom-0 py-4 shadow z-50 bg-base-200" x-show="withdrawStep1 == 3">
                                <div class="mt-1">
                                    <x-button @click="proceed();" label="Proceed"
                                        class="btn-primary w-full sticky bottom-0" type="submit" wire:click="proceed"
                                        spinner="proceed" x-bind:disabled="!proceedbtn" />
                                </div>
                            </footer>

                        </div>

                        <div x-show="withdrawStep === 2" x-transition>
                            <div class="flex items-center space-x-6 container md:max-w-full">
                                <x-button @click="withdrawStep = 1" label="Back" icon="c-chevron-left"
                                    class="btn-outline btn-sm btn-primary" />
                            </div>
                            <x-hr target="confirmwithdraw" />

                            <div class="container h-auto">
                                <div class="text-center mt-4 md:mt-24 lg:mt-4">
                                    <p class=" text-xl my-6">Withdraw Details</p>
                                </div>
                                <div class="text-center flex items-center justify-center">
                                    <h3 x-text="formatCurrency(amount)" class=" text-2xl font-semibold"></h3>

                                </div>
                                <div class="text-center">
                                    <template x-if="amount">
                                        <p class=" text-sm font-semibold ">Withdraw <span
                                                x-text="formatCurrency(amount)"></span> to the wallet address provided below</p>
                                    </template>

                                </div>

                                <template x-if="getwalletcode !=''">
                                    <div class="flex flex-row gap-2 justify-center items-center">
                                        <img :src="'/images/coins/'+getwalletcode+'.svg'" alt="" class="w-8" />
                                        <p x-text="getwalletname" class="text-lg"></p>
                                    </div>
                                </template>

                                <div class="flex mt-6 border border-base-content/10 rounded-md focus:outline-0">
                                    <div class="flex-1"><input
                                            class="w-full text-xs rounded-md rounded-tr-none rounded-br-none px-4 py-3 bg-base-300 "
                                            x-model="walletaddress" type="text" readonly></div>
                                </div>
                            </div>
                            @if(($user->two_factor_enabled && $user->google2fa_secret) === false)
                            <div class="mt-6 flex flex-col items-center">
                                <p class="text-center mb-3">Enter OTP sent to your Email address to Complete Withdraw</p>

                                <div x-data x-ref="pin">
                                    <x-pin id="withdrawotp" wire:model.live="otppin" size="5" @completed="withdrawprocessing = true"
                                    @incomplete="withdrawprocessing = false" numeric 
                                    
                                    x-on:paste.window="
                                        const e = $event;
                                        const pasted = (e.clipboardData || window.clipboardData).getData('text');
                                        const otpinputs = $refs.pin.querySelectorAll('input');

                                        if (pasted.length === otpinputs.length) {
                                            inputs = pasted.split('');
                                            withdrawprocessing = true;
                                            $dispatch('completed', pasted); // Trigger completed manually
                                        }else{
                                            inputs = pasted.split('');
                                            withdrawprocessing = true;
                                        }
                                    "
                                    x-data x-on:resetotp.window="
                                        const resetval = '';
                                        $dispatch('incomplete', resetval);
                                        inputs = inputs.map(() => '');
                                        withdrawprocessing = false;
                                    
                                    "
                                    x-data
                                    />
                                </div>
                                

                                {{-- <div class="flex flex-row">
                                    <span>You have 5min before you can resend otp</span>
                                </div> --}}
                                <div x-data="countdownTimer()" x-on:startcountdown.window="
                                                        console.log('start countdown'); 
                                                        start()
                                                    " class="space-y-4 mt-2">
                                    <!-- Countdown Display -->
                                    <div class="text-sm font-bold">
                                        Resend OTP in <span x-text="formatTime(timeLeft)"></span>
                                        <x-button label="Resend OTP" wire:click="sendotp" class="btn-ghost !h-0 !px-0"
                                            x-bind:disabled="running !== undefined ? running : false" spinner="sendotp" />
                                    </div>

                                    {{--
                                    <!-- Start Button -->
                                    <button x-show="!running && !finished" @click="start()"
                                        class="px-4 py-2 bg-blue-500 text-white rounded">
                                        Start Countdown
                                    </button>

                                    <!-- Restart Button -->
                                    <button x-show="finished" @click="restart()"
                                        class="px-4 py-2 bg-green-500 text-white rounded">
                                        Restart Countdown
                                    </button> --}}
                                </div>

                                <template x-if="withdrawprocessing">
                                    <footer class="sticky bottom-0 py-4 shadow z-50 bg-base-200 w-full">
                                        <div class="mt-1">
                                            <div class="w-full">
                                                <x-button @click="
                                                                    $wire.confirmwithdraw(); 
                                                                    resetMaryMoneyInput()
                                                                " label="Confirm Withdrawal"
                                                    class="btn-primary w-full sticky bottom-0" type="submit"
                                                    spinner="confirmwithdraw" />
                                            </div>
                                        </div>
                                    </footer>
                                </template>
                                


                            </div>
                            @else
                            <div class="mt-6 flex flex-col items-center">
                                <p class="text-center mb-3">Enter Authenticator Code </br> <small> (from your Authenticator App) </small></p>
                                <div x-data x-ref="pin2">
                                    <x-pin id="twofawithdrawotp" wire:model.live="twofaotppin" size="6" @completed="withdrawprocessing = true"
                                        @incomplete="withdrawprocessing = false" numeric 
                                        x-on:paste.window="
                                            const e = $event;
                                            const pasted = (e.clipboardData || window.clipboardData).getData('text');
                                            const otpinputs = $refs.pin2.querySelectorAll('input');

                                            if (pasted.length === otpinputs.length) {
                                                inputs = pasted.split('');
                                                withdrawprocessing = true;
                                                $dispatch('completed', pasted); // Trigger completed manually
                                            }else{
                                                inputs = pasted.split('');
                                                withdrawprocessing = true;
                                            }
                                        "
                                        x-data x-on:resetotp.window="
                                            const resetval = '';
                                            $dispatch('incomplete', resetval);
                                            inputs = inputs.map(() => '');
                                            withdrawprocessing = false;
                                        "
                                        x-data
                                        />
                                </div>
                                {{-- <div class="flex flex-row">
                                    <span>You have 5min before you can resend otp</span>
                                </div> --}}
                                <div x-data="countdownTimer()" x-on:startcountdown.window="
                                                        console.log('start countdown');
                                                        start()
                                                    " class="space-y-4 mt-2">
                                
                                </div>

                                <template x-if="withdrawprocessing">
                                    <footer class="sticky bottom-0 py-4 shadow z-50 bg-base-200 w-full">
                                        <div class="mt-1">
                                            <div class="w-full">
                                                <x-button @click="
                                                                    $wire.confirmwithdraw(); 
                                                                    resetMaryMoneyInput()
                                                                " label="Confirm Withdrawal"
                                                    class="btn-primary w-full sticky bottom-0" type="submit"
                                                    spinner="confirmwithdraw" />
                                            </div>
                                        </div>
                                    </footer>
                                </template>


                            </div>
                            @endif
                        </div>

                    </div>
                </div>
            </x-tab>
            <x-tab name="automatic-withdraw" label="Automatic Withdraw">
                <x-card class="!p-0">
                    <div class="text-center p-6">
                        <h2 class="text-3xl font-bold">Coming Soon</h2>
                        <p class="text-lg text-gray-500">Our Automatic Withdraw feature is currently under development.
                            We'll let you know when it's ready.</p>
                    </div>
                </x-card>
            </x-tab>
        </x-tabs>
    </div>

</div>

@script
<script>
    window.countdownTimer = function () {
        return {
            timeLeft: 30, // countdown from 5 minutes
            duration: 30,
            running: false,
            finished: false,
            interval: null,

            start() {
                this.running = true;
                this.finished = false;
                this.timeLeft = this.duration;
                
                this.interval = setInterval(() => {
                    if (this.timeLeft > 0) {
                        this.timeLeft--;
                    } else {
                        this.stop();
                    }
                }, 1000);
            },

            stop() {
                clearInterval(this.interval);
                this.running = false;
                this.finished = true;
            },

            restart() {
                this.finished = false;
                this.start();
            },

            formatTime(seconds) {
                const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                return `${mins}:${secs}`;
            }
        }
   }

    function resetMaryMoneyInput() {
        const input = document.querySelector('[x-ref="myInput"]');
        if (input) {
            input.value = 0;
            new Currency(input, {"init":true,"maskOpts":{"locales":"en-US"}});
        } else {
            console.log("Input not found");
        }
    }
</script>
@endscript