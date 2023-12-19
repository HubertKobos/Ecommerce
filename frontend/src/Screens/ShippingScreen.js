import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/Forms/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { saveAddress } from '../Redux/ShippingAddressSlice'
// import { getItem } from '../features/gettingItems/getItemSlice'
import Layout from '../Components/Layout/Layout'


export default function ShippingScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {shippingAddress} = useSelector(state => state.shippingAddress)
    const userData = useSelector(state => state.auth)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState('Polska')
    const [telNumber, setTelNumber] = useState(shippingAddress.telNumber)
    const [email, setEmail] = useState(shippingAddress.email ? shippingAddress.email : userData.email)

    

    const submitHandler = (e) => {
        e.preventDefault()
        // calculateRoute()
        // dispatch(saveShippingAddress({ address, city, postalCode, country }))
        dispatch(saveAddress({city, address, postalCode, country, telNumber, email}))
        navigate('/platnosc')
    }

    return (
        <Layout 
            content={
                <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Adres</h1>
            <Form onSubmit={submitHandler}>


                <Form.Group controlId='city'>
                    <Form.Label>Miejscowość</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Wpisz miejscowość'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='address'>
                    <Form.Label>Ulica i Nr. domu</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Wpisz ulica oraz nr. domu'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Wpisz kod pocztowy'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='telNumber'>
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control
                        required
                        type='tel'
                        placeholder='Wpisz nr. telefonu'
                        value={telNumber ? telNumber : ''}
                        onChange={(e) => setTelNumber(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Wpisz email'
                        value={email ? email : ''}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Kraj</Form.Label>
                    <Form.Control
                        disabled
                        required
                        type='text'
                        placeholder='Wpisz kraj'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='dark' className='mt-2'>
                    Kontynuuj
                </Button>
            </Form>
        </FormContainer>
            }
        />

        
        
    )
}