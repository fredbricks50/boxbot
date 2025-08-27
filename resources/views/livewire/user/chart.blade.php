<?php

use Livewire\Volt\Component;

new class extends Component {
    public $profit;
    public $position;
    public $orders;
    public $totalBalance;

    public $chartData = [
        'orders' => 0,
        'remaining' => 0,
    ];

    public function loadData()
    {
        // Ideally, you fetch this data dynamically
        $this->profit = -42.66;
        $this->position = 0.510578;
        $this->orders = 53092.64;
        $this->totalBalance = 101433.05;

        $this->chartData = [
            'orders' => $this->orders,
            'remaining' => $this->totalBalance - $this->orders,
        ];
    }
}; ?>

<div>
    <!-- AssetAllocationCard.blade.php -->
<div class="p-6 bg-gray-900 rounded-lg shadow-md text-white" wire:init="loadData" x-data="assetAllocationChart(@entagle('chartData'))">

    <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Asset allocation</h2>
        <button class="text-gray-400 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>

    <div class="flex">
        <div class="w-2/3">
            <canvas id="allocationChart"></canvas>
            <div class="text-center mt-4">
                <div class="text-xl font-bold">{{ number_format($totalBalance, 2) }} USDT</div>
            </div>
        </div>

        <div class="w-1/3 pl-4 space-y-4">
            <div class="flex items-center">
                <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <div>
                    <div class="text-sm text-gray-400">Profit, USDT</div>
                    <div class="font-semibold">{{ $profit }}</div>
                </div>
            </div>
            <div class="flex items-center">
                <span class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                <div>
                    <div class="text-sm text-gray-400">Position, BTC</div>
                    <div class="font-semibold">{{ $position }}</div>
                </div>
            </div>
            <div class="flex items-center">
                <span class="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                <div>
                    <div class="text-sm text-gray-400">Orders, USDT</div>
                    <div class="font-semibold">{{ $orders }}</div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    function assetAllocationChart(chartData) {
        return {
            chart: null,

            init() {
                this.chart = new Chart(this.$refs.chart, {
                    type: 'doughnut',
                    data: {
                        labels: ['Orders', 'Balance'],
                        datasets: [{
                            data: [chartData.orders, chartData.remaining],
                            backgroundColor: ['#facc15', '#4b5563'],
                            borderWidth: 0,
                        }]
                    },
                    options: {
                        cutout: '75%',
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });

                this.$watch('chartData', (newData) => {
                    this.chart.data.datasets[0].data = [newData.orders, newData.remaining];
                    this.chart.update();
                });
            }
        }
    }
</script>

</div>
@assets
{{-- Chart.js  --}}
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
@endassets



