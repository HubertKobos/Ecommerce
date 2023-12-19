import React, { useState } from 'react';
// import './Checkout.css';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";


const Checkout = ({total, shippingAddress, transportMethod, paymentMethod, deliveryDate, distance, items}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {

        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: String(total),
                    },
                },
            ],
        });
    }

    async function saveOrder(){
        const datenow = new Date()

        
        const datetime = new Date(`${datenow.getFullYear()}-${datenow.getMonth()}-
        ${datenow.getDay()} ${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`)

        
        if(distance < 6) {var distance_calc = 0} else {var distance_calc = distance*2.5}
        await axios.post(ORDER_URL, 
            {
                user: null, // change later to check if logged in user
                shipping_address: shippingAddress,
                shipping_price: distance_calc,
                transport_method: transportMethod,
                payment_method: paymentMethod,
                is_paid: true,
                paid_at: datetime,
                is_delivered: false,
                planned_delivered_at: deliveryDate,
                total_price: total,
                email: shippingAddress.email,
                order_items: items
            })
    } 

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            // alert(`Transaction completed by ${name}`);
            console.log("name", name)
            console.log("data", data)
            console.log("action", actions)
            console.log("details", details)
            saveOrder()
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    {/* <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                    </select> */}
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout;