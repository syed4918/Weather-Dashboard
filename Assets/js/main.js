const submitText = document.getElementById("submitText");
const submitButton = document.getElementById("submitButton");
const infoName = document.getElementById("infoName");
const weatherIcon = document.getElementById("icon");
const infoTemp = document.getElementById("Temperature");
const infoWind = document.getElementById("Wind");
const infoHumid = document.getElementById("Humidity");
const infoUV = document.getElementById("UV");

var currentTime = moment();
console.log(currentTime);


const apiKey = "d70ef8022f47b07da7d017d3bf99f53b";

function getCity(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(queryURL)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      addCity(data);
    })
    .catch(function() {
      // catch any errors
    });
}

function addCity(city){
    infoName.textContent = city.name + " " + moment().format("L");
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + city.weather[0].icon + ".png")
    infoTemp.textContent = "Temp: " + Math.floor((city.main.temp - 273.15) * 9/5 + 32) + "°F";
    infoWind.textContent = "Wind: " + city.wind.speed + "MPH";
    infoHumid.textContent = "Humidity: " + city.main.humidity + " %";
    let lat = city.coord.lat;
    let lon = city.coord.lon;
    let uvKey = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid="+apiKey;
    fetch(uvKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        infoUV.textContent = "UV Index: " + data.current.uvi;
    })
    console.log(city);
}

getCity("Philadelphia");