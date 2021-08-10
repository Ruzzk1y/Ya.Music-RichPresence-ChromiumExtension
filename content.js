let sp = document.createElement('span')
sp.setAttribute('id', 'DRPExtensionID')
sp.style.display = 'none'
chrome.storage.local.get(["extensionId"], (data) => { if (data.extensionId == null) { return sp.textContent = '' } else sp.textContent = data.extensionId; });

let s = document.createElement('script');
s.setAttribute('id', "DRPScript")
s.setAttribute('type', 'text/javascript');
s.setAttribute('src', chrome.extension.getURL('tracker.js'));
document.body.appendChild(s);
document.body.appendChild(sp);

chrome.runtime.onMessage.addListener((m, s, sR) => {

})

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.extensionId) return sp.textContent = request.extensionId;
    }
);