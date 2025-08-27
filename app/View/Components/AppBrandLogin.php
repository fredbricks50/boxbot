<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AppBrandLogin extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return <<<'HTML'
                <a href="/">
                    <!-- Hidden when collapsed -->
                    <div>
                        <div class="flex items-center gap-2">
                            <img src="/assets/img/utoronlogo.png" class="w-40"/> 
                           
                            <!-- <span class="font-bold text-3xl me-3 bg-gradient-to-r from-purple-500 to-pink-300 bg-clip-text text-transparent ">
                                Utoron
                            </span> -->
                        </div>
                    </div>

                    
                </a>
            HTML;
    }
}
