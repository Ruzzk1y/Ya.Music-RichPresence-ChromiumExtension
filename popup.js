const info_text = document.getElementById("info-text")
let port_input = document.getElementById("port-input")
chrome.storage.local.get("sending_port", (data) => {
    if (data.sending_port == null) return; port_input.value = data.sending_port;
});
document.getElementById("button-confirm").addEventListener("click", () => {
    let port_input = document.getElementById("port-input")
    if (Number(port_input.value) > 0 && Number(port_input.value) < 65536) {
        info_text.textContent = "Sending to port " + port_input.value
        return chrome.runtime.sendMessage({ port: port_input.value })
    }
    else info_text.textContent = "Port must be greater than 0 and less than 65536"
})