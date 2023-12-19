import React from "react";
import { Card } from "react-bootstrap";
import truck from "../images/truck.jpg";

function TransportComponent() {
  return (
    <Card style={{ display: "flex", alignItems: "center", border: "0" }}>
      <Card.Body>
        <Card.Text>
          <h3>
            Oferujemy usługi transportowe na terenie całego kraju oraz Uni
            Europejskiej
          </h3>{" "}
          <br />
          <h5>
            Posiadamy 22 zestawów samowyładowczych tj. ciągnik siodłowy z
            naczepą samowyładowczą o tanżu 26ton. Kubatura 38-40m3.
          </h5>
        </Card.Text>
      </Card.Body>
      <Card.Img
        variant="bottom"
        src={truck}
        fluid
        rounded
        style={{ maxWidth: "50%" }}
      />
    </Card>
  );
}

export default TransportComponent;
