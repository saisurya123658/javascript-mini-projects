const apikey = "313fcd91a90fc3bf308cccb2cad912e6";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const clearBtn = document.getElementById("clearBtn"); 
const weathericon = document.querySelector(".weather-icon");
async function checkweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }
  const data = await response.json();
  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  if (data.weather[0].main === "Clouds") {
    weathericon.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weathericon.src = "images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weathericon.src = "images/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weathericon.src = "images/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weathericon.src = "images/mist.png";
  } else {
    weathericon.src = "images/snow.png";
  }
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}
searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
  
});
searchbox.addEventListener("input", () => {
  clearBtn.style.display = searchbox.value ? "block" : "none";
});
clearBtn.addEventListener("click", () => {
  searchbox.value = "";
  clearBtn.style.display = "none";
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".error").style.display = "none";
});
