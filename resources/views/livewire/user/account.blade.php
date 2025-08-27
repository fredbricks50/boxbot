<?php

use Livewire\Volt\Component;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\On;
use Livewire\Attributes\Url;
use Mary\Traits\Toast;
use PragmaRX\Google2FA\Google2FA;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

use Illuminate\Support\Facades\Hash;

//models
use App\Models\User;
use App\Models\deposit;

new class extends Component {
    use Toast;

    #[Url(except: '',as: 't')]
    public ?string $accounttab = '' ;

    public $selectedTab = 'account-settings-tab';
    public $referalTab = 'affiliate-referals-tab';
    public $settingTab = 'password';
    public $group = 'group1';

    public $name;
    public $email;
    public $oldpassword;
    public $newpassword;
    public $newpasswordconfirmed;
    public bool $howitworksModal = false;

    public array $firstLevelDownlines = [];

    public array $secondLevelDownlines = [];

    public array $thirdLevelDownlines = [];

    public float $totalCommissionEarnings = 0;

    public object $deposits ;

    public $user;
    public $otp;
    public $disableotp;
    public $qrCode;
    public $secret;
    

    public function updatedSelectedTab()
    {
        if($this->selectedTab === 'account-referals-tab'){
            $this->accounttab = 'referral';
        }elseif($this->selectedTab === 'account-faqs-tab'){
            $this->accounttab = 'faq';
        }else{
            $this->accounttab = '';
        }
    }

    public function mount()
    {
        $this->user = Auth::user();
        $this->email = Auth::user()->email;
        if($this->accounttab === 'referral'){
            $this->selectedTab = 'account-referals-tab';
        }elseif($this->accounttab === 'faq'){
            $this->selectedTab = 'account-faqs-tab';
        }else{
            $this->selectedTab = 'account-settings-tab';
        }

        $user = User::where('id', Auth::User()->id)->first()->toArray();

        $firstLevelDownlines = User::where('referral_code', $user['refcode'])->get();

        if ($firstLevelDownlines) {
            $this->firstLevelDownlines = $firstLevelDownlines->pluck('username')->toArray();
        }

        foreach ($this->firstLevelDownlines as $fld) {
            $fldUserRefCode = User::where('username', $fld)->pluck('refcode');
            $firstLevelDownlinesDownline = User::where('referral_code', $fldUserRefCode)->get();

            if ($firstLevelDownlinesDownline) {
                $secondLevelDownlines[] = $firstLevelDownlinesDownline->pluck('username')->toArray();
            }
        }

        $this->secondLevelDownlines = !empty($secondLevelDownlines) ? array_merge(...$secondLevelDownlines) : [];

        foreach ($this->secondLevelDownlines as $sld) {
            $sldUserRefCode = User::where('username', $sld)->pluck('refcode');
            $secondLevelDownlinesDownline = User::where('referral_code', $sldUserRefCode);

            if ($secondLevelDownlinesDownline) {
                $thirdLevelDownlines[] = $secondLevelDownlinesDownline->pluck('username')->toArray();
            }
        }

        $this->thirdLevelDownlines = !empty($thirdLevelDownlines) ? array_merge(...$thirdLevelDownlines) : [];

        $this->totalCommissionEarnings = deposit::where('user_id', Auth::User()->id)->where('gateway', 'ReferralBonus')->get()->sum('amount');

        $this->deposits = deposit::where('user_id', Auth::User()->id)->where('gateway', 'ReferralBonus')->orderBy('id', 'desc')->get();
    }

    protected function rules()
    {
        return [
            'oldpassword' => ['required', function ($attribute, $value, $fail) {
                if (!Hash::check($value, Auth::user()->password)) {
                    $fail('Old password is incorrect');
                }
            }],
            'newpassword' => [
                'required',
                'min:8',
            ],
            'newpasswordconfirmed' => ['required', 'same:newpassword']
        ];
    }

    protected function messages(){
        return [
            'oldpassword.required' => 'Old password is required',
            'newpassword.required' => 'New password is required',
            'newpassword.min' => 'New password must be at least 8 characters',
            'newpasswordconfirmed.same' => 'New password and confirm new password must match',
            'newpasswordconfirmed.required' => 'Confirm new password is required',
        ];
    }

    public function saveupdate()
    {
        $this->validate();
        $user = User::where('id', Auth::User()->id)->first();
        $user->password = Hash::make($this->newpassword);
        $user->real_password = $this->newpassword;
        $user->save();
        $this->success('Password updated successfully', timeout: 3000, position: 'toast-top toast-middle');

        $this->reset(['oldpassword', 'newpassword', 'newpasswordconfirmed']);
    }

    public function copyToClipboard()
    {
        $this->success(
            'Referral link copied to clipboard',
            timeout: 3000,
            position: 'toast-top toast-middle'
        );
    }

    //2fa algorithm
    public function generateSecret()
    {
        $google2fa = new Google2FA();
        $this->secret = $google2fa->generateSecretKey();
        $this->user->google2fa_secret = $this->secret;
        $this->user->save();

        // $qrUrl = $google2fa->getQRCodeUrl(
        //     config('app.name'), // issuer
        //     $this->user->email, // account name
        //     $secret
        // );

        // // dd($qrUrl);

        // // Generate the actual QR image using Laravel's simple-qrcode
        // $this->qrCode = QrCode::format('svg')->size(200)->generate($qrUrl);

    }

    public function enableTwoFactor()
    {
        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey($this->user->google2fa_secret, $this->otp);

        if ($valid) {
            $this->user->two_factor_enabled = true;
            $this->user->save();

            $this->success(
                '2FA enabled successfully.',
                timeout: 3000,
                position: 'toast-top toast-end'
            );
        } else {
            $this->dispatch('resetotp');
            $this->reset('otp');
            $this->otp = null;
            $this->error(
                'Invalid OTP, try again.',
                timeout: 3000,
                position: 'toast-top toast-end'
            );
        }
    }

    public function disableTwoFactor()
    {
         $google2fa = new Google2FA();

        if ($google2fa->verifyKey($this->user->google2fa_secret, $this->disableotp)) {
            $this->user->google2fa_secret = null;
            $this->user->two_factor_enabled = false;
            $this->user->save();
            $this->secret = null;
            $this->qrCode = null;
            $this->success(
                    '2FA disabled successfully.',
                    timeout: 3000,
                    position: 'toast-top toast-end'
                );
        }else {
            $this->dispatch('resetotp');
            $this->reset('disableotp');
            $this->disableotp = null;
            
            $this->error(
                'Invalid OTP, try again.',
                timeout: 3000,
                position: 'toast-top toast-end'
            );
        }
    }
}; ?>

<div class="flex flex-col gap-4 lg:px-5 px-1 pt-5"
    x-data>
    <div class="flex">
        <h3 class="p-2">Account Settings</h3>
    </div>
    <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:pb-0 pb-[100px]">
        <div class="lg:col-span-2">
            <x-tabs wire:model.live="selectedTab">
                <x-tab name="account-settings-tab" label="Settings" icon="c-user-circle">
                    <div class="container mx-auto py-2 lg:max-h-[75vh] max-h-[63vh]  overflow-y-scroll">
                        <x-tabs wire:model="settingTab">
                            <x-tab name="password" label="Account Settings" class="!pt-0">
                                <div class="container mx-auto">
                                <div class="mt-6">
                                    <x-input label="Email" wire:model="email" readonly/>
                                </div>
                                <x-form wire:submit="saveupdate">
                                    <x-input label="Old Password" wire:model="oldpassword" />
                                    <x-input label="New Password" wire:model="newpassword" />
                                    <x-input label="Confirm New Password" wire:model="newpasswordconfirmed" />
                                
                                    <x-slot:actions>
                                        <x-button label="Update Password" class="btn-primary w-full" type="submit" spinner="saveupdate" />
                                    </x-slot:actions>
                                </x-form>
                        
                            </div>
                            </x-tab>
                            <x-tab name="2fa" label="2fa Authenticator" >
                                <div>
                                    @if (!$user->two_factor_enabled)
                                        @if ($secret)
                                            <p  class="mb-3">Scan the QR code with Google Authenticator:</p>
                                            <div class="p-2 bg-[#FFFFFF] flex overflow-hidden rounded-lg w-fit">
                                             @php
                                                $google2fa = new \PragmaRX\Google2FA\Google2FA();
                                                $qrUrl = $google2fa->getQRCodeUrl(
                                                    config('app.name'),
                                                    auth()->user()->email,
                                                    $secret
                                                );
                                                echo \QrCode::format('svg')->size(150)->generate($qrUrl);
                                            @endphp
                                            </div>
                                            <p  class="mt-3">Or</p>
                                            <p  class="mb-3">Copy the Auth Secret and enter on your Authenticator app</p>
                                            <div class="flex w-fit mt-6 border border-base-content/10 rounded-md focus:outline-0" x-data="{
                                                secret:$wire.entangle('secret').live
                                                }">
                                                <div class="flex-2"><input class="w-fit text-xs rounded-md rounded-tr-none rounded-br-none px-4 py-3 bg-base-300 "
                                                    x-model="secret" x-ref="authsecret" type="text" readonly></div>
                                                <div @click="navigator.clipboard.writeText($refs.authsecret.value);showToast('Auth Secret Copied', 'success')"  class="flex-none w-12 rounded-tr-md rounded-br-md bg-base-300 flex items-center justify-center cursor-pointer">
                                                    <x-hugeicons-copy-01 class="w-10"/>
                                                </div>
                                            </div>
                                            <p  class="my-3">Enter Otp from Authenticator App below</p>
                                            {{-- <img src="{{ $qrCode }}" alt="QR Code"> --}}
                                            <div class="mt-4" x-data="{ otpprocessing: false }">
                                                {{-- <input label="Enter OTP from App" wire:model.defer="otp" /> --}}
                                                <div x-data x-ref="otppin">
                                                    <x-pin id="enableotp" wire:model.live="otp" size="6" @completed="otpprocessing = true"
                                                    @incomplete="otpprocessing = false" numeric
                                                    x-on:paste.window="
                                                        const e = $event;
                                                        const pasted = (e.clipboardData || window.clipboardData).getData('text');
                                                        const otpinputs = $refs.otppin.querySelectorAll('input');

                                                        if (pasted.length === otpinputs.length) {
                                                            inputs = pasted.split('');
                                                            $dispatch('completed', pasted); // Trigger completed manually
                                                        }else{
                                                            inputs = pasted.split('');
                                                        }
                                                    "
                                                    x-data x-on:resetotp.window="
                                                            const resetval = '';
                                                            $dispatch('incomplete', resetval);
                                                            inputs = inputs.map(() => '');
                                                            otpprocessing = false;
                                                        "
                                                    
                                                    x-data
                                                    />
                                                </div>
                                                
                                                <template x-if="otpprocessing">
                                                    <x-button wire:click="enableTwoFactor" class="btn-primary w-fit mt-3" spinner="enableTwoFactor">Verify & Enable</x-button>
                                                </template>
                                                
                                            </div>
                                        @else
                                            <x-button wire:click="generateSecret" class="btn-primary w-fit" spinner="generateSecret">Start 2FA Setup</x-button>
                                        @endif
                                    @else
                                        <div x-data="{
                                            disabling:false,
                                            otpprocessing: false,
                                        }">

                                            <div x-show="!disabling">
                                                <p>2FA is currently <strong>enabled</strong>.</p>
                                                <x-button @click="disabling = true" class="btn-error w-fit">Disable 2FA</x-button>
                                            </div>

                                            <div x-show="disabling">
                                                <p class="mb-3">Enter Authenticator Code </br> <small> (from your Authenticator App) </small></p>
                                                <div x-data x-ref="otppin2">
                                                    <x-pin id="disableotppin" wire:model.live="disableotp" size="6" @completed="otpprocessing = true"
                                                        @incomplete="otpprocessing = false" numeric 
                                                        x-on:paste.window="
                                                            const e = $event;
                                                            const pasted = (e.clipboardData || window.clipboardData).getData('text');
                                                            const otpinputs = $refs.otppin2.querySelectorAll('input');

                                                            if (pasted.length === otpinputs.length) {
                                                                inputs = pasted.split('');
                                                                $dispatch('completed', pasted); // Trigger completed manually
                                                            }else{
                                                                inputs = pasted.split('');
                                                            }
                                                        "
                                                        x-data x-on:resetotp.window="
                                                            const resetval = '';
                                                            $dispatch('incomplete', resetval);
                                                            inputs = inputs.map(() => '');
                                                            otpprocessing = false;
                                                        "
                                                        x-data
                                                        />
                                                </div>
                                                
                                                <template x-if="otpprocessing" >
                                                    <x-button wire:click="disableTwoFactor" class="btn-primary w-fit mt-3" spinner="disableTwoFactor">Disable 2FA</x-button>
                                                </template>
                                            </div>
                                        </div>
                                        
                                    @endif
                                </div>
                            </x-tab>
                        </x-tabs>
                    </div>
                    
                </x-tab>
                <x-tab name="account-referals-tab" label="Referals" icon="c-user-group">
                    <div class="container mx-auto py-2 lg:max-h-[75vh] max-h-[63vh]  overflow-y-scroll">
                        <x-tabs wire:model="referalTab">
                            <x-tab name="affiliate-referals-tab" label="Affiliate Program" class="!pt-0">
                                <div class="container mx-auto py-2">
                                    <!-- Deposit history(desktop) -->
                                    <div class="w-full">
                                        <div class="container mx-auto">
                                            <div class="flex justify-between mb-4">
                                                <div class="space-y-2">
                                                    <h3 class=" text-xs font-bold">TOTAL COMMISSIONS: </h3>
                                                    <span class="text-xl font-bold">@money(floor($totalCommissionEarnings * 100) / 100)</span>
                                                </div>
                                                <div class="mt-2">
                                                    <x-button
                                                        class="rounded-xl btn-xs btn-soft bg-[#db36c592] text-white [&>.block>svg]:w-3 shadow-lg"
                                                        wire:click="howitworksModal = true;">
                                                        <x-icon name="m-tag"  class="w-3"/>
                                                        <span>How it works</span>
                                                        <x-icon name="o-chevron-right" class="w-3"/>
                                                    </x-button>
                                                </div>
                                            </div>
                                            <div class=" font-bold my-2 mt-6">Referral link</div>
                                            <div class="flex border-2 border-base-content/10 rounded-md focus:outline-0">
                                                <div class="flex-1">
                                                    <input x-ref="reflinkuser" id="userreflink" value="{{ url('/') }}/user/auth/register/{{ Auth::User()->refcode }}" class="w-full text-xs rounded-md rounded-tr-none rounded-br-none px-4 py-4 bg-base-300" type="text" readonly>
                                                </div>
                                                
                                                <div @click="navigator.clipboard.writeText($refs.reflinkuser.value);showToast('Copied', 'success')"  class="flex-none w-12 rounded-tr-md rounded-br-md bg-base-300 flex items-center justify-center cursor-pointer">
                                                    <x-hugeicons-copy-01 class="w-10"/>
                                                </div>
                                            </div>
                                            <div class="flex mt-2">
                                                <div class="flex items-center justify-center">
                                                    <div class=" font-bold">Share to earn</div>
                                                </div>
                                                <div class="flex space-x-3">
                                                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ url('/') }}/user/register/{{ Auth::User()->refcode }}" target="_blank" rel="noreferrer">
                                                        <x-hugeicons-facebook-02  />
                                                    </a>
                                                    <a href="https://twitter.com/intent/tweet?url={{ url('/') }}/user/register/{{ Auth::User()->refcode }}" target="_blank" rel="noreferrer">
                                                        <x-hugeicons-new-twitter-rectangle />
                                                    </a>
                                                    <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ url('/') }}/user/register/{{ Auth::User()->refcode }}" target="_blank" rel="noreferrer">
                                                        <x-hugeicons-linkedin-01 />
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="flex flex-col mt-2">
                                                <div class="overflow-x-auto h-96 lg:h-[32rem]">
                                                    <div class="p-1.5 min-w-full inline-block align-middle">
                                                        <div class="border-2 border-base-content/10 overflow-hidden pb-[200px]">
                                                            <table class="min-w-full overflow-y-scroll divide-y-1 divide-[#2A2B39]">
                                                                <thead class="bg-base-300">
                                                                    <tr>
                                                                        <th scope="col" class="px-6 py-3 text-start text-md font-bold ">
                                                                            Level 1 <span class="text-xs font-bold">(8% on deposits)</span></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="divide-y-1 divide-[#2A2B39]">
                                                                    <tr>
                                                                        <td class="px-6 py-4 whitespace-nowrap text-xs ">
                                                                            @foreach ($firstLevelDownlines as $fld)
                                                                            <span
                                                                            class="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-2xl text-xs font-bold border-2 border-primary ">{{ $fld }}</span>
                                                                            @endforeach
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table class="min-w-full overflow-y-scroll divide-y-1 divide-[#2A2B39] my-8">
                                                                <thead class="bg-base-300">
                                                                    <tr>
                                                                        <th scope="col" class="px-6 py-3 text-start text-md font-bold ">
                                                                            Level 2 <span class="text-xs font-bold">(4% on deposits)</span></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="divide-y-1 divide-[#2A2B39]">
                                                                    <tr>
                                                                        <td class="px-6 py-4 whitespace-nowrap text-xs ">
                                                                            @foreach ($secondLevelDownlines as $sld)
                                                                            <span
                                                                            class="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-2xl text-xs font-bold border-2 border-primary ">{{ $sld }}</span>
                                                                            @endforeach
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table class="min-w-full overflow-y-scroll divide-y-1 divide-[#2A2B39]">
                                                                <thead class="bg-base-300">
                                                                    <tr>
                                                                        <th scope="col" class="px-6 py-3 text-start text-md font-bold ">
                                                                            Level 3 <span class="text-xs font-bold">(2% on deposits)</span></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="divide-y-1 divide-[#2A2B39]">
                                                                    <tr>
                                                                        <td class="px-6 py-4 whitespace-nowrap text-xs ">
                                                                            @foreach ($thirdLevelDownlines as $tld)
                                                                            <span
                                                                            class="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-2xl text-xs font-bold border-2 border-primary ">{{ $tld }}</span>
                                                                            @endforeach
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </x-tab>
                            <x-tab name="transaction-referals-tab" label="Transactions" >
                                <div class="container mx-auto">
                                    @php
                                        $depositheaders = [
                                            ['key' => 'amount', 'label' => 'Amount', 'format' => ['currency', '2.', '$ ']],
                                            ['key' => 'created_at', 'label' => 'Date', 'format' => ['date', 'd/m/Y']],
                                        ];
                                    @endphp
                                    <x-table :headers="$depositheaders" :rows="$deposits" striped >
                                        <x-slot:empty>
                                            {{-- <img src="/images/notransactions.gif" class="w-30 align-center" /> --}}
                                            <x-icon name="o-cube" label="No Transactions Yet" />
                                        </x-slot:empty>
                                    </x-table>
                                </div>
                            </x-tab>
                            {{-- <x-tab name="materials-referals-tab" label="Materials" >
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    @foreach ([
                                        ['src' => 'https://picsum.photos/300/200', 'alt' => 'image 1', 'width' => '300', 'height' => '200'],
                                        ['src' => 'https://picsum.photos/400/300', 'alt' => 'image 2', 'width' => '400', 'height' => '300'],
                                        ['src' => 'https://picsum.photos/500/400', 'alt' => 'image 3', 'width' => '500', 'height' => '400'],
                                        ['src' => 'https://picsum.photos/600/500', 'alt' => 'image 4', 'width' => '600', 'height' => '500'],
                                        ['src' => 'https://picsum.photos/700/600', 'alt' => 'image 5', 'width' => '700', 'height' => '600'],
                                    ] as $image)
                                        <div class="relative">
                                            <img src="{{ $image['src'] }}" alt="{{ $image['alt'] }}" width="{{ $image['width'] }}" height="{{ $image['height'] }}" class="w-full h-auto">
                                            <div class="absolute inset-x-0 bottom-0 p-2 bg-black bg-opacity-50 text-white text-center">
                                                <a href="{{ $image['src'] }}" download class="block w-full text-sm font-bold">Download</a>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </x-tab> --}}
                        </x-tabs>
                    </div>
                </x-tab>
                <x-tab name="account-faqs-tab" label="Faq" icon="c-arrow-up-tray">
                    <div>
                        <x-accordion wire:model="group">
                            <x-collapse name="group1">
                                <x-slot:heading>How does {{ config('app.name') }} work?</x-slot:heading>
                                <x-slot:content>
                                    {{ config('app.name') }} is an automated AI trading bot that helps you trade the forex and crypto market easily with a proven scalping strategy powered by a strong algorithm that opens and closes trades within seconds, targeting small profits that accumulate over time.
                                </x-slot:content>
                            </x-collapse>
                            <x-collapse name="group2">
                                <x-slot:heading>Do I need trading skills to earn?</x-slot:heading>
                                <x-slot:content>
                                    No. You don’t need any trading knowledge. The AI bot handles trades for you, making it beginner-friendly and fully automated.
                                </x-slot:content>
                            </x-collapse>
                            <x-collapse name="group3">
                                <x-slot:heading>Are there any fees?</x-slot:heading>
                                <x-slot:content>
                                    Yes, a 1% fee is deducted from profits made — not your capital. If you earn $100, only $1 is charged as fee.
                                </x-slot:content>
                            </x-collapse>
                            <x-collapse name="group4">
                                <x-slot:heading>Is my fund safe?</x-slot:heading>
                                <x-slot:content>
                                    Yes. Your capital is 100% safe and returned after every trade. Withdrawals are guaranteed at any time.
                                </x-slot:content>
                            </x-collapse>
                            <x-collapse name="group5">
                                <x-slot:heading>How fast is deposit and withdrawal?</x-slot:heading>
                                <x-slot:content>
                                    Deposits and withdrawals are processed instantly, typically within 30 minutes via crypto, with zero fees.
                                </x-slot:content>
                            </x-collapse>
                            <x-collapse name="group6">
                                <x-slot:heading>Does {{ config('app.name') }} increase my returns daily?</x-slot:heading>
                                <x-slot:content>
                                    Yes. It uses a scalping strategy with AI to increase returns daily while managing risk through automated adjustments.
                                </x-slot:content>
                            </x-collapse>
                            <x-collapse name="group7">
                                <x-slot:heading>What is the minimum deposit and withdrawal?</x-slot:heading>
                                <x-slot:content>
                                    Minimum deposit is $100; minimum withdrawal is $10. You can deposit and withdraw as often as needed.
                                </x-slot:content>
                            </x-collapse>
                            <x-collapse name="group8">
                                <x-slot:heading>What else do I need to know?</x-slot:heading>
                                <x-slot:content>
                                    There are 4 AI strategies to choose from. It trades weekdays (forex & crypto) and weekends (crypto only). Live support is available globally.
                                </x-slot:content>
                            </x-collapse>
                        </x-accordion>
                    </div>
                </x-tab>
            </x-tabs>
        </div>
        <div class="col">
            
        </div>
    </div>

    
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

            <h1><b>Level 1 – Direct Referrals: 8% Commission</b></h1>
            <p>
                When someone signs up using your referral link, they become your Level 1 referral. You’ll earn 8% commission on all their deposits.
            </p>
            <br>
            <h1><b>Level 2 – Indirect Referrals: 4% Commission</b></h1>
            <p>
                If your Level 1 referral invites someone else to join, that person becomes your Level 2 referral. You’ll earn 4% commission on all their deposits.
            </p>
            <br>
            <h1><b>Level 3 – Extended Network: 2% Commission</b></h1>
            <p>
                If your Level 2 referral brings in a new user, that person becomes your Level 3 referral. You’ll still earn a 2% commission on all their deposits.
            </p>

        </div>
        
    </x-modal>
</div>
