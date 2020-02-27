import React from "react";
import { Container, Col } from "reactstrap";
import Navigation from "../layout/navigation";
const Main = props => {
  return (
    <>
      <Navigation />
      <Container fluid={true} className="mt-2">
        <Col>{props.children}</Col>
        <Col className="home">
          <strong> &copy;riskatri_h </strong>
        </Col>
      </Container>
    </>
  );
};
export default Main;
