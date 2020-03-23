<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model{
    protected $table = "produk";
    protected $primaryKey = "kode_produk";
    protected $fillable = ["kode_produk", "nama_produk", "harga", "deskripsi", "image", "stok"];
}

?> 