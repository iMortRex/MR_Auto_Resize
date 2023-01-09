// chrome.storage.sync.clear;
// chrome.storage.local.clear;

chrome.storage.local.get(['width', 'height', 'delay'], function (res) {
    if (res.width) {
        document.getElementById('width').value = res.width;
        document.getElementById('width').setAttribute('placeholder', ' ' + res.width);
    }
    if (res.height) {
        document.getElementById('height').value = res.height;
        document.getElementById('height').setAttribute('placeholder', ' ' + res.height);
    }
    if (res.delay) {
        document.getElementById('delay').value = res.delay;
        document.getElementById('delay').setAttribute('placeholder', ' ' + res.delay);
    } else {
        chrome.storage.local.set({ 'delay': 10 });
        document.getElementById('delay').value = '10';
        document.getElementById('delay').setAttribute('placeholder', ' ' + '10');
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
})