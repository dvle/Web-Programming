// Add event listener to button
document.getElementById("weatherBtn").addEventListener("click", getWeather);

// Function to convert weather code to icon
function getWeatherIcon(code) {

  // TODO: Add conditions for weather codes
  // Example:
  // if (code === 0) return "☀️";

  return "🌍"; // default icon
}

async function getWeather() {

  const output = document.getElementById("output");

  // Step 1: Get city input
  let city = document.getElementById("city").value.trim();

  // TODO: Handle empty input
  // If city is empty → show error message

  try {

    // Step 2: Call Geocoding API
    let geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    let geoResponse = await fetch(geoURL);

    // TODO: Check if response is OK

    let geoData = await geoResponse.json();

    // TODO: Check if city exists in response

    // TODO: Extract latitude and longitude
    let latitude = null;
    let longitude = null;
    let displayCity = city;

    // Step 3: Call Weather API
    let weatherURL =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
      `&temperature_unit=fahrenheit&wind_speed_unit=mph`;

    let weatherResponse = await fetch(weatherURL);

    // TODO: Check if response is OK

    let weatherData = await weatherResponse.json();

    // TODO: Extract required data:
    let tempF = null;
    let humidity = null;
    let windMph = null;
    let weatherCode = null;

    // TODO: Get icon using function
    let icon = getWeatherIcon(weatherCode);

    // Step 4: Display output
    output.innerHTML = `
      <h3>📍 ${displayCity}</h3>
      <p>🌡 Temperature: ${tempF} °F</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>💨 Wind: ${windMph} mph</p>
      <p>🌥 Condition: ${icon}</p>
    `;

  } catch (error) {

    // TODO: Show error message
    output.innerHTML = "<p style='color:red;'>Error fetching data</p>";
  }
}