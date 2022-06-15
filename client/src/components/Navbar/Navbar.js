import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar(props) {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, []);

    return (
        <nav className="navbar">
            <p className="navbar-title"> Your Task List</p>
            <button onClick={props.switchTheme}>
                {props.theme === 'light' ? 'Light' : 'Dark'} Theme
            </button>
            <p className="navbar-timer"> {time.toLocaleTimeString()} </p>
        </nav>
    )
}

export default Navbar;