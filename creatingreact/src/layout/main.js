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
          <strong>Happy Code </strong>
        </Col>
      </Container>
    </>
  );
};
export default Main;
