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

class MemberController extends BaseController
{
    public function getIndex(Request $request)
    {
        $data = [];
        $data['current_menu'] = 'member';
        $data['pageTitle'] = 'Danh sách thành viên';
        return view('members/index', $data);
    }
}