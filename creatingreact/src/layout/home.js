import React from "react";
import "../userProfile/profile.css";
import About from "./about";
import Register from "../artikel/register";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="site-title">
      {" "}
      <Register />
      <section className="site-title">
        <div className="site-background">
          <h3> Fun Physics</h3>
          <h1> Amazing Physics in the World</h1>
          <About />
          <h3> or</h3>
          <Link to="/login">
            <button className="btn"> Login</button>
          </Link>
          <Link to="/register">
            <button className="btn"> Register</button>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;
