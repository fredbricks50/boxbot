<?php

use Livewire\Volt\Component;
use App\Models\User;
use Mary\Traits\Toast;

new class extends Component {
    use Toast;


    public bool $accountdrawer;
    public bool $withdrawdrawer;
    //get user
    public array $user;
    public function mount()
    {
        $this->user = User::where('id', Auth::User()->id)->first()->toArray();
    }

    public static function placeholder(): \Illuminate\View\View
    {
        return view('livewire.user.placeholder');
    }

    public function copyToClipboard()
    {
        $this->success(
            'Referral link copied to clipboard',
            timeout: 3000,
            position: 'toast-top toast-middle'
        );
    }



}; ?>

<div x-data="{ withdrawchecked: false }"
    x-on:confirmwithdrawsuccessfull.window="
    withdrawchecked = !withdrawchecked;
    "
    >
    <div class="container px-0 lg:h-auto">
        <div class="mt-4 flex items-center space-x-3">
            <div class="flex-none">
                <x-icon name="s-user" class="w-12 h-12 bg-orange-500 text-white p-2 rounded-full" />
                {{-- <x-avatar :image="'/userassets/images/svg/user.svg'" class="!w-10" /> --}}
                {{-- <img src="{{ asset('userassets/images/svg/user.svg') }}" alt=""> --}}
            </div>
            <div class="flex-1 ">
                <span class=" text-lg">{{ auth()->user()->username }}</span>
                {{-- <div class="font-bold">{{ auth()->user()->username }}</div> --}}
                <div class="text-sm">
                    <span class="text-[#98A4B3]">ID</span> <div class="inline bg-primary rounded-lg py-1 text-xs text-white px-2 w-full">{{ auth()->user()->email }}</div>
                </div>
            </div>
        </div>

        <div class="my-3">
            <div class=" font-bold mb-1">Referral link</div>
            <div class="flex border border-base-content/10 rounded-md focus:outline-0">
                <div class="flex-1">
                    <input x-ref="reflink" id="userref" value="{{ url('/') }}/user/auth/register/{{ $user['refcode'] }}" class="w-full text-xs rounded-md rounded-tr-none rounded-br-none px-4 py-4 bg-base-300 font-bold" type="text" readonly>
                </div>
                {{-- wire:click="copyToClipboard" --}}
                <div @click="navigator.clipboard.writeText($refs.reflink.value);showToast('Copied', 'success')" class="flex-none w-12 rounded-tr-md rounded-br-md bg-base-300 flex items-center justify-center cursor-pointer">
                    <x-hugeicons-copy-01 class="w-10"/>
                    {{-- <img src="{{ asset('userassets/icons/duplicate.svg') }}"> --}}
                </div>
            </div>
        </div>

        <div class="flex">
            <div class="flex-1 text-lg font-bold ">
                Live Account Balance
            </div>
            <div class="flex-1 font-bold text-lg  text-end">@money(floor($user['balance'] * 100) / 100)</div>
        </div>

        <div class="my-2">
            <button for="withdraw-drawer" class="bg-primary rounded-lg py-3 px-2 w-full text-center cursor-pointer" @click="withdrawchecked = !withdrawchecked" >
                <x-icon name="m-arrow-up-tray" class="text-white w-6"/>
                <span class="text-sm text-white font-bold inline">Withdraw</span>
            </button>
        </div>

        <div class="mt-5">
            <a @click="loading = true;" href="{{ route('history.view', ['t' => 'deposit']) }}" wire:navigate>
                <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300 cursor-pointer">
                    <div class="flex-none">
                        <x-icon name="m-arrow-down-tray" class="w-6"/>
                    </div>
                    <div class="flex-1"><p class="font-bold text-sm">Deposit history</p></div>
                    <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                </div>
            </a>
        </div>

        <div class="my-1">
            <a @click="loading = true;" href="{{ route('history.view', ['t' => 'withdraw']) }}" wire:navigate>
                <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300 cursor-pointer">
                    <div class="flex-none">
                        <x-icon name="m-arrow-up-tray" class="w-6"/>
                    </div>
                    <div class="flex-1"><p class="font-bold text-sm">Withdrawal history</p></div>
                    <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                </div>
            </a>
        </div>

        <div>
            <a @click="loading = true;" href="{{ route('history.view') }}">
                <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300">
                    <div class="flex-none">
                        <x-icon name="o-presentation-chart-line" class="w-6"/>
                    </div>
                    <div class="flex-1"><p class="font-bold  text-sm">Trading history</p></div>
                    <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                </div>
            </a>
        </div>

        <div class="mt-1 mb-1">
            <a @click="loading = true;" href="{{ route('account.view', ['t' => 'referral']) }}" wire:navigate>
                <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300">
                    <div class="flex-none">
                        <x-icon name="o-user-group" class="w-6"/>
                    </div>
                    <div class="flex-1"><p class="font-bold  text-sm">Referrals</p></div>
                    <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                </div>
            </a>
        </div>

        <div class="mt-1 mb-1">
            <a @click="loading = true;" href="{{ route('account.view') }}" wire:navigate>
                <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300">
                    <div class="flex-none">
                        <x-icon name="o-cog-6-tooth" class="w-6"/>
                    </div>
                    <div class="flex-1"><p class="font-bold  text-sm">Settings</p></div>
                    <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                </div>
            </a>
        </div>

        <div class="mt-1 mb-1">
            <a @click="loading = true;" href="{{ route('account.view', ['t' => 'faq']) }}" wire:navigate>
                <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300">
                    <div class="flex-none">
                        <x-icon name="o-question-mark-circle" class="w-6"/>
                    </div>
                    <div class="flex-1"><p class="font-bold  text-sm">FAQ</p></div>
                    <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                </div>
            </a>
        </div>

        <div>
            @if(Session::has('device'))
                @if(Session::get('device') == 'app')
                <a href="/user/applogout">
                    <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300">
                        <div class="flex-none">
                            <img src="{{ asset('userassets/icons/logout-icon-mobile.svg') }}" alt="">
                        </div>
                        <div class="flex-1"><p class="font-bold text-[#FF5765] text-sm">Logout</p></div>
                        <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                    </div>
                </a>
                @endif
            @else
            <a href="/user/logout">
                <div class="flex items-center space-x-3 border border-base-content/10 rounded-md p-3 bg-base-300">
                    <div class="flex-none">
                        <img src="{{ asset('userassets/icons/logout-icon-mobile.svg') }}" alt="">
                    </div>
                    <div class="flex-1"><p class="font-bold text-[#FF5765] text-sm">Logout</p></div>
                    <div class="flex-none">
                        <x-icon name="o-chevron-right" class="w-6" />
                    </div>
                </div>
            </a>
            @endif
        </div>
    </div>

    <div class="drawer drawer-end">
        <input id="withdraw-drawer" type="checkbox" class="drawer-toggle" x-model="withdrawchecked" />
        <div class="drawer-content">
          <!-- Page content here -->
          {{-- <label for="withdraw-drawer" class="btn btn-primary drawer-button">Open drawer</label> --}}
        </div>
        <div class="drawer-side ">
          <label for="withdraw-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          <div class="bg-base-200 text-base-content min-h-full p-4 w-full">
            <livewire:user.drawers.withdraw />
          </div>
        </div>
    </div>
</div>
