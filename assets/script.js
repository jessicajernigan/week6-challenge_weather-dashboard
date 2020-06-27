var cityInputField = document.getElementById('city-input');
var cityDisplayed = document.getElementById('current-city-displayed');
var searchField = document.getElementById('search-form');
var citiesArray = [];



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

    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    })
};








searchField.addEventListener("submit", formSubmitHandler);