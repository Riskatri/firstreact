import React from "react";
import mainLogo from "../userProfile/physics.jpg";
import "../userProfile/profile.css";
import Clock from "../components/clock";

const Home = () => {
  return (
    <div>
      <Clock />
      <div className="home">
        <img
          src={mainLogo}
          class="rounded-circle"
          alt="physics"
          width="400px"
        />
        <div className="tulis">
          <h1>
            <i> Welcome to fun physics </i>
          </h1>
          <p> You can create and read article about physics</p>
        </div>
      </div>
    </div>
  );
};
export default Home;
