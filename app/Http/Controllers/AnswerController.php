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
        if(User::where('user_id', $events['user_id'])->select('question_id') === '22'){
            Answer::where('user_id', $events['user_id'])->where('question_id', $events['problem_id'])->update(['answer_type' => $events['answer']]);
        }
        else{
            Answer::create($arrData);
        }
        if(User::where('user_id', $events['user_id'])->select('question_id') !== '22') {
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
        $questions = Answer::where('user_id', $id)->where('answer_type','no')->select('question_id')->first();
        return $questions;
    }

    public function updateNewQuestion($question_id, $user_id)
    {
        $q_id = intval($question_id) + 1;
        $q_id = strval($q_id);
        User::where('user_id', $user_id)->update(['question_id' => $q_id]);
    }
}
