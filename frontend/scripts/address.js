let button= document.querySelector("form");

button.addEventListener("submit",(e)=>{
    e.preventDefault();
   swal("Pay Now").then((res)=>{
    window.location.href="payment.html"
   })
})
