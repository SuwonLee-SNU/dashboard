const bg = document.querySelector(".bg-img");
const imgUrlList = [
'https://source.unsplash.com/ix_kUDzCczo/1600x800',
'https://source.unsplash.com/eICUFSeirc0/1600x800',
'https://source.unsplash.com/27HiryxnHJk/1600x800',
'https://source.unsplash.com/rKv4HduvzIE/1600x800',
'https://source.unsplash.com/IGtutkXikuc/1600x800',
'https://source.unsplash.com/coj7UZ7iN60/1600x800',
'https://source.unsplash.com/MJxvJlQqldM/1600x800'
]

function setBackgroundImage () {
    let i = Math.ceil(Math.random()*imgUrlList.length-1)  ;
    bg.style.backgroundImage = `url(${imgUrlList[i]})`;
}

function init () {
    setBackgroundImage();
}

init();