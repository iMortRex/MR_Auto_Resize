chrome.storage.local.get(['width', 'height', 'delay'], function (res) {
    let delay = 0;
    if (res.delay) {
        delay = parseInt(res.delay);
    }
    setTimeout(loop, delay);
    function loop() {
        let sizeWidth = parseInt(res.width);
        let sizeHeight = parseInt(res.height);
        if (sizeWidth != 0 && sizeHeight != 0) {
            chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
                width: sizeWidth,
                height: sizeHeight
            });
        }
    }
})