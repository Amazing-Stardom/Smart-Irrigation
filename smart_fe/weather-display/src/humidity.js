// import React, { useEffect, useRef } from "react";
// import JustGage from "justgage";
// import "raphael";
// import "./App.css";

// const Gauge = ({ id, title, min, max }) => {
//   const gaugeRef = useRef(null);

//   useEffect(() => {
//     if (!gaugeRef.current) {
//       gaugeRef.current = new JustGage({
//         id,
//         value: 0,
//         min,
//         max,
//         title,
//       });
//     }

//     const updateGauge = () => {
//       const value = Math.random() * (max - min) + min;
//       gaugeRef.current.refresh(value);
//     };

//     const intervalId = setInterval(updateGauge, 5000);

//     return () => clearInterval(intervalId);
//   }, [id, min, max, title]);

//   return <div id={id} className="gauge"></div>;
// };

// function App() {
//   return (
//     <div className="App">
//       <h1 className="heading">Environmental Data Dashboard</h1>
//       <div className="gauge-container">
//         <div className="gauge">
//           <h2>Temperature Level</h2>
//           <Gauge
//             id="temperature-gauge"
//             title="Temperature (°C)"
//             min={-20}
//             max={50}
//           />
//         </div>
//         <div className="gauge">
//           <h2>Humidity Level</h2>
//           <Gauge id="humidity-gauge" title="Humidity (%)" min={0} max={100} />
//         </div>
//         <div className="gauge">
//           <h2>Soil Moisture Level</h2>
//           <Gauge id="moisture-gauge" title="Moisture (%)" min={0} max={100} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useRef, useState } from "react";
// import JustGage from "justgage";
// import "raphael";
// import "./App.css";

// const Gauge = ({ id, title, data }) => {
//   const gaugeRef = useRef(null);

//   useEffect(() => {
//     if (!gaugeRef.current) {
//       gaugeRef.current = new JustGage({
//         id,
//         value: data.value || 0, // Use the value from the data prop
//         min: data.min || 0, // Default to 0 if not provided
//         max: data.max || 100, // Default to 100 if not provided
//         title,
//       });
//     }

//     // Update the gauge whenever the data prop changes
//     const updateGauge = () => {
//       if (data && data.value !== undefined) {
//         gaugeRef.current.refresh(data.value);
//       }
//     };

//     updateGauge();
//   }, [id, title, data]);

//   return <div id={id} className="gauge"></div>;
// };

// function App() {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://192.168.90.191/");
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <h1 className="heading">Environmental Data Dashboard</h1>
//       <div className="gauge-container">
//         <div className="gauge">
//           <h2>Temperature Level</h2>
//           <Gauge
//             id="temperature-gauge"
//             title="Temperature (°C)"
//             data={
//               data.temperature
//                 ? { value: data.temperature, min: -20, max: 50 }
//                 : {}
//             }
//           />
//         </div>
//         <div className="gauge">
//           <h2>Humidity Level</h2>
//           <Gauge
//             id="humidity-gauge"
//             title="Humidity (%)"
//             data={
//               data.humidity ? { value: data.humidity, min: 0, max: 100 } : {}
//             }
//           />
//         </div>
//         <div className="gauge">
//           <h2>Soil Moisture Level</h2>
//           <Gauge
//             id="moisture-gauge"
//             title="Moisture (%)"
//             data={data.moister ? { value: data.moister, min: 0, max: 100 } : {}}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState, useRef } from "react";
// import JustGage from "justgage";
// import "raphael";
// import "./App.css";

// const Gauge = ({ id, title, data }) => {
//   const gaugeRef = useRef(null);

//   useEffect(() => {
//     if (!gaugeRef.current) {
//       gaugeRef.current = new JustGage({
//         id,
//         value: data.value || 0,
//         min: data.min || 0,
//         max: data.max || 100,
//         title,
//       });
//     }

//     const updateGauge = () => {
//       if (data && data.value !== undefined) {
//         gaugeRef.current.refresh(data.value);
//       }
//     };

//     updateGauge();
//   }, [id, title, data]);

//   return <div id={id} className="gauge"></div>;
// };

// function App() {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/proxy?path=/");
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <h1 className="heading">Environmental Data Dashboard</h1>
//       <div className="gauge-container">
//         <div className="gauge">
//           <h2>Temperature Level</h2>
//           <Gauge
//             id="temperature-gauge"
//             title="Temperature (°C)"
//             data={
//               data.temperature
//                 ? { value: data.temperature, min: -20, max: 50 }
//                 : {}
//             }
//           />
//         </div>
//         <div className="gauge">
//           <h2>Humidity Level</h2>
//           <Gauge
//             id="humidity-gauge"
//             title="Humidity (%)"
//             data={
//               data.humidity ? { value: data.humidity, min: 0, max: 100 } : {}
//             }
//           />
//         </div>
//         <div className="gauge">
//           <h2>Soil Moisture Level</h2>
//           <Gauge
//             id="moisture-gauge"
//             title="Moisture (%)"
//             data={data.moister ? { value: data.moister, min: 0, max: 100 } : {}}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useRef } from "react";
// import JustGage from "justgage";
// import "raphael";
// import "./App.css";

// const Gauge = ({ id, title, min, max }) => {
//   const gaugeRef = useRef(null);

//   useEffect(() => {
//     // Ensure that the gauge is only initialized once
//     if (!gaugeRef.current) {
//       gaugeRef.current = new JustGage({
//         id,
//         value: 0,
//         min,
//         max,
//         title,
//       });
//     }

//     const updateGauge = () => {
//       const value = Math.random() * (max - min) + min;
//       gaugeRef.current.refresh(value);
//     };

//     const intervalId = setInterval(updateGauge, 5000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [id, min, max, title]);

//   return <div id={id} className="gauge"></div>;
// };

// function App() {
//   return (
//     <div className="App">
//       <h1>Environmental Data Dashboard</h1>
//       <div className="gauge-container">
//         <div className="gauge">
//           <h2>Temperature Level</h2>
//           <Gauge
//             id="temperature-gauge"
//             title="Temperature (°C)"
//             min={-20}
//             max={50}
//           />
//         </div>
//         <div className="gauge">
//           <h2>Soil Moisture Level</h2>
//           <Gauge id="moisture-gauge" title="Moisture (%)" min={0} max={100} />
//         </div>
//         <div className="gauge">
//           <h2>Humidity Level</h2>
//           <Gauge id="humidity-gauge" title="Humidity (%)" min={0} max={100} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useRef } from "react";
// import JustGage from "justgage";
// import "raphael";
// import "./App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faThermometerHalf,
//   faTint,
//   faWater,
//   faCloudRain,
// } from "@fortawesome/free-solid-svg-icons";

// const Gauge = ({ id, title, min, max, icon }) => {
//   const gaugeRef = useRef(null);

//   useEffect(() => {
//     // Ensure that the gauge is only initialized once
//     if (!gaugeRef.current) {
//       gaugeRef.current = new JustGage({
//         id,
//         value: 0,
//         min,
//         max,
//         title,
//       });
//     }

//     const updateGauge = () => {
//       const value = Math.random() * (max - min) + min;
//       gaugeRef.current.refresh(value);
//     };

//     const intervalId = setInterval(updateGauge, 5000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [id, min, max, title]);

//   return (
//     <div className="gauge">
//       <div className="gauge-title">
//         <FontAwesomeIcon icon={icon} className="icon" />
//         <span>{title}</span>
//       </div>
//       <div id={id} className="gauge"></div>
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className="App">
//       <h1 className="heading">Environmental Data Dashboard</h1>
//       <div className="gauge-container">
//         <Gauge
//           id="temperature-gauge"
//           title="Temperature (°C)"
//           min={-20}
//           max={50}
//           icon={faThermometerHalf}
//         />
//         <Gauge
//           id="moisture-gauge"
//           title="Moisture (%)"
//           min={0}
//           max={100}
//           icon={faTint}
//         />
//         <Gauge
//           id="humidity-gauge"
//           title="Humidity (%)"
//           min={0}
//           max={100}
//           icon={faWater}
//         />
//         <Gauge
//           id="rain-gauge"
//           title="Rainfall (mm)"
//           min={0}
//           max={200}
//           icon={faCloudRain}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useRef, useState } from "react";
import JustGage from "justgage";
import "raphael";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faTint,
  faWater,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";

const Gauge = ({ id, title, min, max, icon, value }) => {
  const gaugeRef = useRef(null);

  useEffect(() => {
    // Initialize the gauge
    if (!gaugeRef.current) {
      gaugeRef.current = new JustGage({
        id,
        value: value || 0,
        min,
        max,
        title,
      });
    } else {
      gaugeRef.current.refresh(value);
    }
  }, [id, min, max, title, value]);

  return (
    <div className="gauge">
      <div className="gauge-title">
        <FontAwesomeIcon icon={icon} className="icon" />
        <span>{title}</span>
      </div>
      <div id={id} className="gauge"></div>
    </div>
  );
};

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    humidity: 0,
    rain: 0,
    moisture: 0,
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/weather-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const weather = data[0]; // Assuming the response is an array with one element
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="App">
      <h1 className="heading">Environmental Data Dashboard</h1>
      <div className="gauge-container">
        <Gauge
          id="temperature-gauge"
          title="Temperature (°C)"
          min={-20}
          max={50}
          icon={faThermometerHalf}
          value={weatherData.temperature}
        />
        <Gauge
          id="moisture-gauge"
          title="Moisture (%)"
          min={0}
          max={100}
          icon={faTint}
          value={weatherData.moisture}
        />
        <Gauge
          id="humidity-gauge"
          title="Humidity (%)"
          min={0}
          max={100}
          icon={faWater}
          value={weatherData.humidity}
        />
        <Gauge
          id="rain-gauge"
          title="Rainfall (mm)"
          min={0}
          max={200}
          icon={faCloudRain}
          value={weatherData.rain}
        />
      </div>
    </div>
  );
}

export default App;
