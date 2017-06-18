<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Question;
use App\User;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function index()
    {
        $answers = Answer::all();
        return $answers;
    }

    public function answerQuestion(Request $request)
    {
        $events = $request->all();
        $arrData = [
            'user_id' => $events['user_id'],
            'question_id' => $events['problem_id'],
            'answer_type' => $events['answer'],
            'set' => $events['set'],
        ];
        $user = User::where('user_id', $events['user_id'])->first();
        if($user->question_id === '22' || Answer::where('user_id', $user->user_id)->where('question_id', $user->question_id)->get() != null){
            Answer::where('user_id', $events['user_id'])->where('question_id', $events['problem_id'])->update(['answer_type' => $events['answer']]);
        }
        else{
            Answer::create($arrData);
        }
        if($user->question_id !== '22') {
            $this->updateNewQuestion($events['problem_id'], $events['user_id']);
        }
        //$answer = $events['user_id'];
        if(Answer::where('user_id', $events['user_id'])->where('answer_type','!=', 'no')->count() === 21){
            //Calculate for Set 1
            $set1N = Answer::where('user_id', $events['user_id'])->where('answer_type', 'N')->count();
            $set1S = Answer::where('user_id', $events['user_id'])->where('answer_type', 'S')->count();
            if($set1N > $set1S){
                User::where('user_id', $events['user_id'])->update(['person_type1' => 'N']);
            }
            else{
                User::where('user_id', $events['user_id'])->update(['person_type1' => 'S']);
            }

            //Calculate for Set 2
            $set2F = Answer::where('user_id', $events['user_id'])->where('answer_type', 'F')->count();
            $set2T = Answer::where('user_id', $events['user_id'])->where('answer_type', 'T')->count();
            if($set2F > $set2T){
                User::where('user_id', $events['user_id'])->update(['person_type2' => 'F']);
            }
            else{
                User::where('user_id', $events['user_id'])->update(['person_type2' => 'T']);
            }

            //Calculate for Set 3
            $set3J = Answer::where('user_id', $events['user_id'])->where('answer_type', 'J')->count();
            $set3P = Answer::where('user_id', $events['user_id'])->where('answer_type', 'P')->count();
            if($set3J > $set3P){
                User::where('user_id', $events['user_id'])->update(['person_type3' => 'J']);
            }
            else{
                User::where('user_id', $events['user_id'])->update(['person_type3' => 'P']);
            }
        }
        return User::where('user_id', $events['user_id'])->first();

    }

    public function answerQuestionAfterTimeOut($id)
    {
        $questions = Answer::where('user_id', $id)->where('answer_type','no')->select('question_id')->get();
        return $questions;
    }

    public function updateNewQuestion($question_id, $user_id)
    {
            $q_id = intval($question_id) + 1;
            $q_id = strval($q_id);
            User::where('user_id', $user_id)->update(['question_id' => $q_id]);

    }

    public function getAnswer()
    {
        $query = "CAST(user_id AS INTEGER)";
        $users_id = User::where('role', 'user')->select('user_id')->orderByRaw($query)->pluck('user_id')->toArray();
        $arrUser = [];
        $query = "CAST(question_id AS INTEGER)";
        $questions = Question::select('question_id')->orderByRaw($query)->pluck('question_id')->toArray();
        for($i = 0; $i < count($users_id); ++$i){
            $query = "CAST(question_id AS INTEGER)";
            $user = Answer::where('user_id', $users_id[$i])->where('answer_type', '!=', 'no')->select('question_id', 'answer_type')->orderByRaw($query)->get()->toArray();
            $arrUser[$i] = [
                'user_id' => $users_id[$i],
            ];
            $arrUser[$i]['name'] = User::where('user_id', $users_id[$i])->pluck('name')->toArray();
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

    public function getAnswerByPage($page)
    {
        $query = "CAST(user_id AS INTEGER)";
        $num = (intval($page) - 1) * 100;
        if($num == 0){
            $users_id = User::where('role', 'user')->limit(100)->select('user_id')->orderByRaw($query)->pluck('user_id')->toArray();
        }
        else{
            $users_id = User::where('role', 'user')->limit(100)->offset($num)->select('user_id')->orderByRaw($query)->pluck('user_id')->toArray();
        }
        $arrUser = [];
        $query = "CAST(question_id AS INTEGER)";
        $questions = Question::select('question_id')->orderByRaw($query)->pluck('question_id')->toArray();
        for($i = 0; $i < count($users_id); ++$i){
            $query = "CAST(question_id AS INTEGER)";
            $user = Answer::where('user_id', $users_id[$i])->where('answer_type', '!=', 'no')->select('question_id', 'answer_type')->orderByRaw($query)->get()->toArray();
            $arrUser[$i] = [
                'user_id' => $users_id[$i],
            ];
            $arrUser[$i]['name'] = User::where('user_id', $users_id[$i])->pluck('name')->toArray();
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

    public function getAnswerByID($id)
    {
        return Answer::where('user_id', $id)->get();
    }
}
