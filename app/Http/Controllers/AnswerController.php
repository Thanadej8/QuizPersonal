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
}
