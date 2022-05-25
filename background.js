

let defaultConfig = {enable:1};

console.log(defaultConfig);


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaultConfig);
});

chrome.notifications.onButtonClicked.addListener(async () => {
    let cfg = chrome.storage.sync.get(); 
    cfg.enable = cfg.enable == 1 ? 0 : 1;
    chrome.action.setBadgeText({ text: cfg.enable ? "ON" : "OFF" });
    console.log(cfg + " updated " );
});
