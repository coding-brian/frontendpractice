const emailInput = document.querySelector('.email-input')
const errorMessage = document.querySelector('.error-message')
const email = document.querySelector('#email')
const message = document.querySelector('.message')
const main = document.querySelector('main')

function isModile(){
    return window.innerWidth <= 768;
}

function isEmail(email){
    const regex =/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/
    return regex.test(email)
}

function clear(){
    emailInput.classList.remove('error')
    errorMessage.innerText = ""
}

function back(){
    clear()
    message.style.display="none"
    main.style.display = "flex"
    emailInput.value=""
}

function keydown(event){
    if(event.key==="Enter"){
        submit()
    }
}

function submit(){

    
    if(!isEmail(email.value)){
        errorMessage.innerText ='Valid email required'
        emailInput.classList.add('error')
        return false
    }

    const messageEmail=document.querySelector('#message-email')
    messageEmail.innerText=email.value
    message.style.display = "flex"
    main.style.display = "none"
}

document.addEventListener('DOMContentLoaded',function(){
    if(isModile()){
        const banner=document.body.querySelector('.banner')
        banner.src="../assets/images/illustration-sign-up-mobile.svg"
    }
})

document.body.querySelector('#subscription-button').addEventListener('click',submit)
document.body.querySelector('.email-input').addEventListener('keydown',keydown)
document.body.querySelector('.email-input').addEventListener('focus',clear)
document.body.querySelector('#dismiss-button').addEventListener('click',back)
