<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Alamat;
use Auth;

class AlamatController extends Controller
{

  function __construct()
  {

  } 

  public function get()
  {
    $alamat = [];
    foreach (Alamat::all() as $u) {
      $item = [
        "id_alamat" => $u->id_alamat,
        "nama_penerima" => $u->nama_penerima,
        "no_hp" => $u->no_hp,
        "provinsi" => $u->provinsi,
        "kota" => $u->kota,
        "kecamatan" => $u->kecamatan,
        "detail_alamat" => $u->detail_alamat,
      ];
      array_push($alamat, $item);
    }
    return response([
      "alamat" => $alamat
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $alamat = Alamat::where("id_alamat","like","%$find%")->orWhere("nama_penerima","like","%$find%")->get();

    return response([
      "alamat" => $Alamat
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $alamat = new Alamat();
        $alamat->nama_penerima = $request->nama_penerima;
        $alamat->no_hp = $request->no_hp;
        $alamat->provinsi = $request->provinsi;
        $alamat->kota = $request->kota;
        $alamat->kecamatan = $request->kecamatan;
        $alamat->detail_alamat = $request->detail_alamat;
        $alamat->save();

        return response(["message" => "Data alamat berhasil ditambahkan"]);
      } 
      catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    } 
    else if($action == "update"){
      try {
        $alamat = Alamat::where("id_alamat", $request->id_alamat)->first();
        $alamat->nama_penerima = $request->nama_penerima;
        $alamat->no_hp = $request->no_hp;
        $alamat->provinsi = $request->provinsi;
        $alamat->kota = $request->kota;
        $alamat->kecamatan = $request->kecamatan;
        $alamat->detail_alamat = $request->detail_alamat;
        $alamat->save();

        return response(["message" => "Data alamat berhasil diubah"]);
      } 
      catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_alamat)
  {
    try {
      Alamat::where("id_alamat", $id_alamat)->delete();
      return response(["message" => "Data alamat berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function getById($id_alamat)
  {
    try {
      $alamat = Alamat::where("id_alamat", $id_alamat)->get();
      return response(["alamat" => $alamat]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
?>
