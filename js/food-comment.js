// validate message
const NOT_EMPTY                     = 'Không được để trống.';
const EXT_VIDEO_INVALID             = 'Bạn phải nhập vào 1 file Video.';
const EXT_IMAGE_INVALID             = 'Bạn phải nhập vào 1 file Image.';
const ADD_FS_SUCCESS                = 'Thêm mới thông tin Comment thành công.';
const ADD_FS_FAIL                   = 'Thêm mới thông tin Comment thất bại.';
const UPDATE_FS_SUCCESS             = 'Update thông tin Comment thành công.';
const UPDATE_FS_FAIL                = 'Update thông tin Comment thất bại.';
const DELETE_FS_SUCCESS             = 'Xóa thông tin Comment thành công.';
const DELETE_FS_FAIL                = 'Xóa thông tin Comment thất bại.';
const BTN_ADD_TEXT                  = 'Thêm mới';
const BTN_EDIT_TEXT                 = 'Chỉnh sửa';
const HEADER_FS_ADD                 = 'Thêm mới Comment';
const HEADER_FS_EDIT                = 'Chỉnh sửa Comment';
const HEADER_FS_VIEW                = 'Xem chi tiết Comment';
const HEADER_FS_DELETE              = 'Bạn có chắc chắn muốn xóa ?';
const FOOD_KEY_NOT_EXIST            = 'Food Key không tồn tại';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB4EoIu8YQU7zyAJDHMvHBBifRbC5GpcYI",
    authDomain: "doantotnghiep-6755e.firebaseapp.com",
    databaseURL: "https://doantotnghiep-6755e.firebaseio.com",
    projectId: "doantotnghiep-6755e",
    storageBucket: "doantotnghiep-6755e.appspot.com",
    messagingSenderId: "19235158231"
};
firebase.initializeApp(config);

var app = angular.module("App", ["firebase"]);

app.controller("AppController", function($scope, $firebaseArray) {
    // check foodKey already exist
    if (!foodKey) {
        showDialogue(FOOD_KEY_NOT_EXIST, true, urlDashboard);
        return;
    }
    firebase.database().ref('quanans').child(foodKey)
    .once('value').then(function(snapshot) {
        if (!snapshot.val()) {
            showDialogue(FOOD_KEY_NOT_EXIST, true, urlDashboard);
            return;
        }
    });

    var ref_binhluans = firebase.database().ref('binhluans').child(foodKey);
    // download the data into a local object
    $scope.binhluans = $firebaseArray(ref_binhluans);
    console.log($scope.binhluans)

    $scope.init = function () {
        $scope.tieude = "";
        $scope.mauser = "";
        $scope.chamdiem = "";
        $scope.luotthich = "";
        $scope.noidung = "";
        $scope.keyHidden = "";
    };

    $scope.view = function (key) {
        $scope.init();
        $scope.FoodStoreAdd = false;
        $scope.disabled = true;
        $scope.nonedisabled = false;
        $scope.BtnAddEdit = false;
        $scope.ModalHeaderTitle = HEADER_FS_VIEW;
        angular.forEach($scope.binhluans, function (_val, _key) {
            console.log(_val, _key)
            if (_val.$id == key) {
                angular.forEach(_val, function (__val, __key) {
                    $scope[__key] = __val;
                    $('#frmFoodStoreComment').modal();
                });
            }
        });
    };

    $scope.showFrmAddNew = function () {
        $scope.init();
        $scope.FoodStoreAdd = true;
        $scope.disabled = false;
        $scope.nonedisabled = true;
        $scope.BtnAddEdit = BTN_ADD_TEXT;
        $scope.ModalHeaderTitle = HEADER_FS_ADD;
        $('#frmFoodStoreComment').modal();
    };
    $scope.processAddEdit = function () {
        // declare
        var isOK                                    = true;
        var selector_tieude                         = document.getElementsByName('tieude');
        var selector_mauser                         = document.getElementsByName('mauser');
        var selector_chamdiem                       = document.getElementsByName('chamdiem');
        var selector_luotthich                      = document.getElementsByName('luotthich');
        var selector_noidung                        = document.getElementsByName('noidung');
        var selector_keyHidden                      = document.getElementsByName('keyHidden');
        var tieude                                  = $(selector_tieude).val();
        var mauser                                  = $(selector_mauser).val();
        var chamdiem                                = $(selector_chamdiem).val();
        var luotthich                               = $(selector_luotthich).val();
        var noidung                                 = $(selector_noidung).val();
        var keyHidden                               = $(selector_keyHidden).val();

        // init
        $('form').parent().find('.text-danger').remove();

        // validate
        if (!tieude) {
            $(selector_tieude).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!mauser) {
            $(selector_mauser).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!chamdiem) {
            $(selector_chamdiem).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!luotthich) {
            $(selector_luotthich).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!noidung) {
            $(selector_noidung).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }

        if (isOK) {
            showLoader(true);
            if (keyHidden) {
                // $add data
                ref_binhluans.child(keyHidden).update({
                    tieude: tieude,
                    mauser: mauser,
                    chamdiem: parseFloat(chamdiem),
                    luotthich: parseInt(luotthich),
                    noidung: noidung,
                    update: CREATED
                }).then(function () {
                    console.log('update OK')
                    // show message
                    showDialogue(UPDATE_FS_SUCCESS, true);
                    $('#frmAddEdit').modal('hide');
                }).catch(function (error) {
                    isOK = false;
                    showDialogue(UPDATE_FS_FAIL);
                });
                showLoader(false);
            } else {
                // $add data
                $scope.utility.$add({
                    tieude: tieude,
                    mauser: mauser,
                    chamdiem: parseFloat(chamdiem),
                    luotthich: parseFloat(luotthich),
                    noidung: noidung,
                    created: CREATED
                })
                .then(function (key) {
                    console.log('insert OK')
                    showDialogue(ADD_FS_SUCCESS, true);

                }).catch(function (error) {
                    console.log(error)
                    showDialogue(UPDATE_FS_FAIL);
                });
                showLoader(false);
            }
        }
    };

    $scope.edit = function (key) {
        $scope.init();
        $scope.FoodStoreAdd = true;
        $scope.disabled = false;
        $scope.nonedisabled = true;
        $scope.BtnAddEdit = BTN_EDIT_TEXT;
        $scope.ModalHeaderTitle = HEADER_FS_EDIT;
        angular.forEach($scope.binhluans, function (_val, _key) {
            console.log(_val, _key)
            if (_val.$id == key) {
                $scope['keyHidden'] = key;
                angular.forEach(_val, function (__val, __key) {
                    $scope[__key] = __val;
                    $('#frmFoodStoreComment').modal();
                });
            }
        });
    };

    $scope.delete = function (keyComment) {
        var dlg = $("#dlg-confirm").dialog({
            resizable: false,
            autoOpen: false,
            modal: true,
            dialogClass: 'dlg-simple',
            title: 'Xác nhận',
            buttons: {
                'Đồng ý': function () {
                    ref_binhluans.child(keyComment).remove().then(function () {
                        console.log(ref_binhluans, keyComment)
                        console.log('OK')
                        showDialogue(DELETE_FS_SUCCESS, true);
                    })
                    .catch(function (error) {
                        console.log(error)
                        showDialogue(DELETE_FS_FAIL);
                    });
                    dlg.dialog("close");
                    return;
                },
                'Đóng': function () {
                    dlg.dialog("close");
                    return;
                }
            }
        });
        dlg.html(HEADER_FS_DELETE);
        dlg.dialog('open');
    };
});
