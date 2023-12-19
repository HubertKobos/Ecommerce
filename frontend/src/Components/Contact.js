import React from "react";
import { Card } from "react-bootstrap";

function Contact() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="mt-3 mb-4"
    >
      <Card
        bg="dark"
        text="white"
        style={{ width: "18rem" }}
        className="mt-2 mx-4"
      >
        <Card.Body>
          <Card.Title className="mb-3">Dane firmy</Card.Title>
          <Card.Text>
            Handel i Usługi Transportowe XXX XXXXXXXX
            <br />
            XXXXXXX XXX
            <br />
            XX-XXX XXXXXX
            <br />
            NIP: 000000000
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        bg="dark"
        text="white"
        style={{ width: "18rem" }}
        className="mt-2 mx-4 mb-5"
      >
        <Card.Body>
          <Card.Title className="mb-3">Kontakt - właściciel</Card.Title>
          <Card.Text>
            XXX XXX
            <br />
            kom: +48 999 999 999
            <br />
            email: XXXX@vp.pl
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        bg="dark"
        text="white"
        style={{ width: "18rem" }}
        className="mt-2 mx-4 mb-5"
      >
        <Card.Body>
          <Card.Title className="mb-3">Kontakt - punkt handlowy</Card.Title>
          <Card.Text>
            XXXXXX XXX
            <br />
            XX-XXX XXXXXX
            <br />
            kom: +48 999 999 999
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Contact;
