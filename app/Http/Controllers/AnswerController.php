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
        if($user->question_id === '22'){
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
        $users_id = User::select('user_id')->pluck('user_id')->toArray();
        $user_answered_id = Answer::select('user_id')->distinct()->pluck('user_id')->toArray();

        //return $user_answered_id->user_id;
        $i = 0;
        $arrUser = [];
        $json = ([]);
        for($i = 0; $i < count($users_id); ++$i){
            $user = Answer::where('user_id', $users_id[$i])->where('answer_type', '!=', 'no')->select('question_id', 'answer_type')->get()->toArray();
            $arrUser[$i] = [
                'user_id' => $users_id[$i],
            ];
            $arrUser[$i]['name'] = User::where('user_id', $users_id[$i])->pluck('name')->toArray();
            for($j = 0; $j < count($user); ++$j){
                $arrUser[$i][$j] = [
                    'question_id' => $user[$j]['question_id'],
                    'answer_type' => $user[$j]['answer_type'],
                ];
            }
        }
        return $arrUser;
    }
}
