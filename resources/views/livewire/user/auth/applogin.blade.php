<?php

use Livewire\Volt\Component;
use Livewire\Attributes\{Layout, Title};
use Mary\Traits\Toast;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Cookie;


new 
#[Layout('components.layouts.auth')]
#[Title('Login')]
class extends Component {
    use Toast;


    public $name;
    public $email;
    public $password;
    public $amount;

    public function mount()
    {
        if(!Cookie::has('device')){
            $cookie =  Cookie::queue(Cookie::forever('device', 'app'));
           
        }
        Session::put('device', 'app');

    }

    protected function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }

    protected function messages(){
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Email is not valid',
            'password.required' => 'Password is required'
        ];
    }

    public function loginuser(){
        $validated = $this->validate();

        if(Auth::validate($validated)){
            $user = Auth::getProvider()->retrieveByCredentials($validated);

            // ✅ If 2FA is enabled, store user ID in session and redirect to OTP
            if ($user->two_factor_enabled && $user->google2fa_secret) {
                session(['2fa:user:id' => $user->id]);
                return $this->redirect('/user/2fa', navigate: true);
            }

            Auth::login($user);
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
        }else{
            $this->error(
                'Email or Password is incorrect',
                timeout: 3000,
                position: 'toast-top toast-end'
            );

            //add error to form
            $this->addError('error', 'Email or Password is incorrect');
        }
    }

    
    
    
}; ?>

<div class="w-full max-w-md p-8 space-y-6">
     @if(Session::has('device'))
        @if(Session::get('device') == 'app')
            
        @endif
    @else
         <div class="flex justify-center z-50">
            <x-app-brand-login />
            {{-- <img src="https://s3.tradingview.com/tv.js-logo.svg" alt="TradingView" class="h-6" /> --}}
        </div>
    @endif

    

    <div class="login !glass">

        <h1>Login</h1>

        <div style="border-top: 1px solid #ccc; margin: 20px 0; padding-top: 10px; padding-bottom: 10px;"></div>

        <div class="flex flex-row w-full">
            <x-form wire:submit="loginuser" class="w-full gap-5" no-separator>
                <x-errors title="Oops!" icon="o-face-frown" />
                <x-input label="Email" wire:model="email" placeholder="Your Email" class="input-lg" icon="o-user" inline />
                <x-password icon="s-lock-closed" label="Password" wire:model="password" placeholder="Password"
                    class="input-lg" inline right />
                <p class="text-center text-sm text-gray-400">Forgot password? <a wire:navigate
                        href="{{ route('user.auth.forgotpassword') }}" class="text-blue-500 hover:underline">Reset
                        Password</a></p>
                <p class="text-center text-lg text-gray-400">Don't have an account? <a wire:navigate
                        href="{{ route('user.auth.register') }}" class="text-blue-500 hover:underline">Sign Up</a></p>
                <x-slot:actions>
                    <x-button label="Login" class="btn-lg btn-primary w-full" type="submit" spinner="loginuser" />
                </x-slot:actions>
            </x-form>
        </div>

    </div><!-- End Login -->

</div>