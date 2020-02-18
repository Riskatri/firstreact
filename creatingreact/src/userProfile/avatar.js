import React from "react";
import mainLogo from "./tokopedia.jpg";
import "../userProfile/profile.css";

class Avatar extends React.Component {
  render() {
    return (
      <div className="img">
        <img src={mainLogo} alt="tokopedia" width="150px" />
      </div>
    );
  }
}
export default Avatar;
