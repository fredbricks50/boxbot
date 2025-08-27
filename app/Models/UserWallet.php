<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'coin_id',
        'wallet_address',
        'wallet_passphrase',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // (Optional) If you’ll later have a Coin model
    public function coin()
    {
        return $this->belongsTo(Coins::class, 'coin_id');
    }
}
