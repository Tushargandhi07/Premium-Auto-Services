// coupon code banner
localStorage.setItem("status","logout");
let code = document.getElementById("code");

setInterval(() => {
    if (code.innerText == "") {
        code.innerText = "NEW USER SAVE 15% - USE CODE | JAN23"
    }
    else{
        code.innerText=""
    }
}, 3000);

// slider  

var sliderMain=document.getElementById("slider-main");
var item= sliderMain.getElementsByClassName("item")

function next(){
    sliderMain.append(item[0]);
    console.log(item[0])
}

function prev(){
    sliderMain.prepend(item[item.length-1])
}
let showUser= document.querySelector("#user_box");
let data= localStorage.getItem("username");

if(data){
    let name= document.querySelector("#username");
    name.innerHTML=data;
    let button= document.createElement("button");
    button.innerText="Logout";
    button.addEventListener("click",()=>{
        localStorage.removeItem("username");
         localStorage.removeItem("token");
         name.innerHTML="";
         window.location.href="index.html"
    });
    showUser.append(button);
}
