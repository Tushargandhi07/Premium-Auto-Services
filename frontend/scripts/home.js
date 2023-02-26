// coupon code banner
localStorage.setItem("status", "logout");
let code = document.getElementById("code");

setInterval(() => {
    if (code.innerText == "") {
        code.innerText = "NEW USER SAVE 15% - USE CODE | JAN23"
    }
    else {
        code.innerText = ""
    }
}, 3000);

// slider  

var sliderMain = document.getElementById("slider-main");
var item = sliderMain.getElementsByClassName("item")

function next() {
    sliderMain.append(item[0]);
    console.log(item[0])
}

function prev() {
    sliderMain.prepend(item[item.length - 1])
}
let showUser = document.querySelector("#user_box");
let logout_placeholder= document.getElementById('logout_placeholder')
let data = localStorage.getItem("username");

if (data) {
    let signup_btn= document.getElementById("signup");
    signup_btn.classList.add('display_none');

    let login_btn= document.getElementById("login");
    login_btn.classList.add('display_none');
    let name = document.querySelector("#username");
    name.innerHTML = data;
    let button = document.createElement("button");
    button.innerText = "Logout";
    button.classList.add("background_remove");
    button.addEventListener("click", () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        name.innerHTML = "";
        window.location.href = "index.html"
    });
    logout_placeholder.append(button);
}

let input = document.getElementById("search_input");
let BTN = document.getElementById("search");

BTN.addEventListener("click", () => {
    localStorage.setItem("search", input.value);
    window.location.href = "product.html"
})

showcart();
async function showcart() {
    let userid = localStorage.getItem("userID");
    let token = localStorage.getItem("token");
    let cart = document.querySelector("#cart");
    if (token) {

        let data = await fetch(`https://exuberant-tam-wasp.cyclic.app/cart/get/${userid}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": token
            }
        });
        let new_data = await data.json();
        cart.innerText = new_data.length
    }
    else {
        return;
    }
};


let searchProduct= document.querySelectorAll(".search_product");

for(let btn of searchProduct){
    btn.addEventListener('click',(e)=>{
        let dataID= e.target.dataset.id;
        localStorage.setItem("search", dataID);
        window.location.href = "product.html"
    })
}


let shop_btn= document.getElementById("shop_now");
shop_btn.addEventListener('click',()=>{
    localStorage.setItem("search","");
    window.location.href="product.html"
})

let search_battery= document.querySelector(".search_battery");
search_battery.addEventListener('click',(e)=>{
    localStorage.setItem("search","battery");
        window.location.href = "product.html"
});

let search_seat_cover= document.querySelector(".search_seat_cover");
search_seat_cover.addEventListener('click',(e)=>{
    localStorage.setItem("search","seat cover");
        window.location.href = "product.html"
});

let search_floor_mat= document.querySelector(".search_floor_mat");
search_floor_mat.addEventListener('click',(e)=>{
    localStorage.setItem("search","floor mat");
        window.location.href = "product.html"
});

let search_wiper= document.querySelector(".search_wiper");
search_wiper.addEventListener('click',(e)=>{
    localStorage.setItem("search","wiper");
        window.location.href = "product.html"
});

let search_brake_pad= document.querySelector(".search_brake_pad");
search_brake_pad.addEventListener('click',(e)=>{
    localStorage.setItem("search","brake pads");
        window.location.href = "product.html"
});
