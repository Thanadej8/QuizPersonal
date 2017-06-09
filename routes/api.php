<?php

use Illuminate\Http\Request;
//use Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/question/add', 'QuestionController@addQuestion');

Route::post('/user/add', 'UserController@addUser');

Route::post('/answer', 'AnswerController@answerQuestion');

Route::post('/user/login', 'UserAuthController@loginUser');

Route::get('/user', 'UserController@getUser');

Route::get('/user/{id}', 'UserController@getUserByID');

Route::get('/question', 'QuestionController@getQuestion');

Route::get('/question/{id}', 'QuestionController@getQuestionByID');

Route::get('/answer/after/{id}', 'AnswerController@answerQuestionAfterTimeOut');

Route::get('/answer/get', 'AnswerController@getAnswer');

Route::get('/ExportExcel','UserController@ExportExcel');

