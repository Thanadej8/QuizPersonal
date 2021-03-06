<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('Quiz');
});

Route::get('/getExcel','UserController@readExcel');
Route::get('/ExportExcel','UserController@ExportExcel');
Route::get('/create/admin','UserController@createAdmin');
Route::get('/user/updateUserType','UserController@updateUserType');
Route::get('/user/createTestUser', 'UserController@createTestUser');
Route::get('/user/createTestUser2', 'UserController@createTestUser2');


Route::get('/index',function (){
    return view('helloworld');
});

Route::get('/index2',function (){
    return "test";
});

