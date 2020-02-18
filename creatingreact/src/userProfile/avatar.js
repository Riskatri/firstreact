import React from "react";
import mainLogo from "./tokopedia.jpg";

class Avatar extends React.Component {
  render() {
    return (
      <div>
        <img src={mainLogo} alt="tokopedia" width="150px" />
      </div>
    );
  }
}
export default Avatar;
