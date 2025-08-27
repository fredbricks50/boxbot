<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\Coins;

class CoinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coinRecords = [
            [
                'id'=> 1, 
                'coin_name'=>'Bitcoin', 
                'coin_code'=>'btc',
                'coin_wallet'=>'test',
                'coin_qr'=>'',
            ]
        ];
        Coins::insert($coinRecords);
    }
}
