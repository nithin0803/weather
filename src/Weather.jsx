import React, { useState, useEffect } from "react";
import { instance, mainAxios } from "./axios";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import Right from "./Right";
import "./Weather.css";
import Day from "./Day";
import Hourly from "./Hourly";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function Weather() {
    const [input, setinput] = useState(""); //user input
    const [city, setcity] = useState("delhi"); //cityName
    const [currTemp, setcurrTemp] = useState({
        temp: "",
        cityName: "",
        icon: "",
        main: "",
    }); // cuurent temeperature data
    const [dailyData, setdailyData] = useState([]); //daily temp data
    const [hourlyData, sethourlyData] = useState([]); // hourly temp data
    const [direction, setdirection] = useState({});
    const [checked, setChecked] = useState(false); //theme data
    const hourlyNext = document.getElementById("next");
    
    const API__KEY = "7c771de18ac3230c0a8a4ed6340bfa73";
    
    
    useEffect(() => {
        async function fetchDirections() {
            const fetchCoordinates = `direct?q=${city}&limit=2&appid=${API__KEY}`;
            console.log("direction")
            const coordinates = await mainAxios.get(fetchCoordinates);
            setdirection({
                latitude: coordinates.data[0].lat,
                longitude: coordinates.data[0].lon,
            });
            setcity(coordinates.data[0].name);
        }
        fetchDirections();
    }, [city]);

    useEffect(() => {
        async function fetchData() {
            const fetchUrl = `onecall?lat=${
                direction.latitude 
            }&lon=${
                direction.longitude 
            }&exclude=minutely&units=metric&appid=${API__KEY}`;

            
                const request = await instance.get(fetchUrl);
                setcurrTemp((prevstate) => {
                    return {
                        ...prevstate,
                        temp: request.data.current.temp,
                        cityName: city,
                        icon: request.data.current.weather[0].icon,
                        main: request.data.current.weather[0].main,
                    };
                });
                console.log("main");
                setdailyData(request.data.daily);
                sethourlyData(request.data.hourly);
                return () => request;
                
            

        }
        fetchData();
    }, [city]);

    const search = (e) => {
        setcity(input);
    };

    const next = () => {
        hourlyNext.scrollLeft += 100;
    };
    const prev = () => {
        hourlyNext.scrollLeft -= 100;
    };

    const toggleChecked = (e) => {
        setChecked((prev) => !prev);
    };


    return (
        <div id="parallax"
            className={`container && ${checked ? "main__dark" : "main__light"}`}
        >
            <FormGroup>
                <FormControlLabel
                    className="switch__theme"
                    control={
                        <Switch checked={checked} onChange={toggleChecked} />
                    }
                />
            </FormGroup>
            <div
                className={`weather && ${
                    checked ? "weather__dark" : "weather__light"
                }`}
            >
                <div className="forms">
                    <FormControl className="app__formcontrol">
                        <InputLabel>City name</InputLabel>
                        <Input
                            id="user__input"
                            className="form__input"
                            type="text"
                            value={input}
                            onChange={(e) => setinput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    search();
                                }
                            }}
                            aria-describedby="my-helper-text"
                        />
                        <IconButton
                            id="search__btn"
                            className="form__button"
                            variant="contained"
                            color="primary"
                            disabled={!input}
                            type="submit"
                            onClick={search}
                        >
                            <SearchIcon />
                        </IconButton>
                    </FormControl>
                </div>

                <div className="daily">
                    {dailyData.map((daily) => (
                        <Day data={daily} checked={checked} key={daily.dt} />
                    ))}
                </div>
                <div className="hourly" id="next">
                    <button className="left__button" onClick={prev}>
                        <ArrowLeftIcon />
                    </button>
                    {hourlyData.map((hourly) => (
                        <Hourly
                            data={hourly}
                            checked={checked}
                            key={hourly.dt}
                        />
                    ))}
                    <button className="right__button" onClick={next}>
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
            <Right data={currTemp} checked={checked} />
            
        </div>
    );
}

export default Weather;
