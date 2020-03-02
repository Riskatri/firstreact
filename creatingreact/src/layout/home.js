import React from "react";
import mainLogo from "../userProfile/eintein.jpeg";
import "../userProfile/profile.css";
import Clock from "../components/clock";

const Home = () => {
  return (
    <div>
      <img src={mainLogo} class="rounded-circle" alt="physics" width="400px" />
      <div className="home">
        <Clock />
        <h1>
          <i> Welcome to fun physics </i>
        </h1>
        <p> You can create and read article about physics</p>
      </div>
    </div>
  );
};
export default Home;
