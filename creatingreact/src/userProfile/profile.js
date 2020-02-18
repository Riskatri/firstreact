import React from "react";
import "./profile.css";

class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Riska Tri Handayani",
      jurusan: "Department of Physics"
    };
  }
  render() {
    return (
      <div className="prof">
        <h3> {this.state.name} </h3>
        <p> {this.state.jurusan}</p>
      </div>
    );
  }
}
export default profile;
