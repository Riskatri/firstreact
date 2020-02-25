import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layout/main";

import Register from "./register/register";
import Login from "./register/login";
import ID from "./api/getid";
import GET from "./api/book";
import Update from "./api/Updatebooks";
import Post from "./api/Postbooks";
import Admin from "./register/admin";
const App = props => {
  return (
    <Router>
      <Switch>
        <Main>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/books" component={GET} />
            <Route path="/get/books/:id" component={ID} />
            <Route path="/post/books" component={Post} />
            <Route path="/update/books/:id" component={Update} />
            {/* <Route path="/delete/books/:id" component={Delete} /> */}
          </Switch>
        </Main>
      </Switch>
    </Router>
  );
};
export default App;
