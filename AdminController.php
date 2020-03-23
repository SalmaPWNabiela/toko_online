<?php /**
 *
 */
 namespace App\Http\Controllers;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Storage;
 use Illuminate\Support\Facades\Crypt;
 use App\Admin;
 use Auth;

class AdminController extends Controller
{

  function __construct()
  {
    // code...
  }

  public function get()
  {
    $admin = [];
    foreach (Admin::all() as $a) {
      $item = [
        "id_admin" => $a->id_admin,
        "nama" => $a->nama,
        "kontak" => $a->kontak,
        "username" => $a->username,
        "password" => Crypt::decrypt($a->password),
      ];
      array_push($admin, $item);
    }
    return response([
      "admin" => $admin,
      "count" => Admin::count()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $adm = Admin::where("id_admin","like","%$find%")
    ->orWhere("nama","like","%$find%")
    ->orWhere("kontak","like","%$find%")
    ->orWhere("username","like","%$find%");

    $admin = [];
    foreach ($adm->get() as $a) {
      $item = [
        "id_admin" => $a->id_admin,
        "nama" => $a->nama,
        "kontak" => $a->kontak,
        "username" => $a->username,
        "password" => Crypt::decrypt($a->password),
      ];
      array_push($admin, $item);
    }


    return response([
      "admin" => $admin,
      "count" => $adm->count()
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      // insert data
      $admin = new Admin();
      $admin->id_admin = $request->id_admin;
      $admin->nama = $request->nama;
      $admin->kontak = $request->kontak;
      $admin->username = $request->username;
      $admin->token = "";
      $admin->password = Crypt::encrypt($request->password);
      $admin->save();
      return response([
        "message" => "Data berhasil ditambahkan"
      ]);
    }else if($action == "update"){
      // update data
      $admin = Admin::where("id_admin",$request->id_admin)->first();
      $admin->id_admin = $request->id_admin;
      $admin->nama = $request->nama;
      $admin->kontak = $request->kontak;
      $admin->username = $request->username;
      $admin->password = Crypt::encrypt($request->password);
      $admin->save();
      return response([
        "message" => "Data berhasil diubah"
      ]);
    }
  }

  public function drop($id_admin)
  {
    Admin::where("id_admin",$id_admin)->delete();
    return response([
      "message" => "Data berhasil dihapus"
    ]);
  }

  public function auth(Request $request)
  {
    $username = $request->username;
    $password = $request->password;

    $admin = Admin::where("username",$username);
    if($admin->count() > 0){
      // jika username sesuai
      $a = $admin->first();
      if(Crypt::decrypt($a->password) == $password){
        // jika password sesuai
        $a->token = str_random(40);
        $a->save();
        return response([
          "logged" => true,
          "admin" => $a
        ]);
      }else{
        // jika password tdk sesuai
        return response([
          "logged" => false
        ]);
      }
    }else{
      //jika username tdk sesuai
      return response([
        "logged" => false
      ]);
    }
  }
}
 ?>
