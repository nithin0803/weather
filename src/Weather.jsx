import React, { useState, useEffect } from "react";
import { instance, mainAxios } from "./axios";

import Current from "./Current";
import "./Weather.css";
import Day from "./Day";
import Hourly from "./Hourly";
import Header from "./Header";

function Weather() {
    const [city, setcity] = useState(null); //cityName
    const [currTemp, setcurrTemp] = useState({
        // temp: "",
        // cityName: "",
        // icon: "",
        // main: "",
    }); // cuurent temeperature data
    const [weather,setweather]=useState({});
    const [dailyData, setdailyData] = useState([]); //daily temp data
    const [hourlyData, sethourlyData] = useState([]); // hourly temp data
    const [direction, setdirection] = useState({});
    const [checked, setChecked] = useState(false); //theme data
    const [temp, setTemp] = useState();
    const [tempname, setTempname] = useState(null);
    const [tempnamediv, setTempnamediv] = useState(null);
    const [location, setLocation] = useState(null);
    

    const API__KEY = "7c771de18ac3230c0a8a4ed6340bfa73";
    //const API__KEY1 = "080aeac5d59dd216460bb96cf19b628e";

    useEffect(() => {
        async function fetchDirections() {
            if (city) {
                const fetchCoordinates = `direct?q=${city}&limit=2&appid=${API__KEY}`;
                try {
                    const coordinates = await mainAxios.get(fetchCoordinates);
                    setdirection({
                        latitude: coordinates.data[0].lat,
                        longitude: coordinates.data[0].lon,
                    });
                    setcity(coordinates.data[0].name);
                } catch (error) {
                    alert("Enter the correct city name");
                    setcity(null);
                }
            }
        }
        fetchDirections();
    }, [city]);

    useEffect(() => {
        async function fetchData(position) {
            const { latitude, longitude } = position.coords;
            if (location === null) {
                setLocation({
                    latitude,
                    longitude,
                });
            }

            if (location !== null) {
                const fetchUrl = `onecall?lat=${
                    city ? direction.latitude : location.latitude
                }&lon=${
                    city ? direction.longitude : location.longitude
                }&exclude=minutely&units=metric&appid=${API__KEY}`;

                const request = await instance.get(fetchUrl);
                setweather((prevstate) => {
                    return {
                        ...prevstate,
                        
                        icon: request.data.current.weather[0].icon,
                        description: request.data.current.weather[0].description,
                    };
                });
                setcurrTemp(request.data.current);
                setTemp(request.data.current.temp);
                console.log(request);
                setdailyData(request.data.daily);
                sethourlyData(request.data.hourly);
                if (temp <= 23) {
                    setTempname("thunder");
                    setTempnamediv("thunderdiv")
                } else if (temp <= 30) {
                    setTempname("cloudy");
                    setTempnamediv("cloudydiv")
                } else if (temp > 30) {
                    setTempname("hot");
                    setTempnamediv("hotdiv")
                }
                console.log(request)
                return () => request;
            }
        }
        navigator.geolocation.getCurrentPosition(fetchData);

        //fetchData();
    }, [city, location, temp]);

    console.log(weather);

    console.log(city);
    return (
        <div
            className={`weather && ${
                checked ? "weather__dark" : tempname
            }`}
        >
            <Header
                cityName={setcity}
                checked={checked}
                setChecked={setChecked}
            />
            <div className="impData">
                <Current city={city} data={currTemp} tempname={tempname} weather={weather} checked={checked} tempnamediv={tempnamediv}/>
                <div className="dandh">
                    <div className={`daily && ${checked ? "daily__dark" : tempnamediv}`}>
                        <h2>Daily Forecast</h2>
                        {dailyData.map((daily) => (
                            <Day
                                data={daily}
                                checked={checked}
                                key={daily.dt}
                            />
                        ))}
                    </div>
                    <div className={`hourly && ${checked ? "hourly__dark" : tempnamediv}`} id="next">
                        {hourlyData.map((hourly) => (
                            <Hourly
                                data={hourly}
                                checked={checked}
                                key={hourly.dt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        // <div
        //     id="parallax"
        //     className={`container && ${checked ? "main__dark" : "main__light"}`}
        // >
        //     <FormGroup>
        //         <FormControlLabel
        //             className="switch__theme"
        //             control={
        //                 <Switch checked={checked} onChange={toggleChecked} />
        //             }
        //         />
        //     </FormGroup>
        //     <div
        //         className={`weather && ${
        //             checked ? "weather__dark" : "weather__light"
        //         }`}
        //     >
        //         <div className="forms">
        //             <FormControl className="app__formcontrol">
        //                 <InputLabel>City name</InputLabel>
        //                 <Input
        //                     id="user__input"
        //                     className="form__input"
        //                     type="text"
        //                     value={input}
        //                     onChange={(e) => setinput(e.target.value)}
        //                     onKeyPress={(e) => {
        //                         if (e.key === "Enter") {
        //                             search();
        //                         }
        //                     }}
        //                     aria-describedby="my-helper-text"
        //                 />
        //                 <IconButton
        //                     id="search__btn"
        //                     className="form__button"
        //                     variant="contained"
        //                     color="primary"
        //                     disabled={!input}
        //                     type="submit"
        //                     onClick={search}
        //                 >
        //                     <SearchIcon />
        //                 </IconButton>
        //             </FormControl>
        //         </div>

        //         <div className="daily">
        //             {dailyData.map((daily) => (
        //                 <Day data={daily} checked={checked} key={daily.dt} />
        //             ))}
        //         </div>
        //         <div className="hourly" id="next">
        //             <button className="left__button" onClick={prev}>
        //                 <ArrowLeftIcon />
        //             </button>
        //             {hourlyData.map((hourly) => (
        //                 <Hourly
        //                     data={hourly}
        //                     checked={checked}
        //                     key={hourly.dt}
        //                 />
        //             ))}
        //             <button className="right__button" onClick={next}>
        //                 <ArrowRightIcon />
        //             </button>
        //         </div>
        //     </div>
        //     <Right data={currTemp} checked={checked} />
        // </div>
    );
}

export default Weather;
