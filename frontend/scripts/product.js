
let new_search = localStorage.getItem("search");
let Data;

async function show() {
    let data = await fetch(`https://exuberant-tam-wasp.cyclic.app/products/all?description=${new_search}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    let new_data = await data.json();
    let result_input = document.querySelector("#result");
    if (new_data.length < 1) {
        result_input.innerText = "NO RESULT FOUND"
    }
    else {
        result_input.innerText = `${new_data.length} RESULT FOUND`
        Data = new_data;
    }
    displayData(new_data);
}
show();

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

let showUser = document.querySelector("#user_box");
let data = localStorage.getItem("username");

if (data) {
    let name = document.querySelector("#username");
    name.innerHTML = data;
    let button = document.createElement("button");
    button.innerText = "Logout";
    button.addEventListener("click", () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        name.innerHTML = "";
        window.location.href = "index.html"
    });
    showUser.append(button);
}

let input = document.getElementById("search_input");
let BTN = document.getElementById("search");

BTN.addEventListener("click", () => {
    localStorage.setItem("search", input.value);
    window.location.href = "product.html";
})

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
}


const sort = document.querySelector('#sort');

sort.addEventListener('change', (event) => {

    if (sort.value == "low to high") {
        let sort_data = Data.sort((a, b) => { return a.price - b.price })
        displayData(sort_data)
    }
    else {
        let sort_data = Data.sort((a, b) => { return b.price - a.price })
        displayData(sort_data)
    }

});