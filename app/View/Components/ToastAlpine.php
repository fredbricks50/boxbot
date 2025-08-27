<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ToastAlpine extends Component
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
                <template x-for="(toast, index) in toasts" :key="toast.id">
                    <div 
                        x-show="toast.visible"
                        x-transition:enter="transform ease-out duration-300"
                        x-transition:enter-start="translate-y-[-100%] opacity-0"
                        x-transition:enter-end="translate-y-0 opacity-100"
                        x-transition:leave="transform ease-in duration-300"
                        x-transition:leave-start="translate-y-0 opacity-100"
                        x-transition:leave-end="translate-y-[-100%] opacity-0"
                        class="toast pointer-events-auto"
                    >
                        <div class="alert flex items-center gap-2" :class="toast.type">
                            <!-- Left Icon -->
                            <x-icon name="o-user" class="w-5 h-5" />
                            <!-- Message -->
                            <span x-text="toast.message"></span>
                        </div>
                    </div>
                </template>
            HTML;
    }
}
