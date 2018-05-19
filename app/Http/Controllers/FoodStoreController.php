<?php
/**
 * Created by PhpStorm.
 * User: Thuan Doan
 * Date: 5/11/2018
 * Time: 7:09 PM
 */

namespace app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class FoodStoreController extends BaseController
{
    public function getIndex(Request $request)
    {
        $data = [];
        $data['current_menu'] = 'food-store';
        $data['pageTitle'] = 'Food Store';
        return view('food_stores/index', $data);
    }
}