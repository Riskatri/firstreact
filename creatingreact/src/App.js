// import React from "react";
// import "./App.css";
// import Logo from "./userProfile/avatar.js";
// import Profile from "./userProfile/profile.js";
// import Hook from "./components/hook";
// import Handler from "./components/handler";
// import Clock from "./components/clock";
// import "./index";
// // import "./components/about";

// function App() {
//   return (
//     <div className="jam">
//       <Clock />
//       <div className="prof">
//         <Hook />
//         <Logo />
//         <Profile />
//         <p>
//           Students improve their ability to engage in scientific practice when
//           exposed to introductory physics laboratories that encourage agency.
//         </p>
//         <Handler />
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./layout/home";
import Profile from "./userProfile/profile";
import About from "./components/about";
// import Notfound from './components/NotFound';
import Main from "./layout/main";

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
          </Switch>
        </Main>
      </Switch>
    </Router>
  );
};
export default App;
