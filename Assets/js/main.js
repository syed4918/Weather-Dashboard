// Varaiable declarations for required weather info
// for the city that the user searches for
const searchButton = $('#searchBtn'); // search button would need a click event 
const apiKey = "" ; // to get the weather info using the given weather API
var city = $('#city') // city that the user wants the weather for
const currentWeather = $('#currentWeather'); // container holding current weather info

// these are part of the currentWeather container
var today = moment(); // display the current date  
var tempNow = $('#temp'); // temperature for that city
var humidNow = $('#humid'); // humdity for that city
var uviNow = $('#uvi'); // UV index for that city

// separate from currentWeather 
var history = $('#history'); 
// grab search history based on local storage (needs to add it if empty)
// and display current and future conditions 
// when that city is clicked 

// 5-day Weather forecast section
const future = $('#5-day');
 // 5-day forecast would display current + next 4 dates 
// along with the temperature, date, humidity, and weather icon respecitive to each day

