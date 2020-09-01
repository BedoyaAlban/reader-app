import alanBtn from "@alan-ai/alan-sdk-web";
import React from "react";
import "./App.css";
import logo from "./logo.svg";

const App = () => {
  alanBtn({
    key:
      "b971eb17fb7af4e13158c416974f8c852e956eca572e1d8b807a3e2338fdd0dc/stage",
    rootEl: document.getElementById("alan-btn")
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Hello World!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="alan-btn"></div>
      </header>
    </div>
  );
};

export default App;
