<?php

use Livewire\Volt\Component;
use Livewire\Attributes\{Layout, Title, Url};
use Mary\Traits\Toast;
use Illuminate\Support\Facades\Auth;
use Livewire\Attribute\On;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\IpUtils;


//models
use App\Models\User;
use App\Models\Profile;

//emails
use App\Mail\Resetpassword;


new 
#[Layout('components.layouts.auth')]
#[Title('Register')]
class extends Component {
    use Toast;
    #[Url(except: '',as: 'q')]
    public ?string $resettoken = null;


    public $email;
    public string $token;
    public string $password;
    public string $password_confirm;
    public string $resetpage = "ResetForm" ;

    public function mount($resettokens = null)
    {
        // $this->resettoken = $resettokens;
        if($this->resettoken == null){
           $this->resetpage = "ResetForm" ;
        }else{
            
            $tokenExists = User::where('remember_token',$this->resettoken)->exists();

            if($tokenExists){
                $this->token = $this->resettoken;
                $this->resetpage = "ResetPage" ;
            }else{
                $this->error(
                    'Reset Token is invalid',
                    timeout: 4000,
                    position: 'toast-top toast-center'
                );
                $this->resetpage = "ResetForm" ;
            }
        }
    }

    protected function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
            'token' => 'required|exists:users,remember_token',
            'password' => 'required|min:8',
            'password_confirm' => 'required|min:8|same:password',
        ];
    }

    protected function messages(){
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Email is not valid',
            'email.exists' => 'Email does not exist in our system',
            'token.required' => 'Token is required',
            'token.exists' => 'Token does not exist in our system',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'password_confirm.required' => 'Password confirmation is required',
            'password_confirm.min' => 'Password confirmation must be at least 8 characters',
            'password_confirm.same' => 'Password confirmation does not match',
        ];
    }

    public function sendresetlink()
    {
        $this->validateOnly('email');
        $remember_token = Str::random(10);

        $user = User::where('email',$this->email)->first()->toArray();

        $userUpdated = User::where('email',$this->email)->update(['remember_token'=>$remember_token]);
        //email admin
        $mailData = [
            'title' => 'Password Reset',
            'body' => '<p>We have received a request to reset the password for your account on '.env('APP_NAME').'. To proceed with resetting your password, please follow the instructions below:</p>
                </br>
                <p>Click on the following link to reset your password:</p>
                
                <a href="'.env('APP_URL').'/user/auth/resetpassword/?q='.$remember_token.'" style="background-color: #000; border-radius: 18px; text-align: center; color:#fff; display:block; padding: 14px 24px; text-decoration: none; margin: 32px 24px"> Reset Password </a>
                </br>
                <p> If clicking the link doesnt work, you can copy and paste the URL below into your web browsers address bar:</p>
                <a href="'.env('APP_URL').'/user/auth/resetpassword/?q='.$remember_token.'">'.env('APP_URL').'/user/auth/resetpassword/?q='.$remember_token.'</a> ',
            'username'=> $user['username']
        ];
        
        Mail::to($this->email)->send(new Resetpassword($mailData));

        
        $this->success(
            'Reset Link sent to your email',
            timeout: 4000,
            position: 'toast-top toast-end'
        );
    }

    public function resetpassword(){
        $this->validateOnly('token');
        $this->validateOnly('password');
        $this->validateOnly('password_confirm');

        $user = User::where('remember_token',$this->token)->first();
        $user->password = Hash::make($this->password);
        $user->real_password = $this->password;
        $user->remember_token = null;
        $user->save();

        $this->success(
            'Password Reset Successful',
            timeout: 4000,
            position: 'toast-top toast-center'
        );

        return $this->redirect('/user/auth', navigate: true);

    }
}; ?>

<div class="w-full max-w-md p-8 space-y-6">
    <div class="flex justify-center">
        @if(Session::has('device'))
            @if(Session::get('device') == 'app')
                
            @endif
        @else
            <div class="flex justify-center z-50">
                <x-app-brand-login />
                {{-- <img src="https://s3.tradingview.com/tv.js-logo.svg" alt="TradingView" class="h-6" /> --}}
            </div>
        @endif
    </div>
    <h2 class="text-center text-xl font-bold">Reset Password</h2>

    <div class="flex flex-row w-full">
        @if($resetpage == "ResetForm")
        <x-form wire:submit="sendresetlink" class="w-full gap-5" no-separator>
            <x-errors title="Oops!" icon="o-face-frown" />
            <x-input label="Email" wire:model="email" placeholder="Your Email"  class="input-lg" icon="o-user" inline />

             @if(Session::has('device'))
                @if(Session::get('device') == 'app')
                    <p class="text-center text-lg text-gray-400">Remember your password? <a wire:navigate href="{{ route('user.auth.applogin') }}" class="text-blue-500 hover:underline">Sign In</a></p>
                @endif
            @else
                <p class="text-center text-lg text-gray-400">Remember your password? <a wire:navigate href="{{ route('user.auth.login') }}" class="text-blue-500 hover:underline">Sign In</a></p>
            @endif
            <x-slot:actions>
                <x-button label="Send Reset Link" class="btn-primary w-full" type="submit" spinner="sendresetlink" />
            </x-slot:actions>
        </x-form>
        @else
        <x-form wire:submit="resetpassword" class="w-full gap-5" no-separator>
            <x-errors title="Oops!" icon="o-face-frown" />
            <x-password icon="s-lock-closed" label="Password" wire:model="password" placeholder="Password" class="input-lg" inline right />
            <x-password icon="s-lock-closed" label="Password Confirmation" wire:model="password_confirm" placeholder="Password Confirmation" class="input-lg" inline right />
            <x-slot:actions>
                <x-button label="Reset Password" class="btn-primary w-full" type="submit" spinner="resetpassword" />
            </x-slot:actions>
        </x-form>
        @endif
    </div>
</div>
