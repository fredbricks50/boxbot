<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Cookie;

class LoginController extends Controller
{
    //
    public function show()
    {
        if(Cookie::has('device')){
            return redirect('/user/applogin');
        }else{
            return view('home.login');
        }
        
    }

    public function appshow()
    {
      
        
        if(!Cookie::has('device')){
            $cookie =  Cookie::queue(Cookie::forever('device', 'app'));
           
        }
        
        return view('home.appindex')->with('link','login');
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->getCredentials();

        if(!Auth::validate($credentials)){
            return redirect()->to('user/login')->withErrors(['msg' => 'Login invalid , try with another credential']);
            // return redirect()->intended('user/login')->withErrors(['msg' => 'Login invalid , try with another credential'])->with('link','login');
            // return redirect()->intended('user/login')->with('login_error','Login was invalid, try with another credential')->with('link','login');
        }

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        Auth::login($user);

        $user = Auth::User();
        Session::put('user', $user);

        //account selector session 
        //demo and live
        Session::put('account_type', 'demo');
        Session::put('account_balance', $user->demo_balance);
        Session::put('live_balance', $user->balance);
          
        return $this->authenticated($request, $user);
    }

    public function applogin(LoginRequest $request)
    {
        $credentials = $request->getCredentials();


       
        

        // dd($credentials);
        // dd($credentials);

        if(!Auth::validate($credentials)){
            return redirect()->to('user/applogin')->withErrors(['msg' => 'Login invalid , try with another credential']);
            // return redirect()->intended('user/login')->withErrors(['msg' => 'Login invalid , try with another credential'])->with('link','login');
            // return redirect()->intended('user/login')->with('login_error','Login was invalid, try with another credential')->with('link','login');
        }

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        Auth::login($user);

        $user = Auth::User();
        Session::put('user', $user);

        //account selector session 
        //demo and live
        Session::put('account_type', 'demo');
        Session::put('account_balance', $user->demo_balance);
        Session::put('not_account_balance', $user->balance);
        Session::put('device', 'app');
                


       
        

        return $this->authenticated($request, $user);
    }

    /**
     * Handle response after user authenticated
     * 
     * @param Request $request
     * @param Auth $user
     * 
     * @return \Illuminate\Http\Response
     */
    protected function authenticated(Request $request, $user)
    {
        
        return redirect()->intended('user/dashboard')->with('login_success','Login was successfull');
    }
}
