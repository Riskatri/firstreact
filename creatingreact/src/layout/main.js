import React from "react";
import { Container, Col } from "reactstrap";
import Navigation from "../layout/navigation";
const Main = props => {
  return (
    <>
      <Navigation />
      <Container fluid={true} className="justify-content-md-center">
        <Col>{props.children}</Col>
        <Col>Footer</Col>
      </Container>
    </>
  );
};
export default Main;
