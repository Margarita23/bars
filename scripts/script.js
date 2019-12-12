const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const barsList = document.querySelector('.bars__list');

let menu = document.querySelector('.menu__list');
let menuIcon = document.querySelector('.menu-icon__container');
let menuCancel = document.querySelector('.menu__cancel');
let menuCancelBefore = document.querySelector('.menu__cancel', ':before');

let flagMenuExist = false;

menuIcon.addEventListener("click", function(event){
    flagMenuExist = true;
    // console.log(flagMenuExist);
    showMenu();
});

function showMenu() {
    if (flagMenuExist) {
        // menu.style.display = "flex";
        // menu.style.position = "fixed";
        // menu.style.width = "100%";
        // menu.style.height = "100vh";
        // menu.style.top = "0";
        // menu.style.left = "0";
        // menu.style.flexDirection = "column";
        // menu.style.justifyContent = "center";
        // menu.style.alignItems = "center";
        // menu.style.fontSize = "36px";
        // menu.style.lineHeight = "72px";
        // menu.style.fontWeight = "400";
        // menu.style.backgroundColor = "#2f3234";

        // menuCancel.style.display = "block";
        // menuCancel.style.width = "30px";
        // menuCancel.style.height = "30px";
        // menuCancel.style.zIndex = "3";
        // menuCancelBefore.style.display = "block";
        // menuCancelBefore.style.position = "absolute";
        // menuCancelBefore.style.backgroundColor = "red";

        console.log(menuCancel);
        console.log(menuCancelBefore);
    }
}

arrowLeft.addEventListener("click", function(event){
    loop("left");
});

arrowRight.addEventListener("click", function(event){
    loop("right");
});

function loop(direction) {
    if(direction === "right"){
        barsList.appendChild(barsList.firstElementChild);
    } else {
        barsList.insertBefore(barsList.lastElementChild, barsList.firstElementChild);
    }
}