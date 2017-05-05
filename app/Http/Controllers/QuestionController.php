<?php

namespace App\Http\Controllers;

use App\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $question = Question::all();
        return $question;
    }

    public function addQuestion(Request $request)
    {
        $events = $request->all();
        Question::create($events);
        return response()->json(['msg' => 'post complete'],Question::last());
    }

    public function getQuestionByID($id)
    {
        $users = User::all()->where('id', '=', $id);
    }
}
