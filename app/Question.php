<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';
    protected $fillable = [
        'question_name', 'choice1', 'choice1_type', 'choice2', 'choice2_type', 'set',
    ];

}
