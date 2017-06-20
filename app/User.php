<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    public $timestamps = true;
    protected $table = 'users';
    protected $fillable = [
        'name', 'username', 'role', 'job', 'person_type1', 'person_type2', 'person_type3',
    ];
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
