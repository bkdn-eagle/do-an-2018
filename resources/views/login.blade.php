<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AdminLTE 3 | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="AdminLTE/dist/css/adminlte.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="AdminLTE/plugins/iCheck/square/blue.css">
    <link rel="stylesheet" href="css/login.css">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
<body class="hold-transition login-page">
<div class="login-box">
    <div class="login-logo"><b>Đồ Án Tốt Nghiệp</b></div>
    <!-- /.login-logo -->
    <div class="card">
        <div class="card-body login-card-body">
            @if(Session::has('error'))
                <p class="alert alert-danger show-msg">{{ Session::get('error') }} <span onclick="$(this).parent().remove()" class="fa fa-remove pull-right cursor"></span></p>
            @endif
            {{ Form::open(array('url' => 'login')) }}
                <div class="form-group has-feedback relative">
                    {{Form::email('email', old('email'), ['class' => "form-control", 'placeholder' => "Email", "required"])}}
                    <span class="fa fa-envelope form-control-feedback"></span>
                    <p class="text-danger">{{$errors->first('email') ? $errors->first('email') : ""}}</p>
                </div>
                <div class="form-group has-feedback relative">
                    {{Form::password('password', ['class' => 'form-control', 'placeholder' => 'Password', "required"])}}
                    <span class="fa fa-lock form-control-feedback"></span>
                    <p class="text-danger">{{$errors->first('password') ? $errors->first('password') : ""}}</p>
                </div>
                <div class="row">
                    <div class="col-8"></div>
                    <!-- /.col -->
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                    <!-- /.col -->
                </div>
            {{ Form::close() }}
        </div>
        <!-- /.login-card-body -->
    </div>
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="AdminLTE/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- iCheck -->
<script src="AdminLTE/plugins/iCheck/icheck.min.js"></script>
<script>
    $(function () {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass   : 'iradio_square-blue',
            increaseArea : '20%' // optional
        });

        // remove element
        setTimeout(function(){
            $('.show-msg').remove();
            }, 2000);
    });
</script>
</body>
</html>
