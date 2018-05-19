<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::group(['']);
Route::get('/login', ['uses' => 'LoginController@getLogin',  'as' => 'login']);
Route::post('/login', ['uses' => 'LoginController@postLogin',  'as' => 'login']);
Route::get('/logout', ['uses' => 'LoginController@getLogout',  'as' => 'logout']);
Route::get('/', ['uses' => 'DashboardController@getIndex']);
Route::group(['prefix' => 'dashboard','middleware'=>'login'], function () {
    Route::get('/', ['uses' => 'DashboardController@getIndex']);
    Route::get('/index', ['uses' => 'DashboardController@getIndex']);
});
Route::group(['prefix' => 'utility','middleware'=>'login'], function () {
    Route::get('/', ['uses' => 'UtilityController@getIndex']);
    Route::get('/index', ['uses' => 'UtilityController@getIndex']);
});
Route::group(['prefix' => 'food-store', 'middleware'=>'login'], function () {
    Route::get('/', ['uses' => 'FoodStoreController@getIndex']);
    Route::get('/index', ['uses' => 'FoodStoreController@getIndex']);

    Route::get('/{id}/comment', ['uses' => 'FoodCommentController@getIndex']);
});
Route::group(['prefix' => 'member', 'middleware'=>'login'], function () {
    Route::get('/', ['uses' => 'MemberController@getIndex']);
    Route::get('/index', ['uses' => 'MemberController@getIndex']);
});