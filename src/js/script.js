const key = "dcf62b3dc5dab9a2a5ef117139d1a8e8";
const searchBtn = document.querySelector(".search-btn");
const input = document.querySelector(".input-city");
const unsplashKey = "rbI3_V8Ge_L0FMWPXdwjQEen6-wS_Hjx6M00wj0aTrM";

searchBtn.addEventListener("click", getCity);

function showData(data) {
  let iconCode = data.weather[0].icon;
  let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

  document.querySelector(".city").innerHTML = "Tempo em " + data.name;
  document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "˚C";
  document.querySelector(".weather-text").innerHTML =
    data.weather[0].description;
  document.querySelector(".humidity").innerHTML =
    "Umidade: " + data.main.humidity + "%";
  document.querySelector(".weather-icon").setAttribute("src", iconUrl);
}

async function getWeather(city) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
  ).then((response) => response.json());

  showData(data);
  input.value = "";
  input.focus();
}

function getCity() {
  const city = document.querySelector(".input-city").value;

  getWeather(city);
}

async function startPage(bsb) {
  bsb = "Brasília";
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${bsb}&appid=${key}&units=metric&lang=pt_br`
  ).then((response) => response.json());

  showData(data);
}

async function getRandomLandscapeImage() {
    const url = `https://api.unsplash.com/photos/random?query=landscape&client_id=${unsplashKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            // console.log(data);
            setBackgroundImage(data.urls.regular);
        } else {
            console.error('Erro ao buscar imagem:', data);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
    }
}

function setBackgroundImage(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
}

window.onload = getRandomLandscapeImage;

startPage();
