@extends('layout.layout')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Member List</h3>
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
                            <th>Họ tên</th>
                            <th>Hình ảnh</th>
                            <th>Email</th>
                            <th>Thao tác</th>
                        </tr>
                        <tr ng-repeat="m in member | filter:searchValue | orderBy : 'created'">
                            <td>@{{ m.hoten }}</td>
                            <td>
                                <span ng-if="m.hinhanh">
                                    <img src="@{{ m.hinhanh }}" ng-if="m.hinhanh" alt="image" class="fs-img-list img-responsive">
                                </span>
                            </td>
                            <td>@{{ m.email }}</td>
                            <td>
                                <a href="javascript: void(0)" ng-click="view(m.$id)" title="Xem chi tiết"><span class="fa fa-2x fa-search-plus"></span></a>
                                <a href="javascript: void(0)" ng-click="edit(m.$id)" title="Chỉnh sửa"><span class="fa fa-2x fa-edit"></span></a>
                                <a href="javascript: void(0)" ng-click="delete(m.$id)" title="Xóa" class="red"><span class="fa fa-2x fa-remove"></span></a>
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
    <script src="{{ url('js/member.js')  }}"></script>
@stop