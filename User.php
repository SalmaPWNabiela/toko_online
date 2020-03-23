<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "user";
    protected $primaryKey = "id_user";
    protected $fillable = ["id_user","name","email","password","role","image"];

    public function profil(){
        return $this->hasOne("App\Profil","id_user");
    }
    public function alamat(){
        return $this->hasMany("App\Alamat", "id_user");
    }
}
?>