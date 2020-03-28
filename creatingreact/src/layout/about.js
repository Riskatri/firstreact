import React from "react";
import mainLogo from "../userProfile/fisika.jpg";
import "../userProfile/profile.css";

const Home = () => {
  return (
    <div className="blog">
      <div className="container">
        <div className="blog-content">
          <img src={mainLogo} alt="post-1" />
          <div className="blog-title">
            <h5>
              {" "}
              Physics, science that deals with the structure of matter and the
              interactions between the fundamental constituents of the
              observable universe
            </h5>
            <button className="btn"> Scientist</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
