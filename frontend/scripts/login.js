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
    if (email == "admin@gmail.com" && pass == "admin") {
        window.location.href="admin.html"
        return;
    }
    else {
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
                localStorage.setItem("token", new_data.token)
                localStorage.setItem("username", new_data.username)
                localStorage.setItem("userID", new_data.userID)
                swal("Login Successful","","success");
                window.location.href = "index.html";
            } else {
                swal("Wrong Credentials!","","warning");
            }

        } catch (error) {
            console.log(error);
            swal("Wrong Credentials!","","warning");
        }
    }

}