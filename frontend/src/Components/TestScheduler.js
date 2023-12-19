import React, { useEffect, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import Scheduler from "devextreme-react/scheduler"
import { Button, Form, FormLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
// import { getAllSchedulerItems } from '../features/devExScheduler/getEventsSlice';
import { createRef } from 'react';
// import { saveEvent } from '../features/devExScheduler/saveEventsSlice';
import axios from 'axios';



const renderAppointment = (model) => {
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

// render here information from render appointment
const renderAppointmentTooltip = (model) => {
    const startDateTime = new Date(model.appointmentData.startDate).toLocaleTimeString()
    const plannedDeliveryTime = new Date(model.appointmentData.planned_delivered_at).toLocaleTimeString()
    const endDateTime = new Date(model.appointmentData.endDate).toLocaleTimeString()
    return (
        <div style={{height: '250px'}}>
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
            <br />
        </div>
    );
}

const onAppointmentAdded = (e) =>{ 
    
    console.log('addes')
    console.log(e)
}

const onAppointmentUpdated = () =>{
    console.log("update")
}

const onAppointmentDeleted = () =>{
    console.log("deleted")
}


// const deleteAppointment =() =>{
//     onAppointment
// }

const addApointment = (e) =>{
    console.log('addes')
    console.log(e)
}


function TESTSCHEDULER(){

    const schedulerRef = createRef()
    const dispatch = useDispatch()

    // const {status} = useSelector(state => state.saveEventScheduler)
    const appointments = useSelector(state => state.scheduler.items)

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        // dispatch(getAllSchedulerItems())   SWIEZO ZAKOMNETOWANE !!!
    }, [dispatch, update])

    function sendDataToServer(e, data_obj){
        // SWIEZO ZAKOMENTOWANE !!!
        // axios.post(url, data_obj)
        // .then(function(response){
        //     if (response.status === 200){
        //         e.popup.option("visible", false)
        //         setUpdate(prevItem => !prevItem)
        //     }
        // })
        // .catch(function(error){
        //     console.log("error", error)
        // })
        // console.log(resp)
    }

    //ref
    // function addApointment(){
        //     // schedulerRef.current.props.addApointment()
        //     console.log(schedulerRef)
        // }
    // console.log("status poza onAppointmentFormOpening ->", status)

    const onAppointmentAdding = (e) =>{
        console.log("adding")
    }

    const onAppointmentFormOpening = (e) => {
        var items =  e.popup.option('toolbarItems')
        items[0].options = { text: "Zapisz", visible: false }
        // // items[0].onClick = _doneButtonClickHandler 
        items[1].options = { text: "Zamknij", visible: false}
        // // items.push(items[0])
        // // items[2].options = items[0]
        e.popup.option('toolbarItems', items)
        // // e.popup.option('toolbarItems')[0].options = {text: "Zapisz"}
        // // e.popup.option('toolbarItems')[0].shortcut = "zapisz"
        // console.log(e.popup.option('toolbarItems'))
        // console.log(items)
        // console.log(items)
        // var items = [e.popup._toolbarItemClasses[0] = 'asd', e.popup._toolbarItemClasses[1]]
        // console.log(items)
        // e.popup._toolbarItemClasses = items
        // console.log(e.popup._toolbarItemClasses)
        
        e.popup.option('showTitle', true);
        e.popup.option('title', e.appointmentData.text ? 
        e.appointmentData.text : 
        'Stwórz lub edytuj wydarzenie');
        e.popup.option("hideOnOutsideClick", true)
        const form = e.form;
        
        //data from the clicked form
        const formData = e.form.option('formData') 

        if (formData.id){
            var phoneEditorOptions = { value: formData.phone_number }
        }else{
            var phoneEditorOptions = {}
        }
        let mainGroupItems = [];
        if (!mainGroupItems.find(function(i) { return i.dataField === "phone" })) {
            mainGroupItems.push({
                colSpan: 2, 
                label: { text: "Nr. telefonu" },
                editorType: "dxTextBox",
                editorOptions: phoneEditorOptions,
                isRequired: true,
                dataField: "phone"
            });
            form.itemOption('mainGroup', 'items', mainGroupItems);
        }
    
        if (formData.id){
            var cityEditorOptions = { value: formData.shipping_address.city }
        }else{
            var cityEditorOptions = {}
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "city" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Miejscowość" },
                editorType: "dxTextBox",
                editorOptions: cityEditorOptions,
                isRequired: true,
                dataField: "city"
            });
            form.option("items", mainGroupItems);
        }

        if (formData.id){
            var addressEditorOptions = { value: formData.shipping_address.address }
        }else{
            var addressEditorOptions = {}
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "address" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Nr. domu" },
                editorType: "dxTextBox",
                editorOptions: addressEditorOptions,
                isRequired: true,
                dataField: "address"
            });
            form.option("items", mainGroupItems);
        }
    
        
        // better way to handle it for later:
        // https://js.devexpress.com/Demos/WidgetsGallery/Demo/Scheduler/CustomTemplates/React/Light/
        if (formData.id){
            var postalCodeEditorOptions = { value: formData.shipping_address.postal_code }
        }else{
            var postalCodeEditorOptions = {}
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "postalCode" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Kod pocztowy" },
                editorType: "dxTextBox",
                editorOptions: postalCodeEditorOptions,
                isRequired: true,
                dataField: "postalCode"
            });
            form.option("items", mainGroupItems);
        }
    
        
        var DateBoxOptions = { type: "datetime" }
        if (!mainGroupItems.find(function(i) { return i.dataField === "startDate" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Data i czas rozpoczęcia załadunku" }, 
                editorType: "dxDateBox",
                editorOptions: DateBoxOptions,
                isRequired: true,
                dataField: "startDate"
            });
            form.option("items", mainGroupItems);
        }
    
        if (formData.id){
            var plannedDeliveryDateEditorOptions = { value: formData.planned_delivered_at, ...DateBoxOptions }
        }else{
            var plannedDeliveryDateEditorOptions = {...DateBoxOptions}
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "plannedDeliveryDate" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Data i czas zaplanowanego dostarczenia" }, 
                editorType: "dxDateBox",
                editorOptions: plannedDeliveryDateEditorOptions,
                isRequired: true,
                dataField: "plannedDeliveryDate"
            });
            form.option("items", mainGroupItems);
        }
    
        if (!mainGroupItems.find(function(i) { return i.dataField === "endDate" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Data i czas powrotu" },
                editorType: "dxDateBox",
                editorOptions: DateBoxOptions,
                isRequired: true,
                dataField: "endDate"
            });
            form.option("items", mainGroupItems);
        }
    

        if (formData.id){
            var emailEditorOptions = { value: formData.email, mode: "email" }
        }else{
            var emailEditorOptions = {mode: "email"}
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "email" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Email" },
                editorType: "dxTextBox",
                editorOptions: emailEditorOptions,
                isRequired: false,
                dataField: "email"
            });
            form.option("items", mainGroupItems);
        }
    
        if (formData.id){
            var totalPriceEditorOptions = { value: formData.total_price }
        }else{
            var totalPriceEditorOptions = {}
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "totalPrice" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Do zapłaty (całość)" },
                editorType: "dxTextBox",
                editorOptions: totalPriceEditorOptions,
                isRequired: true,
                dataField: "totalPrice"
            });
            form.option("items", mainGroupItems);
        }
    
        if (formData.id){
            var isPaidEditorOptions = { value: formData.is_paid }
        }else{
            var isPaidEditorOptions = {}
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "isPaid" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Opłacone" },
                editorType: "dxCheckBox",
                editorOptions: isPaidEditorOptions,
                dataField: "isPaid"
            });
            form.option("items", mainGroupItems);
        }
    
        if (formData.id){
            var countryEditorOptions = { value: formData.shipping_address.country }
        }else{
            var countryEditorOptions = { value: "Polska" }
        }
        if (!mainGroupItems.find(function(i) { return i.dataField === "country" })) {
            mainGroupItems.push({
                colSpan: 2,
                label: { text: "Kraj dostawy" },
                editorType: "dxTextBox",
                editorOptions: countryEditorOptions,
                isRequired: true,
                dataField: "country"
            });
            form.option("items", mainGroupItems);
        }
        const handleDoneClick = (form) => {
            if (form.validate().isValid){
                const formData = form.option("formData")
                const data_obj = {
                    shipping_address: {
                        address: formData.address,
                        city: formData.city,
                        postal_code: formData.postalCode,
                        country: formData.country,
                        // shipping_price: formData.totalPrice
                    },
                    planned_delivered_at: formData.plannedDeliveryDate,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    phone_number: formData.phone,
                    email: formData.email,
                    is_paid: formData.isPaid,
                    total_price: formData.totalPrice,
                }
                // set isPaid to false if formData is empty/null
                // if (formData.isPaid !== undefined && null){
                //     data_obj["is_paid"] = formData.isPaid
                // }else{
                //     data_obj["is_paid"] = false
                // }
                // console.log("dataObj", data_obj)
                sendDataToServer(e, data_obj)

            }else{
                console.log("Pola są niepoprawnie wypełnione")
            }
            
        }

        // dodać obsługę błędów do wszystkich przycisków ! 
        const handleDeleteClick = () =>{
            const idObj = {"id": formData.id}
            axios({
                method: "delete",
                url: `http://127.0.0.1:8000/api/calendar/delete`, 
                data: idObj
            })
            .then(function(response){
                if (response.status === 200){
                    e.popup.option("visible", false)
                    setUpdate(prevItem => !prevItem)
                }
            })
            .catch(function(error){
                console.log("error", error)
            })
        }
        
        const handleUpdateClick = () =>{
            const data_obj = {
                shipping_address: {
                    id: formData.shipping_address.id,
                    address: formData.address,
                    city: formData.city,
                    postal_code: formData.postalCode,
                    country: formData.country,
                    // shipping_price: formData.totalPrice
                },
                id: formData.id,
                planned_delivered_at: formData.plannedDeliveryDate,
                startDate: formData.startDate,
                endDate: formData.endDate,
                phone_number: formData.phone,
                email: formData.email,
                is_paid: formData.isPaid, 
                total_price: formData.totalPrice,
            }
            // if (formData.isPaid !== undefined && null){
            //     data_obj["is_paid"] = formData.isPaid
            // }else{
            //     data_obj["is_paid"] = false
            // }
            console.log("przesyłam w update:", data_obj)
            axios({
                method: "PUT",
                url: `http://127.0.0.1:8000/api/calendar/update`, 
                data: data_obj
            })
            .then(function(response){
                if (response.status === 200){
                    e.popup.option("visible", false)
                    setUpdate(prevItem => !prevItem)
                }
            })
            .catch(function(error){
                console.log("error", error)
            })
        }

        if (formData.id === undefined || null){
            mainGroupItems.push({
                colSpan: 2,
                editorType: "dxButton",
                editorOptions: {
                    text: "Zapisz",
                    onClick: () => handleDoneClick(form)
                },
            });
            form.option("items", mainGroupItems);
        }else{
            mainGroupItems.push({
                colSpan: 2,
                editorType: "dxButton",
                editorOptions: {
                    text: "Zapisz edycje",
                    onClick: () => handleUpdateClick(form)
                },
            });
            form.option("items", mainGroupItems);
        }
        
    
        mainGroupItems.push({
            colSpan: 2,
            editorType: "dxButton",
            editorOptions: {
                text: "Schowaj formularz",
                onClick: () => e.popup.option("visible", false)
            },
        });
        form.option("items", mainGroupItems);

        mainGroupItems.push({
            colSpan: 2,
            editorType: "dxButton",
            editorOptions: {
                text: "Usuń",
                onClick: handleDeleteClick
            },
        });
        form.option("items", mainGroupItems);
    

    }


    const onCellClick = (e) => {
        console.log('Cell clicked: ', e);
      };

    return(
        <>
            <Scheduler 
                onAppointmentFormOpening={onAppointmentFormOpening}
                dataSource={appointments}
                defaultCurrentDate={new Date()} 
                firstDayOfWeek={1}
                startDayHour={7}
                endDayHour={22}
                appointmentRender={renderAppointment}
                appointmentTooltipRender={renderAppointmentTooltip}
                onCellClick={onCellClick}
                onAppointmentAdding={onAppointmentAdding}
                onAppointmentAdded={onAppointmentAdded}
                onAppointmentUpdated={onAppointmentUpdated}
                onAppointmentDeleted={onAppointmentDeleted}
                // addApointment={addApointment} # nie ma takiego propsa
                // appointmentTemplate={CustomAppointmentForm}
                ref={schedulerRef}
            />
        </>
    )
}

export default TESTSCHEDULER;