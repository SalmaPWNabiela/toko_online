<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "order";
    protected $primaryKey = "id";
    protected $fillable = ["id_user","id_alamat","total","bukti_bayar","status"];

    public function user(){
        return $this->belongsTo("App\User","id_user", "id_user");
    }
    public function alamat(){
        return $this->belongsTo("App\Alamat","id_alamat", "id_alamat");
    }
    public function detail_order(){
        return $this->hasMany("App\detail_Order","id", "id_order");
    }
}
?>