import React from "react";
import { Container, Col } from "reactstrap";
import Navigation from "../layout/navigation";
// import desktopImage from "../userProfile/fisikabg.jpeg";
// import mobileImage from "../userProfile/fisikabg.jpeg";

const Main = props => {
  // const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;
  return (
    // <div className="App" style={{ backgroundImage: `url(${imageUrl})` }}>
    <>
      <Navigation />
      <Container className="mt-2">
        <Col>{props.children}</Col>
        <Col className="text-center">
          <strong> &copy;riskatri_h </strong>
        </Col>
      </Container>
    </>
    // </div>
  );
};
export default Main;
