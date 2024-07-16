chrome.storage.local.get(['width', 'height', 'delay', 'keepResize', 'keepResizeTime'], function (res) {

    let delay = 0;
    if (res.delay) {
        delay = parseInt(res.delay);
    }
    setTimeout(loop, delay);
    let isFullscreen = 0;
    function loop() {
        chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function (window) {
            if (window.state === "fullscreen") {
                isFullscreen = 1;
            } else {
                isFullscreen = 0;
            }
            let sizeWidth = parseInt(res.width);
            let sizeHeight = parseInt(res.height);
            if (sizeWidth != 0 && sizeHeight != 0 && isFullscreen == 0) {
                chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
                    width: sizeWidth,
                    height: sizeHeight
                });
            }
            if (res.keepResize == 1 && res.keepResizeTime != 0) {
                setTimeout(loop, res.keepResizeTime);
            }
        });
    }
})