import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/update-sensor")
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      {weatherData ? (
        <div>
          <h1>Weather Data</h1>
          <p>Temperature: {weatherData.temperature}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Rain: {weatherData.rain}</p>
          <p>Moisture: {weatherData.moisture}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
