import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Alert, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PopupScheduler from '../Components/Popups/PopupScheduler'
import FormContainer from '../Components/Forms/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { setTransportPrice } from '../Redux/ShippingAddressSlice'
import { savePayingMethod } from '../Redux/PayingMethodsSlice'
import { clearDate } from '../Redux/BookedDeliverySlice'
import Layout from '../Components/Layout/Layout'
import { getCalendar, getFreeEvents } from '../features/requests'

function PaymentScreen() {
    
    const URL = 'http://127.0.0.1:8000/api/calendar/free-events'
    const getDatesURL = 'http://127.0.0.1:8000/api/deliverydate/get' 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [transportMethod, setTransportMethod] = useState(null)
    const [errorPaymentMessage, setErrorPaymentMessage] = useState(null)
    const [errorTransportMessage, setErrorTransportMessage] = useState(null)
    const [popupShow, setPopupShow] = useState(false)
    const [events, setEvents] = useState([])
    const [datesToDelete, setDatesToDelete] = useState()

    const[eventsLoader, setEventLoader] = useState(false)
    const[datesLoader, setDatesLoader] = useState(false)
    const {token} = useSelector(state => state.auth.userData)
    const address = useSelector(state => state.shippingAddress.shippingAddress)
    const loading = useSelector(state => state.shippingAddress.isLoading)
    const {items} = useSelector(state => state.deliveryDate)


    useEffect(()=>{
        dispatch(clearDate())
        
    }, [dispatch])

    if (transportMethod !== null && paymentMethod !== null && items.length !== 0){
        setPopupShow(false)
        dispatch(savePayingMethod({"paymentMethod": paymentMethod, 'transportMethod': transportMethod}))
        navigate("/podsumowanie")   
    }

    // console.log(paymentMethod, transportMethod)
    const submitHandler = (e) => {
        // getCoordsFromAddress()
        e.preventDefault()
        if (paymentMethod === null){
            setErrorPaymentMessage("Należy wybrać metodę płatności")
        }
        if (transportMethod === null){
            setErrorTransportMessage("Należy wybrać metodę transportu")
        }
        if (transportMethod === 'home_transport' && paymentMethod !== null){
            setPopupShow(true)
        }
        if (transportMethod !== null && paymentMethod !== null && items.length !== 0){
            setPopupShow(false)
            dispatch(savePayingMethod({"paymentMethod": paymentMethod, 'transportMethod': transportMethod}))
            navigate("/podsumowanie")   
        }
        if ((transportMethod !== 'home_transport' && transportMethod !== null) && paymentMethod!== null){
            dispatch(savePayingMethod({"paymentMethod": paymentMethod, 'transportMethod': transportMethod}))
            navigate("/podsumowanie")  
        }
        console.log(paymentMethod, transportMethod, items)
    // console.log(transportMethod, paymentMethod)

        // dispatch(savePaymentMethod(paymentMethod))
        
    }
    // console.log(eventsLoader, datesLoader)
    return (
        <Layout 
            content={
                <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            {!eventsLoader && !datesLoader ?
            <>
                {popupShow && <PopupScheduler show={popupShow} onHide={() => setPopupShow(false)} events={events} datestodelete={[...datesToDelete.serializer1, ...datesToDelete.serializer2]} />}
                <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Wybierz forme płatności</Form.Label>
                    {errorPaymentMessage !== null && <Alert variant='danger'>{errorPaymentMessage}</Alert>}
                    
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Płacę przez internet (PayPal, przelewy24)'
                            id='paypal/przelewy24'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >
                        </Form.Check>

                        <Form.Check
                            type='radio'
                            label='Płacę osobiście w biurze'
                            id='office'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >
                        </Form.Check>

                        <Form.Check
                            type='radio'
                            label='Płacę przy dostawie'
                            disabled={transportMethod!=='personal_collection' || null ? false : true}
                            id='delivery'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <Form.Label as='legend'>Wybierz forme dostawy</Form.Label>
                    {errorTransportMessage !== null && <Alert variant='danger'>{errorTransportMessage}</Alert> }
                    
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Odbiór osobisty'
                            id='personal_collection'
                            name='deliveryMethod'
                            onChange={(e) => setTransportMethod(e.target.id)}
                        >
                        </Form.Check>

                        <Form.Check
                            type='radio'
                            label='Transport do domu'
                            id='home_transport'
                            name='deliveryMethod'
                            onChange={(e) => setTransportMethod(e.target.id)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='dark' className='mt-2'>
                    Kontynuuj
                </Button>
            </Form>
            </>
            :
            <Spinner />
        }
            
        </FormContainer>
            }
        />
        
    )
}
export default PaymentScreen