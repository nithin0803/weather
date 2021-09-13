import React from "react";
import "./Weather.css";

function Right({ data , checked }) {
    
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date = new Date().toLocaleDateString("en-US", options)
    
    return (
        <div className={`right && ${checked ? "right__dark" : "right__light"}`}>
            <div className="current__temp">
                {data.temp} <span>&#176;</span>
            </div>
            <div className="place">
                <div id="current__city">{data.cityName}</div>
                <div className="current__date">{date}</div>
            </div>
            <div className="current__weather">
                <img
                    className="current__img"
                    src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                    alt=""
                />
                <div className="current__main">{data.main}</div>
            </div>
        </div>
    );
}

export default Right;
