let baseUrl = "https://exuberant-tam-wasp.cyclic.app"



document.getElementById("logo").addEventListener("click", () => {
    window.location.href = "index.html"
});

// show user details -------------------------------------------------------

let dataListWrapper = document.querySelector(".data-list-wrapper");
let showUsersButton = document.querySelector(".show-user-details");
showUsersButton.addEventListener("click", async function () {
    try {
        num = 3;
        let res = await fetch(`${baseUrl}/users/all`);
        let data = await res.json();
        dispaly_data(data)
    } catch (error) {
        console.log("error")
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
}


function userCard(id, username, email, password, mobile, age) {
    return `
        <div class="card-wrapper">
        <span>username</span><input id="title" value="${username}"  readonly>
        <span>email</span><input id="hour" value="${email}"  readonly>
        <span>password</span><input value="${password}"  readonly>
        <span>mobile</span><input id="course" value="${mobile}"  readonly>
        <span>age</span><input id="lesson" value="${age}"  readonly>
        </div>
    `;
}
// ---------------------------------------------------------------------------------




// show products data---------------------------------------------------------------

let showCoursesButton = document.querySelector(".show-courses");
showCoursesButton.addEventListener("click", async function () {
    try {
        let res = await fetch(`${baseUrl}/products/all`);
        let data = await res.json();
        getData(data);
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
          <button class="delete-data" data-id="${id}" data-identifier="${identifier}">Delete Product</button>
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
    
    // let editData= document.querySelectorAll(".edit-data");
    // for (let editButton of editData) {
    //     editButton.addEventListener("click", function (element) {
    //         let data = element.target.dataset.id;
    //         editFunction(data)
    //     })
    // };

}


async function deleteFunction(data) {
    try {

        let res = await fetch(`${baseUrl}/products/delete/${data}`, {
            method: "DELETE"
        });
       Fetching();

    } catch (error) {
        console.log(error)
    }
}

// async function editFunction(data) {
//     try {

//         let res = await fetch(`${baseUrl}/products/update/${data}`, {
//             method: "PATCH"
//         });
//        Fetching();

//     } catch (error) {
//         console.log(error)
//     }
// }


async function Fetching() {
    try {
        let res = await fetch(`${baseUrl}/products/all`);
        let data = await res.json();
        getData(data);
        }
    catch (error) {
        console.log(error);
    }
}


// add new product-----------------------------------------------------------

let addCourseButton = document.querySelector(".add-courses");
addCourseButton.addEventListener("click", addCourse);


function addCourse() {
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
        if (res.ok) {
            alert("product Added")
            // pageNot.innerText = "Course Successfully Added";
            // notification();
            // title = document.querySelector("#addtitle");
            // addcourse = document.querySelector("#addcourse");
            // addlesson = document.querySelector("#addlesson");
            // addhour = document.querySelector("#addhour");
            // adddescription = document.querySelector("#adddescription");
            // title.value = "";
            // addcourse.value = "";
            // addlesson.value = "";
            // addhour.value = "";
            // adddescription.value = "";
        }
    } catch (error) {
        // notification();
        console.log(error)
    }
}