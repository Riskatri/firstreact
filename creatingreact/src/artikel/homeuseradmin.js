import React from "react";
import "../userProfile/profile.css";
import About from "../layout/about";

const Home = () => {
  return (
    <section className="site-title">
      <div className="site-background">
        <h3> Fun Physics</h3>
        <h1> Amazing Physics in the World</h1>
        <About />
      </div>
    </section>
  );
};
export default Home;
