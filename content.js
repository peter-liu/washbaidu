// let path = chrome.runtime.getURL("themes/totoro/styles.css");


//// fetch(path).then(async function(resp){ 
////     let css = await resp.text();
////     var style = document.createElement('style');
////     style.id="1231321312321";
////     style.type="text/css";
////     style.setAttribute("data-for","result");
////     style.appendChild(document.createTextNode(css));
////     
////     let head = document.head || document.getElementsByTagName('head')[0];
////     head.insertBefore(style, head.firstChild);
////     // head.removeChild(document.getElementById("css_newi_result"));
////     debugger
//// });


//console.log(path);
//var link = document.createElement('link');
//link.href = path;
//link.type = 'text/css';
//link.rel = 'stylesheet';
//document.lastChild.appendChild(link);
//

// window.addEventListener("DOMContentLoaded", function() {
//     var head  = document.getElementsByTagName('head')[0];
//     var link  = document.createElement('link');
//     link.rel  = 'stylesheet';
//     link.type = 'text/css';
//     link.href = path;
//     head.appendChild(link);
//     // alert(document);
//     // $('<link/>', {
//     //     rel: 'stylesheet',
//     //     type: 'text/css',
//     //     href: path
//     // }).appendTo('head');
// }, false);
