document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = 'b09a68e1ce583162cab7988f7f60f22d'; // Replace with your API key

    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            const weatherInfo = `
                <p>Temperature: ${data.main.temp}K</p>
                <p>Weather: ${data.weather[0].description}</p>
                <img src="${iconUrl}" alt="Weather icon">
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        })
        .catch(error => console.error('Error:', error));

    // Fetch 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let forecast = '<h2>5-Day Forecast:</h2>';
            data.list.forEach(item => {
                const iconUrl = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
                forecast += `
                    <p>${item.dt_txt}: ${item.main.temp}K, ${item.weather[0].description}
                    <img src="${iconUrl}" alt="Weather icon"></p>
                `;
            });
            document.getElementById('weather-info').innerHTML += forecast;
        })
        .catch(error => console.error('Error:', error));

    // Fetch location-based weather
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    const locationWeather = `
                        <p>Current Location Weather:</p>
                        <p>Temperature: ${data.main.temp}K</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <img src="${iconUrl}" alt="Weather icon">
                    `;
                    document.getElementById('weather-info').innerHTML += locationWeather;
                })
                .catch(error => console.error('Error:', error));
        }, error => {
            console.error('Geolocation error:', error);
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
});

