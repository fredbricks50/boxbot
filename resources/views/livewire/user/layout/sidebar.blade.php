<?php

use Livewire\Volt\Component;

new class extends Component {
    public bool $accountdrawer = false;
    public bool $supportdrawer = false;
    public bool $historydrawer = false;
    public bool $robotdrawer = false;


    function goto($url)
    {
      return $this->redirect($url, navigate: true);
    }
    
}; ?>

<div x-data="{test:false}">
    <div class="z-4 lg:flex hidden flex-col !h-[93%] justify-between lg:fixed border-r border-base-content/10 bg-base-100" :class="collapsed ? 'lg:w-[64px]' : 'lg:w-[200px]'" x-cloak>
      {{-- BRAND --}}
      <x-app-brand-mobile class="px-5 pt-4 lg:hidden" />
      {{-- MENU --}}
      <x-menu x-data="{}" class="mt-6">

          {{-- User --}}
          {{-- <x-menu-item title="Hello" icon="o-sparkles" link="/" /> --}}
          <x-user.menu-item title="Robot" icon="m-presentation-chart-line" link="/user/dashboard"/> 
          {{-- <x-user.menu-item title="Bot" icon="o-sparkles" wire:click="$toggle('robotdrawer')"/>  --}}
          <x-user.menu-item title="History" icon="s-clock" link="/user/history" class="{{ Route::currentRouteName() == 'history.view' ? '!text-primary' : '' }}"/> 
          
          <x-user.menu-item title="Support" icon="s-chat-bubble-left-ellipsis" wire:click="$toggle('supportdrawer')"/> 

          <x-user.menu-item title="Account" icon="s-user" link="" wire:click="$toggle('accountdrawer')"/> 


          
          
          {{-- <x-menu-sub title="Settings" icon="o-cog-6-tooth">
              <x-menu-item title="Wifi" icon="o-wifi" link="####" />
              <x-menu-item title="Archives" icon="o-archive-box" link="####" />
          </x-menu-sub> --}}
      </x-menu>

      <div>
          <x-menu>
              <x-user.menu-item title="Logout" icon="c-power" link="/user/logout" class="!text-warning" />
              <x-user.menu-item title="Collapse" icon="o-arrows-right-left" @click="collapsed = !collapsed" />
          </x-menu>
      </div>
    </div>

    <footer class="lg:hidden block z-[5000]">
      <div x-data="{
                pageactive: 1,
                init() {
                  const url = window.location.href;
                  if (url.includes('user/dashboard') && url.includes('p=strategy')) {
                    this.pageactive = 2;
                  } else if (url.includes('user/history')) {
                   
                    this.pageactive = 3;
                  } else if (url.includes('user/account')) {
                    this.pageactive = 5;
                  } else {
                    this.pageactive = 1;
                  }
                },
                setActive(value) {
                  this.pageactive = value;
                },
              }"
              x-init="init()" 
            class="dock dock-lg">
        <a
        @click="loading = true; setActive(1)"
        href="{{ route('dashboard.view') }}" wire:navigate
        class="{{ request()->fullUrlIs(route('dashboard.view')) ? 'text-primary' : '' }}"
        :class="{ 'text-primary': pageactive === 1 }"
        >
          <x-hugeicons-robotic  class="size-[1.5em]"/>
          {{-- <x-icon name="m-presentation-chart-line" class="size-[1.2em]" /> --}}
          <span class="dock-label">Robot</span>
        </a>

        <a 
        @click="loading = true;setActive(2)"
          class="{{ request()->query('p') === 'strategy' ? 'text-primary' : '' }}"
         :class="{ 'text-primary': pageactive === 2 }"
          href="{{ route('dashboard.view', ['p' => 'strategy']) }}" wire:navigate
            >
          <x-hugeicons-package-search class="size-[1.5em]"/>
          <span class="dock-label">Strategy</span>
        </a>

        
        <a
        @click="loading = true;setActive(3)"
         :class="{ 'text-primary': pageactive === 3 }"
        href="/user/history" wire:navigate
        wire:current="text-primary"
        >
          <x-hugeicons-clock-02 class="size-[1.5em]"/>
          <span class="dock-label">History</span>
        </a>

        

        <button
        wire:click="$toggle('supportdrawer')"
        >
          <x-hugeicons-customer-support class="size-[1.5em]"/>
          <span class="dock-label">Support</span>
        </button>

        <button
        wire:click="$toggle('accountdrawer')"
        >
          <x-hugeicons-user class="size-[1.5em]"/>
          <span class="dock-label">Account</span>
        </button>
      </div>
    </footer>

    <x-drawer wire:model="accountdrawer" class="w-full lg:w-1/3 !p-4 h-screen" right title="Account"
    separator
    with-close-button>
      <livewire:user.drawers.account />
    </x-drawer>

    <x-drawer wire:model="supportdrawer" class="w-full lg:w-1/3 !p-2" right title="Support"
    separator
    with-close-button>
      <livewire:user.drawers.support />
    </x-drawer>

    

    <x-drawer wire:model="historydrawer" class="w-full lg:w-1/3 !p-4" right>
      <x-header title="History" separator class="!mb-0" size="text-lg">
          <x-slot:actions>
              <x-button @click="$wire.historydrawer = false" icon="o-x-mark" class="btn-primary btn-outline" />
          </x-slot:actions>
      </x-header>
      <livewire:user.drawers.history />
    </x-drawer>


</div>
