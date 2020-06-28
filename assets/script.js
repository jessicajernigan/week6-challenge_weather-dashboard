var cityInputField = document.getElementById('city-input');
var cityDisplayed = document.getElementById('current-city-displayed');
var searchField = document.getElementById('search-form');
var citiesArray = [];
var currentCityTemp = document.getElementById('current-city-temp');
var currentCityHumidity = document.getElementById('current-city-humidity');
var currentCityWind = document.getElementById('current-city-wind');
var currentCityUV = document.getElementById('current-city-uv');
var currentCityIcon = document.getElementById('weather-icon');



function formSubmitHandler (event) {
  event.preventDefault();
  var currentCity = cityInputField
    .value
    .trim();

  citiesArray.push(currentCity);
  cityDisplayed.innerHTML = currentCity;

  localStorage.setItem("city" + citiesArray.indexOf(currentCity), currentCity);

  var previousSearches = document.getElementById('previous-searches'); // Identifies the container for the "city buttons" as a variable.
  var newBtn = document.createElement("button");

  previousSearches.appendChild(newBtn);
  newBtn.classList = "btn btn-secondary btn-lg btn-block city-btn";
  newBtn.setAttribute("id", "city" + citiesArray.indexOf(currentCity))
  newBtn.innerHTML = currentCity;
  cityInputField.value = "";

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
    currentCity +
    '&appid=64691d0a710691e67381e1108d1f040d&units=imperial'
  )

    .then(function (weatherResponse) {
      return weatherResponse.json();
    })
    .then(function (weatherResponse) {
      // console.log("temp: " + weatherResponse.main.feels_like, "humidity: " + weatherResponse.main.humidity, "wind speed: " + weatherResponse.wind.speed, "longitude: " + weatherResponse.coord.lon, "latitude: " + weatherResponse.coord.lat, "icon" + weatherResponse.weather.icon);

      fetch(
        'http://api.openweathermap.org/data/2.5/uvi?appid=64691d0a710691e67381e1108d1f040d&lat=' +
        weatherResponse.coord.lat +
        '&lon=' +
        weatherResponse.coord.lon
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          var uvIndex = response.value
          var temperatureValue = JSON.stringify(weatherResponse.main.feels_like);
          var humidityValue = JSON.stringify(weatherResponse.main.humidity);
          var windSpeedValue = JSON.stringify(weatherResponse.wind.speed)
          // var weatherIcon = JSON.stringify(weatherResponse.weather.icon);
          var uvIndexValue = JSON.stringify(uvIndex);

          // Can I not reconstruct the URL somehow? If I could just get that stupid value...
          // var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";


          // Append current weather values to <span> elements within the "current city" card.
          currentCityTemp.textContent = temperatureValue;
          currentCityHumidity.textContent = humidityValue;
          currentCityWind.textContent = windSpeedValue;
          currentCityUV.textContent = uvIndexValue;
          // currentCityIcon.setAttribute("src", iconUrl);
        })
    })
  fiveDayForecast(currentCity);
  showForecast();
  displayDate();
};


function fiveDayForecast(currentCity) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
    currentCity +
    '&appid=64691d0a710691e67381e1108d1f040d&units=imperial'
  )
    .then(function (forecastResponse) {
      return forecastResponse.json();
    })
    .then(function (forecastResponse) {
      console.log(forecastResponse);
    })
};

function showForecast() {
  document.getElementById("forecast-container").style.display = "inline-block";
}

function displayDate () {
  var prettyDate = moment().format("dddd, MMMM Do");
  moment(prettyDate).toString;
  // console.log(prettyDate);
  var todayDiv = $("#currentDay");
  todayDiv.text(prettyDate);

  var fiveDay1 = moment().add(1, 'day').format("l");
  // console.log(tomorrow);
  moment(fiveDay1).toString;
  var forecastDate1 = $("#date1");
  forecastDate1.text(fiveDay1);

  var fiveDay2 = moment().add(2, 'day').format("l");
  // console.log(tomorrow);
  moment(fiveDay2).toString;
  var forecastDate2 = $("#date2");
  forecastDate2.text(fiveDay2);

  var fiveDay3 = moment().add(3, 'day').format("l");
  // console.log(tomorrow);
  moment(fiveDay3).toString;
  var forecastDate3 = $("#date3");
  forecastDate3.text(fiveDay3);

  var fiveDay4 = moment().add(4, 'day').format("l");
  // console.log(tomorrow);
  moment(fiveDay4).toString;
  var forecastDate4 = $("#date4");
  forecastDate4.text(fiveDay4);

  var fiveDay5 = moment().add(5, 'day').format("l");
  // console.log(tomorrow);
  moment(fiveDay5).toString;
  var forecastDate5 = $("#date5");
  forecastDate5.text(fiveDay5);
};

searchField.addEventListener("submit", formSubmitHandler);