import React from "react";

function Day({ data,checked }) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(data.dt * 1000);
    const n = date.getDay();
    return (
        <div className={`daily__card && ${(checked? "daily__card__dark":"daily__card__light")}` }>
            <img
                className="daily__img"
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt=""
            />
            <div>
                {days[n]}-{data.weather[0].main}
            </div>

            <div className="day__night">
                {data.temp.day}<span>&#176;</span>/{data.temp.night}<span>&#176;</span>
            </div>
        </div>
    );
}

export default Day;
