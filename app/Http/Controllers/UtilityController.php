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

class UtilityController extends BaseController
{
    public function getIndex(Request $request)
    {
        $data = [];
        $data['current_menu'] = 'utility';
        $data['pageTitle'] = 'Tiện ích';
        return view('utilities/index', $data);
    }
}