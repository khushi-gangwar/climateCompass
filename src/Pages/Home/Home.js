import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import bgQuiz from "../../images/bgQuiz.jpg";
import PlaceIcon from "@mui/icons-material/Place";
import Switch from "@mui/material/Switch";

const Home = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");
  const [temp, setTemp] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a23d4467ddeb3cd6ebee946944c829be&units=metric`;
      const response = await fetch(url);

      const resJson = await response.json();
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);

  const tempHandler = () => {

    setTemp(!temp);
  };
 
  return (
    <div
    
      style={{
        backgroundImage: `url(${bgQuiz})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "50em",
        margin: "0",
        padding: "0",
      }}
    >
      <h1>ClimateCompass</h1>
      <div className=" d-grid gap-2 col-6 mx-auto">
        <input
          className="form-control input-search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setSearch(e.target.value.toUpperCase());
          }}
        />

  
        <div className="card">
          {!city ? (
            <p>Write appropriate location to know weather.</p>
          ) : (
            <div className="info" id="main">
              <div className="p-auto first">
                {" "}
                <div className="location_div">
                  <span className="my-auto">
                    <PlaceIcon />
                  </span>
                  <h2 className="location my-auto">{search}</h2>
                 
                </div>
                {!temp ?(   <span className="temperature mx-5">{city.temp}°C</span>) :  <span className="temperature mx-5">{city.temp *1.8 +32}°F</span> }
             

                <Switch size="small" onClick={tempHandler} />
                <div className="info_div ">
                  <div className="temp_min ">Min: {city.temp_min}°C</div>
                  <div className="temp_max ">Max: {city.temp_max}°C</div>
                  <div className="humidity ">Humidity: {city.humidity}%</div>
                </div>
              </div>
              <div className="second">
              {`${city.humidity}` > 60 && (
                <iframe
                  src="https://giphy.com/embed/3oKIPstwMF15FghbYQ"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  class="giphy-embed"
                  allowFullScreen
                ></iframe>
              )}

              {`${city.humidity}` < 60 && (
                <iframe
                  src="https://giphy.com/embed/wNipYAoZ3iaEE"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  class="giphy-embed"
                  allowFullScreen
                ></iframe>
              )}
              </div>
           
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
