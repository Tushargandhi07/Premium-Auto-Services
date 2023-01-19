let form= document.querySelector("#signupBox");


form.addEventListener("submit",register);

async function register(event){
    event.preventDefault();
    let name= document.querySelector("#username").value;
    let email= document.querySelector("#email").value;
    let age= document.querySelector("#age").value;
    let mobile= document.querySelector("#mobile").value;
    let pass= document.querySelector("#password").value;
    let confirm_password= document.querySelector("#confirm_password").value;

    let payload={
        name,
        email,
        age,
        mobile,
        pass
    }
    if(payload.pass!=confirm_password){
        alert("Confirm password must be same.");
        return;
    }
    else{
       await fetch("http://localhost:4440/users/register",{
            method: "POST",
            body: JSON.stringify(payload),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json())
        .then(res=>{
            if(res.msg=="Email Already registered."){
                alert("Email Already registered.");
            }
            else{
                alert("Signup Successful");
                window.location.href="login.html"
            }
        })
        .catch(err=>console.log(err));
    }

}

let showUser= document.querySelector("#username");
let data = localStorage.getItem("username");

if(data){
    showUser.innerHTML=data
}

