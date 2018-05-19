// validate message
const NOT_EMPTY                     = 'Không được để trống.';
const EXT_VIDEO_INVALID             = 'Bạn phải nhập vào 1 file Video.';
const EXT_IMAGE_INVALID             = 'Bạn phải nhập vào 1 file Image.';
const ADD_FS_SUCCESS                = 'Thêm mới thông tin Utility thành công.';
const ADD_FS_FAIL                   = 'Thêm mới thông tin Utility thất bại.';
const UPDATE_FS_SUCCESS             = 'Update thông tin Utility thành công.';
const UPDATE_FS_FAIL                = 'Update thông tin Utility thất bại.';
const DELETE_FS_SUCCESS             = 'Xóa thông tin Utility thành công.';
const DELETE_FS_FAIL                = 'Xóa thông tin Utility thất bại.';
const BTN_ADD_TEXT                  = 'Thêm mới';
const BTN_EDIT_TEXT                 = 'Chỉnh sửa';
const HEADER_FS_ADD                 = 'Thêm mới Utility';
const HEADER_FS_EDIT                = 'Chỉnh sửa Utility';
const HEADER_FS_VIEW                = 'Xem chi tiết Utility';
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
    var ref = firebase.database().ref('quanlytienichs');
    // download the data into a local object
    $scope.utility = $firebaseArray(ref);

    $scope.init = function () {
        $scope.tentienich = "";
        $scope.hinhtienich = "";
        $scope.keyHidden = "";
    };

    $scope.view = function (key) {
        $scope.init();
        $scope.FoodStoreAdd = false;
        $scope.disabled = true;
        $scope.nonedisabled = false;
        $scope.BtnAddEdit = false;
        $scope.ModalHeaderTitle = HEADER_FS_VIEW;
        angular.forEach($scope.utility, function (_val, _key) {
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
        var hinhtienich = document.getElementById('hinhtienich').files;

        // declare
        var extImageList                            = ['jpg', 'jpeg', 'png', 'gif'];
        var isOK                                    = true;
        var selector_tentienich                     = document.getElementsByName('tentienich');
        var selector_hinhtienich                    = document.getElementsByName('hinhtienich');
        var selector_keyHidden                      = document.getElementsByName('keyHidden');
        var tentienich                              = $(selector_tentienich).val();
        var keyHidden                               = $(selector_keyHidden).val();

        // init
        $('form').parent().find('.text-danger').remove();

        // validate
        if (!tentienich) {
            $(selector_tentienich).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (hinhtienich.length == 0) {
            if (!keyHidden) {
                $(selector_hinhtienich).parent().append(
                    '<p class="text-danger">'+ NOT_EMPTY +'</p>'
                );
                isOK = false;
            }
        } else {
            // check extension
            var extImage = ((hinhtienich[0].name).split('.').pop()).toLowerCase();
            console.log(extImage)
            if (extImageList.indexOf(extImage) == -1) {
                $(selector_hinhtienich).parent().append(
                    '<p class="text-danger">'+ EXT_IMAGE_INVALID +'</p>'
                );
                isOK = false;
            }
        }

        if (isOK) {
            var keyUtility = "";
            showLoader(true);

            if (keyHidden) {
                // $add data
                ref.child(keyHidden).update({
                    tentienich: tentienich,
                    update: CREATED
                }).then(function () {
                    console.log('update OK')
                }).catch(function (error) {
                    isOK = false;
                });

                keyUtility = keyHidden;
                if (!keyUtility) {
                    showDialogue(UPDATE_FS_FAIL);
                    showLoader(false);
                    return;
                }
                var imageURL = "";
                var storageRef = firebase.storage().ref();

                // upload Photo
                if (hinhtienich.length > 0) {
                    var uploadImage = storageRef.child('hinhtienich/' + keyUtility + '.' + extImage).put(hinhtienich[0]);
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

                        ref.child(keyUtility).update({
                            hinhtienich: downloadURL,
                            updated: CREATED
                        }).then(function () {
                            console.log('update 1 OKe');
                            showDialogue(UPDATE_FS_SUCCESS);
                            showLoader(false);
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
                $scope.utility.$add({
                    tentienich: tentienich,
                    created: CREATED
                })
                    .then(function (key) {
                        console.log('insert OK')
                        keyUtility = key.getKey();

                        if (!keyUtility) {
                            showDialogue(ADD_FS_FAIL);
                            return;
                        }
                        var imageURL = "";
                        var storageRef = firebase.storage().ref();

                        // upload Photo
                        var uploadImage = storageRef.child('hinhtienich/'+ keyUtility + '.' + extImage).put(hinhtienich[0]);
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

                            ref.child(keyUtility).update({
                                hinhtienich: downloadURL,
                                updated: CREATED
                            }).then(function () {
                                console.log('update 1 OKe');
                                showDialogue(ADD_FS_SUCCESS);
                            })
                            .catch(function (error) {
                                console.log(error);
                                showDialogue(ADD_FS_FAIL);
                            });
                        });
                    }).catch(function (error) {
                    console.log(error)
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
        angular.forEach($scope.utility, function (_val, _key) {
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

    $scope.delete = function (keyUtility) {
        var dlg = $("#dlg-confirm").dialog({
            resizable: false,
            autoOpen: false,
            modal: true,
            dialogClass: 'dlg-simple',
            title: 'Xác nhận',
            buttons: {
                'Đồng ý': function () {
                    ref.child(keyUtility).remove().then(function () {
                        showDialogue(DELETE_FS_SUCCESS);
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
