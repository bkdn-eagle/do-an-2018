@extends('layout.layout')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Store Food List</h3>
                <button type="button" class="btn btn-primary btn-add-edit" ng-click="showFrmAddNew()">Add New</button>
                <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                        <input type="text" ng-model="searchValue" name="table_search" class="form-control float-right" placeholder="Search">
                    </div>
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th>Tên quán</th>
                            <th>Giờ mở cửa</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                        <tr ng-repeat="(key, fs) in food_store | filter:searchValue | orderBy : 'created'">
                            <td>@{{ fs.tenquanan }}</td>
                            <td>@{{ fs.giomocua }}</td>
                            <td>
                                <span ng-if="fs.hinhanhgioithieu">
                                    <img src="@{{ fs.hinhanhgioithieu }}" ng-if="fs.hinhanhgioithieu" alt="image" class="fs-img-list img-responsive">
                                </span>
                            </td>
                            <td>
                                <a href="{{ url('food-store') }}/@{{ fs.$id }}/comment" title="Comment"><span class="fa fa-2x fa-comments"></span></a>&nbsp;&nbsp;
                                <a href="javascript: void(0)" ng-click="edit(fs.$id)" title="Chỉnh sửa"><span class="fa fa-2x fa-edit"></span></a>&nbsp;&nbsp;
                                <a href="javascript: void(0)" ng-click="delete(fs.$id)" title="Xóa" class="red"><span class="fa fa-2x fa-remove"></span></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
</div>
@stop

@section('page_js')
    <script src="{{ url('js/food-store.js')  }}"></script>
@stop