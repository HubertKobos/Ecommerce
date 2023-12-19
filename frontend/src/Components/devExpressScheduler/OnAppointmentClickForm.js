import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function OnAppointmentClickForm(props) {


    const [editButtonsHandler, setEditButtonsHandler] = useState(true)
    const [doEventExist, setDoEventExist] = useState(props.e !== undefined)

    const [addressId, setAddressId] = useState(doEventExist ? props.e.shipping_address.id : "")
    const [id, setId] = useState(doEventExist ? props.e.id : "")
    const [email, setEmail] = useState(doEventExist ? props.e.email : "")
    const [startDate, setStartDate] = useState(doEventExist ? props.e.planned_delivered_at : props.cellDate.startDate)
    const [isPaid, setIsPaid] = useState(doEventExist ? props.e.is_paid : false)
    const [address, setAddress] = useState(doEventExist ? props.e.shipping_address.address : "")
    const [city, setCity] = useState(doEventExist ? props.e.shipping_address.city : "")
    const [postal_code, setPostal_code] = useState(doEventExist ? props.e.shipping_address.postal_code : "")
    const [totalPrice, setTotalPrice] = useState(doEventExist ? props.e.total_price : "")
    const [telephone, setTelephone] = useState(doEventExist ? props.e.phone_number : "")
    const planned_delivered_at_start = new Date(Date.parse(startDate))
    const planned_delivered_at_end = new Date(Date.parse(startDate))
    planned_delivered_at_start.setTime(planned_delivered_at_start.getTime() - 60*60*1000)
    planned_delivered_at_end.setTime(planned_delivered_at_end.getTime() + 60*60*1000)
    var start = planned_delivered_at_start.toISOString() 
    var end = planned_delivered_at_end.toISOString()


    const saveDeleteToServer = () =>{
        const idObj = {"id": id}
        axios({
            method: "delete",
            url: urlDelete, 
            data: idObj
        })
        .then(function(response){
            if (response.status === 200){
                props.onHide()
            }
        })
        .catch(function(error){
            console.log("error", error)
        })
    }

    const saveEditToServer = () =>{
        const data_obj = {
            shipping_address: {
                id: addressId,
                address: address,
                city: city,
                postal_code: postal_code,
                country: "Polska",
            },
            id: id,
            planned_delivered_at: startDate,
            startDate: start,
            endDate: end,
            phone_number: telephone,
            email: email,
            is_paid: isPaid, 
            total_price: totalPrice,
        }
    
        axios.put(urlEdit, data_obj)
        .then(function(response){
            if (response.status === 200){
                props.onHide()
                
            }
        })
        .catch(function(error){
            console.log("error", error)
        })
    
    }

    const saveDataToServer = () =>{
        const data_obj = {
            shipping_address: {
                address: address,
                city: city,
                postal_code: postal_code,
                country: "Polska",
            },
            planned_delivered_at: startDate,
            startDate: start,
            endDate: end,
            phone_number: telephone,
            email: email,
            is_paid: isPaid, 
            total_price: totalPrice,
        }

        axios.post(urlSave, data_obj)
        .then(function(response){
            if (response.status === 200){
                props.onHide()
                
            }
        })
        .catch(function(error){
            console.log("error", error)
        })
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
            Formularz
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Godzina dostawy</Form.Label>
                <Form.Control 
                    type="datetime" value={startDate} 
                    readOnly={true}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adres</Form.Label>
                <Form.Control 
                    type="text" value={!doEventExist && !editButtonsHandler ? "" : address} 
                    readOnly={(doEventExist && editButtonsHandler) & true} onChange={(e) => setAddress(e.target.value)} required
                />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Miasto</Form.Label>
                <Form.Control 
                    type="text" value={!doEventExist && !editButtonsHandler ? "" : city} 
                    readOnly={(doEventExist && editButtonsHandler) & true} onChange={(e) => setCity(e.target.value)} required
                />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Kod pocztowy</Form.Label>
                <Form.Control 
                    type="text" value={!doEventExist && !editButtonsHandler ? "" : postal_code} 
                    readOnly={(doEventExist && editButtonsHandler) & true} onChange={(e) => setPostal_code(e.target.value)} required
                />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" value={!doEventExist && !editButtonsHandler ? "" : email} 
                    readOnly={(doEventExist && editButtonsHandler) & true} onChange={(e) => setEmail(e.target.value)} required
                />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nr. telefonu</Form.Label>
                <Form.Control 
                    type="text" value={!doEventExist && !editButtonsHandler ? "" : telephone} 
                    readOnly={(doEventExist && editButtonsHandler) & true} onChange={(e) => setTelephone(e.target.value)} required
                />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Do zapłacenia</Form.Label>
                <Form.Control 
                    type="number" value={!doEventExist && !editButtonsHandler ? "" : totalPrice} 
                    readOnly={(doEventExist && editButtonsHandler) & true} onChange={(e) => setTotalPrice(e.target.value)} required
                />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Zapłacone</Form.Label>
                <Form.Check 
                    type="checkbox" checked={!doEventExist && !editButtonsHandler ? false : isPaid} 
                    disabled={(doEventExist && editButtonsHandler) & true} onChange={(e) => setIsPaid(isPaid => !isPaid)} 
                />
                
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            {doEventExist ? 
             <>
                <Button variant='dark' disabled={!editButtonsHandler} onClick={() => setEditButtonsHandler(false)}>Edytuj</Button>
                <Button variant='dark' disabled={editButtonsHandler} onClick={saveEditToServer}>Zapisz edycje</Button>
                <Button variant='danger' disabled={editButtonsHandler} onClick={saveDeleteToServer}>Usuń</Button>
            </>
            :
                <Button variant='dark' onClick={saveDataToServer}>Dodaj</Button>
        }

          <Button variant='danger' onClick={props.onHide}>Zamknij</Button>
        </Modal.Footer>
      </Modal>
      )
}

export default OnAppointmentClickForm