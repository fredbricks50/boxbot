<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $adminRecords = [
            [
                'id'=> 1, 
                'name'=>'Newaibot admin', 
                'type'=>'admin',
                'vendor_id'=>'0',
                'mobile'=>'8373839383', 
                'email'=>'support@telegrambot.com', 
                'password'=> Hash::make('Admintelegrambot50@'),
                'image'=>'',
                'status'=>1 
            ]
        ];
        admin::insert($adminRecords);
    }
}
