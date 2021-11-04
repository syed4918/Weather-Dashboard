// Varaiable declarations for required weather info
// for the city that the user searches for
const searchButton = $('#searchBtn'); // search button would need a click event 
const apiKey = ""; // to get the weather info using the given weather API
var city = $('#city') // city that the user wants the weather for
const currentWeather = $('#currentWeather'); // container holding current weather info

// these are part of the currentWeather container
var today = moment(); // display the current date  
var tempNow = $('#temp'); // temperature for that city
var humidNow = $('#humid'); // humdity for that city
var uviNow = $('#uvi'); // UV index for that city

function weatherSearch() { 
    //use api key to retrieve info for the current day 
    //and use openWeather API documentation to find required syntax for the following:
    // temperature 
    // wind speed 
    // humidity

    // activity 4 - week 6 for fectch and .then responses 
    console.log("search button clicked")

    // when search button is clicked
    //searchButton.addEventListener('click', weatherSearch);
    // performs the above tasks when the button search button is clicked 
    $("#searchBtn").click(weatherSearch); // needed JQuery version as vanilla JS is giving an issue
}

// 5-day Weather forecast section for the city searched 
const future = $('#5-day');
// 5-day forecast would display current + next 4 dates 
// along with the temperature, date, humidity, and weather icon respective to each day

// history section
var history = $('#history');

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






