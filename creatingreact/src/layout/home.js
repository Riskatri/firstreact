import React from "react";
import mainLogo from "../userProfile/eintein.jpeg";
import "../userProfile/profile.css";
import Clock from "../components/clock";
import { Link } from "react-router-dom";

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
      <div class="flex-row">
        <Link to="/login">
          <button class="btn-primary mr-4">LOGIN</button>
        </Link>
        <Link to="/register">
          <button class="btn-danger">REGISTER</button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
