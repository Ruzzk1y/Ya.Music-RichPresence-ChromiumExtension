let s = document.createElement('script');
s.setAttribute('id', "DRPScript")
s.setAttribute('type', 'text/javascript');
s.setAttribute('src', chrome.extension.getURL('tracker.js'));
document.body.appendChild(s);