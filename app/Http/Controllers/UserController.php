<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return $users;
    }

    public function getUser()
    {
        $users = User::all();
        return $users;
    }

    public function getUserByID($id)
    {
        $users = User::all();
        return $users;
    }

    public function addUser(Request $request)
    {
        $events = $request->all();
        $arrData = [
            'first_name' => $events['first_name'],
            'last_name' => $events['last_name'],
            'citizen_id' => $events['citizen_id'],
            'username' => $events['username'],
            'role' => $events['role'],
        ];
        $user = User::create($arrData);
        return $user;
        //return $request->all();
    }

    public function curlGetRequest($url)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
        ));

        $response = curl_exec($curl);
        $data = json_decode($response, true);
        curl_close($curl);

        return $data;
    }

    public function getCurrentDate()
    {
        $current = Carbon::now();

        $two = $current->previous(2);
        $string = $two->toDateTimeString();

        $temp = explode(' ',$string);
        $date = $temp[0];
        $date = str_replace('-', '', $date);
        return $date;
    }
}
