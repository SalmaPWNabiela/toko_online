<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class detail_Order extends Model
{
    protected $table = "detail_order";
    protected $fillable = ["id_order","kode_produk","quantity"];

    public function user(){
        return $this->belongsTo("App\User","id_user", "id_user");
    }
    public function alamat(){
        return $this->belongsTo("App\Alamat","id_alamat", "id_alamat");
    }
    public function produk(){
        return $this->belongsTo("App\Produk","kode_produk", "kode_produk");
    }
}
?>