async function APIfetch() {
    try {

    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    const apiKey = "25ae8ad5ba384384be2a28510092f7cb";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".weather-data").innerHTML = `
        <div class = "weather-header">
        <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        </div>
        
        <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

