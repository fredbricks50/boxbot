<?php
namespace App\Services;

use Telegram\Bot\Api;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use App\Models\User;


class UserService
{
  private $telegram;
  private $user;
  public function __construct($chatId)
  {
    // Initialize service dependencies here
    $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
    //get user by chatId
    $this->user = User::where('telegram_id', $chatId)->first();
  }

  public function userbalance(){

    return $this->user->balance;

  }
}