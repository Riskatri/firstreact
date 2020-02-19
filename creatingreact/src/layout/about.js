import React from "react";
class About extends React.Component {
  render = () => (
    <div className="container mt-2">
      <h1>Fun Physics</h1>
      <ul>
        <li>
          <a href="https://en.wikipedia.org/wiki/Physicist">
            {" "}
            Physics Scientist
          </a>
        </li>
      </ul>
    </div>
  );
}
export default About;
