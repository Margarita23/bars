const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const barsList = document.querySelector('.bars__list');

let menuList = document.querySelector('.menu__list');
let menuContainer = document.querySelector('.menu-icon__container');
let menuOpen = document.querySelector('.menu-icon__open');
let menuCancelContainer = document.querySelector('.menu-icon__cancel-container');

let flagMenuExist = true;

menuContainer.addEventListener("click", function(event){
    event.preventDefault();
    showMenu(event);
});

function showMenu(event) {
    if (flagMenuExist) {
        flagMenuExist = false;
        menuOpen.style.display = "none";
        menuCancelContainer.style.display = "block";
        menuList.classList.add("menu__list--dark");
    } else {
        flagMenuExist = true;
        menuOpen.style.display = "block";
        menuCancelContainer.style.display = "none";
        menuList.classList.remove("menu__list--dark");
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