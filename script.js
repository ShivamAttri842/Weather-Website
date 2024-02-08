const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const API_KEY = '33e985202a06e5bd5cbbb35d9480672d'; // Replace 'YOUR_API_KEY' with your actual API key

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();

        if (response.ok) {
            location_not_found.style.display = 'none';
            weather_body.style.display = 'flex';

            temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
            description.textContent = data.weather[0].description;
            humidity.textContent = `${data.main.humidity}%`;
            wind_speed.textContent = `${data.wind.speed}Km/H`;

            // Set weather image based on weather condition
            const weatherIcon = data.weather[0].icon;
            weather_img.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
            weather_img.alt = data.weather[0].description;
        } else {
            location_not_found.style.display = 'flex';
            weather_body.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a valid city name.');
    }
});
