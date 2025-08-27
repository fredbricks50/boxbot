<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_wallets', function (Blueprint $table) {
            $table->id();
              // Define the foreign key columns
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade'); // If user is deleted, wallet goes too

            $table->foreignId('coin_id')
                ->constrained('coins')
                ->onDelete('cascade');

            $table->string('wallet_address')->nullable();
            $table->string('wallet_passphrase')->nullable(); // consider encrypting this for security

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_wallets');
    }
};
