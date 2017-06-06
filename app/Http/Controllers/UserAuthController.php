<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserAuthController extends Controller
{
    public function loginUser(Request $request)
    {
        $username = $request->input('username');
        //Log::info('password: '.$password);
        $user = User::where('username', '=', $username)->first();
        if($user != null){
                return $user;
        }else{
            return response()->json(['msg' => 'username is incorrect']);
        }
    }
    public function logout(Request $request)
    {
        //remove all data from this session with flush
        $request->session()->flush();
        return response()->json(['msg' => 'logout complete']);
    }
}
