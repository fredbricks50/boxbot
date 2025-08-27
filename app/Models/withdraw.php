<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class withdraw extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'gateway',
        'gatewayname',
        'amount',
        'userwallet_id',
        'withdraw_status'
    ];
}
