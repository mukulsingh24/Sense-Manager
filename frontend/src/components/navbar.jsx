import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch } from "react-icons/fa";
import { MdScanner } from "react-icons/md";
import InputGroup from "react-bootstrap/InputGroup";
function Nav1() {
  return (
    <Navbar
      className="py-3"
      style={{ backgroundColor: "#000053", color: "white" }}
    >
      <Navbar.Brand
        href="#home"
        className="fw-bold"
        style={{ color: "white", marginLeft: "100px", fontSize: "30px" }}
      >
        Task Mananger
      </Navbar.Brand>

      <Nav style={{ marginLeft: 1300 }}>
        <Button className="ps-4" style={{ padding: "8px 16px" }}>
          Login
        </Button>

        <Button
          className="ps-4"
          style={{ padding: "8px 16px", marginLeft: "8px" }}
        >
          Signout
        </Button>
      </Nav>
    </Navbar>
  );
}

export default Nav1;
