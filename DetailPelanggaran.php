<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetailPelanggaran extends Model
{
    protected $table = "detail_pelanggaran_siswa";
    protected $primaryKey = "id_pelanggaran_siswa";
    protected $fillable = ["id_pelanggaran_siswa","id_pelanggaran"];

    public function pelanggaran()
    {
      return $this->belongsTo("App\Pelanggaran","id_pelanggaran");
    }
}
