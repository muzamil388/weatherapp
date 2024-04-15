function getWeather() {
    var city = document.getElementById('cityInput').value;
    var apiKey = 'jX1g7dHVx11JYQG3JnuLeGQ7GfxrVbHq'; // Replace 'your_accuweather_api_key' with your actual AccuWeather API key
    var locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search=${apiKey}&q=${city}`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', locationUrl, true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.length > 0) {
                var locationKey = data[0].Key;
                var weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;

                var weatherXhr = new XMLHttpRequest();
                weatherXhr.open('GET', weatherUrl, true);

                weatherXhr.onload = function () {
                    if (weatherXhr.status == 200) {
                        var weatherData = JSON.parse(weatherXhr.responseText)[0];
                        var temperature = weatherData.Temperature.Metric.Value;
                        // Display the temperature
                        alert(`Temperature in ${city}: ${temperature}°${weatherData.Temperature.Metric.Unit}`);
                    } else {
                        alert('Error fetching weather data. Please try again.');
                    }
                };

                weatherXhr.send();
            } else {
                alert('City not found. Please enter a valid city name.');
            }
        } else {
            alert('Error fetching location data. Please try again.');
        }
    };

    xhr.send();
}
