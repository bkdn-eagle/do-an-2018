// validate message
const NOT_EMPTY                     = 'Không được để trống.';
const EXT_VIDEO_INVALID             = 'Bạn phải nhập vào 1 file Video.';
const EXT_IMAGE_INVALID             = 'Bạn phải nhập vào 1 file Image.';
const ADD_FS_SUCCESS                = 'Thêm mới thông tin Member thành công.';
const ADD_FS_FAIL                   = 'Thêm mới thông tin Member thất bại.';
const UPDATE_FS_SUCCESS             = 'Update thông tin Member thành công.';
const UPDATE_FS_FAIL                = 'Update thông tin Member thất bại.';
const DELETE_FS_SUCCESS             = 'Xóa thông tin Member thành công.';
const DELETE_FS_FAIL                = 'Xóa thông tin Member thất bại.';
const BTN_ADD_TEXT                  = 'Thêm mới';
const BTN_EDIT_TEXT                 = 'Chỉnh sửa';
const HEADER_FS_ADD                 = 'Thêm mới Member';
const HEADER_FS_EDIT                = 'Chỉnh sửa Member';
const HEADER_FS_VIEW                = 'Xem chi tiết Member';
const HEADER_FS_DELETE              = 'Bạn có chắc chắn muốn xóa ?';

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
    var ref = firebase.database().ref('thanhviens');
    // download the data into a local object
    $scope.member = $firebaseArray(ref);

    $scope.init = function () {
        $scope.hoten = "";
        $scope.hinhanh = "";
        $scope.email = "";
        $scope.keyHidden = "";
        $('#hinhanh').val('');
    };

    $scope.view = function (key) {
        $scope.init();
        $scope.FoodStoreAdd = false;
        $scope.disabled = true;
        $scope.nonedisabled = false;
        $scope.BtnAddEdit = false;
        $scope.ModalHeaderTitle = HEADER_FS_VIEW;
        angular.forEach($scope.member, function (_val, _key) {
            console.log(_val, _key)
            if (_val.$id == key) {
                angular.forEach(_val, function (__val, __key) {
                    $scope[__key] = __val;
                    $('#frmAddEdit').modal();
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
        $('#frmAddEdit').modal();
    };
    $scope.processAddEdit = function () {
        var hinhanh = document.getElementById('hinhanh').files;

        // declare
        var extImageList            = ['jpg', 'jpeg', 'png', 'gif'];
        var isOK                    = true;
        var selector_hoten          = document.getElementsByName('hoten');
        var selector_hinhanh        = document.getElementsByName('hinhanh');
        var selector_email          = document.getElementsByName('email');
        var selector_keyHidden      = document.getElementsByName('keyHidden');
        var hoten                   = $(selector_hoten).val();
        var email                   = $(selector_email).val();
        var keyHidden               = $(selector_keyHidden).val();

        // init
        $('form').parent().find('.text-danger').remove();

        // validate
        if (!hoten) {
            $(selector_hoten).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (hinhanh.length == 0) {
            if (!keyHidden) {
                $(selector_hinhanh).parent().append(
                    '<p class="text-danger">'+ NOT_EMPTY +'</p>'
                );
                isOK = false;
            }
        } else {
            // check extension
            var extImage = ((hinhanh[0].name).split('.').pop()).toLowerCase();
            console.log(extImage)
            if (extImageList.indexOf(extImage) == -1) {
                $(selector_hinhanh).parent().append(
                    '<p class="text-danger">'+ EXT_IMAGE_INVALID +'</p>'
                );
                isOK = false;
            }
        }

        if (isOK) {
            var keyMember = "";
            showLoader(true);

            if (keyHidden) {
                // $add data
                ref.child(keyHidden).update({
                    hoten: hoten,
                    update: CREATED
                }).then(function () {
                    console.log('update OK')
                }).catch(function (error) {
                    isOK = false;
                });

                keyMember = keyHidden;
                if (!keyMember) {
                    showDialogue(UPDATE_FS_FAIL);
                    showLoader(false);
                    return;
                }
                var imageURL = "";
                var storageRef = firebase.storage().ref();

                // upload Photo
                if (hinhanh.length > 0) {
                    var uploadImage = storageRef.child('thanhvien/' + keyMember + '.' + extImage).put(hinhanh[0]);
                    uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(progress)
                            if (progress == 100) {
                                showLoader(false);
                            }
                        },
                        function (error) {
                            console.log(error)
                        }, function () {
                            var downloadURL = uploadImage.snapshot.downloadURL;
                            console.log(downloadURL)
                            imageURL = downloadURL;

                            ref.child(keyMember).update({
                                hinhanh: downloadURL,
                                updated: CREATED
                            }).then(function () {
                                console.log('update 1 OKe')
                            })
                            .catch(function (error) {
                                console.log(error)
                                isOK = false;
                            });
                        });
                }

                // show message
                showDialogue(UPDATE_FS_SUCCESS);
                $('#frmAddEdit').modal('hide');
                showLoader(false);
            } else {
                // $add data
                $scope.member.$add({
                    hoten: hoten,
                    created: CREATED
                })
                    .then(function (key) {
                        console.log('insert OK')
                        keyMember = key.getKey();

                        if (!keyMember) {
                            showDialogue(ADD_FS_FAIL);
                            return;
                        }
                        var imageURL = "";
                        var storageRef = firebase.storage().ref();

                        // upload Photo
                        var uploadImage = storageRef.child('thanhvien/'+ keyMember + '.' + extImage).put(hinhanh[0]);
                        uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(progress)
                                if (progress == 100) {
                                    showLoader(false);
                                }
                            },
                            function (error) {
                                console.log(error)
                            }, function() {
                                var downloadURL = uploadImage.snapshot.downloadURL;
                                console.log(downloadURL)
                                imageURL = downloadURL;

                                ref.child(keyMember).update({
                                    hinhanh: downloadURL,
                                    updated: CREATED
                                }).then(function () {
                                    console.log('update 1 OKe');
                                    showDialogue(ADD_FS_SUCCESS);
                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                            });
                    }).catch(function (error) {
                    console.log(error)
                });
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
        angular.forEach($scope.member, function (_val, _key) {
            console.log(_val, _key)
            if (_val.$id == key) {
                $scope['keyHidden'] = key;
                angular.forEach(_val, function (__val, __key) {
                    $scope[__key] = __val;
                    $('#frmAddEdit').modal();
                });
            }
        });
    };

    $scope.delete = function (keyMember) {
        var dlg = $("#dlg-confirm").dialog({
            resizable: false,
            autoOpen: false,
            modal: true,
            dialogClass: 'dlg-simple',
            title: 'Xác nhận',
            buttons: {
                'Đồng ý': function () {
                    ref.child(keyMember).remove().then(function () {
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
