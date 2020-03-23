<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    protected $table = "profil";
    protected $foreignKey = "id_user";
    protected $fillable = ["id_user","ktp","nama_ktp","ttl","jenis_kelamin","alamat_ktp","no_hp"];

    public function user()
    {
        return $this->belongsTo("App\User","id_user", "id");
    }
}
?>