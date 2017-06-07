<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Excel;
use Log;
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
        $user = User::where('user_id',$id)->get();
        return $user;
    }

    public function addUser(Request $request)
    {
        $events = $request->all();
        $arrData = [
            'name' => $events['name'],
            'username' => $events['username'],
            'role' => $events['role'],
        ];
        $user = User::create($arrData);
        return $user;
        //return $request->all();
    }

    public function login(Request $request)
    {
        $events = $request->all();
        $user = User::where('username', $request['username']);
        return $user;
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

    public function readExcel()
    {
        $path =  "D:\\xampp\\htdocs\\QuizPersonal\\public\\Data2.xlsx";
        $data = Excel::load($path, function ($reader){
        })->get();

        $DataUser = [];

        if(!empty($data) && $data->count()){
            foreach ($data as $d) {
                $DataUser[] = ['username' => $d->username, 'name' => $d->name];
                //Log::info('###### '.$d->name);
            }
        }

        foreach ($DataUser as $User){
            User::firstOrCreate($User);
        }

        return 'finish';
    }

    public function ExportExcel(){

        $Data = user::select('name', 'person_type1', 'person_type2', 'person_type3')->get();

        Excel::create('users', function($excel) use($Data) {
            $excel->sheet('Sheet1', function($sheet) use($Data) {
                $sheet->fromArray($Data);
            });
        })->export('xlsx');

        return 'finish';
    }

}
