async function changeTheme(e){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let theme = e.target.getAttribute("theme");
    let oldTheme = await chrome.storage.local.get("theme"); 
    if(oldTheme.theme){
       // remove css 
        chrome.scripting.removeCSS({
              files: ["themes/" + oldTheme.theme + "/styles.css"],
              target: { tabId: tab.id }
            }
        )
    }

    chrome.scripting.insertCSS({
      files: ["themes/" + theme + "/styles.css"],
      target: { tabId: tab.id }
    });
    

    chrome.storage.local.set({"theme":theme}); 

}

// document.getElementById("preference_btn").addEventListener('click', changeTheme);


const collection = document.getElementsByClassName("predefine_theme");
for (let i = 0; i < collection.length; i++) {
    collection[i].addEventListener('click', changeTheme);
}




