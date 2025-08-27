<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


use App\Models\plans;

class StrategySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plansRecords = [
            [
                'id'=> 1, 
                'name' => 'Example Plan',
                'risk_type' => 'Low',
                'min_amount' => 100,
                'max_amount' => 1000,
                'min_roi_percentage' => 5,
                'max_roi_percentage' => 10,
                'order' => 1,
                'image' => 'example-image.jpg',
                'status' => '1',
                'plan_duration' => '24'
            ]
        ];
        plans::insert($plansRecords);
    }
}
