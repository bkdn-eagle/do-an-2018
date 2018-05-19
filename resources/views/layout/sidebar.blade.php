<!-- Sidebar -->
<div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
            <img src="{{url('images/avatar.png')}}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
            <a href="#" class="d-block">Trường Đạt</a>
        </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <!-- Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library -->
            <li class="nav-item">
                <a href="{{url('dashboard')}}" class="nav-link {{isset($current_menu) && $current_menu == 'dashboard' ? 'active' : ''}}">
                    <i class="nav-icon fa fa-dashboard"></i>
                    <p>
                        Dashboard
                    </p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{url('food-store')}}" class="nav-link {{isset($current_menu) && $current_menu == 'food-store' ? 'active' : ''}}">
                    <i class="nav-icon fa fa-shopping-bag"></i>
                    <p>
                        Food Store
                    </p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{url('member')}}" class="nav-link {{isset($current_menu) && $current_menu == 'member' ? 'active' : ''}}">
                    <i class="nav-icon fa fa-users"></i>
                    <p>
                        Member
                    </p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{ url('utility') }}" class="nav-link {{isset($current_menu) && $current_menu == 'utility' ? 'active' : ''}}">
                    <i class="nav-icon fa fa-cogs"></i>
                    <p>
                        Utility
                    </p>
                </a>
            </li>
        </ul>
    </nav>
    <!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->