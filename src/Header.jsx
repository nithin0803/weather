import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import "./Header.css";
import Switch from "@mui/material/Switch";

function Header({ cityName,checked,setChecked }) {
    const [input, setinput] = useState(""); //user input

    const search = (e) => {
        cityName(input);
    };
    const toggleChecked = (e) => {
        setChecked((prev) => !prev);
    };

    return (
        <div className="header">
            <h1>Weather Forecast</h1>
            <div className="input">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AddLocationAltOutlinedIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                        id="input-with-sx"
                        label="City"
                        variant="standard"
                        type="text"
                        value={input}
                        onChange={(e) => setinput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                search();
                            }
                        }}
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

                    <Switch checked={checked} onChange={toggleChecked} />
                </Box>
            </div>
        </div>
    );
}

export default Header;
