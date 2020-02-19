import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./layout/home";
import Profile from "./userProfile/profile";
import About from "./components/about";
// import Notfound from './components/NotFound';
import Main from "./layout/main";
import Index from "./index";

const App = props => {
  return (
    <div>
      <Index />
    </div>
  );
};
export default App;
