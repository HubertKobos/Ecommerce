import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function OrderDetailsPopup(props) {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Szczegóły zamówienia
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <h4>id: {props.order.id}</h4>
        <h4>email: {props.order.email}</h4>
        <h4>Zamówienie stworzone (data): {props.order.created_at}</h4>
        <h4>Zamówienie opłacone (data): {props.order.paid_at}</h4>
        <h4>Planowana dostawa (data): {props.order.planned_delivered_at}</h4>
        <h4>Adres dostawy: {props.order.shipping_address}</h4>
        <h4>Sposób dostawy: {props.order.transport_method}</h4>
        <h4>Cena za transport: {props.order.shipping_price}</h4>
        <h4>Metoda płatności: {props.order.payment_method}</h4>
        <h4>Opłacone: {props.order.is_paid ? "Tak" : "Nie"}</h4>
        <h4>Dostarczone: {props.order.is_delivered ? "Tak" : "Nie"}</h4>
        <h4>Zakupione przedmioty:</h4>
        {props.order.order_item.map((item) => (
          <h4 key={item}>{item}</h4>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="dark">
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderDetailsPopup;
