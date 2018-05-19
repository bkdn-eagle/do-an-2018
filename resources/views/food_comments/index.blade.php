@extends('layout.layout')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Store Food List</h3>
                    <div class="card-tools">
                        <div class="input-group input-group-sm" style="width: 150px;">
                            <input type="text" ng-model="searchValue" name="table_search" class="form-control float-right" placeholder="Search">
                        </div>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Lượt thích</th>
                            <th>Chấm điểm</th>
                            <th>Thao tác</th>
                        </tr>
                        <tr ng-repeat="(key, bl) in binhluans | filter:searchValue">
                            <td>
                                @{{ bl.tieude }}
                            </td>
                            <td>
                                @{{ bl.luotthich }}
                            </td>
                            <td>
                                @{{ bl.chamdiem }}
                            </td>
                            <td>
                                <a href="javascript: void(0)" ng-click="view(bl.$id)" title="Xem chi tiết"><span class="fa fa-2x fa-search-plus"></span></a>&nbsp;&nbsp;
                                <a href="javascript: void(0)" ng-click="edit(bl.$id)" title="Chinh sửa"><span class="fa fa-2x fa-edit"></span></a>&nbsp;&nbsp;
                                <a href="javascript: void(0)" ng-click="delete(bl.$id)" title="Xóa" class="red"><span class="fa fa-2x fa-remove"></span></a>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
    </div>
@stop

@section('page_js')
    <script>
        var foodKey = '{{ $foodId }}';
        var urlDashboard = '{{ url('dashboard') }}';
    </script>
    <script src="{{ url('js/food-comment.js')  }}"></script>
@stop