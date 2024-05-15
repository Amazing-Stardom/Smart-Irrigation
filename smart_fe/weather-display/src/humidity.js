import React, { useEffect, useRef } from "react";
import JustGage from "justgage";
import "raphael";
import "./App.css";

const Gauge = ({ id, title, min, max }) => {
  const gaugeRef = useRef(null);

  useEffect(() => {
    if (!gaugeRef.current) {
      gaugeRef.current = new JustGage({
        id,
        value: 0,
        min,
        max,
        title,
      });
    }

    const updateGauge = () => {
      const value = Math.random() * (max - min) + min;
      gaugeRef.current.refresh(value);
    };

    const intervalId = setInterval(updateGauge, 5000);

    return () => clearInterval(intervalId);
  }, [id, min, max, title]);

  return <div id={id} className="gauge"></div>;
};

function App() {
  return (
    <div className="App">
      <h1 className="heading">Environmental Data Dashboard</h1>
      <div className="gauge-container">
        <div className="gauge">
          <h2>Temperature Level</h2>
          <Gauge
            id="temperature-gauge"
            title="Temperature (°C)"
            min={-20}
            max={50}
          />
        </div>
        <div className="gauge">
          <h2>Humidity Level</h2>
          <Gauge id="humidity-gauge" title="Humidity (%)" min={0} max={100} />
        </div>
        <div className="gauge">
          <h2>Soil Moisture Level</h2>
          <Gauge id="moisture-gauge" title="Moisture (%)" min={0} max={100} />
        </div>
      </div>
    </div>
  );
}

export default App;
