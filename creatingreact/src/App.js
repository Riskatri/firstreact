import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layout/main";
import Register from "./register/register";
import Login from "./register/login";
import GET from "./book/getbook";
import Update from "./book/Updatebooks";
import Post from "./book/Postbooks";
import Home from "./components/clock";
import bookUser from "./book/bookforuser";
import Users from "./book/users";
import Order from "./book/order";
import getOrder from "./book/getorders";
// import Notfound from "./components/notfound";
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
            } else if (token.token.Role === "ADMIN") {
              return (
                <>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/books" component={GET} />
                    <Route path="/post/books" component={Post} />
                    <Route path="/update/books/:id" component={Update} />
                    <Route path="/users" component={Users} />
                    <Route path="/orders/:id" component={getOrder} />
                  </Switch>
                </>
              );
            } else if (token.token.Role === "USER") {
              return (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/get/books" component={bookUser} />
                  <Route path="/orders" component={Order} />
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

// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Main from "./layout/main";
// import Register from "./register/register";
// import Login from "./register/login";
// import GET from "./book/getbook";
// import Update from "./api/Updatebooks";
// import Post from "./api/Postbooks";
// import Admin from "./register/admin";
// import Home from "./components/clock";
// import bookUser from "./book/bookforuser";
// import Users from "./book/users";
// import Order from "./book/order";

// const token = JSON.parse(sessionStorage.getItem("persisted_state_hook:token"));
// const App = props => {
//   return (
//     <Router>
//       <Switch>
//         <Main>
//           <Switch>
//             <Route exact path="/" component={Home} />
//             <Route path="/register" component={Register} />
//             <Route path="/login" component={Login} />
//             <Route path="/admin" component={Admin} />
//             <Route path="/books" component={GET} />
//             <Route path="/post/books" component={Post} />
//             <Route path="/update/books/:id" component={Update} />
//             <Route path="/users" component={Users} />
//             <Route path="/get/books" component={bookUser} />
//             <Route path="/orders" component={Order} />
//           </Switch>
//         </Main>
//       </Switch>
//     </Router>
//   );
// };

// export default App;
