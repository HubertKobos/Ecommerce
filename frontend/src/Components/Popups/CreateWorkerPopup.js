import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import React, {useState} from 'react';
import { createWorker } from '../../features/requests';
import { useSelector } from 'react-redux';

export default function CreateWorkerPopup(props) {
    const {token} = useSelector(state => state.auth.userData)
    const [workerID, setWorkerID] = useState()
    const [insuranceState, setInsurance] = useState()
    const [agreementState, setAgreement] = useState()

    function createWorkerHandler(){
      var formData = new FormData();
      formData.append("workerId", workerID)
      formData.append("insurance", insuranceState)
      formData.append("agreement", agreementState);
      createWorker(formData, token).then(response => {
        if(response.status === 200){
          props.onHide()
          props.newWorkerHandler(response.data)
        }
      }).catch(error => console.log(error))
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Formularz pracownika
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <Form>
        <Form.Group className='mb-3' controlId='worker_id'>
            <Form.Label>Numer pracownika</Form.Label>
            <Form.Control type='text' placeholder='Wpisz numer pracownika' onChange={(e) => setWorkerID(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='insurance'>
            <Form.Label>Data końca ważności ubezpieczenia</Form.Label>
            <Form.Control type='date' onChange={(e) => setInsurance(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='agreement'>
            <Form.Label>Data końca ważności umowy</Form.Label>
            <Form.Control type='date' onChange={(e) => setAgreement(e.target.value)} />
        </Form.Group>
       </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createWorkerHandler} variant='dark'>Dodaj</Button>
      </Modal.Footer>
    </Modal>
  );
}