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
            <button> Dark mode </button>
            <label className="switch">
                <input type="checkbox" onChange={props.switchTheme} checked={props.theme === 'dark'}/>
                <span className="slider round"></span>
            </label>
            <p className="navbar-timer"> {time.toString().slice(4, 24)} </p>
        </nav>
    )
}

export default Navbar;