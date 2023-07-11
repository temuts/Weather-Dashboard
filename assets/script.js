var resultsContainer = $('#results');
var currentCityContainer = $('#current-city');
var cityTitleEl = $('#city-title');
var windSpeed = $('#wind-speed');
var humidity = $('#humidity');
var feelsLike = $('#feels-like');
var weatherIconEl = $('#weather-icon');
var forecastCard = $('forecast-card');
var forecastContainer = $('#five-day-forecast')

var apiKey = "f98cdd2e02d8414e40bf2c8c26ce8beb";
var latVal;
var lonVal;


function printCurrentCity(data){
    var cityTitle = data.name;
    var rawCityTemp = data.main.feels_like;
    var cityWind = data.wind.speed;
    var cityHumidity = data.main.humidity;
    var weatherIcon = data.weather[0].icon;
    var iconurl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    latVal = data.coord.lat;
    lonVal = data.coord.lon;

    var celsiusTemp = parseInt(rawCityTemp - 273.15);

    cityTitleEl.text(cityTitle).attr('class','headings');
    feelsLike.text(`Feels like: ${celsiusTemp} °C`);
    windSpeed.text(`Wind: ${cityWind}mph`);
    humidity.text(`Humidity: ${cityHumidity}%`);
    weatherIconEl.attr('src', iconurl).attr('class','material-icons');

    currentCityContainer.append(weatherIconEl);
    currentCityContainer.append(feelsLike);
    currentCityContainer.append(windSpeed);
    currentCityContainer.append(humidity);

    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latVal}&lon=${lonVal}&appid=${apiKey}`;
    $.ajax({
        url: forecastUrl,
        method: "GET",
    }).then (data=>{
    console.log(data),
    function printForecast(data){
        var upcomingDate = cnt;
        console.log(upcomingDate);
        // var forecastEl = $('<p>').text(date).attr('class','headings');
        // forecastCard.text(forecastEl);
        // forecastContainer.append(forecastEl);
    }
})
}

$(document).ready(function searchInput (){
    $("#search-button").click(function citySearch (event){
        event.preventDefault();

        var cityInputValue = $('#city-input').val();
        var resultCity = $('<p>').text(cityInputValue).attr('class', 'card-panel grey lighten-2');
        resultsContainer.append(resultCity);
        console.log(cityInputValue);

        var cityName = cityInputValue;

        
        var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        $.ajax({
        type: 'GET',
        url: cityUrl,
        }).then (data=>{
            console.log(data);
            printCurrentCity(data);
        
            // console.log(`${cityTitle} has wind speed of ${cityWind}mph and feels like ${cityTemp} degrees and has ${cityHumidity}% humidity`);
            
        });

    });
});

