<?php
/**
 * Created by PhpStorm.
 * User: Thuan Doan
 * Date: 5/10/2018
 * Time: 8:46 PM
 */
namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Mockery\Exception;

class LoginController extends BaseController
{
    public function getLogin(Request $request)
    {
        if ($request->session()->has('sessionUser')) {
            return redirect('dashboard');
        }
        return view('login');
    }

    public function postLogin(LoginRequest $request)
    {
        $params = $request->all();
        $FIREBASE_URL = 'https://usermanagement-79b53.firebaseio.com';
        $FIREBASE_TOKEN = 'NhgNp1tOWeVMtJ160XUCdeUduVGl54dxqeTeCEY9';
        $FIREBASE_PATH = '';
        $firebase = new \Firebase\FirebaseLib($FIREBASE_URL, $FIREBASE_TOKEN);

        try {
            $dataMember = $firebase->get($FIREBASE_PATH . '/users', array('print'=>'pretty'));
            $dataMember = json_decode($dataMember, TRUE);
            $dataMember = array_values($dataMember)[0];
            if ($dataMember['email'] == $params['email'] && $dataMember['password'] == md5($params['password'])) {
                // Via the global helper...
                session(['sessionUser' => $dataMember]);
                return redirect('dashboard')->with('success', 'Login was success!');
            } else {
                $request->session()->flash('error', 'Login failed!');
                return back()->withInput();
            }
        } catch (Exception $ex) {
            exit('Error' . $ex);
        }
    }

    public function getLogout(Request $request)
    {
        $request->session()->forget('key');
        $request->session()->flush();
        return redirect('login');
    }
}

