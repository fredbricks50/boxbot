<?php

use Livewire\Volt\Component;
use Livewire\Attributes\On;
use Illuminate\Support\Facades\Session;
use Mary\Traits\Toast;

use App\Models\User;
use App\Models\deposit;

new class extends Component {
    use Toast;
    public bool $depositdrawer = false;
    public bool $walletdrawer = false;
    public bool $showDrawer1 = false;
    public bool $LiveModeModal = false;
    public array $user = [];

    public bool $userdeposited = false;

    public bool $mode = false;

     #[On('open-deposit-modal')] 
    public function openDepositModal()
    {
        $this->depositdrawer = true;
        $this->dispatch('deposit-modal-opened');
    }

    #[On('openlivemodal')] 
    public function handleopenlivemodal()
    {
        $this->LiveModeModal = true;
        $this->dispatch('livemodalopen');
    }



    public function mount()
    {
        $this->user = User::where('id', Auth::User()->id)->first()->toArray();
        $this->mode = $this->user['mode'] === '0' || $this->user['mode'] === 0 ? false : true;
       

        $this->deposits = deposit::where('user_id', Auth::User()->id)->where('deposit_status', 1)->get();

        if(count($this->deposits) > 0){
            $this->userdeposited = true;
        }else{
            $this->userdeposited = false;
        }

        if (!session()->has('mode_auto_reset')) {
            if($this->userdeposited === true && $this->mode === false){
                User::where('id', Auth::User()->id)->update(['mode' => 1]);
                session()->put('mode_auto_reset', true);
                $this->dispatch('modereset');
                $this->dispatch('robotmodereset');

            }
        }

    }

    //watch for mode property change and get the session account type to demo if false or live if true and refreshing the page
    public function updatedMode()
    {
        if($this->mode === false){
            //update the user mode column to 0
            User::where('id', Auth::User()->id)->update(['mode' => 0]);
            $this->user = User::where('id', Auth::User()->id)->first()->toArray();
            $this->mode = $this->user['mode'] === 0 ? false : true;
            $this->error(
                'Switched to Demo Mode',
                timeout: 3000,
                position: 'toast-top toast-center'
            );
        }else{
            //update the user mode column to 1
            if($this->userdeposited == false){
                $this->mode = false;
                $this->LiveModeModal = true;
            }else{
                $this->LiveModeModal = false;
                User::where('id', Auth::User()->id)->update(['mode' => 1]);
                $this->user = User::where('id', Auth::User()->id)->first()->toArray();
                $this->mode = $this->user['mode'] === 0 ? false : true;
                $this->success(
                    'Switched to Live Mode',
                    timeout: 3000,
                    position: 'toast-top toast-center'
                );
            }
            
        }

        $this->dispatch('modereset');
    }

    public function setliveMode()
    {
        if($this->userdeposited == false){
            $this->mode = false;
            $this->LiveModeModal = true;
        }else{
            $this->LiveModeModal = false;
            User::where('id', Auth::User()->id)->update(['mode' => 1]);
            $this->user = User::where('id', Auth::User()->id)->first()->toArray();
            $this->mode = $this->user['mode'] === 0 ? false : true;
            $this->success(
                'Switched to Live Mode',
                timeout: 3000,
                position: 'toast-top toast-middle'
            );
        }

        $this->dispatch('modereset');
    }

    public function setdemoMode()
    {
         //update the user mode column to 0
        User::where('id', Auth::User()->id)->update(['mode' => 0]);
        $this->user = User::where('id', Auth::User()->id)->first()->toArray();
        $this->mode = $this->user['mode'] === 0 ? false : true;
        $this->error(
            'Switched to Demo Mode',
            timeout: 3000,
            position: 'toast-top toast-middle'
        );

        $this->dispatch('modereset');
    }
     #[On('robotmodereset')] 
    public function robotmodereset()
    {
        $this->user = User::where('id', Auth::User()->id)->first()->toArray();
        $this->mode = $this->user['mode'] === 0 ? false : true;
    }


    #[On('confirmdepositsuccessfull')] 
    public function confirmDepositSuccessfull()
    {
        $this->depositdrawer = false;
    }
}; ?>

<div class="sticky top-0 z-50" 
x-on:modereset.window="
        loading=false;
        "
        x-on:deposit-modal-opened.window="loading=false;" 
>
    {{-- SIDEBAR --}}
    <x-nav sticky full-width class="[&>div]:!px-2">

        <x-slot:brand class="flex align-center">   
            {{-- Drawer toggle for "main-drawer" --}}
            {{-- <label for="main-drawer" class="lg:hidden mr-3">
                <x-icon name="o-bars-2" class="cursor-pointer" />
            </label> --}}
 
            {{-- Brand --}}
            <x-app-brand class="mr-2 align-self-baseline"/>
            <div class="h-full items-end hidden lg:block mr-4">
                @if($user['mode'] == 0)
                    <span class="badge-error text-white badge badge-xs fs-6 align-bottom">Demo Mode</span>
                @else
                    <span class="badge-success text-black badge badge-xs fs-6 align-bottom">Live Mode</span>
                @endif
                
            </div>

            <div>
                <x-user.dropdown class="!min-w-[300px]">
                    <x-slot:trigger>
                        <div class="flex flex-row justify-start items-center gap-1 cursor-pointer" type="button">
                            <x-icon name="o-user" class="w-7 h-7" />
                            <div class="flex flex-col gap-0">
                                <span class="mb-0 text-sm font-bold">
                                    @if($user['mode'] == 0)
                                        Demo Account
                                    @else
                                        Live Account
                                    @endif
                                </span>
                                <span class="mb-0 text-xs font-bold">
                                    @if($user['mode'] == 0)
                                        @money($user['demo_balance'])
                                    @else
                                        @money($user['balance'])
                                    @endif
                                    <x-icon name="o-chevron-down" class="w-6"/>
                                </span>
                            </div>
                        </div>
                    </x-slot:trigger>
                    {{-- By default any click closes dropdown --}}
                    <p>Switch Mode</p>
                 
                    <x-menu-separator />
                    <div class="flex flex-col gap-2 justify-between items-center">

                        {{-- @if($user['mode'] == 0)
                            <div>Demo</div>
                        @else
                            <div>Live</div>
                        @endif
                        
                        <div>
                            <x-toggle wire:model.live="auth()->user()->mode" />
                        </div> --}}

                        <div @click="loading = true;open=false"  wire:click="setdemoMode()" class="flex flex-row justify-between items-center gap-1 cursor-pointer w-full {{ $user['mode'] == 0 ? 'bg-base-100 border border-primary' : '' }} p-2 rounded-md" type="button">
                            <div class="flex flex-col gap-0">
                                <span class="mb-0 text-sm font-bold">
                                    Demo Account
                                </span>
                                <span class="mb-0 text-xs font-bold">
                                    @money($user['demo_balance'])
                                </span>
                                
                            </div>
                            @if($user['mode'] == 0)
                            <x-heroicon-c-check-circle class="w-4  text-success justify-self-end"/>
                            @endif
                        </div>
                        <div @click="loading = true;open=false" wire:click="setliveMode()" class="flex flex-row justify-between items-center gap-1 cursor-pointer w-full {{ $user['mode'] == 1 ? 'bg-base-100 border border-primary' : '' }} p-2 rounded-md" type="button">
                            <div class="flex flex-col gap-0">
                                <span class="mb-0 text-sm">
                                    Live Account
                                </span>
                                <span class="mb-0 text-xs">
                                    @money($user['balance'])
                                </span>
                                
                            </div>
                            @if($user['mode'] == 1)
                            <x-heroicon-c-check-circle class="w-4  text-success justify-self-end"/>
                            @endif
                        </div>
                    </div>
                    
                </x-user.dropdown>
            </div>
        </x-slot:brand>

        {{-- Balance section --}}
        
 
        {{-- Right side actions --}}
        <x-slot:actions class="!gap-1 !lg:gap-4">
            <x-button label="Deposit" icon="o-wallet" class="btn-primary btn-sm !text-lg rounded" wire:click="$toggle('depositdrawer')" />

            <x-user.dropdown class="!min-w-[300px]">
                <x-slot:trigger>
                    <x-button icon="o-user" class="btn-circle btn-secondary btn-sm lg:block hidden"/>
                </x-slot:trigger>
                {{-- By default any click closes dropdown --}}
                @if(auth()->user())

                    <x-list-item :item="$user" value="name" sub-value="email" no-separator no-hover class="-mx-2 !-my-2 rounded">
                        <x-slot:actions>
                            <x-button icon="o-power" class="btn-circle btn-ghost btn-xs" tooltip-left="logoff" no-wire-navigate link="/user/logout" />
                        </x-slot:actions>
                    </x-list-item>
                @endif
                <x-menu-separator />

                <x-menu>
                    {{-- Default --}}
                    <x-menu-item title="Account Setting" icon="c-user-circle" link="/user/account" class="!px-0"/>
                    <x-menu-item title="Affiliate Program" icon="c-user-group" link="/user/account/?t=referral" class="!px-0"/>
                    <x-menu-item title="Faq" icon="c-question-mark-circle" link="/user/account/?t=faq" class="!px-0"/>
                 
                </x-menu>
                
            </x-user.dropdown>

            <x-theme-toggle class="btn-sm btn-circle" />

        </x-slot:actions>
    </x-nav>

    @if($user['mode'] == 0 && $userdeposited == false)
        <div class="flex flex-row justify-center w-full absolute py-2 z-2">
            <x-button @click="loading = true;" label="Switch to Live Mode" icon="m-tag" icon-right="o-chevron-right" 
            class="rounded-xl btn-xs btn-soft bg-[#db36c592] text-white [&>.block>svg]:w-3 shadow-lg ring-2 ring-[#db36c592] animate-pulse !focus:outline-none" 
            wire:click="setliveMode()" />
        </div>
    @endif
    
    

    {{-- Deposit Drawer --}}
    <x-drawer wire:model="depositdrawer" class="w-full lg:w-1/3 !p-4" right 
        title="Deposit"
        separator
        with-close-button
        close-on-escape>
        <livewire:user.drawers.deposit />
    </x-drawer>

    <x-drawer wire:model="walletdrawer" class="w-full lg:w-1/3" right>
        <div>...</div>
        <x-button label="Close" @click="$wire.walletdrawer = false" />
    </x-drawer>

    {{-- Livemode Modal --}}

    <x-modal x-cloak wire:model="LiveModeModal" title="Switch to Live Mode" class="!z-[100] backdrop-blur-xs 
        lg:[&>.modal-box]:w-[30%]
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
        {{-- 
            <div class="carousel w-full">
                <div id="slide1" class="carousel-item relative w-full  h-auto">
                    <img
                    src="{{ asset('images/aiindicators.png') }}"
                    class="w-full" />
                    <p class="absolute bottom-0 w-full text-white z-10 bg-black bg-opacity-50 px-2 py-1 rounded-t">Slide 1</p>
                    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" class="btn btn-circle">❮</a>
                    <a href="#slide2" class="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" class="carousel-item relative w-full">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                    class="w-full h-[300px]" />
                    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" class="btn btn-circle">❮</a>
                    <a href="#slide3" class="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" class="carousel-item relative w-full">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                    class="w-full h-[300px]" />
                    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" class="btn btn-circle">❮</a>
                    <a href="#slide4" class="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" class="carousel-item relative w-full">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                    class="w-full h-[300px]" />
                    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" class="btn btn-circle">❮</a>
                    <a href="#slide1" class="btn btn-circle">❯</a>
                    </div>
                </div>
            </div> 
        --}}
        <div class="flex">
            <img src="{{ asset('images/livemode.png') }}" class="w-full" alt="">
        </div>

        <div class="flex flex-col gap-2 mt-4">
            <p class="text-xl font-bold text-center">Start trading on Live Account</p>
            <p class="text-sm text-center font-bold text-gray-400">When you're ready to try making real profits, just switch to a real account. All you need to do is make a deposit to get started</p>
            <div class="flex flex-row gap-2 w-full">
                <x-button label="Deposit" class="rounded-lg flex-1 btn-primary btn-lg" @click="$wire.depositdrawer = true; $wire.LiveModeModal = false;"  />
                {{-- <x-button label="Cancel" icon="o-x-mark" class="flex-1 btn-secondary btn-sm" wire:click="$set('LiveModeModal', false)" /> --}}
            </div>
        </div>

     
        
    </x-modal>


</div>
