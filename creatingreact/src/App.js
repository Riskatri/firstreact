import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layout/main";
import Register from "./artikel/register";
import Login from "./artikel/login";
import Home from "./layout/home";
import Users from "./artikel/user";
import Notfound from "./components/notfound";
import Artikel from "./artikel/artikel";
import PostArtikel from "./artikel/postartikel";
import Artikelforuser from "./artikel/artikelforuser";
import Listartikeluser from "./artikel/listartikelbyuserid";
import PostComment from "./artikel/postcomment";
import Articleguess from "./artikel/artikelforguess";
import ShowComment from "./artikel/showcomments";
import CommentAdmin from "./artikel/showcommentsforadmin";
import Ambilartikel from "./artikel/artikelID";
import Listartikel from "./artikel/listartikel";
import Artikel2 from "./artikel/artikel2";
import Homeuseradmin from "./artikel/homeuseradmin";

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
                  <Route path="/guess/articles" component={Articleguess} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                </Switch>
              );
            } else if (token.token.admin === true) {
              return (
                <>
                  <Switch>
                    <Route exact path="/" component={Homeuseradmin} />
                    <Route path="/users" component={Users} />

                    <Route path="/articles" component={Artikel} />
                    <Route path="/post/articles/:id" component={PostArtikel} />

                    <Route path="/list/articles" component={Listartikel} />
                    <Route path="/get/comments/:id" component={CommentAdmin} />
                    <Route
                      path="/ambil/articles/:id"
                      component={Ambilartikel}
                    />
                    <Route
                      path="/post/comments/:id/:id"
                      component={PostComment}
                    />
                    <Route path="/get/articles/2" component={Artikel2} />
                    <Route component={Notfound} />
                  </Switch>
                </>
              );
            } else if (token.token.admin === false) {
              return (
                <Switch>
                  <Route exact path="/" component={Homeuseradmin} />
                  <Route path="/articles" component={Artikelforuser} />
                  <Route path="/post/articles/:id" component={PostArtikel} />
                  <Route path="/get/articles/:id" component={Listartikeluser} />
                  <Route path="/ambil/articles/:id" component={Ambilartikel} />
                  <Route
                    path="/post/comments/:id/:id"
                    component={PostComment}
                  />
                  <Route path="/comments/:id" component={ShowComment} />
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
