import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import React, {useState} from 'react';
import { createCar } from '../../features/requests';
import { useSelector } from 'react-redux';

export default function CreateCarPopup(props) {
    const {token} = useSelector(state => state.auth.userData)
    const [brand, setBrand] = useState()
    const [model, setModel] = useState()
    const [registration, setRegistration] = useState()
    const [insurance, setInsurance] = useState()
    const [service, setService] = useState()


    function saveCarHandler(){
      var formData = new FormData();
      formData.append("brand", brand)
      formData.append("model", model)
      formData.append("registration", registration)
      formData.append("insurance", insurance)
      formData.append("service", service)
      createCar(formData, token).then(response =>{
        if(response.status === 200){
          props.onHide()
          props.newCarHandler(response.data)
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
          Formularz pojazdu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <Form>
        <Form.Group className='mb-3' controlId='brand'>
            <Form.Label>Marka pojazdu</Form.Label>
            <Form.Control type='text' placeholder='Wpisz markę pojazdu' onChange={(e) => setBrand(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='model'>
            <Form.Label>Model</Form.Label>
            <Form.Control type='text' placeholder='Wpisz model pojazdu' onChange={(e) => setModel(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='registration'>
            <Form.Label>Nr. rejestracji</Form.Label>
            <Form.Control type='text' placeholder='Wpisz nr. rejestracji' onChange={(e) => setRegistration(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='insurance'>
            <Form.Label>Data końca ważności ubezpieczenia</Form.Label>
            <Form.Control type='date' onChange={(e) => setInsurance(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='service'>
            <Form.Label>Data końca ważności przeglądu</Form.Label>
            <Form.Control type='date' onChange={(e) => setService(e.target.value)} />
        </Form.Group>
       </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveCarHandler} variant='dark'>Dodaj</Button>
      </Modal.Footer>
    </Modal>
  );
}