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
      <Navbar color="lnavbar navbar-right bg-dark" light expand="md">
        <NavbarBrand href={"/"} className="text-light">
          PHYSICS BLOG
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/login" tag={RRNavLink}>
                LOGIN
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else if (token.token.admin === true) {
    return (
      <Navbar color="lnavbar navbar bg-dark " light expand="md">
        <NavbarBrand href={"/"} className="text-light">
          blog
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/users" tag={RRNavLink} className="text-light">
                user
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/articles" tag={RRNavLink} className="text-light">
                articles
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/list/articles"
                tag={RRNavLink}
                className="text-light"
              >
                status articles
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={logout}
                to="/login"
                tag={RRNavLink}
                className="text-light"
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else if (token.token.admin === false) {
    return (
      <Navbar color="lnavbar navbar-light bg-dark " light expand="md">
        <NavbarBrand href={"/"}>blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto " navbar>
            <NavItem>
              <NavLink to="/articles" tag={RRNavLink} className="text-light">
                articles
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={logout}
                to="/login"
                tag={RRNavLink}
                className="text-light"
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
  return (
    <Navbar color="lnavbar navbar-dark bg-dark" light expand="md">
      <NavbarBrand href={"/"} className="text-light">
        Blog
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink
              to="/guess/articles"
              tag={RRNavLink}
              className="text-light"
            >
              articles
            </NavLink>
          </NavItem>
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
}

export default Navigation;
