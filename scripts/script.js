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
        document.body.style.overflow = "hidden";
    } else {
        flagMenuExist = true;
        menuOpen.style.display = "block";
        menuCancelContainer.style.display = "none";
        menuList.classList.remove("menu__list--dark");
        document.body.style.overflow = "";
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

//slide toggle
let team = document.querySelector('.team__list');

team.addEventListener('click', function(event) {
    if(event.target.classList[0] == 'name') {
        if(event.target.parentElement.classList[1]) {
            event.target.parentElement.classList.remove('team__item--active');
            return;
        }
        team.querySelectorAll('.team__item--active').forEach(
            el => {
                el.classList.remove('team__item--active');
            }
        );
        event.target.parentElement.classList.add('team__item--active');
    }
});

//accordion toggle
let recipes = document.querySelector(".recipes__list");
let recipesItem = document.querySelector(".recipes__item--active");

recipes.addEventListener('click', function(event) {

    if(event.target.className == 'recipes__cancel-btn') {
        let item = event.target.parentElement.parentElement;
        item.classList.remove('recipes__item--active');
        removeRecipeDesc(event.target.parentElement);

        // functional phone
        //-------------------------------
        if (window.innerWidth <= 480) {
            recipes.querySelectorAll('.recipes__item').forEach(function(el){
            el.querySelector('.recipes__title').style.display = 'block';
            });
        return;
        }
    }

    if(event.target.className == 'recipes__title') {
        recipes.querySelectorAll('.recipes__item--active').forEach(function(item){
            item.classList.remove('recipes__item--active');
            removeRecipeDesc(item.querySelector('.recipes__desc'));
         });
        event.target.parentElement.classList.add('recipes__item--active');

        // functional phone
        //-------------------------------
        if (window.innerWidth <= 480) {
            recipes.querySelectorAll('.recipes__title').forEach(el => {
                el.style.display = 'none';
            });
            event.target.parentElement.querySelector('.recipes__title').style.display = 'block';
        }

        let recipesDesc = event.target.nextElementSibling;
        recipesDesc.style.width = "100%";
        recipesDesc.style.overflow = 'visible';
        recipesDesc.style.display = 'block';
    }
});
 
function removeRecipeDesc(desc){
    desc.style.width = "0px";
    desc.style.overflow = 'hidden';
    desc.style.display = 'none';
}

//---------------------
//review switcher
let reviewsList = document.querySelector('.reviews__list');
let reviewShowList = document.querySelector('.review-show__list');

reviewsList.addEventListener('click', function(event){
    if(event.target.className === 'previews' && event.target.className != 'previews--active'){
        let indexOfNewActiveItem = getIdFromArray(reviewsList.querySelectorAll(".reviews__item"), event.target.parentElement);
        let indexOfOldActiveItem = getIdFromArray(reviewsList.querySelectorAll(".previews"), reviewsList.querySelector(".previews.previews--active"));
        reviewsList.querySelectorAll(".previews")[indexOfOldActiveItem].classList.remove("previews--active");
        reviewsList.querySelectorAll(".previews")[indexOfNewActiveItem].classList.add("previews--active");
        reviewShowList.children[indexOfOldActiveItem].classList.remove('review-show__item--active');
        reviewShowList.children[indexOfNewActiveItem].classList.add('review-show__item--active');
    }
});

function getIdFromArray(array, element){
    let res = null;
    array.forEach(function(value, index){
        if(value == element){
            res = index;
        }
    });
    return res;
}

// --------------------
// form processing
const orderForm = document.getElementById("formOrder");
const orderBtn = document.querySelector('.form__button');

orderBtn.addEventListener('click', function(event){
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', orderForm.elements.name.value);
    formData.append('phone', orderForm.elements.phone.value);
    formData.append('comment', orderForm.elements.comment.value);
    formData.append('email', 'margarita.andriukhina@gmail.com');

    let xhr = new XMLHttpRequest;
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    
    xhr.addEventListener('load', function(){
        if(this.status == 200){
            console.log("все ок!");
        }
    });
    xhr.send(formData);
});