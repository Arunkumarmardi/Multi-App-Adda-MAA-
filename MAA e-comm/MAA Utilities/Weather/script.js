document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'a28ef738dcbf0a2a8b749608341f0940'; // Replace with your OpenWeatherMap API key
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const cityInput = document.getElementById('city');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeatherBtn.click();
        }
    });

    async function fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found!');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error); 
        }
    }

    function displayWeather(data) {
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Description: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherInfo.classList.remove('hidden');
    }
});
