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

function Navigation() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  function logout() {
    sessionStorage.setItem("persisted_state_hook:token", "");
    sessionStorage.clear();
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  if (!token) {
    return (
      <Navbar color="lnavbar navbar-dark bg-dark" light expand="md">
        <NavbarBrand href={"/"}>Book</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/register" tag={RRNavLink}>
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login" tag={RRNavLink}>
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else if (token.token.Role === "ADMIN") {
    return (
      <Navbar color="lnavbar navbar-dark bg-dark" light expand="md">
        <NavbarBrand href={"/"}>Book</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/books" tag={RRNavLink}>
                List Books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/post/books" tag={RRNavLink}>
                Post Books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/users" tag={RRNavLink}>
                Users
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={logout} to="/login" tag={RRNavLink}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else if (token.token.Role === "USER") {
    return (
      <Navbar color="lnavbar navbar-dark bg-dark" light expand="md">
        <NavbarBrand href={"/"}>Book</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/get/books" tag={RRNavLink}>
                List Books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/orders" tag={RRNavLink}>
                List orderan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logout} to="/login" tag={RRNavLink}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default Navigation;
