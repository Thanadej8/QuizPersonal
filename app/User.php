<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    public $timestamps = true;
    protected $table = 'users';
    protected $fillable = [
        'first_name', 'last_name', 'citizen_id', 'username', 'role',
    ];
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
