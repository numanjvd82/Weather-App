// Declaring Vars
const cityform = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.weather-details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();
      
const updateUI = (data) => {
  // destructuring properties
  const { cityDetails, weather } = data;

  // Update detail templates
  details.innerHTML = `<h5>${cityDetails.EnglishName}</h5>
  <div class="weather-condition">${weather.WeatherText}</div>
  <div class="temp">
    <span>${weather.Temperature.Metric.Value} &deg;C</span>
  </div>`;

  // Hide details template
  if (card.classList.contains('hide')) {
    card.classList.remove('hide');
  }

  // update the night/day icon and image
  const knownIcon = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', knownIcon);

  let knownTime = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', knownTime);
};

// Event Listener on CityForm
cityform.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = cityform.location.value.trim();
  cityform.reset();

  // update the ui with new city
  forecast
    .updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
