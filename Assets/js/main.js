// Varaiable declarations for required weather info
// for the city that the user searches for
const searchButton = $('#searchBtn'); // search button would need a click event 
const apiKey = "64d87044d3202d1966a584994f4fc6b9"; // to get the weather info using the given weather API
const currentWeather = $('#currentWeather'); // container holding current weather info

// latitude and longitude used later on to get weather based on geographic coordinates 
var lat;
var long;

// these are part of the currentWeather container
var today = moment(); // display the current date  
var city = $('#city').val(); // city that the user wants the weather for
var tempNow = $('#temp'); // temperature for that city
var humidNow = $('#humid'); // humdity for that city
var uviNow = $('#uvi'); // UV index for that city

// 5-day Weather forecast section for the city searched 
const future = $('#5-day');
// 5-day forecast would display current + next 4 dates 
// along with the temperature, date, humidity, and weather icon respective to each day

// required variable declarations for the history section
var history = $('#history');

function weatherSearch() {
    // OneCall API gets weather information based on geographic coordinates, 
    // so we have to first obtain the latitude and longitude 
    var cityInfo = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey; // store info in a variable for easy reference 

    // grabs city's information, which contains the geographic coordinates
    fetch(cityInfo)

    // use latitude and longitude values to get weather information

    //and use openWeather API documentation to find required syntax for the following:
    // temperature 
    // wind speed 
    // humidity

    // activity 4 - week 6 for fectch and .then responses 
    console.log("search button clicked")
}

// when search button is clicked
//searchButton.addEventListener('click', weatherSearch);
// performs the above tasks when the button search button is clicked 
$("#searchBtn").click(weatherSearch); // needed JQuery version as vanilla JS is giving an issue


// create empty array to store previously searched cities into local storage
let searchedCities = []; // empty array
function weatherHistory() { // history function 
    // saves the the empty array to local storage and updates as more cities are searched 
    localStorage.setItem('searchedCities', JSON.stringify('searchedCities'));

    // append each city to the array in local storage if it exists (but has no values inside of it)
    if (localStorage.getItem('searchedCities') != null) {
        searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
    }

    // display current and future conditions 
    // including the date, icon, temperature, wind speed, humidity
    // when that city is clicked 
}






