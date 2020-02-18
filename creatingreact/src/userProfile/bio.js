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
      <div className="prof">
        <h3> Biografi </h3>
        <p> {this.state.name} </p>
        <p> Contact: {this.state.phone}</p>
      </div>
    );
  }
}
export default bio;
