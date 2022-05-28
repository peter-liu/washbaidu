chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ switch:true });
});

async function hasHostPermission(tab){
    if (!tab){
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    }
    return await chrome.permissions.contains(
        { 
            origins:[ tab.url ]
        }
    );
}

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'loading') { // inject style asap
        // not a valid tab
        if( !tab.url ){
            return;
        }
        
        // switch on 
        let cfg = await chrome.storage.local.get("switch");
        if( !cfg.switch ){
            return;
        }
        
        // check permission and renderring
        let hasPermission = await hasHostPermission(tab);
        hasHostPermission &&
            changeTheme(tabId, null, "totoro");
          
    }

    // chrome.permissions.contains(
    //     { 
    //         origins:[ tab.url ]
    //     },
    //     (result) => {
    //         if (!result) {
    //             return;
    //         }
    //         if (changeInfo.status == 'loading') { // inject style asap
    //             changeTheme(tabId, null, "totoro");
    //           //chrome.storage.local.get("theme", async function(cfg){
    //           //   if(cfg.theme){
    //           //       chrome.scripting.insertCSS({
    //           //         // files: [ "themes/" + cfg.theme + "/styles.css"],
    //           //         files: [ "themes/totoro/styles.css"],
    //           //         target: { tabId: tabId }
    //           //       });
    //           //   }
    //           //});
    //         }
    //     }
    // );
});


chrome.action.onClicked.addListener(async (tab) => {
    let cfg = await chrome.storage.local.get("switch");
    let toggle = !cfg.switch;
    chrome.storage.local.set(
        {
            "switch" : toggle
        }, 
        async ()=>{
            // chrome.action.setBadgeText({ text: toggle ? "O" : "F"});
            // chrome.action.setBadgeBackgroundColor({  color: toggle ? '#4688F1' : '#444'});
            changeActionBadge(toggle);
            let hasPermission = await hasHostPermission(tab);
            if ( hasPermission ){
                changeTheme(tab.id, toggle ? null : "totoro" , toggle ? "totoro" : null);
            }
        }
    );
});



async function changeActionBadge(toggle){
   if(toggle){
       chrome.action.setIcon({ path: "/icons/logo32.png" });
   }else{
       chrome.action.setIcon({ path: "/icons/logo32_disabled.png" });
   } 
}


async function changeTheme(tabId, oldTheme, newTheme){
    if ( oldTheme ){
       chrome.scripting.removeCSS({ 
           files: [ "themes/" + oldTheme + "/styles.css"],
           target: { tabId: tabId },
           origin: 'AUTHOR'
       });
    }

    if ( newTheme ){
       chrome.scripting.insertCSS({
           files: [ "themes/" + newTheme + "/styles.css"],
           target: { tabId: tabId },
           origin: 'AUTHOR'
       });
    }
}

chrome.storage.local.get(["switch"],(result)=>{
    changeActionBadge(result.switch);
});
