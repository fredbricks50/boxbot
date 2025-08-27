<?php

namespace App\Http\Controllers;

use App\Models\WalletConnection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletConnectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return WalletConnection::where('user_id', Auth::id())->get();
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'type' => 'required|in:api_key,seed_phrase',
            'label' => 'nullable|string|max:255',
            'value' => 'required|string|min:10',
        ]);

        $wallet = WalletConnection::create([
            'user_id' => Auth::id(),
            ...$validated,
        ]);

        return response()->json($wallet, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(WalletConnection $walletConnection)
    {
        $this->authorizeAccess($walletConnection);
        return $walletConnection;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WalletConnection $walletConnection)
    {
        $this->authorizeAccess($walletConnection);

        $validated = $request->validate([
            'label' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $walletConnection->update($validated);

        return $walletConnection;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WalletConnection $walletConnection)
    {
        $this->authorizeAccess($walletConnection);
        $walletConnection->delete();

        return response()->noContent();
    }

}
