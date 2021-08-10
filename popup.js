const info_text = document.getElementById("info-text")
chrome.storage.local.get("sending_port", (data) => {
    if (data.sending_port == null) return; document.getElementById("port-input").value = data.sending_port;
});
chrome.storage.local.get("extensionId", (data) => {
    if (data.extensionId == null) return; document.getElementById("extensionid-input").value = data.extensionId;
});
document.getElementById("button-confirm").addEventListener("click", () => {
    let port_input = document.getElementById("port-input")
    let extensionID_input = document.getElementById("extensionid-input")
    if (Number(port_input.value) > 0 && Number(port_input.value) < 65536) {
        chrome.runtime.sendMessage({ port: port_input.value })
    }
    else { return info_text.textContent = "Port must be greater than 0 and less than 65536"; }
    if (extensionID_input.value) {
        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.storage.local.set({ "extensionId": extensionID_input.value });
                chrome.tabs.sendMessage(tab.id, { extensionId: extensionID_input.value })
            });
        });
    }
    info_text.textContent = "Changes saved."
})