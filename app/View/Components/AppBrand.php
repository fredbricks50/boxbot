<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AppBrand extends Component
{
    /**
     * Create a new component instance.
     */
    public $favicon;
    public function __construct()
    {
        $this->favicon = config('app.favicon');
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return <<<'HTML'
                <a  href="/user/dashboard" wire:navigate>
                    <!-- Hidden when collapsed -->
                    <div {{ $attributes->class(["hidden-when-collapsed"]) }}>
                        <div class="flex items-center gap-2">
                            <img src="{{ $favicon }}" class="w-10 -mb-1.5"/> 
                           
                            <!-- <span class="font-bold text-xl me-3 bg-gradient-to-r from-green-500 to-pink-300 bg-clip-text text-transparent hidden lg:block ">
                                Utoron
                            </span> -->
                        </div>
                    </div>

                    <!-- Display when collapsed -->
                    <div class="display-when-collapsed hidden mx-5 mt-5 mb-1 h-[28px]">
                        <img src="{{ $favicon }}" class="w-40"/> 
                    </div>
                </a>
            HTML;
    }
}
