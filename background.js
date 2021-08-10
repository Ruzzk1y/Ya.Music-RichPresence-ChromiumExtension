let port;
chrome.storage.local.get(["sending_port"], (data) => { if (data.sending_port == null) { return } else port = data.sending_port; });
chrome.runtime.onMessage.addListener((m, s, sR) => {
    if (m.port) port = m.port
    chrome.storage.local.set({ "sending_port": m.port })
    console.log("Port changed to: " + m.port);
})

chrome.runtime.onMessageExternal.addListener(
    function (request) {
        if (port == null || port == undefined) port = 51972
        if (request.changePort) {
            port = request.changePort;

        }
        if (!request.__DRP) {
            console.group("INVALID REQUEST")
            console.log(request);
            console.groupEnd()
        }
        else {
            console.groupCollapsed("Request received:")
            socket = new WebSocket(`ws://localhost:${port}`)
            socket.addEventListener("open", () => { socket.send(JSON.stringify(request)); console.log("Sent to " + port); })
            console.log(request);
            console.groupEnd()
        }
    }
);