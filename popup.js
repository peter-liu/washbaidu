// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

changeColor.addEventListener('click', () => {
    changeColor.style.backgroundColor = 'blue';
});

// chrome.storage.sync.get("color", ({ color }) => {
//changeColor.addEventListener('click', function() {
//    changeColor.style.backgroundColor = 'red';
//});

//changeColor.onClick = function(){
//    alert(1);
//    changeColor.style.backgroundColor = 'red';
//};

// });
