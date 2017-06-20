<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Excel;
use Log;
use App\Question;
use App\Answer;
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
            'job' => $events['job'],

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
        $path =  "D:\\xampp\\htdocs\\QuizPersonal\\public\\User.xlsx";
        $data = Excel::load($path, function ($reader){
        })->get();

        $DataUser = [];

        if(!empty($data) && $data->count()){
            foreach ($data as $d) {
                $DataUser[] = ['username' => $d->username, 'name' => $d->name ,'job' => $d ->job];
                //Log::info('###### '.$d->name);
            }
        }

        foreach ($DataUser as $User){
            User::firstOrCreate($User);
        }

        return 'finish';
    }

    public function getAnswerForExcel()
    {
        $query = "CAST(user_id AS SIGNED)";
        $users_id = User::where('role', 'user')->select('user_id')->orderByRaw($query)->pluck('user_id')->toArray();
        $arrUser = [];
        $query = "CAST(question_id AS SIGNED)";
        $questions = Question::select('question_id')->orderByRaw($query)->pluck('question_id')->toArray();
        for($i = 0; $i < count($users_id); ++$i){
            $query = "CAST(question_id AS SIGNED)";
            $user = Answer::where('user_id', $users_id[$i])->where('answer_type', '!=', 'no')->select('question_id', 'answer_type')->orderByRaw($query)->get()->toArray();
            $username = User::where('user_id', $users_id[$i])->pluck('username');
            $arrUser[$i] = [
                'user_id' => $users_id[$i],
                'username' => $username,
            ];
            $arrUser[$i]['name'] = User::where('user_id', $users_id[$i])->pluck('name');
            $arrUser[$i]['person_type1'] = User::where('user_id', $users_id[$i])->pluck('person_type1')->toArray();
            $arrUser[$i]['person_type2'] = User::where('user_id', $users_id[$i])->pluck('person_type2')->toArray();
            $arrUser[$i]['person_type3'] = User::where('user_id', $users_id[$i])->pluck('person_type3')->toArray();
            if($user == null){
                for($k = 0; $k < count($questions); ++$k){
                    $arrUser[$i]['question_answer'][$k] = [
                        'question_id' => $questions[$k],
                        'answer_type' => '',
                    ];
                }
            }
            else{
                for($k = 0, $j = 0; $k < count($questions); ++$k){
                    if($j != count($user) && $questions[$k] == $user[$j]['question_id']){
                        $arrUser[$i]['question_answer'][$k] = [
                            'question_id' => $user[$j]['question_id'],
                            'answer_type' => $user[$j]['answer_type'],
                        ];
                        ++$j;
                    }
                    else{
                        $arrUser[$i]['question_answer'][$k] = [
                            'question_id' => $questions[$k],
                            'answer_type' => '',
                        ];
                    }
                }
            }
            /*for($j = 0; $j < count($user); ++$j){
                $arrUser[$i]['question_answer'][$j] = [
                    'question_id' => $user[$j]['question_id'],
                    'answer_type' => $user[$j]['answer_type'],
                ];
            }*/
        }
        return $arrUser;
    }

    public function ExportExcel(){

        $answer =  $this->getAnswerForExcel();
        /*if($answer[0]['person_type1'] == null){
            $answer[0]['person_type1'] = "";
            $answer[0]['person_type2'] = "";
            $answer[0]['person_type3'] = "";
        }*/
        $sheetArray = array();

        //return $person_type ;

        $sheetArray[] = array('รหัสพนักงาน','ชื่อ','ประเภทที่ 1 ข้อ1','ประเภทที่ 1 ข้อ2','ประเภทที่ 1 ข้อ3','ประเภทที่ 1 ข้อ4','ประเภทที่ 1 ข้อ5','ประเภทที่ 1 ข้อ6','ประเภทที่ 1 ข้อ7','ประเภทที่ 2 ข้อ1','ประเภทที่ 2 ข้อ2','ประเภทที่ 2 ข้อ3','ประเภทที่ 2 ข้อ4','ประเภทที่ 2 ข้อ5','ประเภทที่ 2 ข้อ6','ประเภทที่ 2 ข้อ7','ประเภทที่ 3 ข้อ1','ประเภทที่ 3 ข้อ2','ประเภทที่ 3 ข้อ3','ประเภทที่ 3 ข้อ4','ประเภทที่ 3 ข้อ5','ประเภทที่ 3 ข้อ6','ประเภทที่ 3 ข้อ7','สรุปเป็นประเภท     ');
        //$Data = user::select('name', 'person_type1', 'person_type2', 'person_type3')->get();

        for($i = 0; $i < count($answer); ++$i){
            $person_type = implode($answer[$i]['person_type1']);
            $person_type .= implode($answer[$i]['person_type2']);
            $person_type .= implode($answer[$i]['person_type3']);
            if(implode($answer[$i]['person_type1']) == null){
                $answer[$i]['person_type1'] = "";
                $answer[$i]['person_type2'] = "";
                $answer[$i]['person_type3'] = "";
            }
            $name = $answer[$i]['name'][0];
            $username = $answer[$i]['username'][0];
            $ans1 = $answer[$i]['question_answer'][0]['answer_type'];
            $sheetArray[] = [$username,$name,$answer[$i]['question_answer'][0]['answer_type'],$answer[$i]['question_answer'][1]['answer_type'],$answer[$i]['question_answer'][2]['answer_type']
                ,$answer[$i]['question_answer'][3]['answer_type'],$answer[$i]['question_answer'][4]['answer_type'],$answer[$i]['question_answer'][5]['answer_type']
                ,$answer[$i]['question_answer'][6]['answer_type'],$answer[$i]['question_answer'][7]['answer_type'],$answer[$i]['question_answer'][8]['answer_type']
                ,$answer[$i]['question_answer'][9]['answer_type'],$answer[$i]['question_answer'][10]['answer_type'],$answer[$i]['question_answer'][11]['answer_type']
                ,$answer[$i]['question_answer'][12]['answer_type'],$answer[$i]['question_answer'][13]['answer_type'],$answer[$i]['question_answer'][14]['answer_type']
                ,$answer[$i]['question_answer'][15]['answer_type'],$answer[$i]['question_answer'][16]['answer_type'],$answer[$i]['question_answer'][17]['answer_type']
                ,$answer[$i]['question_answer'][18]['answer_type'],$answer[$i]['question_answer'][19]['answer_type'],$answer[$i]['question_answer'][20]['answer_type']
                ,$person_type];
            //return $sheetArray;
        }
        //return $sheetArray;
        Excel::create('users', function($excel) use($sheetArray) {
            $excel->sheet('Sheet1', function($sheet) use($sheetArray) {
                $sheet->fromArray($sheetArray);
            });
        })->export('xls');

        return 'finish';
    }

    public function createAdmin(){
        User::insert([
            'name' => 'admin',
            'username' => 'admin',
            'role' => 'admin',
        ]);
    }

    public function updateUserType(){
        User::where('role', null)->update(['role' => 'user']);
    }

    public function createTestUser()
    {
        User::insert([
            'name' => 'test1',
            'username' => 'test1',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test2',
            'username' => 'test2',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test3',
            'username' => 'test3',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test4',
            'username' => 'test4',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test5',
            'username' => 'test5',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test6',
            'username' => 'test6',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test7',
            'username' => 'test7',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test8',
            'username' => 'test8',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test9',
            'username' => 'test9',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test10',
            'username' => 'test10',
            'job' => 'Back',
            'role' => 'user',
        ]);

    }

    public function createTestUser2()
    {
        User::insert([
            'name' => 'test11',
            'username' => 'test11',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test12',
            'username' => 'test12',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test13',
            'username' => 'test13',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test14',
            'username' => 'test14',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test15',
            'username' => 'test15',
            'job' => 'Front',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test16',
            'username' => 'test16',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test17',
            'username' => 'test17',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test18',
            'username' => 'test18',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test19',
            'username' => 'test19',
            'job' => 'Back',
            'role' => 'user',
        ]);

        User::insert([
            'name' => 'test20',
            'username' => 'test20',
            'job' => 'Back',
            'role' => 'user',
        ]);

    }

    public function getCountFinishedUser()
    {
        $finished_user = User::whereNotNull('person_type1')->where('role', 'user')
            ->where('username','NOT LIKE', '%test%')->count();

        $user_id = Answer::where('answer_type', '!=', 'no')->select('user_id')->distinct()->count();

        $not_finish_user = User::whereNull('person_type1')->where('role', 'user')
            ->where('username','NOT LIKE', '%test%')->whereIn('user_id', $user_id)->pluck('user_id');

        $all_user = User::where('role', 'user')
            ->where('username','NOT LIKE', '%test%')->count();

        $user = [
            'finish' => $finished_user,
            'not_finish' => $not_finish_user,
            'all_user' => $all_user,
        ];
        return $user;
    }

}
