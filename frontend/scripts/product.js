
let new_search = localStorage.getItem("search");
let Data;
let loading= document.getElementById("loading");
let user_icon= document.getElementById("user_icon");

// search the data-------------------------------------------------------------------
async function show() {
    loading.style.display="block";
    let data = await fetch(`https://exuberant-tam-wasp.cyclic.app/products/all?description=${new_search}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    let new_data = await data.json();
    loading.style.display="none";
    let result_input = document.querySelector("#result");
    if (new_data.length < 1) {
        result_input.innerText = "NO RESULT FOUND"
    }
    else {
        result_input.innerText = `${new_data.length} RESULT FOUND`
        Data = new_data;
    }
    let totalPages = Math.ceil(new_data.length / 9)
    renderPagination(totalPages);
    var arr = Data.slice(0, 9)
    displayData(arr);
}
show();


// display data-----------------------------------------------------------------------------
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

        let add = document.createElement("button");
        add.innerText = "Add to Cart";
        add.addEventListener("click", function () {
            add_element(ele);
        });

        div.append(image, price, name, description, add)
        document.querySelector("#container").append(div);
    });
};

// add to cart -----------------------------------------------------------------------------
async function add_element(data) {
    try {
        data.quantity = 1;
        let token = localStorage.getItem("token");
        let userID = localStorage.getItem("userID");
        let res = await fetch("https://exuberant-tam-wasp.cyclic.app/cart/create", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                "authorization": token,
                "userID": userID
            }
        });
        let new_data = await res.json();
        if (new_data.msg == "Item added to Cart.") {
            swal("Added to cart", "", "success");
        }
        else {
            swal("Item already in Cart", "", "warning")
        };
        showcart();
    }
    catch (err) {
        swal("Please login First","","warning")
    }
}


// show username---------------------------------------------------------------------------

let showUser = document.querySelector("#user_box");
let data = localStorage.getItem("username");
let logout_placeholder= document.getElementById('logout_placeholder')

if (data) {
    user_icon.style.display="block";
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

// filter-------------------------------------------------------------------------------
let searchProduct= document.querySelectorAll(".search_product");

for(let btn of searchProduct){
    btn.addEventListener('click',(e)=>{
        let dataID= e.target.dataset.id;
        localStorage.setItem("search", dataID);
        window.location.href = "product.html"
    })
}


// search-------------------------------------------------------------------------------
let input = document.getElementById("search_input");
let BTN = document.getElementById("search");

BTN.addEventListener("click", () => {
    localStorage.setItem("search", input.value);
    window.location.href = "product.html";
})


// show cartlength --------------------------------------------------------------------
showcart();
async function showcart() {
    let userid = localStorage.getItem("userID");
    let token = localStorage.getItem("token");
    let cart = document.querySelector("#cart");
    let data = await fetch(`https://exuberant-tam-wasp.cyclic.app/cart/get/${userid}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization": token
        }
    });
    let new_data = await data.json();
    cart.innerText = new_data.length
    renderPagination(new_data.length)
}


// sort data by price-------------------------------------------------------------------
const sort = document.querySelector('#sort');

sort.addEventListener('change', (event) => {

    if (sort.value == "low to high") {
        let sort_data = Data.sort((a, b) => { return a.price - b.price });
        Data=sort_data
        let totalPages = Math.ceil(sort_data.length / 9)
        renderPagination(totalPages);
        var arr = Data.slice(0, 9)
        displayData(arr);

    }
    else {
        let sort_data = Data.sort((a, b) => { return b.price - a.price })
        Data=sort_data
        let totalPages = Math.ceil(sort_data.length / 9)
        renderPagination(totalPages);
        var arr = Data.slice(0, 9)
        displayData(arr);
    }

});


// pagination---------------------------------------------------------------------------------------

let paginationWrapper=document.querySelector(".pagination-section")

function renderPagination(numOfPages) {

    function asListOfButtons() {
        let arr = [];
        for (let i = 1; i <= numOfPages; i++) {
            arr.push(getAsButton(i));
        }
        return arr.join('');
    }

    paginationWrapper.innerHTML = `
      <div>  
        ${asListOfButtons()}  
        <span>> > </span>
      </div>
    `

    let paginationButtons = document.querySelectorAll(".pagination-button");
    for (let btn of paginationButtons) {
        btn.addEventListener('click', (e) => {
            let dataId = e.target.dataset.id;
            var newarr = Data.slice((dataId - 1) * 9, 9 * dataId)
            displayData(newarr);
            let cr= document.getElementsByClassName('active');
            if(cr.length>0){
                cr[0].className=cr[0].className.replace(' active','')
            }
           btn.className+=" active"
        })
    }
}



function getAsButton(pageNumber) {
    return `<button class="pagination-button" data-id=${pageNumber}>${pageNumber}</button>`
}