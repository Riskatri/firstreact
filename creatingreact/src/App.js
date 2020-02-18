import React from "react";
import "./App.css";
import Logo from "./userProfile/avatar.js";
import Profile from "./userProfile/profile.js";
import Hook from "./components/hook";

function App() {
  return (
    <div className="prof">
      <Hook />
      <Logo />
      <Profile />
      <p>
        Students improve their ability to engage in scientific practice when
        exposed to introductory physics laboratories that encourage agency.
      </p>
    </div>
  );
}

export default App;
