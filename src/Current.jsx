import React from "react";
import "./Current.css";

function Current({city,data,tempname,weather,checked,tempnamediv }) {
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date = new Date().toLocaleDateString("en-US", options);
    const sunrise = new Date(data.sunrise * 1000);
    const sunrisetime=sunrise.toLocaleTimeString();
    const sunset = new Date(data.sunset * 1000);
    const sunsettime=sunset.toLocaleTimeString();
    
    return (
        <div className={`current && ${
            checked ? "current__dark" : tempnamediv
        }&& mobilediv`}>
            <div className="timeandplace">
                <div id="place">{city}</div>
                <div id="time">{date}</div>
            </div>
            <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt=""
            />
            <div className="temp">
                <div id="curr__temp">
                    {data.temp}
                    <span>&#176;</span>
                </div>
                <div id="main">{weather.description}</div>
            </div>
            <div className="other__data">
                <h3>Humidity : {data.humidity}% </h3>
                <h3>Pressure : {data.pressure} </h3>
                <h3>Wind Speed : {data.wind_speed} km/h</h3>
            </div>
            <div className="sun__time">
                <h3>Sunrise : {sunrisetime}</h3>
                <h3>Sunset : {sunsettime}</h3>
            </div>

            
        </div>
    );
}

export default Current;
