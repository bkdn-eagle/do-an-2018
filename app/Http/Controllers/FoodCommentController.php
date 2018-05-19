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

class FoodCommentController extends BaseController
{
    public function getIndex(Request $request, $foodId)
    {
        $data = [];
        $data['current_menu'] = 'food-store';
        $data['pageTitle'] = 'Food Store';
        $data['foodId'] = $foodId;
        return view('food_comments/index', $data);
    }
}