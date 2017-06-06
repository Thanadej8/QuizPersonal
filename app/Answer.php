<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    public $timestamps = true;
    protected $table = 'answers';
    protected $fillable = [
        'user_id', 'question_id', 'answer_type', 'set'
    ];
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
