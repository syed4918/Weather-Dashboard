//Submit Area Variables
const submitText = document.getElementById("submitText");
const submitButton = document.getElementById("submitButton");
const searchHistory = document.getElementById("searchHistory");
//Info Variables
const currentInfo = document.getElementById("currentInfo");
const infoName = document.getElementById("infoName");
const weatherIcon = document.getElementById("icon");
const infoTemp = document.getElementById("infoTemp");
const infoWind = document.getElementById("infoWind");
const infoHumid = document.getElementById("infoHumid");
const infoUV = document.getElementById("infoUV");
//Five day forecast section
const fiveForecast = document.getElementById("fiveForecast");
const fiveDayInfo = document.getElementById("fiveDayInfo");

var currentTime = moment(); //CURRENT TIME
const apiKey = "d70ef8022f47b07da7d017d3bf99f53b"; //API KEY

let cityHistory = [];
if (localStorage.getItem("cityHistory") != null) { //Sets cityHistory if it exists in localStorage
    cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
}

function saveHistory() { //Saves cityHistory to localStorage
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory)); 
}

function fillHistory(){ //Adds buttons based on cityHistory
    searchHistory.innerHTML = "";
    for(i = 0; i < cityHistory.length; i++){
        var searchedCity = document.createElement("button");
        searchedCity.textContent = cityHistory[i];
        searchHistory.appendChild(searchedCity);
    }
}

function searchCity(){ //Looks for city from submit text
    getCity(submitText.value);
}

function addToHistory(cityName){ //Add city to history if not already in it
    let noMatch = true;
    for(i = 0; i < cityHistory.length; i++){
        if(cityHistory[i].toUpperCase() === cityName.toUpperCase()){
            noMatch = false;
        }
    }
    if(noMatch){
        if(cityHistory.length >= 10){
            cityHistory.splice(0, 1);
        }
        cityHistory.push(cityName.toUpperCase());
        saveHistory();
        fillHistory();
    }
    submitText.textContent = "";
    submitText.TEXT_NODE = "";
}

function getCity(city){
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=` + city + `&units=imperial&appid=` + apiKey;
    fetch(queryURL)
    .then(function(resp) { 
        if(resp.status === 400 || resp.status === 404){
            console.log("Did not work " + city);
            return null;
        }
        return resp.json() }) // Convert data to json
    .then(function(data) {
      addCity(data);
      addToHistory(data.name);
      currentInfo.style.display = "block";
      fiveForecast.style.display = "block";
      return true;
    })
    .catch(function() {
      // catch any errors
      return null;
    });
}

function addCity(city){ //Displays city
    infoName.textContent = city.name + " " + moment().format("L"); //Heading for current day
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/` + city.weather[0].icon + `.png`); //Weather icon
    infoTemp.textContent = "Temp: " + city.main.temp + "°F"; //Temp from K to F
    infoWind.textContent = "Wind: " + city.wind.speed + "MPH"; //Wind speed
    infoHumid.textContent = "Humidity: " + city.main.humidity + " %"; //Humidity
    let lat = city.coord.lat; //Lat for UV and more data
    let lon = city.coord.lon; //Lon for UV and more data
    let moreData = `http://api.openweathermap.org/data/2.5/onecall?lat=`+lat+`&lon=`+lon+`&units=imperial&appid=`+apiKey; //more data key
    fetch(moreData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        infoUV.textContent = "UV Index: " + data.current.uvi; //Current UV
        //Changes color based health standards
        if(data.current.uvi < 2){
            infoUV.setAttribute("class", "goodUV");
        } else if(data.current.uvi < 7){
            infoUV.setAtrribute("class", "moderateUV");
        } else {
            infoUV.setAttribute("class", "badUV");
        }
        fiveDayInfo.innerHTML = ""; //Clears element if full
        for(i =1; i < 6; i++){ //Tomorrow and the next four days
            let weekDay = data.daily[i];
            let dayDate = document.createElement("div");
            dayDate.textContent = moment(new Date(data.daily[i].dt * 1000)).format("MM/DD/YYYY"); //Heading for day
            let dayIcon = document.createElement("img"); //Day icon
            dayIcon.style.width = "40px"; 
            dayIcon.style.height = "40px";
            dayIcon.setAttribute("src", `http://openweathermap.org/img/w/` + weekDay.weather[0].icon + `.png`);
            let dayTemp = document.createElement("p");
            dayTemp.textContent = "Temp: " + weekDay.temp.day + "°F";
            let dayWind = document.createElement("p");
            dayWind.textContent  = "Wind: " + weekDay.wind_speed + " MPH";
            let dayHumid = document.createElement("p");
            dayHumid.textContent = "Humidity: " + weekDay.humidity + " %";

            let infoBox = document.createElement("div");
            fiveDayInfo.appendChild(infoBox);
            infoBox.appendChild(dayDate);
            infoBox.appendChild(dayIcon);
            infoBox.appendChild(dayTemp);
            infoBox.appendChild(dayWind);
            infoBox.appendChild(dayHumid);
        }
    })
}

function showFromHistory(event) { //Shows city on button click
    var element = event.target;
    if(element.nodeName === "BUTTON"){
        getCity(element.textContent);
    }
}

fillHistory();