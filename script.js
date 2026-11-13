const form=document.getElementById("request_form");
console.log("PRINCE CONNECTED");
console.log(typeof emailjs);
emailjs.init({publicKey:"zy-74fELVFVKfHfzC"})
//modal element
const modal =
document.getElementById("response_modal");
const modaltitle=
document.getElementById("modal_title");
const modalmessage=
document.getElementById("modal_message");
const modalicon=
document.getElementById("modal_icon");
const modalclose=
document.getElementById("modal_close")
//show modal
function showmodal(type, title, message){
    modal.classList.remove("success","error");
    modal.classList.add(type);
    modaltitle.textContent=title;
    modalmessage.textContent=message;
    modalicon.textContent=type==="success"?"+":"!";
    modal.hidden=false;
    requestAnimationFrame(function(){
    modal.classList.add("active");
    });
}
//close button
function closemodal(){
    modal.classList.remove("active");
    setTimeout(function(){
        modal.hidden=true;
    },300);
}
//close button
modalclose.addEventListener("click",closemodal);
//click outside
modal.addEventListener("click",function(event){
    if(event.target===modal){
        closemodal();
    }
});
//escape key
document.addEventListener("keydown",function(event){
    if(event.key==="escape"&&!modal.hidden){
        closemodal();
    }
});
//form submit
form.addEventListener("submit",function(event){
    event.preventDefault();
    console.log("submit event fired");
    emailjs.sendForm(
        "service_dtdp6d9",
        "template_fz36nsm",
        form
    )
    .then(function(){
        console.log("email sent seccessfull");
        form.reset();
        showmodal(
            "success",
            "پیام شما با موفقیت ارسال شد",
            "از اینکه با ما در ارتباط هستین سپاس گزاریم. به زودی با شما تماس خوایم گرفت"
        );
    })
    .catch(function(error){
        console.error("email sending failed",error);
        showmodal(
            "error",
            "ارسال پیام نا موفق بود",
            "متاسفانه در ارسال پیام مشکل پیش آمده. دوباره تلاش کنید"
        );
    })
})