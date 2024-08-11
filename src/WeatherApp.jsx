import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "81e8be5c39107a9866107f7fbae20f50";
  const dif = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
      console.log(dataClima);
    } catch {
      console.error("Ocurrió el siguiente provlema:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>WeatherApp</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" value={ciudad} onChange={handleCambioCiudad} />

          <button type="submit">Buscar</button>
        </form>

        {dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Tempratura: {parseInt(dataClima.main.temp - dif)} *C </p>
            <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}.png`}
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
};
