<?php

namespace App\Http\Controllers;

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

        $answer = Answer::Create($arrData);
        $this->updateNewQuestion($events['question_id'], $events['user_id']);
        return $answer;
    }

    public function updateNewQuestion($question_id, $user_id)
    {
        $q_id = intval($question_id) + 1;
        $q_id = strval($q_id);
        User::where('user_id', $user_id)->update('question_id',$q_id);
    }
}
