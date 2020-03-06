import React from "react";
import mainLogo from "../userProfile/eintein.jpeg";
import "../userProfile/profile.css";
import Clock from "../components/clock";

const Home = () => {
  return (
    <div className="blog">
      <img
        src={mainLogo}
        className="rounded-circle "
        alt="physics"
        width="400px"
      />

      <Clock />
      <h1>
        <i bg-secondary> Welcome to fun physics </i>
      </h1>
      <p> You can create and read article about physics</p>
    </div>
  );
};
export default Home;
