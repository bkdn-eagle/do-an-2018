<!DOCTYPE html>
<html ng-app = 'App'>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ isset($pageTitle) ? $pageTitle : 'Đồ Án Tốt Nghiệp' }}</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @include('layout.css')
</head>
<body class="hold-transition sidebar-mini" ng-controller="AppController">
<div class="wrapper">

    @include('layout.nav')

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        @include('layout.sidebar')
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                @yield('content')
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
    @include('layout.footer')
</div>
<!-- ./wrapper -->

<div id="dlg"></div>
<div id="dlg-confirm"></div>
<!-- Modal -->
<div id="frmAddEdit" class="modal fade {{isset($current_menu) && $current_menu == 'food-store' ? 'frmAddEditFoodStore' : ''}}" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">@{{ModalHeaderTitle ? ModalHeaderTitle : 'Form'}}</h4>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <form action="" method="post" enctype="multipart/form-data">
                    @if(isset($current_menu) && $current_menu == 'food-store')
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Tên quán</label>
                                <input type="text" ng-if="nonedisabled" value="@{{tenquanan}}" name="tenquanan" ng-model="tenquanan" class="form-control">
                                <input type="text" ng-if="disabled" disabled value="@{{tenquanan}}" name="tenquanan" ng-model="tenquanan" class="form-control">
                                <input type="hidden" ng-if="keyHidden" name="keyHidden" ng-model="keyHidden" value="@{{ keyHidden }}">
                            </div>
                            <div class="form-group">
                                <label>Giờ mở cửa</label>
                                <input type="text" ng-if="nonedisabled" value="@{{giomocua}}" name="giomocua" ng-model="giomocua" class="form-control">
                                <input type="text" ng-if="disabled" disabled value="@{{giomocua}}" name="giomocua" ng-model="giomocua" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Giờ đóng cửa</label>
                                <input type="text" ng-if="nonedisabled" value="@{{giodongcua}}" name="giodongcua" ng-model="giodongcua" class="form-control">
                                <input type="text" ng-if="disabled" disabled value="@{{giodongcua}}" name="giodongcua" ng-model="giodongcua" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Giá tối thiểu</label>
                                <input type="number" ng-if="nonedisabled" value="@{{giatoithieu}}" name="giatoithieu" ng-model="giatoithieu" class="form-control" minlength="4" maxlength="10">
                                <input type="number" ng-if="disabled" disabled value="@{{giatoithieu}}" name="giatoithieu" ng-model="giatoithieu" class="form-control" minlength="4" maxlength="10">
                            </div>
                            <div class="form-group">
                                <label>Giá tối đa</label>
                                <input type="number" ng-if="nonedisabled" value="@{{giatoida}}" name="giatoida" ng-model="giatoida" class="form-control" minlength="4" maxlength="10">
                                <input type="number" ng-if="disabled" disabled value="@{{giatoida}}" name="giatoida" ng-model="giatoida" class="form-control" minlength="4" maxlength="10">
                            </div>
                            <div class="form-group">
                                <label>Hình ảnh</label>
                                <p ng-if="hinhanhgioithieu">
                                    <img src="@{{hinhanhgioithieu}}" alt="" class="img-responsive">
                                </p>
                                <input type="file" ng-if="nonedisabled" name="image" id="hinhanhgioithieu" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Video giới thiệu</label>
                                <p ng-if="videogioithieu">
                                    <video width="320" height="240" controls>
                                        <source src="@{{videogioithieu}}" type="video/mp4">
                                    </video>
                                </p>
                                <input type="file" ng-if="nonedisabled" name="videogioithieu" id="videogioithieu" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <label>Chi nhánh quán ăn</label>
                            <div style="border: solid 1px #eee; padding: 5px;">
                                <table class="table" ng-if="showBtnAddChiNhanh">
                                    <tbody>
                                    <tr>
                                        <th style="width: 20px">Địa chỉ</th>
                                        <th style="width: 20px">latitude</th>
                                        <th style="width: 20px">longitude</th>
                                        <th style="width: 20px">Thao tác</th>
                                    </tr>
                                    <tr ng-repeat="(key, chitiet_cn) in chitiet_chinhanhquanans">
                                        <td style="width: 20px">
                                            <input ng-model="chitiet_cn.diachi" name="diachi" type="text" value="@{{ chitiet_cn.diachi }}" ng-change="editChiTietCNQADiaChi(key, this)">
                                        </td>
                                        <td style="width: 20px">
                                            <input ng-model="chitiet_cn.latitude" name="latitude" type="number" value="@{{ chitiet_cn.latitude }}" ng-change="editChiTietCNQADiaChi(key, this)">
                                        </td>
                                        <td style="width: 20px">
                                            <input ng-model="chitiet_cn.longitude" name="longitude" type="number" value="@{{ chitiet_cn.longitude }}" ng-change="editChiTietCNQADiaChi(key, this)">
                                        </td>
                                        <td>
                                            <a href="javascript: void(0)" ng-click="deleteChiTietCNQA(key)" title="Delete"><span class="fa fa-2x fa-remove"></span></a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="form-group" ng-if="!noShowFrmChiNhanhQA">
                                    <form action="" id="frmAddEditChiTietCNQA">
                                        <div class="form-group">
                                            <label>Địa chỉ</label>
                                            <input type="text" name="diachi" ng-model="diachi" class="form-control" >
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>latitude</label>
                                                    <input type="text" name="latitude" ng-model="latitude" class="form-control" >
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>longitude</label>
                                                    <input type="text" name="longitude" ng-model="longitude" class="form-control" >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group" ng-if="showBtnAddChiNhanh">
                                            <button type="button" ng-click="processAddEditChiTietCNQA()">Thêm mới</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label>Utility</label>
                                <div class="row">
                                    <div class="col-md-3" ng-repeat="(key, ql) in quanlytienichs">
                                        <span ng-if="utilityEdit">
                                            <input type="checkbox" name="" ng-if="ql.checked" checked value="@{{ ql.$id }}" id="qlti-checkbox-@{{ key }}" class="cbUtility">
                                            <input type="checkbox" name="" ng-if="!ql.checked" value="@{{ ql.$id }}" id="qlti-checkbox-@{{ key }}" class="cbUtility">
                                            <label for="qlti-checkbox-@{{ key }}">@{{ ql.tentienich }}</label>
                                        </span>
                                        <span ng-if="!utilityEdit">
                                            <input type="checkbox" name="" value="@{{ ql.$id }}" id="qlti-checkbox-@{{ key }}" class="cbUtility">
                                            <label for="qlti-checkbox-@{{ key }}">@{{ ql.tentienich }}</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @elseif(isset($current_menu) && $current_menu == 'member')
                    <div class="form-group">
                        <label>Họ tên</label>
                        <input type="text" ng-if="nonedisabled" name="hoten" ng-model="hoten" class="form-control">
                        <input type="text" ng-if="!nonedisabled" name="hoten" ng-model="hoten" class="form-control" disabled>
                        <input type="hidden" ng-if="keyHidden" ng-model="keyHidden" value="@{{ keyHidden }}">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" name="email" ng-model="email" class="form-control" disabled>
                    </div>
                    <div class="form-group">
                        <label>Hình ảnh</label>
                        <p ng-if="hinhanh">
                            <img src="@{{hinhanh}}" alt="" class="img-responsive">
                        </p>
                        <input type="file" ng-if="nonedisabled" value="@{{ hinhanh }}" name="hinhanh" id="hinhanh" class="form-control">
                    </div>
                    @elseif(isset($current_menu) && $current_menu == 'utility')
                    <div class="form-group">
                        <label>Tên tiện ích</label>
                        <input type="text" name="tentienich" ng-model="tentienich" class="form-control">
                        <input type="hidden" ng-if="keyHidden" ng-model="keyHidden" value="@{{ keyHidden }}">
                    </div>
                    <div class="form-group">
                        <label>Hình ảnh</label>
                        <p ng-if="hinhtienich">
                            <img src="@{{hinhtienich}}" alt="" class="img-responsive">
                        </p>
                        <input type="file" ng-if="nonedisabled" name="hinhtienich" id="hinhtienich" class="form-control">
                    </div>
                    @else
                    <p>No data</p>
                    @endif
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                <button type="button" ng-if="BtnAddEdit" class="btn btn-primary" ng-click="processAddEdit()">@{{ BtnAddEdit }}</button>
            </div>
        </div>

    </div>
</div>

<div id="frmFoodStoreComment" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">@{{ModalHeaderTitle ? ModalHeaderTitle : 'Quản lý Comment'}}</h4>
            </div>
            <div class="modal-body">
                <form action="" method="post" enctype="multipart/form-data" id="frmFoodStoreComment">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Tiêu đề</label>
                                <input type="text" value="@{{tieude}}" name="tieude" ng-model="tieude" class="form-control">
                                <input type="hidden" name="keyHidden" ng-model="keyHidden" value="@{{ keyHidden }}">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Mã User</label>
                                <input type="text" value="@{{mauser}}" name="mauser" ng-model="mauser" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Chấm điểm</label>
                                <input type="number" value="@{{chamdiem}}" name="chamdiem" ng-model="chamdiem" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Lượt thích</label>
                                <input type="number" value="@{{luotthich}}" name="luotthich" ng-model="luotthich" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nội dung</label>
                        <textarea value="@{{noidung}}" name="noidung" ng-model="noidung" class="form-control" rows="10"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                <button type="button" ng-if="BtnAddEdit" class="btn btn-primary" ng-click="processAddEdit()">@{{ BtnAddEdit }}</button>
            </div>
        </div>
    </div>
</div>

<div id="frmFoodStoreUtility" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">@{{ModalHeaderTitle ? ModalHeaderTitle : 'Form'}}</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <table>
                        <tr>
                            <th>Tên tiện ích</th>
                        </tr>
                        <tr ng-repeat="ti in tienich">
                            <td>@{{ ti.MATIENICH1 }}</td>
                        </tr>
                    </table>
                </div>
                <form action="" method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Tên tiện ích</label>
                        <select class="form-control" multiple="multiple" id="sl-utility">
                            <option ng-repeat="value in tienich" value="@{{value}}">@{{value}}</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                <button type="button" ng-if="BtnAddEdit" class="btn btn-primary" ng-click="processFoodStoreUtility()">@{{ BtnAddEdit }}</button>
            </div>
        </div>
    </div>
</div>

<div class="show-loader">
    <div class="bg-black"></div>
    <img src="{{url('images/loader.gif')}}" alt="">
</div>
@include('layout.js')
</body>
</html>
