// chrome.storage.sync.clear;
// chrome.storage.local.clear;

chrome.storage.local.get(['width', 'height', 'delay', 'keepResize', 'keepResizeTime'], function (res) {
    // 宽
    if (res.width) {
        document.getElementById('width').value = res.width;
        document.getElementById('width').setAttribute('placeholder', ' ' + res.width);
    }
    // 高
    if (res.height) {
        document.getElementById('height').value = res.height;
        document.getElementById('height').setAttribute('placeholder', ' ' + res.height);
    }
    // 延迟时间
    if (res.delay) {
        document.getElementById('delay').value = res.delay;
        document.getElementById('delay').setAttribute('placeholder', ' ' + res.delay);
    } else {
        chrome.storage.local.set({ 'delay': 0 });
        document.getElementById('delay').value = '0';
        document.getElementById('delay').setAttribute('placeholder', ' ' + '0');
    }
    // 是否持续重设窗口
    if (res.keepResize) {
        if (res.keepResize == 0) {
            document.getElementById('keepResizeConfirm').textContent = '关闭';
        } else {
            document.getElementById('keepResizeConfirm').textContent = '开启';
        }
    } else {
        chrome.storage.local.set({ 'keepResize': 0 });
        document.getElementById('keepResizeConfirm').textContent = '关闭';
    }
    // 重设时间
    if (res.keepResizeTime) {
        document.getElementById('keepResizeTime').value = res.keepResizeTime;
        document.getElementById('keepResizeTime').setAttribute('placeholder', ' ' + res.keepResizeTime);
    } else {
        chrome.storage.local.set({ 'keepResizeTime': 1000 });
        document.getElementById('keepResizeTime').value = '1000';
        document.getElementById('keepResizeTime').setAttribute('placeholder', ' ' + '1000');
    }

    // 尺寸点击事件
    document.getElementById('sizeConfirm').addEventListener('click', function () {
        if (document.getElementById('width').value != '') {
            chrome.storage.local.set({ 'width': document.getElementById('width').value });
        }
        if (document.getElementById('height').value != '') {
            chrome.storage.local.set({ 'height': document.getElementById('height').value });
        }
        chrome.storage.local.get(['width', 'height'], function (res) {
            let sizeWidth = parseInt(res.width);
            let sizeHeight = parseInt(res.height);
            if (document.getElementById('width').value != '' && document.getElementById('height').value != '') {
                document.getElementById('sizeNotification').textContent = '已应用';
                // document.getElementById('sizeNotification').textContent = typeof sizeWidth;
                document.getElementById('sizeNotification').style.cssText += 'color: var(--textColor) !important;';
                chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
                    width: sizeWidth,
                    height: sizeHeight
                });
            } else {
                document.getElementById('sizeNotification').textContent = '必须设置所有变量';
                document.getElementById('sizeNotification').style.cssText += 'color: red !important;';
            }
        })
    })

    // 延迟时间点击事件
    document.getElementById('delayConfirm').addEventListener('click', function () {
        chrome.storage.local.set({ 'delay': document.getElementById('delay').value });
    })

    var keepResizeSwtich = res.keepResize;
    // 是否持续重设窗口点击事件
    document.getElementById('keepResizeConfirm').addEventListener('click', function () {
        if (keepResizeSwtich == 0) {
            keepResizeSwtich = 1;
            chrome.storage.local.set({ 'keepResize': 1 });
            this.textContent = '开启';
        } else {
            keepResizeSwtich = 0;
            chrome.storage.local.set({ 'keepResize': 0 });
            this.textContent = '关闭';
        }
        chrome.runtime.reload();
    })

    // 是否持续重设窗口点击事件
    document.getElementById('keepResizeTimeConfirm').addEventListener('click', function () {
        chrome.storage.local.set({ 'keepResizeTime': document.getElementById('keepResizeTime').value });
    })
})