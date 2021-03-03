const un = document.querySelector(".user-name");
const input = un.querySelector("input");
const greeting = un.querySelector("span");
let USERNAME_LS = [];

function loadUser () {
    USERNAME_LS = localStorage.USERNAME;
    if (USERNAME_LS === undefined) {
        input.classList.add("appear");
        input.classList.remove("disappear");
        greeting.classList.add("disappear");
        greeting.classList.remove("appear");
    } else {
        input.classList.add("disappear");
        input.classList.remove("appear");
        greeting.classList.add("appear");
        greeting.classList.remove("disappear");
        greeting.innerText = `Hello, ${USERNAME_LS}!`;
    }
}
function makeUserName () {
    input.setAttribute('placeholder','What is your name?');
    un.addEventListener("submit", handleSubmit);
}
function handleSubmit (e) {
    e.preventDefault();
    localStorage.setItem('USERNAME',input.value);
    loadUser();
}
function makeResetter () {
    rst = document.createElement('button');
    rst.setAttribute('class','resetter');
    document.body.appendChild(rst);
    rst.style.order="1000";
    rst.innerText = "Clear everything?";
    rst.addEventListener('click',(v)=>{
        localStorage.clear();
        location.href = location.href;
    })
    rst.addEventListener('mouseover',(v)=>{
        console.log(v.target);
        v.target.style.color="white";
    });
    rst.addEventListener('mouseleave',(v)=>{
        console.log(v.target);
        v.target.style.color="black";
    });
}
function init () {
    loadUser();
    makeUserName();
    makeResetter();
}
init();