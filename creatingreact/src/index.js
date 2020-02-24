import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Counters from "./components/counter";
import SearchForm from "./components/searchform";
import Repos from "./components/repos";

function App() {
  return (
    <div className="App">
      <h1>Search GitHub Repos</h1>
      <SearchForm />
      <Counters />
      <Repos />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
