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

class DashboardController extends BaseController
{
    public function getIndex(Request $request)
    {
        $data = [];
        $data['current_menu'] = 'dashboard';
        $data['pageTitle'] = 'Trang chủ';

        $params = $request->all();
        $FIREBASE_URL = 'https://doantotnghiep-6755e.firebaseio.com';
        $FIREBASE_TOKEN = 'dz4w9NhDofzFcCs56N1FEo7OgaSMw5XrIAh2VVk0';
        $FIREBASE_PATH = '';
        $firebase = new \Firebase\FirebaseLib($FIREBASE_URL, $FIREBASE_TOKEN);

        try {
            // member
            $dataMember = $firebase->get($FIREBASE_PATH . '/thanhviens', array('print'=>'pretty'));
            $dataMember = json_decode($dataMember, TRUE);
            $data['countMember'] = 0;
            if (!empty($dataMember)) {
                $data['countMember'] = count($dataMember);
            }
            //utility
            $dataUtility = $firebase->get($FIREBASE_PATH . '/quanlytienichs', array('print'=>'pretty'));
            $dataUtility = json_decode($dataUtility, TRUE);
            $data['countUtility'] = 0;
            if (!empty($dataUtility)) {
                $data['countUtility'] = count($dataUtility);
            }
            //quan an
            $dataFoodStore = $firebase->get($FIREBASE_PATH . '/quanans', array('print'=>'pretty'));
            $dataFoodStore = json_decode($dataFoodStore, TRUE);
            $data['countFoodStore'] = 0;
            if (!empty($dataFoodStore)) {
                $data['countFoodStore'] = count($dataFoodStore);
            }
        } catch (Exception $ex) {
            exit('Error' . $ex);
        }





        return view('dashboards/index', $data);
    }
}