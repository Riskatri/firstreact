import React from "react";

const greeting = props => (
  <div>
    <h4> {props.name} </h4>
    <h4> age : {props.age} </h4>
    <h4> gender : {props.gender}</h4>
  </div>
);
greeting.defaultProps = {
  name: "Riska",
  age: "22",
  gender: "female"
};

export default greeting;
