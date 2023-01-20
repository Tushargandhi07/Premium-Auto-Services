let form = document.querySelector("#loginBox");


form.addEventListener("submit", login);

async function login(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#password").value;

    let payload = {
        email,
        pass,
    }
    try {
        let data = await fetch("http://localhost:4440/users/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json"
            }
        });
        let new_data = await data.json();
        if (new_data.msg == "Login Done") {
            localStorage.setItem("token",new_data.token)
            localStorage.setItem("username",new_data.username)
            localStorage.setItem("userID",new_data.userID)
            alert("Login Successful");
            window.location.href = "index.html";
        } else {
            alert("Wrong Credentials!");
        }

    } catch (error) {
        console.log(error);
        alert("Wrong Credentials!");
    }

}