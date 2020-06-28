var cityInputField = document.getElementById('city-input');
var cityDisplayed = document.getElementById('current-city-displayed');
var searchField = document.getElementById('search-form');
var currentCityTemp = document.getElementById('current-city-temp');
var currentCityHumidity = document.getElementById('current-city-humidity');
var currentCityWind = document.getElementById('current-city-wind');
var currentCityUV = document.getElementById('current-city-uv');
var currentCityIcon = document.getElementById('weather-icon');
var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];


function displayStoredCities() {
  for (var i = 0; i < citiesArray.length; i++) {
    var previousSearches = document.getElementById('previous-searches'); // Identifies the container for the "city buttons" as a variable.
    var newBtn = document.createElement("button");

    newBtn.onclick = function () {
      var city = event.target.textContent;
      displayCurrentWeather(city);
    }
    previousSearches.appendChild(newBtn);
    newBtn.classList = "btn btn-outline-primary btn-lg btn-block city-btn";
    newBtn.setAttribute("id", "city-" + citiesArray[i])
    newBtn.innerHTML = citiesArray[i];
  }
}


function formSubmitHandler(event) {
  event.preventDefault();
  var currentCity = cityInputField
    .value
    .trim();

  if (citiesArray.indexOf(currentCity) === -1) {
    citiesArray.push(currentCity);
    cityDisplayed.innerHTML = currentCity;
    localStorage.setItem("cities", JSON.stringify(citiesArray));

    var previousSearches = document.getElementById('previous-searches'); // Identifies the container for the "city buttons" as a variable.
    var newBtn = document.createElement("button");
    newBtn.onclick = function () {
      var city = event.target.textContent;
      displayCurrentWeather(city);
    }
    previousSearches.appendChild(newBtn);
    newBtn.classList = "btn btn-outline-primary btn-lg btn-block city-btn";
    newBtn.setAttribute("id", "city-" + currentCity)
    newBtn.innerHTML = currentCity;
  }
  cityInputField.value = "";

  displayCurrentWeather(currentCity)
  displayFiveDayForecast(currentCity);
  displayDate();
};


function displayCurrentWeather(currentCity) {
  cityDisplayed.innerHTML = currentCity;
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
        'https://api.openweathermap.org/data/2.5/uvi?appid=64691d0a710691e67381e1108d1f040d&lat=' +
        weatherResponse.coord.lat +
        '&lon=' +
        weatherResponse.coord.lon
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          var uvIndex = response.value
          var temperatureValue = Math.round(weatherResponse.main.feels_like);
          var humidityValue = weatherResponse.main.humidity;
          var windSpeedValue = weatherResponse.wind.speed;
          var uvIndexValue = JSON.stringify(uvIndex);
          var weatherIcon = weatherResponse.weather[0].icon;
          var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";


          // Append current weather values to <span> elements within the "current city" card.
          currentCityTemp.textContent = temperatureValue;
          currentCityHumidity.textContent = humidityValue;
          currentCityWind.textContent = windSpeedValue;
          currentCityUV.textContent = uvIndexValue;
          conditionalUVIndexStyling(uvIndexValue);
          currentCityIcon.setAttribute("src", iconUrl);
          cityDisplayed.innerHTML = currentCity;
        })
    })
  displayFiveDayForecast(currentCity);
  showForecast();
  displayDate();
}

function conditionalUVIndexStyling(uvIndexValue) {
  if (uvIndexValue < 3) {
    currentCityUV.setAttribute("class", "badge badge-success")
  } else if (uvIndexValue > 7) {
    currentCityUV.setAttribute("class", "badge badge-danger")
  } else if (uvIndexValue >= 3 && uvIndexValue <= 7) {
    currentCityUV.setAttribute("class", "badge badge-warning")
  }
};

function displayFiveDayForecast(currentCity) {
  cityDisplayed.innerHTML = currentCity;
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
    currentCity +
    '&appid=64691d0a710691e67381e1108d1f040d&units=imperial'
  )
    .then(function (forecastResponse) {
      return forecastResponse.json();
    })
    .then(function (forecastResponse) {
      // console.log(forecastResponse);

      var dates = [];
      // results is data from api
      for (var i = 0; i < forecastResponse.list.length; i++) {
        var isThree = forecastResponse.list[i]["dt_txt"].split(" ")[1].split(":")[0] == 15;
        if (isThree) {
          // populate with weather data from this object
          dates.push(forecastResponse.list[i]);
        }
      }
      // console.log(dates);

      for (var i = 0; i < dates.length; i++) {
        var cardTemp = document.getElementsByClassName("forecast-temp");
        cardTemp[i].innerHTML = Math.round(dates[i].main.temp) + "&#8457;";
      };

      for (var i = 0; i < dates.length; i++) {
        var cardHumidity = document.getElementsByClassName("forecast-humidity");
        cardHumidity[i].innerHTML = dates[i].main.humidity + "%";
      };

      for (var i = 0; i < dates.length; i++) {
        var cardIcon = document.getElementsByClassName("forecast-icon");
        var cardIconId = dates[i].weather[0].icon
        var cardIconUrl = "http://openweathermap.org/img/w/" + cardIconId + ".png";
        cardIcon[i].setAttribute("src", cardIconUrl);
      };
    });
};



function displayDate() {
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

function showForecast() {
  document.getElementById("forecast-container").style.display = "inline-block";
};

displayStoredCities();
searchField.addEventListener("submit", formSubmitHandler);