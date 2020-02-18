import React from "react";
import mainLogo from "./tokopedia.jpg";

class Avatar extends React.Component {
  render() {
    return (
      <div className="prof">
        <img src={mainLogo} alt="tokopedia" width="150px" />
      </div>
    );
  }
}
export default Avatar;
