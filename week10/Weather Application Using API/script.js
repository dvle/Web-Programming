document.getElementById("weatherBtn").addEventListener("click", getWeather);

function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if ([1,2,3].includes(code)) return "☁️";
  if ([51,53,55,61,63,65].includes(code)) return "🌧️";
  if ([95].includes(code)) return "⛈️";
  if ([71,73,75].includes(code)) return "❄️";
  if ([45,48].includes(code)) return "🌫️";

  return "🌍"; 
}

async function getWeather() {
  const output = document.getElementById("output");
  let city = document.getElementById("city").value.trim();

  if (!city) {
    output.innerHTML = "<p style='color:red;'>Input is empty</p>";
    return;
  }

  try {
    let geoURL =`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;

    let geoResponse = await fetch(geoURL);

    if (!geoResponse.ok) {
      throw new Error('Unable to fetch Geocoding API')
    }

    let geoData = await geoResponse.json();

    if(!geoData.results || geoData.results.length === 0) {
      output.innerHTML = "<p style='color:red;'>There are no results found</p>"
    }

    let latitude = geoData.results[0].latitude;
    let longitude = geoData.results[0].longitude;
    let displayCity = city;
    let weatherURL =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
      `&temperature_unit=fahrenheit&wind_speed_unit=mph`;
    let weatherResponse = await fetch(weatherURL);

    if(!weatherResponse.ok) {
      throw new Error("Unable to fetch Weather API");
    }

    let weatherData = await weatherResponse.json();

    if (!weatherData.current) {
        throw new Error ("Unable to fetch weather data");
      }

    let tempF = weatherData.current.temperature_2m;
    let humidity = weatherData.current.relative_humidity_2m;
    let windMph = weatherData.current.wind_speed_10m;
    let weatherCode = weatherData.current.weather_code;
    let icon = getWeatherIcon(weatherCode);

    output.innerHTML = `
      <h3>📍 ${displayCity}</h3>
      <p>🌡 Temperature: ${tempF} °F</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>💨 Wind: ${windMph} mph</p>
      <p>🌥 Condition: ${icon}</p>
    `;

  } catch (error) {
    output.innerHTML = "<p style='color:red;'>Unable to identify city input</p>";
  }
}