import React from "react"

export default function RenderAppointment (model) {
    const startDateTime = new Date(model.appointmentData.startDate).toLocaleTimeString()
    const plannedDeliveryTime = new Date(model.appointmentData.planned_delivered_at).toLocaleTimeString()
    const endDateTime = new Date(model.appointmentData.endDate).toLocaleTimeString()
    return (
        <React.Fragment>
            <i>Telefon: {model.appointmentData.phone_number}</i>
            <br />
            <i>Email: {model.appointmentData.email}</i>
            <br />
            <i>Adres: {model.appointmentData.shipping_address.address}</i>
            <br />
            <i>Miasto: {model.appointmentData.shipping_address.city}</i>
            <br />
            <i>Kod pocztowy: {model.appointmentData.shipping_address.postal_code}</i>
            <br />
            <i>Godzina załadunku: {startDateTime}</i>
            <br />
            <i>Godzina dostawy: {plannedDeliveryTime}</i>
            <br />
            <i>Godzina powrotu: {endDateTime}</i>
            <br />
            <i>Cena transportu: {model.appointmentData.shipping_address.shipping_price != null ? model.appointmentData.shipping_address.shipping_price + "zł" : "Brak informacji"}</i>
            <br />
            <i>Do zapłaty łącznie: {model.appointmentData.total_price} zł</i>
            <br />
            <i>Opłacone: {model.appointmentData.is_paid ? 'Tak' : 'Nie'}</i>
            
        
        </React.Fragment>
    );
}