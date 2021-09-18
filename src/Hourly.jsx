import React from "react";
import "./Weather.css";

function Hourly({ data,checked }) {
    const date = new Date(data.dt * 1000);
    const hour = date.getHours();

    return (




        <div className={`hourly__ele && ${(checked? "hourly__ele__dark":"hourly__ele__light")}` }>
            <div className="hourly__time">{hour}:00</div>
            <div className="hourly__temp">{data.temp}<span>&#176;</span>C</div>
            <img
                className="hourly__img"
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={`${data.weather[0].main}`}
            />
        </div>
    );
}

export default Hourly;
