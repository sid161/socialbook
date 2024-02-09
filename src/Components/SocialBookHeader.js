import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SocialBookHeader = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SocialBook
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default SocialBookHeader;
