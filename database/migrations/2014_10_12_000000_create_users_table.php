<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('name');
            //$table->string('last_name');
            //$table->string('citizen_id',13);
            $table->string('username')->unique();
            //$table->string('email')->unique();
            $table->string('question_id')->nullable();
            $table->string('person_type1')->nullable();
            $table->string('person_type2')->nullable();
            $table->string('person_type3')->nullable();
            $table->string('role')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
