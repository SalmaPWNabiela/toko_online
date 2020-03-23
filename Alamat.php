<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alamat extends Model
{
    protected $table = "alamat";
    protected $primaryKey = "id_alamat";
    protected $fillable = ["id_alamat","id_user","nama_penerima","no_hp","provinsi","kota","kecamatan","detail_alamat"];

    public function user()
    {
        return $this->belongsTo("App\User","id_user");
    }
}
?>