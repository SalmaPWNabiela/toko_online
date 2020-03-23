<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Order;
use App\detail_Order;
use App\User;
use App\Alamat;
use App\Produk;
use App\Profil;
use Auth;
class OrderController extends Controller
{

  function __construct()
  {

  } 

  public function get()
  {
    $order = [];
    foreach (Order::all() as $o) {
      $detail = [];
      foreach (detail_Order::where("id_order", $o->id)as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "kode_produk" => $d->kode_produk,
          "quantity" => $d->quantity
        ];
        array_push($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id,
        "id_user" => $o->id_user,
        "id_alamat" => $o->id_alamat,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "detail" => $detail
      ];
      array_push($order, $item);
    }
    return response(["order" => $order]);
  }

  public function getById($id_user)
  {
    $order = [];
    foreach (Order::where("id_user", $id_user)->get() as $o) {
      $detail = [];
      foreach ($o->detail_order as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "kode_produk" => $d->kode_produk,
          "quantity" => $d->quantity
        ];
        array_push($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id,
        "id_user" => $o->id_user,
        "id_alamat" => $o->id_alamat,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "detail" => $detail
      ];
      array_push($order, $item);
    }
    return response(["order" => $order]);
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
      try {
        $order = new Order();
        $order->id_user = $request->id_user;
        $order->id_alamat = $request->id_alamat;
        $order->total = $request->total;
        $order->status = "dipesan";
        $order->save();

        $o = Order::where("id_user", $request->id_user)->first();
        $detail_order = new detail_Order();
        $detail_order->id_order = $o->id;
        $detail_order->kode_produk = $request->kode_produk;
        $detail_order->quantity = $request->quantity;
        $detail_order->save();
        
 
        return response(["message" => "Data Profil berhasil ditambahkan"]);
      }
      catch (\Exception $e) { 
        return response(["message" => $e->getMessage()]);
      }
  }

  public function accept($id_order)
  {
    $order = Order::where("id", $id_order);
    $order->status = "diterima";
    $order->save();
  }

  public function decline()
  {
    $order = Order::where("id", $request->id);
    $order->status = "ditolak";
    $order->save();
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