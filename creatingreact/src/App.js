import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./layout/home";
import Profile from "./userProfile/profile";
import About from "./layout/about";
import Main from "./layout/main";
import Form from "./components/from";
import Register from "./validation/hook";
const App = props => {
  return (
    <Router>
      <Switch>
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/about" component={About} />
            <Route path="/form" component={Form} />
            <Route path="/register" component={Register} />
          </Switch>
        </Main>
      </Switch>
    </Router>
  );
};
export default App;
