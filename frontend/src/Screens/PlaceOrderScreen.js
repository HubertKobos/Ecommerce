import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem, Alert, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../Components/CheckoutSteps'
import { calculateTotal } from '../Redux/CartSlice'
import {PayPalScript, PayPalScriptProvider} from '@paypal/react-paypal-js'
import Checkout from '../Components/Checkout'
import axios from 'axios'
import OrderAcceptedPopup from '../Components/Popups/OrderAcceptedPopup'
import { clearCart } from '../Redux/CartSlice'
import Layout from '../Components/Layout/Layout'
// iniitial options for paypal
const initialOptions = {
    "client-id": "Aa4ikpoE22LI1wRQw3Rsszbg2dvRpVB8xZ3_LJL9VYyadMwJACM9VzK6GLTAt7Cu6XODPExOVefN9JbK",
    currency: "PLN",
    intent: "capture",
};

export default function PlaceOrderScreen() {
    const ORDER_URL = 'http://127.0.0.1:8000/api/order/save'

    // const orderCreate = useSelector(state => state.orderCreate)
    // const { order, error, success } = orderCreate
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [status, setStatus] = useState(false)
    const [statusOrder, setStatusOrder] = useState(false)
    const [loader, setLoader] = useState(false)

    const {shippingAddress} = useSelector(state => state.shippingAddress)
    const loading = useSelector(state => state.shippingAddress.isLoading)
    const distance = useSelector(state => state.shippingAddress.transportPrice)
    const {items, total, discount} = useSelector(state => state.cart)
    const paymentMethod = useSelector(state => state.payingMethod)
    const transportMethod = paymentMethod.transportMethod
    const deliveryDate = useSelector(state => state.deliveryDate.items[0])
    const userData = useSelector(state => state.auth)
    

    if (userData.id !== undefined){
        var userId = userData.id
    }else{
        var userId = null
    }

    if (distance > 6){
        var distancePayment = distance * 2
    }else{
        var distancePayment = 0
    }
    console.log(distance, distancePayment)
    console.log(Number(total) + Number(distancePayment) - Number(discount))
    console.log(total+distancePayment-discount)

        
    useEffect(() =>{
        dispatch(calculateTotal())
    }, [dispatch])

    if (!paymentMethod.payingMethod) {
        navigate("/platnosc")
    }

    async function createOrder () {
        if(distance < 6 || transportMethod!=='home_transport') {
            var distance_calc = 0
        }else{
            var distance_calc = distance*2.5
        }
        if(transportMethod === 'home_transport' && paymentMethod !== 'paypal/przelewy24'){
            var paid_at = null
            var planned_delivered_at =  deliveryDate
        }else if(transportMethod === 'personal_collection'){
            var paid_at = null
            var planned_delivered_at = null
        }
        setLoader(true)
        await axios.post(ORDER_URL, 
            {
                user: userId, 
                shipping_address: shippingAddress,
                shipping_price: distance_calc,
                transport_method: transportMethod,
                payment_method: paymentMethod,
                is_paid: true,
                // paid_at: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                paid_at: paid_at,
                is_delivered: false,
                planned_delivered_at: planned_delivered_at,
                total_price: total + distancePayment,
                email: shippingAddress.email,
                phone_number: shippingAddress.telNumber,
                order_items: items,
                discount: discount
            })
            .then(function(response){
                if (response.status === 200){
                    setStatus(true)
                    setStatusOrder(true)
                    setLoader(false)
                    dispatch(clearCart())
                    
                    
                }
            }).catch(function (error) {
                console.log(error);
            });
            
    
    }
    const date = new Date(deliveryDate)
    
    const dataFormat = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    console.log(date)
    return (
        <Layout 
            content={
                <div>
            {status && <OrderAcceptedPopup show={status} onHide={() => setStatus(false)}/>}
            <CheckoutSteps step1 step2 step3 step4 />
            {loading ? <Spinner /> : 
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Adres dostawy</h2>
                            <p>
                                <strong>Adres: </strong>
                                {shippingAddress.city}, {shippingAddress.address}, {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Dane kontaktowe</h2>
                            <p>
                                <strong>Nr. telefonu: </strong>
                                {shippingAddress.telNumber}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                {shippingAddress.email}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Metoda płatności oraz dostawy</h2>
                            <p>
                                <strong>Metoda płatności: </strong>
                                {paymentMethod.payingMethod === 'office' && "Płatność osobiście w biurze"}
                                {paymentMethod.payingMethod === 'delivery' && "Płatność kierowcy przy odbiorze"}
                                {paymentMethod.payingMethod === 'paypal/przelewy24' && "PayPal/przelewy24"}
                            </p>
                            <p>
                                <strong>Metoda dostawy: </strong>
                                {transportMethod === 'personal_collection' && 'Odbiór osobisty'}
                                {transportMethod === 'home_transport' && 'Dostawa do domu'}
                            </p>
                            {transportMethod === 'home_transport' && 
                                <p>
                                    <strong>Planowana godzina dostawy: </strong>
                                    {dataFormat}
                                </p>
                            }
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Koszyk</h2>
                            {items.length === 0 ? <Alert variant='info'>
                                Twoj koszyk jest pusty
                            </Alert> : (
                                    <ListGroup variant='flush'>
                                        {items.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={4}>
                                                        <Image src={item.image} alt="Brak zdjęcia podglądowego" style={{width: '8vw'}} rounded />
                                                    </Col>

                                                    <Col style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                                                        <Link to={`/product/${item.id}`} style={{textDecoration: "none", color: "black"}}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={3} style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                                                        {item.qty} x {item.price} zł = {(item.qty * item.price).toFixed(2)} zł
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Podsumowanie kosztów</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Cena za produkty:</Col>
                                    <Col>{total.toFixed(2)} zł</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item> 
                                <Row>
                                    <Col>Cena za dowóz:</Col>
                                    {transportMethod==='home_transport' ? 
                                    <Col>{distancePayment.toFixed(2)} zł ({distance} km)</Col>
                                    :
                                    <Col>Brak</Col>
                                }
                                </Row>
                            </ListGroup.Item>
                            {discount !== 0 && 
                                <ListGroup.Item> 
                                    <Row>
                                        <Col>Wykorzystany rabat:</Col>
                                        <Col>{discount}zł</Col>
                                    </Row>
                                </ListGroup.Item>
                            }

                            <ListGroup.Item>
                                <Row>
                                    <Col>Razem:</Col>
                                    <Col>{transportMethod==='home_transport' ? (Number(total) + Number(distancePayment) - Number(discount)).toFixed(2) : (Number(total) - Number(discount)).toFixed(2)} zł</Col>
                                </Row>
                            </ListGroup.Item>


                            {/* <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item> */}
                            {paymentMethod.payingMethod==='paypal/przelewy24' ?
                                <ListGroup.Item >
                                    <PayPalScriptProvider options={initialOptions}>
                                        <Checkout total={transportMethod==='home_transport' ? (Number(total) + Number(distancePayment) - Number(discount)).toFixed(2) : (Number(total) - Number(discount)).toFixed(2)} shippingAddress={shippingAddress} transportMethod={transportMethod} paymentMethod={paymentMethod} deliveryDate={date} distance={distance} items={items}/>
                                    </PayPalScriptProvider>
                                </ListGroup.Item>
                            :
                            
                            !statusOrder && !loader ? <ListGroup.Item className='d-flex justify-content-center'><Button variant='dark' onClick={createOrder}><h4>Zamawiam</h4></Button></ListGroup.Item> 
                            : 
                            
                            statusOrder && !loader ? <ListGroup.Item className='d-flex justify-content-center'><h4>Zamówienie zrealizowane</h4></ListGroup.Item> : <ListGroup.Item className='d-flex justify-content-center'><Spinner /></ListGroup.Item>  
                            }
                            

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        }
        </div>
            }
        />
        
    )
}