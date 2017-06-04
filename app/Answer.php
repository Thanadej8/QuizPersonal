<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table = 'answers';
    protected $fillable = [
        'user_id', 'question_id', 'answer_type', 'set'
    ];
}
