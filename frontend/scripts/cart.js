
let Total;

function displayData(data) {
    document.querySelector("#container").innerHTML = ""
    data.forEach((ele) => {
        let div = document.createElement("div")

        let name = document.createElement("h3")
        name.innerText = ele.name

        let image = document.createElement("img");
        image.setAttribute("src", ele.image);

        let price = document.createElement("h1")
        price.innerText = `$${ele.price}`;

        let description = document.createElement("p")
        description.innerText = ele.description;


        let increment = document.createElement("button");
        increment.innerText = "+";
        increment.addEventListener("click", function () {
            increase(ele);
        });

        let add = document.createElement("button");
        add.innerText = "Remove";
        add.addEventListener("click", function () {
            removed(ele.price,ele);
        });

        let decrement = document.createElement("button");
        decrement.innerText = "-";
        decrement.addEventListener("click", function () {
            decrease(ele);
        });

        let qua = document.createElement("span");
        qua.innerText = ele.quantity;

        div.append(image, price, name,description,decrement,qua,increment,add)
        document.querySelector("#container").append(div);
    });
};

async function removed(price, ele) {
    let token= localStorage.getItem("token");
    let data = await fetch(`http://localhost:4440/cart/delete/${ele._id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "authorization":token
        }
    });
    window.location.href="./cart.html";

  }
 async function increase(ele) {
    let quantity=Number(ele.quantity)+1;
    ele.quantity=quantity;
    let token= localStorage.getItem("token");
    let data = await fetch(`http://localhost:4440/cart/update/${ele._id}`, {
        method: "PATCH",
        body: JSON.stringify(ele),
        headers: {
            "Content-type": "application/json",
            "authorization":token
        }
    });
    window.location.href="./cart.html";
  }

 async function decrease(ele) {
    let quantity
    if(ele.quantity==1){
        quantity=Number(ele.quantity);
    }
    else{
        quantity=Number(ele.quantity)-1;

    }
    ele.quantity=quantity;
    let token= localStorage.getItem("token");
    let data = await fetch(`http://localhost:4440/cart/update/${ele._id}`, {
        method: "PATCH",
        body: JSON.stringify(ele),
        headers: {
            "Content-type": "application/json",
            "authorization":token
        }
    });
    window.location.href="./cart.html";
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

let input= document.getElementById("search_input");
let BTN= document.getElementById("search");

BTN.addEventListener("click",()=>{
    localStorage.setItem("search",input.value);
    window.location.href="product.html";
});

showcart();
async function showcart() {
    let userid= localStorage.getItem("userID");
    let token= localStorage.getItem("token");
    let cart= document.querySelector("#cart");
    let data = await fetch(`http://localhost:4440/cart/get/${userid}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization":token
        }
    });
    let new_data = await data.json();
    let result_input= document.querySelector("#result");
    if(new_data.length<1){
        result_input.innerText="CART IS EMPTY"
    }
    else{
        result_input.innerText=`${new_data.length} Items in Cart`
    }
    let total_price = new_data.reduce((accu, ele) => {
        return accu + (Number(ele.price)*Number(ele.quantity));
      }, 0);
      total_pr(total_price);
      Total=total_price;
    displayData(new_data);
}


  function total_pr(total) {
    document.querySelector("#cart_total").innerText = `$${total}`
  }

  let promo_btn= document.querySelector("#promo");
  promo_btn.addEventListener("click",()=>{
    let code= document.querySelector("#couponCode").value;
    if(code=="JAN23"){
        Total= Number(Total)-((Number(Total)*15)/100);
        swal("Promocode Applied")
        total_pr(Total)
    }
    else{
        swal("Promocode not valid")
    }
  })

  let pay= document.querySelector("#pay");
  pay.addEventListener("click",()=>{
    window.location.href="address.html"
  })


