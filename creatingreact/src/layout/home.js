import React from "react";
import mainLogo from "../userProfile/physics.jpg";
import "../userProfile/profile.css";
import Clock from "../components/clock";

const Home = () => {
  return (
    <div>
      {" "}
      <Clock />
      <div className="home">
        <img src={mainLogo} alt="physics" width="400px" />
        <div className="tulis">
          <h1>Welcome to fun physics </h1>{" "}
        </div>
      </div>
    </div>
  );
};
export default Home;
