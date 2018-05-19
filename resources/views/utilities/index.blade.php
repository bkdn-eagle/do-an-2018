@extends('layout.layout')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Utility List</h3>
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
                            <th>Hình ảnh tiện ích</th>
                            <th>Tên tiện ích</th>
                            <th>Thao tác</th>
                        </tr>
                        <tr ng-repeat="u in utility | filter:searchValue | orderBy : '-tentienich'">
                            <td>
                                <span ng-if="u.hinhtienich">
                                    <img src="@{{ u.hinhtienich }}" ng-if="u.hinhtienich" alt="image" class="fs-img-list img-responsive">
                                </span>
                            </td>
                            <td>@{{ u.tentienich }}</td>
                            <td>
                                <a href="javascript: void(0)" ng-click="view(u.$id)" title="Xem chi tiết"><span class="fa fa-2x fa-search-plus"></span></a>
                                <a href="javascript: void(0)" ng-click="edit(u.$id)" title="Chỉnh sửa"><span class="fa fa-2x fa-edit"></span></a>
                                <a href="javascript: void(0)" ng-click="delete(u.$id)" title="Xóa" class="red"><span class="fa fa-2x fa-remove"></span></a>
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
    <script src="{{ url('js/utility.js')  }}"></script>
@stop