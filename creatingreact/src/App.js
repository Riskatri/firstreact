import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layout/main";
import Register from "./artikel/register";
import Login from "./artikel/login";
import Home from "./layout/home";
import Users from "./artikel/user";
import Notfound from "./components/notfound";
import updateUser from "./artikel/edituser";
import Artikel from "./artikel/artikel";
import PostArtikel from "./artikel/postartikel";

const token = JSON.parse(sessionStorage.getItem("persisted_state_hook:token"));
const App = props => {
  return (
    <Router>
      <Switch>
        <Main>
          {(() => {
            if (!token) {
              return (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                </Switch>
              );
            } else if (token.token.admin === true) {
              return (
                <>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Route path="/update/users/:id" component={updateUser} />
                    <Route path="/articles" component={Artikel} />
                    <Route path="/post/articles/:id" component={PostArtikel} />
                    <Route component={Notfound} />
                  </Switch>
                </>
              );
            } else if (token.token.admin === false) {
              return (
                <Switch>
                  <Route exact path="/" component={Home} />
                  {/* <Route path="/get/articles" component={bookUser} /> */}
                  {/* <Route path="/orders" component={Orderan} /> */}
                  <Route component={Notfound} />
                </Switch>
              );
            }
          })()}
        </Main>
      </Switch>
    </Router>
  );
};

export default App;
