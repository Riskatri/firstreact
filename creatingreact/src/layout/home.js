import React from "react";
import "../userProfile/profile.css";
import mainLogo from "../userProfile/physics.jpg";
import Clock from "../components/clock";

const Home = () => {
  return (
    <div>
      {" "}
      <Clock />
      <div className="img">
        <img src={mainLogo} alt="physics" width="400px" />
        <div className="physics">
          <h1>welcome to fun physics</h1>{" "}
        </div>
      </div>
    </div>
  );
};
export default Home;
