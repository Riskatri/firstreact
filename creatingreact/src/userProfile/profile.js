import React from "react";
import Ava from "./avatar";
import Bio from "./bio";

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
        <Ava />
        <h3> {this.state.name} </h3>
        <p> {this.state.jurusan}</p>
        <Bio />
      </div>
    );
  }
}
export default profile;
