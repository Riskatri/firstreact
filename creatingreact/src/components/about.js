import React from "react";

class About extends React.Component {
  render = () => (
    <div className="container mt-2">
      <h4> {this.props.match.params.number}</h4>
      <h4>About pages with param number</h4>
    </div>
  );
}
export default About;
