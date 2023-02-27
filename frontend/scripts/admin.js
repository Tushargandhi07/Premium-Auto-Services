let baseUrl = "https://exuberant-tam-wasp.cyclic.app"



document.getElementById("logo").addEventListener("click", () => {
    window.location.href = "index.html"
});

// show user details -------------------------------------------------------
let pagination_box= document.querySelector(".pagination-section");
let dataListWrapper = document.querySelector(".data-list-wrapper");
let showUsersButton = document.querySelector(".show-user-details");
let length = document.getElementById("data-length");
let filter_box= document.getElementById("filter_box");
let arr;
pagination_box.style.backgroundColor="transparent"

showUsersButton.addEventListener("click", async function () {
    try {
        pagination_box.innerHTML="";
        filter_box.classList.remove("display_none")
        pagination_box.style.backgroundColor="transparent"
        num = 3;
        let res = await fetch(`${baseUrl}/users/all`);
        let data = await res.json();
        arr=data;
        dispaly_data(data);
        let length = document.getElementById("data-length");
        length.innerText = `Total:${data.length}`
        
    } catch (error) {
        console.log(error);
    }
});

function dispaly_data(data) {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
      <div class="card-list">
          ${data
            .map((item) => {
                let id = item._id;
                let username = item.name;
                let email = item.email;
                let password = item.pass;
                let mobile = item.mobile;
                let age = item.age;
                return userCard(id, username, email, password, mobile, age);
            })
            .join("")}
      </div>
  `;
    let deletingData = document.querySelectorAll(".delete-user");
    for (let deleteButton of deletingData) {
        deleteButton.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            deleteuser(data)
        })
    }
}

async function deleteuser(data) {
    try {
        let res = await fetch(`${baseUrl}/users/delete/${data}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        });
        swal("Deleted", "", "success").then(() => {
            window.location.href = "admin.html"
        })

    } catch (error) {
        console.log(error)
    }
}


function userCard(id, username, email, password, mobile, age) {
    return `
        <div class="card-wrapper">
        <span>ID</span><input id="id" value="${id}"  readonly>
        <span>Username</span><input id="title" value="${username}"  readonly>
        <span>Email</span><input id="hour" value="${email}"  readonly>
        <span>Password</span><input value="${password}"  readonly>
        <span>Mobile</span><input id="course" value="${mobile}"  readonly>
        <span>Age</span><input id="lesson" value="${age}"  readonly>
        </div>
    `;
}
// filter user---------------------------------------------------------------------------------
    let filter_form= document.getElementById('filter_form')
    let filter_input= document.getElementById('filter_input')
    let filter= document.getElementById('filter')

    filter_form.addEventListener('submit',(e)=>{
        e.preventDefault();
        let value=filter_input.value;
        let search=filter.value;
        console.log(arr)

        let filtered_data= arr.filter((ele)=>{
            return ele[search]==value;
        })
        dispaly_data(filtered_data);
        let length = document.getElementById("data-length");
        length.innerText = `Total:${filtered_data.length}`
        
    })



// show products data---------------------------------------------------------------

let showProductButton = document.querySelector(".show-courses");
showProductButton.addEventListener("click", async function () {
    try {
        filter_box.classList.add("display_none");
        let res = await fetch(`${baseUrl}/products/all`);
        let data = await res.json();
        arr = data;
        let length = document.getElementById("data-length");
        length.innerText = `Total:${data.length}`
        let count = data.length;
        
        let totalPages = Math.ceil(count / 10)
        renderPagination(totalPages);
        var new_arr = arr.slice(0, 10);
        getData(new_arr);
    } catch (error) {
        console.log(error)
    }
});


function getAsCard(id, image, price, description, brand, warranty, identifier) {
    return `
        <div class="card-wrapper">
        <img src="${image}" alt="image">
        <br>
        <span>Id</span><br><input id="title" value="${id}"  readonly>
        <span>Price</span><input id="lesson" value="${price}"  readonly>
        <span>Description</span><input id="hour" value="${description}"  readonly>
        <span>Brand</span><input value="${brand}"  readonly>
        <span>Warranty</span><input value="${warranty}"  readonly>
          <div class="list-buttons">
          <button class="delete-data" data-id="${id}" >Delete Product</button>
          <button class="edit-data" data-id="${id}" ">Edit Product</button>
          </div>
        </div>
    `;
}

function getData(data) {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
      <div class="card-list">
          ${data
            .map((item) => {
                let id = item._id;
                let image = item.image;
                let price = item.price;
                let description = item.description;
                let brand = item.name;
                let warranty = item.warranty;
                return getAsCard(id, image, price, description, brand, warranty);
            })
            .join("")}
      </div>
  `;

    let deletingData = document.querySelectorAll(".delete-data");
    for (let deleteButton of deletingData) {
        deleteButton.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            deleteFunction(data)
        })
    }

    let editData = document.querySelectorAll(".edit-data");
    for (let editButton of editData) {
        editButton.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            editFunction(data)
        })
    };

}


async function deleteFunction(data) {
    try {

        let res = await fetch(`${baseUrl}/products/delete/${data}`, {
            method: "DELETE"
        });
        swal("Deleted", "", "success").then(() => {
            Fetching();
        })

    } catch (error) {
        console.log(error)
    }
}

function editFunction(data) {
    filter_box.classList.add("display_none");
    length.innerHTML=""
    pagination_box.innerHTML=""
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
        <div class="card-wrapper">
        <span>ID</span><br> <input id="id" value=${data} readonly>
        <span>Brand</span><input id="addtitle">
        <span>Description</span><input id="addDescription">
        <span>Price</span><input id="addprice">
        <span>Image Url</span><input id="addimage">
        <span>Warranty</span><input id="addwarranty">
          <div class="list-buttons">
          <button class="edit-data">Save</button>
          </div>
        </div>
    `;

    let editProduct = document.querySelector(".edit-data");
    editProduct.addEventListener("click", () => {
        let name = document.querySelector("#addtitle").value;
        let description = document.querySelector("#addDescription").value;
        let price = document.querySelector("#addprice").value;
        let image = document.querySelector("#addimage").value;
        let warranty = document.querySelector("#addwarranty").value;
        let obj = {}

        if (name != "") {
            obj.name = name
        }
        if (description != "") {
            obj.description = description
        }
        if (image != "") {
            obj.image = image
        }
        if (price != "") {
            obj.price = price
        }
        if (warranty != "") {
            obj.warranty = warranty
        }
        saveedit(obj, data)
    })
}

async function saveedit(obj,data){
    try {
    
            let req = await fetch(`${baseUrl}/products/update/${data}`, {
                method: "PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(obj)
            });
            let res=await req.json()
            if(res.msg=="Updated"){
            swal("Data updated","","success")
            }else{
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    
    }


async function Fetching() {
    try {
        let res = await fetch(`${baseUrl}/products/all`);
        let data = await res.json();
        getData(data);
        let length=document.getElementById("data-length")
        length.innerText=`Total:${data.length}`
    }
    catch (error) {
        console.log(error);
    }
}


// add new product-----------------------------------------------------------

let addProductButton = document.querySelector(".add-product");
addProductButton.addEventListener("click", addProduct);


function addProduct() {
    length.innerHTML=""
    pagination_box.innerHTML=""
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
        <div class="card-wrapper">
        <span>Brand</span><input id="addtitle">
        <span>Description</span><input id="addDescription">
        <span>Price</span><input id="addprice">
        <span>Image Url</span><input id="addimage">
        <span>Warranty</span><input id="addwarranty">
          <div class="list-buttons">
          <button class="save-data">Save</button>
          </div>
        </div>
    `;




    let savingProduct = document.querySelector(".save-data");
    savingProduct.addEventListener("click", () => {
        let name = document.querySelector("#addtitle").value;
        let description = document.querySelector("#addDescription").value;
        let price = document.querySelector("#addprice").value;
        let image = document.querySelector("#addimage").value;
        let warranty = document.querySelector("#addwarranty").value;


        let obj = {
            name,
            description,
            price,
            image,
            warranty
        };

        saveProduct(obj);
    })
}

async function saveProduct(data) {
    try {
        let res = await fetch(`${baseUrl}/products/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let ans= await res.json()
        if (ans.msg=="Product post.") {
            swal("Product Added sucessfully","","success")
        }
        else{
           console.log(ans)
        }
    } catch (error) {
        console.log(error)
    }
}


// pagination -----------------------------------------------------------

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
            var newarr = arr.slice((dataId - 1) * 10, 10 * dataId)
            getData(newarr);
        })
    }
}

function getAsButton(pageNumber) {
    return `<button class="pagination-button" data-id=${pageNumber}>${pageNumber}</button>`
}