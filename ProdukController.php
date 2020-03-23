<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Produk;
use Auth;
class ProdukController extends Controller
{

  function __construct()
  {

  } 

  public function get()
  {
    return response([
      "produk" => Produk::all()
    ]);
  }

  public function find(Request $request)
   {
     $find = $request->find;
     $produk = Produk::where("kode_produk","like","%$find%")->orWhere("nama_produk","like","%$find%")
     ->orWhere("harga","like","%$find%")->get();
     return response([
       "produk" => $Produk
     ]);
   }

  public function save(Request $request)
   {
    $action = $request->action;
    if ($action == "update") {
      try {
        $profil = new Profil();
        $profil->id_user = $request->id_user;
        $profil->ktp = $request->ktp;
        $profil->nama_ktp = $request->nama_ktp;
        $profil->ttl = $request->ttl;
        $profil->jenis_kelamin = $request->jenis_kelamin;
        $profil->alamat_ktp = $request->alamat_ktp;
        $profil->no_hp = $request->no_hp;
        // if($request->file('image')){
        //   $file = $request->file('image');
        //   $nama_produk = $file->getClientOriginalName();
        //   $file->move(\base_path() ."/public/images", $nama_produk);
        //   $produk->image = $nama_produk;
        // }
        // $produk->stok = $request->stok;  
        $profil->save();
 
        return response(["message" => "Data Profil berhasil ditambahkan"]);
      }
      catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
        // $file->move(\base_path() ."/public/images", $nama_produk);
      } else if($action == "update"){
      try {
        $produk = Produk::where("kode_produk", $request->kode_produk)->first();
        // $produk->kode_produk = $request->kode_produk;
        $produk->nama_produk = $request->nama_produk;
        $produk->harga = $request->harga;
        $produk->deskripsi = $request->deskripsi;
        if($request->file('image')){
          $file = $request->file('image');
          $nama_produk = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $nama_produk);
          $produk->image = $nama_produk;
        }
        $produk->stok = $request->stok;
        $produk->save();


        return response(["message" => "Data Produk berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($kode_produk)
  {
    try { 
      Produk::where("kode_produk", $kode_produk)->delete();
      return response(["message" => "Data produk berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}

?>