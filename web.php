<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/produk','ProdukController@get');
$router->post('/produk','ProdukController@find');
$router->post('/produk/save','ProdukController@save');
$router->delete('/produk/drop/{id}','ProdukController@drop');

$router->post('/register','UserController@register');
$router->post("/user/auth","UserController@auth");

$router->get('/user','UserController@get');
$router->post('/user','UserController@find');
$router->post('/user/save','UserController@save');
$router->delete('/user/drop/{id}','UserController@drop');

$router->get('/user/{id_user}','UserController@getUser');
$router->get('/profil/{id_user}','UserController@getProfil');
$router->post('/profil','UserController@profil');
$router->post('/profil/save_profil','UserController@save_profil');

$router->get('/alamat/{id_user}','AlamatControllers@get');
$router->post('/alamat/save','AlamatControllers@save');
$router->delete('/alamat/drop/{id_user}','AlamatControllers@drop');

$router->get('/order','OrderController@get');
$router->get('/order/{id_user}','OrderController@getById');
$router->post('/order/save','OrderController@save');
$router->post('/accept/{id_order}','OrderController@accept');