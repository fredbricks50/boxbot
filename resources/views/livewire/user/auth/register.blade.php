<?php

use Livewire\Volt\Component;
use Livewire\Attributes\{Layout, Title};
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
use App\Mail\RegistrationMail;


new 
#[Layout('components.layouts.auth')]
#[Title('Register')]
class extends Component {
    use Toast;
    public ?string $refcode = null;


    public $email;
    public $username;
    public $password;
    public $password_confirmation;
    public string $recaptchaToken = '';

    public function mount($refcode = null)
    {
        $this->refcode = $refcode;

        // $this->js("console.log('refcode {$this->refcode}');");
    }

    protected function rules()
    {
        return [
            'email' => 'required|email:rfc,dns|unique:users,email',
            'username' => 'required|unique:users,username',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'recaptchaToken' => 'required',
        ];
    }

    protected function messages(){
        return [
            'email.required' => 'Please input a valid email',
            'email.unique' => 'Please this email has been used ',
            'email.email' => 'Must be a valid email',
            'username.required' => 'Please input a valid username',
            'username.unique' => 'Please this username has been used ',
            'password.required' => 'Please input a valid password',
            'password.min' => 'Please your password should be 8 characters min ',
            'password_confirmation.required' => 'Please confirm password',
            'password_confirmation.same' => 'Please password do not match ',
            'recaptchaToken.required' => 'Please confirm you are not a robot',
        ];
    }


    public function registeruser(){
        $data = $this->validate();

        // Verify reCAPTCHA with Google
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret'   => env('RECAPTCHA_SECRET_KEY'),
            'response' => $this->recaptchaToken,
        ]);

        $result = $response->json();

        if (!($result['success'] ?? false)) {
            $this->addError('recaptchaToken', 'reCAPTCHA verification failed. Please try again.');
            $this->error(
                'Please Reconfirm you are not a robot',
                timeout: 3000,
                position: 'toast-top toast-center'
            );
        }else{
            $datecreated =  date("d-m-Y");

            // 'created_at'=>Carbon::now(),
            $userrefcode = Str::random(7);
            // $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
            // $userrefcode = substr(str_shuffle($permitted_chars), 0,6);

            if($data){
                //remove the validated['password_confirmation'] from the array
                $validated = $data;
                unset($validated['password_confirmation']);
                unset($validated['recaptchaToken']);
                $validated['status'] = 1;
                $validated['mode'] = 0; //0 for demo mode, 1 for live mode
                $validated['balance'] = 0;
                $validated['withdraw_balance'] = 0;
                $validated['demo_balance'] = 10000;
                $validated['refcode'] = $userrefcode;
                $validated['real_password'] = $this->password;
                $validated['refearned'] = 0;
            }

            //checking Ref user
            //get refferer code from signup form and give in users table to see if any user had that particular referal code
            $referExists = User::where('refcode',$this->refcode)->exists();

            //if a user has the code the assign that to value to the inserted for the current user registering
            if($referExists){
                $validated['referral_code'] = $this->refcode;

                //get the details of the referrer and parse it to $refuser
                $refuser = User::where('refcode',$this->refcode)->first()->toArray();
            }else{
                //if no user has that refcode from the form the assign null to referral code to be inserted for new user
                $validated['referral_code'] = null;
            }
                
            $user = User::create($validated);
            $lastid = User::all()->last()->id;

            $Profiledetails = [
                'users_id'=> $lastid,
                'created'=>$datecreated
            ];
            //insert into profile table with just user id and created
            $invested = Profile::create($Profiledetails);

            // dd($invested);
            if($user && $invested){
                //email registered user
                $mailData = [
                    'title' => 'Welcome To '.env('APP_NAME'),
                    'username'=> $data['username'],
                    'body'=>'
                    <p><b>Congratulations</b> — your registration was successful! You’re now just a few steps away from unlocking real profits and taking your trading journey to the next level.</p>
                    <p><strong>Here’s how to get started and start earning on '.env('APP_NAME').'</strong></p>
                    <ul>
                        <li><b>Test the Waters:</b> Experience the power of our AI trading robot with a risk-free demo account.</li>
                        <li><b>Step into the Real World:</b> Ready to earn real profits? Deposit into your Live account and start trading real assets today!</li>
                        <li><b> Enjoy Your Rewards:</b> Sit back, let the robot work, and withdraw your earnings at the end of each trading cycle.</li>
                    </ul>
                    <p>Don’t just watch — <b>take action today!</b> The sooner you fund your Live account, the sooner you start earning real money. 🚀 </p>
                    ',
                ];
                Mail::to($data['email'])->send(new RegistrationMail($mailData));

                //email Admin
                $mailData = [
                    'title' => 'New User Registration',
                    'email' => $data['email'],
                    'body' => '<p>'.$data['email'].' just signed up to '.env('APP_NAME').'</p>
                    <p><strong>Login to admin to follow up with user</strong></p>
                    ',
                    'username'=> 'Admin'
                ];
                Mail::to(env('ADMIN_EMAIL'))->send(new RegistrationMail($mailData));

                //mailing refered user
                if($referExists){
                    $mailData = [
                        'title' => 'You Refered Someone',
                        'body' => '<p>'.$data['email'].' just signed up to '.env('APP_NAME').' with your referral link</p>
                        
                        <p><strong>You will get a referal commision of 8% of their deposits , which means any time they make a deposit you get a 8% commision</strong></p>
                        ',
                        'username'=> $refuser['name']
                    ];
                    Mail::to($refuser['email'])->send(new RegistrationMail($mailData));
                }
            }

            $user = Auth::getProvider()->retrieveByCredentials($validated);
            Auth::login($user);

            $this->success(
                'Registration Successful',
                timeout: 3000,
                position: 'toast-top toast-center'
            );
             session()->flash('just_signed_up', true);

            return $this->redirect('/user/dashboard', navigate: true);
        }
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
    <h2 class="text-center text-xl font-bold">Sign Up</h2>

    <div class="flex flex-col w-full">
        <x-form wire:submit="registeruser" class="w-full gap-5" no-separator x-data="recaptchaComponent()" x-init="initCaptcha" >
            <x-input label="Email" wire:model="email" placeholder="Email"  class="input-lg" icon="o-user" inline />
            <x-input label="Username" wire:model="username" placeholder="Username"  class="input-lg" icon="o-user" inline />
            <x-password icon="s-lock-closed" label="Password" wire:model="password" placeholder="Password" class="input-lg" inline right />
            <x-password icon="s-lock-closed" label="Confirm Password" wire:model="password_confirmation" placeholder="Confirm Password" class="input-lg" inline right />
            <div class="flex flex-col w-full justify-center items-center">
                <div wire:ignore id="recaptcha" class="my-3"></div>
                @error('recaptchaToken') <span class="text-error">{{ $message }}</span> @enderror
            </div>
            @if(Session::has('device'))
                @if(Session::get('device') == 'app')
                    <p class="text-center text-lg text-gray-400">Already have an account? <a wire:navigate href="{{ route('user.auth.applogin') }}" class="text-blue-500 hover:underline">Sign In</a></p>  
                @endif
            @else
                <div class="flex flex-col text-center mt-4">
                    <p class="text-center text-lg text-gray-400">Already have an account? <a wire:navigate href="{{ route('user.auth.login') }}" class="text-blue-500 hover:underline">Sign In</a></p>  
                </div>
            @endif
            <x-slot:actions>
                <x-button label="Sign Up" class="btn-primary w-full" type="submit" spinner="registeruser" />
            </x-slot:actions>
            
        </x-form> 
        @if(Session::has('device'))
            @if(Session::get('device') == 'app')

            @endif
        @else
            <div class="flex flex-col text-center mt-4">
            <p class="text-sm text-gray-400">By pressing Sign Up, you confirm that you are of legal age and accept the <a class="text-primary fw-bold"
                    href="/terms">Terms & Conditions</a> and <a class="text-primary fw-bold" href="/privacy">Privacy
                    Policy</a> </p>
            </div>
        @endif

        <script>
            function recaptchaComponent() {
                return {
                    widgetId: null,
        
                    initCaptcha() {
                        if (window.grecaptcha) {
                            this.renderCaptcha(); 
                            // Re-render after Livewire DOM updates
                            @this.on('afterDomUpdate', () => {
                                this.renderCaptcha();
                            });
                        } else {
                            window.onloadCallback = () => {
                                this.renderCaptcha();
                                @this.on('afterDomUpdate', () => {
                                    this.renderCaptcha();
                                });
                            };
                        }
                    },
        
                    renderCaptcha() {
                        // if (this.widgetId !== null) {
                        //     grecaptcha.reset(this.widgetId);
                        //     return;
                        // };

                        setTimeout(() => {
                            this.widgetId = grecaptcha.render('recaptcha', {
                                sitekey: '{{ env("RECAPTCHA_SITE_KEY") }}',
                                callback: token => {
                                    @this.set('recaptchaToken', token);
                                },
                                'expired-callback': () => {
                                    @this.set('recaptchaToken', '');
                                }
                            });
                        }, 1000);
                    }
                }
            }
        </script>
        
        
    </div>

</div>


{{-- @section('scripts')
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>

{{-- @push('scripts')


@endpush --}}
