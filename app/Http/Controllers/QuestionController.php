<?php

namespace App\Http\Controllers;

use App\Question;
use Illuminate\Http\Request;
use Excel;

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
        $question = Question::all()->where('id', '=', $id);
        return $question;
    }

    public function readExcel()
    {
        $path =  "D:\\xampp\\htdocs\\QuizPersonal\\public\\Example.xlsx";
        $data = Excel::load($path, function ($reader){
        })->get();

        $Quiz = [];

    }

    public function addQuiz(Request $request){


    }
}
