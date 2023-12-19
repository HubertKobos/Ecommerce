import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const logoutHander = () => {
    dispatch(logout());
    navigate("/login");
  };
  console.log(userData.role)

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Handel i Usługi transportowe</Navbar.Brand>
          <Nav className="me-auto" navbarScroll>
            <Nav.Link href="/">Oferta</Nav.Link>
            <Nav.Link href="/transport">Transport</Nav.Link>
            <Nav.Link href="/kontakt">Kontakt</Nav.Link>
            <Nav.Link href="/cart">Koszyk</Nav.Link>
            {userData.length === 0 ? (
              <Nav.Link href="/login">Logowanie</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/konto">Moje Konto</Nav.Link>
                <Nav.Link onClick={() => logoutHander()}>Wyloguj</Nav.Link>
                {(userData.role === "ADMIN" || userData.role === "MANAGER") && (
                  <Nav.Link href="/management">Panel Zarządzania</Nav.Link>
                )}
              </>
            )}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Szukaj"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="light">Szukaj</Button>
          </Form> */}
        </Container>
      </Navbar>
    </header>
  );
}
