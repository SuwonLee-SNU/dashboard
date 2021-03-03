const weather = document.querySelector('.weather');
const API_KEY = "5d10af29ad83ec88e2e9508132cab4fa";
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        // console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ @ ${place}`;
        weatherIcon = document.createElement('div');
        weatherIcon.setAttribute('class','weatherIcon');
        weather.appendChild(weatherIcon);
        const icon = json.weather[0].icon;
        // console.log(json.weather[0].icon);
        weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${icon}@2x.png'></img>`;
        weatherIcon.addEventListener('mouseenter',(v)=>{
            v.target.innerHTML = `${json.weather[0].main}`;
        })
        weatherIcon.addEventListener('mouseleave',(v)=>{
            v.target.innerHTML = `<img src='http://openweathermap.org/img/wn/${icon}@2x.png'></img>`;
        })
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        // console.log(parsedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();