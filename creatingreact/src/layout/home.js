import React from "react";
import "../userProfile/profile.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="site-title">
      <div className="site-background">
        <h3> Fun Physics</h3>
        <h1> Amazing Physics in the World</h1>

        <Link to="/login">
          <button className="btn"> Login</button>
        </Link>
        <Link to="/register">
          <button className="btn"> Register</button>
        </Link>
      </div>
    </section>
  );
};
export default Home;
