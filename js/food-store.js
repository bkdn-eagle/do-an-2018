// validate message
const NOT_EMPTY                     = 'Không được để trống.';
const EXT_VIDEO_INVALID             = 'Bạn phải nhập vào 1 file Video.';
const EXT_IMAGE_INVALID             = 'Bạn phải nhập vào 1 file Image.';
const ADD_FS_SUCCESS                = 'Thêm mới thông tin Food-Store thành công.';
const ADD_FS_FAIL                   = 'Thêm mới thông tin Food-Store thất bại.';
const UPDATE_FS_SUCCESS             = 'Update thông tin Food-Store thành công.';
const UPDATE_FS_FAIL                = 'Update thông tin Food-Store thất bại.';
const DELETE_FS_SUCCESS             = 'Xóa thông tin Food-Store thành công.';
const DELETE_FS_FAIL                = 'Xóa thông tin Food-Store thất bại.';
const BTN_ADD_TEXT                  = 'Thêm mới';
const BTN_EDIT_TEXT                 = 'Chỉnh sửa';
const HEADER_FS_ADD                 = 'Thêm mới Food-Store';
const HEADER_FS_EDIT                = 'Chỉnh sửa Food-Store';
const HEADER_FS_VIEW                = 'Xem chi tiết Food-Store';
const HEADER_FS_DELETE              = 'Bạn có chắc chắn muốn xóa ?';
const HEADER_UTILITY_ADD            = 'Thêm mới Utility';
const HEADER_COMMENT_ADD            = 'Thêm mới Comment';
const ADD_BINH_LUAN_SUCCESS         = 'Thêm mới bình luận thành công.';
const ADD_BINH_LUAN_FAIL            = 'Thêm mới bình luận thất bại.'
const DELETE_COMMENT_SUCCESS        = 'Xóa thông tin Comment thành công.';
const DELETE_COMMENT_FAIL           = 'Xóa thông tin Comment thất bại.';
const HEADER_COMMENT_DELETE         = 'Bạn có chắc chắn muốn xóa ?';
const UPDATE_COMMENT_SUCCESS        = 'Update thông tin Comment thành công.';
const UPDATE_COMMENT_FAIL           = 'Update thông tin Comment bại.';

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
    var ref = firebase.database().ref('quanans');
    var ref_chinhanhquanans = firebase.database().ref('chinhanhquanans');
    var ref_quanlytienichs = firebase.database().ref('quanlytienichs');
    var ref_binhluans = firebase.database().ref('binhluans');
    // download the data into a local object
    $scope.food_store = $firebaseArray(ref);
    $scope.chinhanhquanans = $firebaseArray(ref_chinhanhquanans);
    $scope.quanlytienichs = $firebaseArray(ref_quanlytienichs);
    $scope.binhluans = $firebaseArray(ref_binhluans);

    $scope.init = function () {
        $scope.tenquanan = "";
        $scope.giomocua = "";
        $scope.giodongcua = "";
        $scope.giatoithieu = "";
        $scope.giatoida = "";
        $scope.hinhanhgioithieu = "";
        $scope.videogioithieu = "";
        $scope.keyHidden = "";
    };

    $scope.view = function (key) {
        $scope.init();
        $scope.FoodStoreAdd = false;
        $scope.disabled = true;
        $scope.nonedisabled = false;
        $scope.BtnAddEdit = false;
        $scope.ModalHeaderTitle = HEADER_FS_VIEW;
        $scope.noShowFrmChiNhanhQA = true;
        angular.forEach($scope.food_store, function (_val, _key) {
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
        $scope.showBtnAddChiNhanh = false;
        $scope.utilityEdit = false;
        $('#frmAddEdit').modal();
    };
    $scope.processAddEdit = function () {
        var hinhanhgioithieu = document.getElementById('hinhanhgioithieu').files;
        var videogioithieu = document.getElementById('videogioithieu').files;

        // declare
        var extImageList                        = ['jpg', 'jpeg', 'png', 'gif'];
        var extVideoList                        = ['mp4'];
        var isOK                                = true;
        var selector_tenquanan                  = document.getElementsByName('tenquanan');
        var selector_giomocua                   = document.getElementsByName('giomocua');
        var selector_giodongcua                 = document.getElementsByName('giodongcua');
        var selector_giatoithieu                = document.getElementsByName('giatoithieu');
        var selector_giatoida                   = document.getElementsByName('giatoida');
        var selector_hinhanhgioithieu           = document.getElementsByName('hinhanhgioithieu');
        var selector_videogioithieu             = document.getElementsByName('videogioithieu');
        var selector_keyHidden                  = document.getElementsByName('keyHidden');
        var tenquanan                           = $(selector_tenquanan).val();
        var giomocua                            = $(selector_giomocua).val();
        var giodongcua                          = $(selector_giodongcua).val();
        var giatoithieu                         = $(selector_giatoithieu).val();
        var giatoida                            = $(selector_giatoida).val();
        var keyHidden                           = $(selector_keyHidden).val();
        var selector_diachi                     = document.getElementsByName('diachi');
        var selector_latitude                   = document.getElementsByName('latitude');
        var selector_longitude                  = document.getElementsByName('longitude');
        var diachi                              = $(selector_diachi).val();
        var latitude                            = $(selector_latitude).val();
        var longitude                           = $(selector_longitude).val();

        // init
        $('form#frmAddEditChiTietCNQA').parent().find('.text-danger').remove();

        // init
        $('form').parent().find('.text-danger').remove();

        // validate
        if (!tenquanan) {
            $(selector_tenquanan).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!giomocua) {
            $(selector_giomocua).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!giodongcua) {
            $(selector_giodongcua).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        console.log('giatoithieu', giatoithieu)
        console.log($scope.giatoithieu)
        if (!giatoithieu) {
            $(selector_giatoithieu).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        console.log('giatoida', giatoida)
        if (!giatoida) {
            $(selector_giatoida).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (hinhanhgioithieu.length == 0) {
            if (!keyHidden) {
                $(selector_hinhanhgioithieu).parent().append(
                    '<p class="text-danger">'+ NOT_EMPTY +'</p>'
                );
                isOK = false;
            }
        } else {
            // check extension
            var extImage = ((hinhanhgioithieu[0].name).split('.').pop()).toLowerCase();
            console.log(extImage)
            if (extImageList.indexOf(extImage) == -1) {
                $(selector_hinhanhgioithieu).parent().append(
                    '<p class="text-danger">'+ EXT_IMAGE_INVALID +'</p>'
                );
                isOK = false;
            }
        }
        if (videogioithieu.length == 0) {
            if (!keyHidden) {
                $(selector_videogioithieu).parent().append(
                    '<p class="text-danger">'+ NOT_EMPTY +'</p>'
                );
                isOK = false;
            }
        } else {
            // check extension
            var extVideo = ((videogioithieu[0].name).split('.').pop()).toLowerCase();
            console.log(extVideo)
            if (extVideoList.indexOf(extVideo) == -1) {
                $(selector_videogioithieu).parent().append(
                    '<p class="text-danger">'+ EXT_VIDEO_INVALID +'</p>'
                );
                isOK = false;
            }
        }

        if (isOK) {
            var keyFoodStore = "";
            showLoader(true);



            if (keyHidden) {
                // $add data
                ref.child(keyHidden).update({
                    giatoida: parseFloat(giatoida),
                    giatoithieu: parseFloat(giatoithieu),
                    giodongcua: giodongcua,
                    giomocua: giomocua,
                    luotthich: parseFloat(0),
                    tenquanan: tenquanan,
                    update: CREATED
                }).then(function () {
                    console.log('update OK')
                }).catch(function (error) {
                    isOK = false;
                });

                keyFoodStore = keyHidden;
                if (!keyFoodStore) {
                    showDialogue(UPDATE_FS_FAIL);
                    showLoader(false);
                    return;
                }
                // add Utility
                var utilityArr = [];
                $('.cbUtility:checked').each(function () {
                    utilityArr.push($(this).val());
                });
                console.log(utilityArr)
                ref.child(keyFoodStore).child('tienich').set(utilityArr).then(function () {
                    console.log('insert Utility OK')
                })
                .catch(function (error) {
                    console.log('insert Utility FAIL', error)
                });

                var imageURL = "";
                var storageRef = firebase.storage().ref();

                // upload Photo
                if (hinhanhgioithieu.length > 0) {
                    var uploadImage = storageRef.child('food-store/' + keyFoodStore + '.' + extImage).put(hinhanhgioithieu[0]);
                    uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(progress)
                            if (progress == 100) {
                                // showLoader(false);
                            }
                        },
                        function (error) {
                            console.log(error)
                        }, function () {
                            var downloadURL = uploadImage.snapshot.downloadURL;
                            console.log(downloadURL)
                            imageURL = downloadURL;

                            ref.child(keyFoodStore).update({
                                hinhanhgioithieu: downloadURL,
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

                // upload Video
                if (videogioithieu.length > 0) {
                    var uploadVideo = storageRef.child('food-store/' + keyFoodStore + '.' + extVideo).put(videogioithieu[0]);
                    uploadVideo.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(progress)
                            if (progress == 100) {
                                showLoader(false);
                            }
                        },
                        function (error) {
                            console.log(error)
                        }, function () {
                            var downloadURL = uploadVideo.snapshot.downloadURL;
                            console.log(downloadURL)
                            videoURL = downloadURL;

                            console.log(ref.child(keyFoodStore))
                            ref.child(keyFoodStore).update({
                                videogioithieu: downloadURL,
                                updated: CREATED
                            }).then(function () {
                                console.log('update 2 OKe')
                                // showDialogue(UPDATE_FS_SUCCESS);
                                $('#frmAddEdit').modal('hide');
                            })
                            .catch(function (error) {
                                console.log(error)
                                showLoader(false);
                                isOK = false;
                            });
                        });
                }

                // show message
                showDialogue(UPDATE_FS_SUCCESS, true);
                $('#frmAddEdit').modal('hide');
                showLoader(false);
            } else {
                // validate
                if (!diachi) {
                    $(selector_diachi).parent().append(
                        '<p class="text-danger">'+ NOT_EMPTY +'</p>'
                    );
                    isOK = false;
                }
                if (!latitude) {
                    $(selector_latitude).parent().append(
                        '<p class="text-danger">'+ NOT_EMPTY +'</p>'
                    );
                    isOK = false;
                }
                if (!longitude) {
                    $(selector_longitude).parent().append(
                        '<p class="text-danger">'+ NOT_EMPTY +'</p>'
                    );
                    isOK = false;
                }

                if (!isOK) {
                    showDialogue(ADD_FS_FAIL);
                    return;
                }

                // $add data
                $scope.food_store.$add({
                    giatoida: parseFloat(giatoida),
                    giatoithieu: parseFloat(giatoithieu),
                    giodongcua: giodongcua,
                    giomocua: giomocua,
                    luotthich: parseFloat(0),
                    tenquanan: tenquanan,
                    created: CREATED
                })
                    .then(function (key) {
                        console.log('insert OK')
                        keyFoodStore = key.getKey();

                        if (!keyFoodStore) {
                            showDialogue(ADD_FS_FAIL);
                            return;
                        }

                        ref_chinhanhquanans.child(keyFoodStore).push({
                            diachi: diachi,
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude)
                        })
                        .then(function () {
                            console.log('create OKKKK');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                        // add Utility
                        var utilityArr = [];
                        $('.cbUtility:checked').each(function () {
                            utilityArr.push($(this).val());
                        });
                        console.log(utilityArr)
                        ref.child(keyFoodStore).child('tienich').set(utilityArr).then(function () {
                            console.log('insert Utility OK')
                        })
                        .catch(function (error) {
                            console.log('insert Utility FAIL', error)
                        });

                        var imageURL = "";
                        var storageRef = firebase.storage().ref();

                        // upload Photo
                        var uploadImage = storageRef.child('food-store/'+ keyFoodStore + '.' + extImage).put(hinhanhgioithieu[0]);
                        uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(progress)
                                if (progress == 100) {
                                    // showLoader(false);
                                }
                            },
                            function (error) {
                                console.log(error)
                            }, function() {
                                var downloadURL = uploadImage.snapshot.downloadURL;
                                console.log(downloadURL)
                                imageURL = downloadURL;

                                ref.child(keyFoodStore).update({
                                    hinhanhgioithieu: downloadURL,
                                    updated: CREATED
                                }).then(function () {
                                    console.log('update 1 OKe')
                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                            });

                        // upload Video
                        var uploadVideo = storageRef.child('food-store/'+ keyFoodStore + '.' + extVideo).put(videogioithieu[0]);
                        uploadVideo.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(progress)
                                if (progress == 100) {
                                    showLoader(false);
                                }
                            },
                            function (error) {
                                console.log(error)
                            }, function () {
                                var downloadURL = uploadVideo.snapshot.downloadURL;
                                console.log(downloadURL)
                                videoURL = downloadURL;

                                console.log(ref.child(keyFoodStore))
                                ref.child(keyFoodStore).update({
                                    videogioithieu: downloadURL,
                                    updated: CREATED
                                }).then(function () {
                                    console.log('update 2 OKe')
                                    showDialogue(ADD_FS_SUCCESS);
                                    $('#frmAddEdit').modal('hide');
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
        $scope.showBtnAddChiNhanh = true;
        $scope.ModalHeaderTitle = HEADER_FS_EDIT;
        $scope.utilityEdit = true;
        angular.forEach($scope.food_store, function (_val, _key) {
            if (_val.$id == key) {
                $scope['keyHidden'] = key;
                angular.forEach(_val, function (__val, __key) {
                    $scope[__key] = __val;
                    $('#frmAddEdit').modal();
                });
            }
        });

        angular.forEach($scope.quanlytienichs, function (_val, _key) {
            $scope.quanlytienichs[_key]['checked'] = false;
            angular.forEach($scope.tienich, function (__val, __key) {
                if (_key == __key) {
                    $scope.quanlytienichs[_key]['checked'] = true;
                }
            });
        });
        console.log('$scope.quanlytienichs', $scope.quanlytienichs)

        angular.forEach($scope.chinhanhquanans, function (_val, _key) {
            if (_val.$id == key) {
                $scope.chitiet_chinhanhquanans = _val;
                console.log($scope.chitiet_chinhanhquanans)
            }
        });


    };

    $scope.delete = function (keyFoodStore) {
        var dlg = $("#dlg-confirm").dialog({
            resizable: false,
            autoOpen: false,
            modal: true,
            dialogClass: 'dlg-simple',
            title: 'Xác nhận',
            buttons: {
                'Đồng ý': function () {
                    ref.child(keyFoodStore).remove().then(function () {
                        ref_chinhanhquanans.child(keyFoodStore).remove().then(function () {
                            console.log('Delete chinhanhquanans OK')
                        })
                        .catch(function (error) {
                            console.log(error)
                        });

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

    $scope.viewUtility = function (keyFoodStore) {
        console.log($scope.food_store)
        angular.forEach($scope.food_store, function (_val) {
            if (_val.$id == keyFoodStore) {
                console.log(_val.tienich)
                $scope.tienich = _val.tienich;
            }
        });
        $("#sl-utility").select2({
            tags: true
        });

        $scope.BtnAddEdit = BTN_ADD_TEXT;
        $scope.ModalHeaderTitle = HEADER_UTILITY_ADD;
        $('#frmFoodStoreUtility').modal();
    };

    $scope.viewComment = function (keyFoodStore) {
        console.log($scope.food_store)
        angular.forEach($scope.binhluans, function (_val) {
            if (_val.$id == keyFoodStore) {
                console.log(_val.tienich)
                $scope.binhluans = _val;
            }
        });

        $scope.BtnAddEdit = BTN_ADD_TEXT;
        $scope.ModalHeaderTitle = HEADER_COMMENT_ADD;
        $scope.showComment = true;
        $scope.keyHidden = keyFoodStore;
        $('#frmFoodStoreComment').modal();
    };

    $scope.editChiTietCNQA = function (key) {
        var diachi = $(this).parent().find('input[name="diachi"]').val();
        console.log(diachi, key)
    };

    $scope.editChiTietCNQADiaChi = function (key, event) {
        var dataUpdate = event.chitiet_cn;
        ref_chinhanhquanans.child($scope['keyHidden']).child(key).update(dataUpdate)
            .then(function () {
                console.log('update OKKKK');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    $scope.deleteChiTietCNQA = function (key) {
        ref_chinhanhquanans.child($scope['keyHidden']).child(key).remove()
            .then(function () {
                console.log('delete OKKKK');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    $scope.processAddEditChiTietCNQA = function () {
        // declare
        var isOK                                    = true;
        var selector_diachi                         = document.getElementsByName('diachi');
        var selector_latitude                       = document.getElementsByName('latitude');
        var selector_longitude                      = document.getElementsByName('longitude');
        var diachi                                  = $(selector_diachi).val();
        var latitude                                = $(selector_latitude).val();
        var longitude                               = $(selector_longitude).val();

        // init
        $('form#frmAddEditChiTietCNQA').parent().find('.text-danger').remove();

        // validate
        if (!diachi) {
            $(selector_diachi).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!latitude) {
            $(selector_latitude).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }
        if (!longitude) {
            $(selector_longitude).parent().append(
                '<p class="text-danger">'+ NOT_EMPTY +'</p>'
            );
            isOK = false;
        }

        if (isOK) {
            ref_chinhanhquanans.child($scope['keyHidden']).push({
                diachi: diachi,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            })
            .then(function () {
                console.log('create OKKKK');
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };
});
