$(document).ready(function () {

    //////////////loading screen///////////////////
    $("#loading").fadeOut(3000, function () {
        $("body").css("overflow", "auto")
    });

    //////////////liHeight///////////////////
    let liHeight = $(".ani-variety li").height();
    $(".ani-variety").css("height", liHeight);

    //////////////arrow-up///////////////////
    $(window).scroll(function () {
        let scrollTop = $(window).scrollTop();
        let locationOffset = $("#locations").offset().top;

        if (scrollTop > locationOffset) {
            $(".arrow-up").fadeIn(500);
        } else {
            $(".arrow-up").fadeOut(500);
        }

        if (scrollTop > 0) {
            $("nav").addClass("fixed-nav-scroll")
        } else {
            $("nav").removeClass("fixed-nav-scroll")
        }
    });

    $(".arrow-up").click(function () {
        $("html , body").animate({ scrollTop: 0 }, 2000);
    });
    /////////////////best dish move/////////////////////////////   

    let innerWidthBestDish = $(".best-dish").innerWidth();
console.log(innerWidthBestDish)
    $(".container-best-dish").css("left", `-${innerWidthBestDish}px`);
    $(".icon-best-dish").click(function () {
        if ($(".container-best-dish").css("left") == "0px") {
            $(".container-best-dish").animate({ left: `-${innerWidthBestDish}px` }, 1500)
        } else {
            $(".container-best-dish").animate({ left: `0px` }, 1500)
        }
    });

    
    //////////////section smooth///////////////////
    $(".nav-juicy-cow").click(function (e) {
        let hrefNav = $(e.target).attr("href");
        let offsetSection = $(hrefNav).offset().top;
        $("html , body").animate({ scrollTop: offsetSection }, 2500);
    });


    //////////////clock///////////////////
    setInterval(function () {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let editHours;

        let am_pm = (hours > 12) ? "P.M." : "A.M.";

        if (hours > 12) {
            editHours = hours - 12;
            if (editHours < 10) {
                editHours = `0${editHours}`;
            }
        } else {
            editHours = hours;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        $(".clock").text(`${editHours} : ${minutes} : ${seconds} ${am_pm}`);

    }, 1000);


    ///////////motion1-location//////////////////////////////

    let motion1Location = document.getElementById("item-location");
    let motion1Reservation = document.getElementById("reservations");
    let imgOurFood = document.querySelector(".img-our-food");
    let contentOurFood = document.querySelector(".content-our-food");
    let contentPrivateEvents = document.querySelector(".content-private-events");
    let imgPrivateEvents = document.querySelector(".img-private-events")

    $(window).scroll(function () {
        let scrollTop = $(window).scrollTop();
        if (scrollTop > $("#locations").offset().top) {
            motion1Location.style.cssText = " transform : translateY(0px)";
        } else {
            motion1Location.style.cssText = " transform : translateY(220px)";
        }

        if (scrollTop > $("#item-location").offset().top) {
            motion1Reservation.style.cssText = " transform : translateY(0px)";
        } else {
            motion1Reservation.style.cssText = " transform : translateY(220px)";
        }

        if (scrollTop > $("#reservations").offset().top - 350) {
            imgOurFood.style.cssText = " transform : translateX(0%)";
            contentOurFood.style.cssText = " transform : translateX(0%)";
        } else {
            imgOurFood.style.cssText = " transform : translateX(50%)";
            contentOurFood.style.cssText = " transform : translateX(-50%)";
        }

        if (scrollTop > $(".img-our-food").offset().top - 100) {
            $("#catering h2").addClass("visibleVisible");
            $("#catering p").addClass("visibleVisible");
            $("#catering a").addClass("visibleVisible");
            $("#catering h2").removeClass("visibleHidden");
            $("#catering p").removeClass("visibleHidden");
            $("#catering a").removeClass("visibleHidden");
        } else {
            $("#catering h2").addClass("visibleHidden");
            $("#catering p").addClass("visibleHidden");
            $("#catering a").addClass("visibleHidden");
            $("#catering h2").removeClass("visibleVisible");
            $("#catering p").removeClass("visibleVisible");
            $("#catering a").removeClass("visibleVisible");
        }


        if (scrollTop > $("#catering").offset().top - 350) {
            contentPrivateEvents.style.cssText = " transform : translateX(0%)";
            imgPrivateEvents.style.cssText = " transform : translateX(0%)";
        } else {
            contentPrivateEvents.style.cssText = " transform : translateX(50%)";
            imgPrivateEvents.style.cssText = " transform : translateX(-50%)";
        }

        /////////////counter follow///////////
        let followers = document.getElementById("followers");
        let dishes = document.getElementById("dishes");

        function counterUp(start, element, count, time) {
            let num = start;
            let cUp = setInterval(function () {
                num++;
                element.innerHTML = num + " K";
                if (num == count) {
                    clearInterval(cUp);
                }
            }, time)
        }

        function startCounter(params) {
            counterUp(0, followers, 15, 180);
            counterUp(0, dishes, 10, 180);
        }

        if (scrollTop > $("#private-events").offset().top + 100) {
            startCounter();
        }
    });
});


//////////////recipeResponce///////////////////
let recipeResponce;
let recipeDetailsResponce
let recipeId;

async function getRecipes(recipe) {
    let recipesApi = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipe}`);
    let recipeJson = await recipesApi.json();
    recipeResponce = recipeJson.recipes;
    displayRecipes();
}

getRecipes("hamburger");

function displayRecipes() {
    let allItems = ``;
    for (let i = 0; i < recipeResponce.length; i++) {
        recipeId = `'${recipeResponce[i].recipe_id}'`;
        allItems += `<div  class="col-md-4 my-3 pointer one-recipe" onclick="recipeDetails(${recipeId})" >
                <div class="item-recipe  p-3 solve-imgSize overflow-hidden text-center">
                    <div class=" overflow-hidden">
                        <img  src="${recipeResponce[i].image_url}" class="w-100 h-100 rounded-lg mb-2" alt="recipe">
                    </div>
                    <p class="mt-2 font-juicy-cow">${recipeResponce[i].title}</p>
                </div>
                </div>`;
    }
    document.querySelector(".data-recipes").innerHTML = allItems;
}

$(".menu-recipe").click(function (e) {
    let getRecipe;
    if (e.target.alt == undefined) {
        getRecipe = e.target;
        getRecipe = $(getRecipe).text().toLowerCase();
    } else {
        getRecipe = e.target.alt.toLowerCase();
    }
    getRecipes(`${getRecipe}`);
});


async function recipeDetails(id) {
    let recipeDetailsApi = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    let recipeDetailsJson = await recipeDetailsApi.json();
    recipeDetailsResponce = recipeDetailsJson.recipe;
    displayRecipeDetails();
    $("#recipe-details").css("display", "flex");
}

function displayRecipeDetails() {
    let allItem = `<div class="overlay-recipe-details w-100 vh-100 fixed-top d-flex justify-content-center align-items-center">
  <div class="container overflow-auto w-100 h-75 p-5 position-relative bg-juicy-cow">
    <div class="row ">
      <div class="col-md-6">
        <div class="img-recipe-details">
          <img src="${recipeDetailsResponce.image_url}" class="w-100 rounded-lg" alt="">
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="content-recipe-details ">
          <h3 class="pb-4">${recipeDetailsResponce.title}</h3>         
          <ul id="ingredients-list" class="fa-ul ml-icon-recipe-details">`;
    for (let i of recipeDetailsResponce.ingredients) {
        allItem += `<li class="mb-2"><span class="fa-li"><i class="fas fa-utensils"></i></span>${i}</li>`;
    }
    allItem += `</ul>
        </div>
      </div>
    </div>
    <div class="icons-recipe-details position-absolute ">
      <div class="close-icon pointer position-absolute" onclick="closeRecipe()">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</div>`;
    document.getElementById("recipe-details").innerHTML = allItem;
}

function closeRecipe() {
    $("#recipe-details").css("display", "none");
};
$(document).keydown(e=>{
    if(e.code == "Escape") closeRecipe();
});
/////////////////////location-slider///////////////////////////////////

let imgLocation = Array.from(document.querySelectorAll(".img-location"));
let indexImg ;
for (let i = 0; i < imgLocation.length; i++) {
    imgLocation[i].addEventListener("click" , e =>{
        indexImg = imgLocation.indexOf(e.target);
        let imgSrc = e.target.src;
        $("#location-slider").css("display" , "block");
        $(".img-location-slider img").attr("src" , imgSrc);
    });
}

function iconLeft() {
    --indexImg;
    if(indexImg < 0){
        indexImg = imgLocation.length-1;
    }
    $(".img-location-slider img").attr("src" , imgLocation[indexImg].src);
}

function iconRight() {
    ++indexImg;
    if(indexImg > imgLocation.length-1){
        indexImg = 0;
    }
    $(".img-location-slider img").attr("src" , imgLocation[indexImg].src);
}

function closeLocation() {
    $("#location-slider").css("display" , "none");
}

$(".iconClose-location-slider").click(()=>{
    closeLocation()
});

$(".iconLeft-location-slider").click(()=>{
   iconLeft();
});

$(".iconRight-location-slider").click(()=>{
    iconRight();
});

$(document).keydown(e=>{
    if(e.code == "Escape") closeLocation();
    if(e.code == "ArrowLeft") iconLeft();
    if(e.code == "ArrowRight") iconRight();
});

////////////// crud best dish//////////////////////////////////////////////////////

let nameOp = document.getElementById("name-op");
let dishOp = document.getElementById("dish-op");
let commentOp = document.getElementById("comment-op");
let btnOp = document.getElementById("btn-op");
let searchOp = document.getElementById("search-op")
let tbody = document.getElementById("tbody");
let allOpinions;

let regexName = /^[a-z0-9 -\/]{2,30}$/;
let regexDish = /^[a-z0-9 -\/]{2,30}$/;
let regexComment = /^[a-z0-9 -\/]{2,90}$/;

let nameEr = document.getElementById("name-er");
let dishEr = document.getElementById("dish-er");
let commentEr = document.getElementById("comment-er");

if (localStorage.getItem("allOpinions") == null) {
    allOpinions = [];
} else {
    allOpinions = JSON.parse(localStorage.getItem("allOpinions"));
    displayOpinion();
}

function testInputRegex(reg, val) {
    if (reg.test(val)) {
        return true;
    } else {
        return false;
    };
};
function validMark(element, vld, invld) {
    element.classList.add(vld);
    element.classList.remove(invld);
}

function removeVld(element) {
    element.classList.remove("is-valid");
}

function removeError(element) {
    element.style.display = "none";
}

function addError(element, msg) {
    element.style.display = "block";
    element.innerHTML = msg;
}

$("#name-op").keyup(function () {
    if (regexName.test(nameOp.value)) {
        validMark(nameOp, "is-valid", "is-invalid");
        removeError(nameEr);
    } else {
        validMark(nameOp, "is-invalid", "is-valid");
        addError(nameEr, "* Must the field isn't empty and Name is small letters from 2 to 30 letters & numbers")
    };
});

$("#dish-op").keyup(function () {
    if (regexDish.test(dishOp.value)) {
        validMark(dishOp, "is-valid", "is-invalid");
        removeError(dishEr);
    } else {
        validMark(dishOp, "is-invalid", "is-valid");
        addError(dishEr, "* Must the field isn't empty and Fav Dish is small letters from 2 to 30 letters & numbers")
    };
});

$("#comment-op").keyup(function () {
    if (regexComment.test(commentOp.value)) {
        validMark(commentOp, "is-valid", "is-invalid");
        removeError(commentEr);
    } else {
        validMark(commentOp, "is-invalid", "is-valid");
        addError(commentEr, "* Must the field isn't empty and Your Comment is small letters from 2 to 90 letters & numbers")
    };
});



btnOp.addEventListener("click", function () {
    if (testInputRegex(regexName, nameOp.value) && testInputRegex(regexDish, dishOp.value) && testInputRegex(regexComment, commentOp.value)) {
        if (btnOp.innerHTML == "Add") {
            let opinion = {
                name: nameOp.value,
                dish: dishOp.value,
                comment: commentOp.value
            }
            allOpinions.push(opinion);
            localStorage.setItem("allOpinions", JSON.stringify(allOpinions));
            displayOpinion();
            clearValue();
            removeVld(nameOp);
            removeVld(dishOp);
            removeVld(commentOp);
        }
    }

});

function displayOpinion() {
    let allOps = ``;
    for (let i = 0; i < allOpinions.length; i++) {
        allOps += ` <tr >
            <th scope="row">${i + 1}</th>
            <td>${allOpinions[i].name}</td>
            <td>${allOpinions[i].dish}</td>
            <td>${allOpinions[i].comment}</td>
            <td onclick="updateOp(${i})" class="text-left"><i class="far fa-edit btn text-success pl-0 "></i></td>
            <td onclick="deleteOp(${i})" class="text-left"><i class="far fa-trash-alt btn text-danger pl-0 "></i></td>
          </tr>`;
    }
    tbody.innerHTML = allOps;
}

function clearValue() {
    nameOp.value = "";
    dishOp.value = "";
    commentOp.value = "";
}

function updateOp(op) {
    nameOp.value = allOpinions[op].name;
    dishOp.value = allOpinions[op].dish;
    commentOp.value = allOpinions[op].comment;
    btnOp.innerHTML = "Update";
    btnOp.onclick = function () {
        allOpinions[op].name = nameOp.value;
        allOpinions[op].dish = dishOp.value;
        allOpinions[op].comment = commentOp.value;
        btnOp.innerHTML = "Add";
        localStorage.setItem("allOpinions", JSON.stringify(allOpinions));
        displayOpinion();
        clearValue();
        removeVld(nameOp);
        removeVld(dishOp);
        removeVld(commentOp);
    }
}

function deleteOp(op) {
    allOpinions.splice(op, 1);
    localStorage.setItem("allOpinions", JSON.stringify(allOpinions));
    displayOpinion();
}

searchOp.addEventListener("keyup", function () {
    seaOp = ``;
    for (let i = 0; i < allOpinions.length; i++) {
        if (allOpinions[i].name.toLowerCase().includes(searchOp.value.toLowerCase()) || allOpinions[i].dish.toLowerCase().includes(searchOp.value.toLowerCase()) || allOpinions[i].comment.toLowerCase().includes(searchOp.value.toLowerCase())) {
            seaOp += ` <tr >
                <th scope="row">${i + 1}</th>
                <td>${allOpinions[i].name.replace(searchOp.value, `<span style="background-color: yellow;">${searchOp.value}</span>`)}</td>
                <td>${allOpinions[i].dish.replace(searchOp.value, `<span style="background-color: yellow;">${searchOp.value}</span>`)}</td>
                <td>${allOpinions[i].comment.replace(searchOp.value, `<span style="background-color: yellow;">${searchOp.value}</span>`)}</td>
                <td onclick="updateOp(${i})" class="text-left"><i class="far fa-edit btn text-success pl-0 "></i></td>
                <td onclick="deleteOp(${i})" class="text-left"><i class="far fa-trash-alt btn text-danger pl-0 "></i></td>
              </tr>`;
        }
    }
    tbody.innerHTML = seaOp;

});