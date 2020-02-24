import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Counters from "./components/counter";
// import SearchForm from "./components/searchform";
// import Repos from "./components/repos";
import Register from "./register/register";

function App() {
  return (
    <div className="App">
      <h1>Register</h1>
      {/* <SearchForm />
      <Counters />
      <Repos /> */}
      <Register />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
