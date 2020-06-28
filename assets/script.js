var cityInputField = document.getElementById('city-input');
var cityDisplayed = document.getElementById('current-city-displayed');
var searchField = document.getElementById('search-form');
var citiesArray = [];
var currentCityTemp = document.getElementById('current-city-temp');
var currentCityHumidity = document.getElementById('current-city-humidity');
var currentCityWind = document.getElementById('current-city-wind');
var currentCityUV = document.getElementById('current-city-uv');
var currentCityIcon = document.getElementById('weather-icon');




var formSubmitHandler = function (event) {
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

  console.log(currentCity);


  fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
    currentCity +
    '&appid=64691d0a710691e67381e1108d1f040d'
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
};


function fiveDayForecast(currentCity) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
    currentCity +
    '&appid=64691d0a710691e67381e1108d1f040d'
  )
    .then(function (forecastResponse) {
      return forecastResponse.json();
    })
    .then(function (forecastResponse) {
      console.log(forecastResponse);
    })
};






// renderPastCities();
searchField.addEventListener("submit", formSubmitHandler);