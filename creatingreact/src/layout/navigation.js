import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="lnavbar navbar-dark bg-dark" light expand="md">
      <NavbarBrand href={"/"}>Book</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink to="/get/books" tag={RRNavLink}>
              Get Book
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/get/books/:id" tag={RRNavLink}>
              Get Book By Id
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/post/books" tag={RRNavLink}>
              Post Book
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink to="/update/books/:id" tag={RRNavLink}>
              Update Book
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/delete/books/:id" tag={RRNavLink}>
              Delete Book
            </NavLink>
          </NavItem> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Navigation;
