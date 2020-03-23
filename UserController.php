<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\User;
use App\Profil;
use App\Alamat;
use Auth;
class UserController extends Controller
{

  function __construct()
  {

  } 

  public function get()
  {
    $user = [];
    foreach (Profil::all() as $u) {
      $item = [
        "id_user" => $u->id_user,
        "name" => $u->name,
        "email" => $u->email,
        "password" => Crypt::decrypt($u->password),
        "role" => $u->role,
        "image" => $u->image,
        "ktp" => $u->ktp,
        "nama_ktp" => $u->nama_ktp,
        "ttl" => $u->ttl,
        "jenis_kelamin" => $u->jenis_kelamin,
        "alamat_ktp" => $u->alamat_ktp,
        "no_hp" => $u->no_hp,
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function getUser($id_user){
    $user = User::where("id_user","$id_user")->get();
    $profil = Profil::where("id_user","$id_user")->get();
    return response([
      "user" => $user, "profil" => $profil
    ]);
  }

  public function getProfil($id_user){
    $user = Profil::where("id_user","$id_user")->first();
    return response([
      "user" => $user
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $user = User::where("id_user","like","%$find%")->orWhere("email","like","%$find%")->orWhere("role","like","%$find%")->get();
    $user = [];
    foreach (Profil::all() as $u) {
      $item = [
        "id_user" => $u->id_user,
        "name" => $u->name,
        "email" => $u->email,
        "password" => Crypt::decrypt($u->password),
        "role" => $u->role,
        "image" => $u->image,
        "ktp" => $u->ktp,
        "nama_ktp" => $u->nama_ktp,
        "ttl" => $u->ttl,
        "jenis_kelamin" => $u->jenis_kelamin,
        "alamat_ktp" => $u->alamat_ktp,
        "no_hp" => $u->no_hp
        // if($request->file('image')){
        //   $file = $request->file('image');
        //   $id_user = $file->getClientOriginalName();
        //   $file->move(\base_path() ."/public/images", $id_user);
        //   $user->image = $id_user;
        // }
        
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;
        if($request->file('image')){
          $file = $request->file('image');
          $name_file = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name_file);
          $user->image = $name_file;
        }
        $user->save();

        $u = User::where("email", $request->email)->first();
        $profil = new Profil();
        $profil->id_user = $u->id_user;
        $profil->ktp = $request->ktp;
        $profil->nama_ktp = $request->nama_ktp;
        $profil->ttl = $request->ttl;
        $profil->jenis_kelamin = $request->jenis_kelamin;
        $profil->alamat_ktp = $request->alamat_ktp;
        $profil->no_hp = $request->no_hp;
        $profil->save();

        return response(["message" => "Data user berhasil ditambahkan"]);
      } 
      catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    } 
    else if($action == "update"){
      try {
        $user = User::where("id_user", $request->id_user)->first();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;
        if($request->file('image')){
          $file = $request->file('image');
          $name_file = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name_file);
          $user->image = $name_file;
        }
        $user->save();

        $profil = Profil::where("id_user", $request->id_user)->first();
        $profil->id_user = $u->id_user;
        $profil->ktp = $request->ktp;
        $profil->nama_ktp = $request->nama_ktp;
        $profil->ttl = $request->ttl;
        $profil->jenis_kelamin = $request->jenis_kelamin;
        $profil->alamat_ktp = $request->alamat_ktp;
        $profil->no_hp = $request->no_hp;
        $profil->save();

        return response(["message" => "Data user berhasil diubah"]);
      } 
      catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function Profil(Request $request){
    try{
        $profil = Profil::where("id_user", $request->id_user)->first();
        $profil->id_user = $u->id_user;
        $profil->ktp = $request->ktp;
        $profil->nama_ktp = $request->nama_ktp;
        $profil->ttl = $request->ttl;
        $profil->jenis_kelamin = $request->jenis_kelamin;
        $profil->alamat_ktp = $request->alamat_ktp;
        $profil->no_hp = $request->no_hp;
        $profil->save();

        return response(["message" => "Data profil berhasil dirubah"]);
    } catch (\Exception $e){
      return response(["message" => $e->getMessage()]);
    }
  }

  public function drop($id_user)
  {
    try {
      User::where("id_user", $id_user)->delete();
      return response(["message" => "Data user berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function Register(Request $request)
  {
    try{
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = "user";
        $user->save();

        $id = User::where("email", $request->email)->first();
        $profil = new Profil();
        $profil->id_user = $id->id_user;
        $profil->save();
        
        return response(["message" => "Register Berhasil"]);
    }
    catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
    }
  }

  public function auth(Request $request)
  {
    $email = $request->email;
    $password = $request->password;

    $user = User::where("email", $email);
    if($user->count() > 0){
      //login sukses
      $u = $user->first();
      if(Crypt::decrypt($u->password) == $password){
        return response(["status" => true, "user" => $u,
        "role" => $u->role, "token" => Crypt::encrypt($u->id_user)]);
      }
      else{
        return response(["status" => false]);
      }
    }
    else{
      return response(["status" => false]);
    }
  }

  public function save_profil(Request $request){
    $action = $request->action;
    if($action == "update"){
      try{
        $profil = Profil::where("id_user",$request->id_user)->first();
        $profil->ktp = $ktp->ktp;
        $profil->nama_ktp = $nama_ktp->nama_ktp;
        $profil->ttl = $ttl->ttl;
        $profil->jenis_kelamin = $jenis_kelamin->jenis_kelamin;
        $profil->alamat_ktp = $alamat_ktp->alamat_ktp;
        $profil->no_hp = $no_hp->no_hp;
        $profil->save();

        return response(["message" => "Data profil berhasil ditambahkan"]);
      }catch (\Exception $e){
        return response(["message" => $e->getMessage()]);
      }
    }
  }
  
}
?>