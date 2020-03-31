import React from "react";
import { Col } from "reactstrap";
import Navigation from "../layout/navigation";
import {
  IoMdReturnRight,
  IoLogoYoutube,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoPinterest
} from "react-icons/io";
import mainLogo from "../userProfile/1.jpeg";

import mainLogo6 from "../userProfile/6.jpeg";

const Main = props => {
  return (
    <>
      <Navigation />
      <Col>{props.children}</Col>
      <footer className="footer">
        <div className="container">
          <div className="about-us">
            <h2> About us</h2>
            <p>
              Fun physics is a web to understand physics phenomenon, knowledge
              about scientist and discuss anything about physics
            </p>
          </div>
          <div className="newsletter">
            <h2> Newsletter</h2>
            <p>Stay update with our latest</p>
            <div className="form-element">
              <input type="text" placeholder="Email" />
              <span>
                <IoMdReturnRight />
              </span>
            </div>
          </div>
          <div className="instagram">
            <h2> Instagram </h2>
            <div className="flex-row">
              <img src={mainLogo} alt="1" />
              <img src={mainLogo6} alt="6" />
            </div>
          </div>

          <div className="follow">
            <h2> Follow us</h2>
            <div>
              <p> Let us be social </p>
              <i>
                <span>
                  <IoLogoYoutube />
                  <IoLogoTwitter />
                  <IoLogoFacebook />
                  <IoLogoPinterest />
                </span>
              </i>
            </div>
          </div>
        </div>

        <div className="text-center text-white">
          copyright &copy; All Right Reserved by Riska
        </div>
      </footer>
    </>
    // </div>
  );
};
export default Main;
