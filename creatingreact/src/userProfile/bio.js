import React from "react";

class bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Individual Information",
      phone: "123456789"
    };
  }
  render() {
    return (
      <div>
        <p>
          <strong>
            Physics is the branch of science that deals with the structure of
            matter and how the fundamental constituents of the universe
            interact.
          </strong>
        </p>
        <p> {this.state.name} </p>
        <p> Contact: {this.state.phone}</p>
      </div>
    );
  }
}
export default bio;
