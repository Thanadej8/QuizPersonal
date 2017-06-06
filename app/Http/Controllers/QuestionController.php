<?php

namespace App\Http\Controllers;

use App\Question;
use Illuminate\Http\Request;


class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::all();
        return $questions;
    }

    public function addQuestion(Request $request)
    {
        $events = $request->all();
        Question::create($events);
        return response()->json(['msg' => 'post complete'],Question::last());
    }

    public function getQuestionByID($id)
    {
        $question = Question::where('question_id', $id)->first();
        return $question;
    }




}
