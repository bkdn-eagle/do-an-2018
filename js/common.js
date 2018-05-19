function showDialogue(msg, isReload, url) {
    var dlg = $("#dlg").dialog({
        resizable: false,
        autoOpen: false,
        modal: true,
        dialogClass: 'dlg-simple',
        title: 'Thông báo',
        buttons: {
            Đóng: function () {
                dlg.dialog("close");
                if (isReload && url) {
                    window.location.href = url;
                } else if (isReload) {
                    window.location.reload();
                }
                return false;
            }
        }
    });
    dlg.html(msg);
    dlg.dialog('open');
}

function showLoader(isShow) {
    if (isShow) {
        $('.show-loader').show();
    } else {
        $('.show-loader').hide();
    }
}