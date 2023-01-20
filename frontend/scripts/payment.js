let button= document.querySelector("form");
let cancel= document.querySelector("#cancel");

button.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("yes")
   swal("Payment Done","","success").then((res)=>{
    window.location.href="index.html"
   })
})
cancel.addEventListener("click",()=>{
    window.location.href="index.html"
});