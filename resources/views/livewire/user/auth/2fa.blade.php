<?php

use Livewire\Volt\Component;
use Livewire\Attributes\{Layout, Title, Url};
use Mary\Traits\Toast;
use Illuminate\Support\Facades\Auth;
use Livewire\Attribute\On;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Cookie;

use App\Models\User;
use PragmaRX\Google2FA\Google2FA;

new 
#[Layout('components.layouts.auth')]
#[Title('2fa Authentication')]
class extends Component {
    use Toast;

    public $otp;
    public $error;

    public function verify()
    {
        $userId = session('2fa:user:id');
        $user = User::find($userId);

        if (! $user || ! $user->google2fa_secret) {
            $this->error = '2FA setup missing.';
            return;
        }

        $google2fa = new Google2FA();

        if ($google2fa->verifyKey($user->google2fa_secret, $this->otp)) {
            Auth::login($user);
            session()->forget('2fa:user:id');
            $this->success(
                'Login Successful',
                timeout: 3000,
                position: 'toast-top toast-end'
            );
            return $this->redirect('/user/dashboard');


            $this->success(
                'Login Successful',
                timeout: 3000,
                position: 'toast-top toast-end'
            );
        } else {
            $this->error(
                'Invalid code. Please try again.',
                timeout: 3000,
                position: 'toast-top toast-end'
            );
        }
    }
}; ?>

<div class="w-full max-w-md p-4 space-y-6">
    @if(Session::has('device'))
        @if(Session::get('device') == 'app')
            
        @endif
    @else
         <div class="flex justify-center z-50">
            <x-app-brand-login />
            {{-- <img src="https://s3.tradingview.com/tv.js-logo.svg" alt="TradingView" class="h-6" /> --}}
        </div>
    @endif

    <div class="login !glass !py-[50px]">

        <h3 class="text-xl font-bold w-full text-center">Enter Authenticator Code </h3>
        <h5 class="w-full text-center">From your Authenticator App</h5>

        <div style="border-top: 1px solid #ccc; margin: 20px 0; padding-top: 10px; padding-bottom: 10px;"></div>

        <div class="flex flex-col w-full" x-data="{ otpprocessing: false }">
            <x-pin wire:model.live="otp" size="6" @completed="otpprocessing = true"
                @incomplete="otpprocessing = false" numeric 
                x-ref="otppin"
                x-on:paste.window="
                    const e = $event;
                    const pasted = (e.clipboardData || window.clipboardData).getData('text');
                    if (pasted.length === 6) {
                        const inputs = $refs.otppin.querySelectorAll('input');
                        [...inputs].forEach((el, i) => {
                            el.value = pasted[i] || '';
                        });
                        $dispatch('completed', pasted); // Trigger completed manually
                    }
                "
                x-data
                />
            <template x-if="otpprocessing">
                <x-button  wire:click="verify" class="btn-primary w-full mt-3" spinner="verify">Verify</x-button>
            </template>

            @if ($error)
                <p class="text-red-500 mt-2">{{ $error }}</p>
            @endif
        </div>
    </div>
</div>
