
const apiKey = '61fd6611f5ebf0effe5a44f5c6b470dd';

const weatherForm = document.getElementById('weatherForm');
const weatherDataDiv = document.getElementById('weatherData');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityInput = document.getElementById('city');
  const cityName = cityInput.value.trim();
  getWeatherData(cityName);
});

function getWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      weatherDataDiv.textContent = 'Error fetching weather data';
    });
}

function displayWeatherData(weatherData) {
  weatherDataDiv.innerHTML = `
    <h2>${weatherData.name}</h2>
    <p>Weather: ${weatherData.weather[0].description}</p>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
  `;
}
