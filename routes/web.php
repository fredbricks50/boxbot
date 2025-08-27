<?php

use App\Http\Controllers\Admin\CoinsController;
use App\Http\Controllers\Admin\PlansController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Livewire\Volt\Volt;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['namespace' => 'App\Http\Controllers\Home'], function()
{  
    // Volt::route('/', 'home.index')->name('home.index');
    // Volt::route('/terms', 'home.terms')->name('home.terms');
    // Volt::route('/privacy', 'home.privacy')->name('home.privacy');

    //resetpassword
    // Route::match(['get','post'],'/resetpassword/{slug}', 'HomeController@resetpassword')->name('home.resetpassword');

    // Route::get('/affiliate/{id}', 'HomeController@affiliate')->name('affiliate.show');

});

Route::prefix('/admin')->namespace('App\Http\Controllers\Admin')->group(function(){
    Route::get('/', function () {
        return redirect('/login');
        
        // return redirect()->intended('/');
    });
    Route::match(['get','post'],'login', 'AdminController@login');
    
    

    Route::group(['middleware'=>['admin']], function(){
        Route::get('/','AdminController@login');

        //users route
        Route::match(['get','post'],'users', 'AdminController@users');

        //Email route
        Route::match(['get','post'],'email', 'AdminController@email');

        Route::match(['get','post'],'viewusers/{slug}', 'AdminController@viewusers');

        //Admin coin routes
        Route::resource('coins', CoinsController::class);

        //Admin investmentplans routes
        Route::resource('plans',PlansController::class);

        //Admin activitys route
        // Route::resource('activity', ActivitysController::class);

        Route::match(['get','post'],'dashboard', 'AdminController@dashboard');
        Route::get('logout','AdminController@logout');

        //deposit routes
        Route::match(['get','post'],'deposit', 'DepositController@deposit');

        //deposit routes
        Route::match(['get','post'],'withdraws', 'WithdrawController@withdraw');

        


    });

    
});


Route::prefix('/user')->namespace('App\Http\Controllers\User')->group(function(){
  Route::group(['middleware' => ['guest']], function() {

    // All Login Routes 
    Route::get('/', function () {
        return redirect('/user/auth');
        // return redirect()->intended('/');
    });

     //New Dashboard
     Volt::route('/auth', 'user.auth.login')->name('user.auth.login');
     
     Volt::route('/auth/register/{refcode?}', 'user.auth.register')->name('user.auth.register');

     Volt::route('/auth/resetpassword/{ref?}', 'user.auth.forgotpassword')->name('user.auth.forgotpassword');

    /**
     * App Register Routes
     */
    Route::get('/appregister', function () {
        return redirect('/user/appregister/null');
    });
    Route::get('/appregister/{ref}', 'RegisterController@appshow')->name('register.appshow');
    Route::post('/appregister', 'RegisterController@appregister')->name('register.appperform');
    

      /**
     * App Login Routes*
     */
    Route::get('/applogin', 'LoginController@appshow')->name('login.appshow');
    Route::post('/applogin', 'LoginController@applogin')->name('login.appperform');

  });

  Route::group(['middleware' => ['auth']], function() {
      
      //New Dashboard
      Volt::route('/dashboard', 'user.dashboard')->name('dashboard.view');  
      // Route::get('/dashboard', 'UserController@dashboard')->name('dashboard.view');

      //History route
      Volt::route('/history', 'user.history')->name('history.view');

      Volt::route('/account', 'user.account')->name('account.view');


      /**
       * Logout Routes
       */
      Route::get('/logout', 'LogoutController@perform')->name('logout.perform');
      Route::get('/applogout', 'LogoutController@appperform')->name('logout.appperform');

  });



});
