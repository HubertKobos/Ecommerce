import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function OrderAcceptedPopup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <h4>Informacja</h4>
        <p>
          Towar został zarezerwowany i czeka na opłacenie osobiście w biurze pod adresem Ostrów 163, 39-103 Ostrów. Na podany adres email zostało wysłane podsumowanie zamówienia. Wszelki kontakt prosimy pod nr. telefonu: 123456789 
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
}