const API_KEY = '664ed5989a56ee7fc9714643e374ca16';
const weatherContainer = document.getElementById('weather-container');
const errorMessage = document.getElementById('error-message');
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', getWeather);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

async function getWeather() {
    const location = locationInput.value.trim();
    if (!location) {
        showError('Please enter a location');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod && data.cod !== 200) {
            showError(data.message || 'Location not found. Please try again.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        showError('An error occurred. Please try again later.');
        console.error('Error:', error);
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = Math.round(main.temp);
    const description = weather[0].description;
    const icon = weather[0].icon;

    document.getElementById('location').textContent = name;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = description;
    document.getElementById('weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;

    weatherContainer.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherContainer.classList.add('hidden');
}
