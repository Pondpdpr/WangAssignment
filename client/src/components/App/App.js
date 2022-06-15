// import React, { Component, useEffect } from "react";
// import logo from './logo.svg';
import './App.css';
import React from "react";
import Navbar from "../Navbar/Navbar";
import TaskList from "../TaskList/TaskList";
import useLocalStorage from 'use-local-storage'

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <div className="App" data-theme={theme}>
      <Navbar switchTheme={switchTheme}  theme={theme}/>
      <TaskList />
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
