import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { appendDeliveryDate } from '../../Redux/BookedDeliverySlice';
const url = 'http://127.0.0.1:8000/api/calendar/save'


export default function PopupScheduler(props) {
    // console.log(props.events)
    const dispatch = useDispatch()
    console.log("props", props)
    const {shippingAddress} = useSelector(state => state.shippingAddress)
    // console.log(props.datestodelete)

    // const [displayDates, setDisplayDates] = useState([])

    function createDatesArray(fromDate, toDate) {
        let datesArray = [];
        let currentDate = new Date(fromDate);
        while (currentDate <= toDate) {
          if (currentDate.getDay() > 0 && currentDate.getDay() < 6) {
            for (let hour = 9; hour < 15; hour++) {
              for (let minute = 0; minute < 60; minute += 30) {
                let date = new Date(currentDate);
                date.setHours(hour, minute, 0, 0);
                datesArray.push(date);
              }
            }
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesArray;
      }

      let fromDate = new Date(Date.now() + 864e5);
      let toDate = new Date(Date.now() + 6048e5);
      let datesArray = createDatesArray(fromDate, toDate);

      
    //   console.log(new Date(datesArray[6]).toLocaleString(), new Date(props.datestodelete.data[0].planned_delivered_at).toLocaleString())
      const datesArr = formatDatesArray(datesArray, props.datestodelete)
      function formatDatesArray(datesArray, datesToDelete){
        let new_array = new Array()
        for(const item of datesToDelete){
            let temp = new Date(item.planned_delivered_at).toLocaleString()
            const [date, time] = temp.split(", "); // split the date and time parts
            const [day, month, year] = date.split("."); // split the day, month, and year parts
            const [hours, minutes, seconds] = time.split(":"); // split the hours, minutes, and seconds parts

            // create a new Date object using the parsed parts
            const newDate = new Date(year, month - 1, day, hours, minutes, seconds);
            new_array.push(newDate)
            // new_array.push(temp)
            // console.log(temp)
          }
        //   console.log(new_array[3], datesArray[26])
          for (let i = 0; i < datesArray.length; i++) {
            const date2 = datesArray[i];
            for (let j = 0; j < new_array.length; j++) {
              const date1 = new_array[j];
              if (date2.getTime() === date1.getTime()) {
                datesArray.splice(i, 1);
                i--;
                break;
              }
            }
          }
        //   console.log(datesArray)
        return datesArray


        }
        const formattedDates = format(datesArr)
        function format(datesArray){
            // Obiekt do przechowywania unikalnych dat w formacie "dzień.miesiąc"
            const uniqueDates = {};

            // Iteracja po wszystkich datach
            for (let date of datesArray) {
            // Pobranie dnia i miesiąca z daty
            const day = date.getDate();
            const month = date.getMonth() + 1;
            
            // Utworzenie klucza dla obiektu uniqueDates
            const key = `${day}.${month}`;
            
            // Dodanie daty do obiektu uniqueDates, jeśli nie istnieje już taki klucz
            if (!uniqueDates[key]) {
                uniqueDates[key] = date;
            }
            }
            // Pobranie unikalnych dat z obiektu uniqueDates
            const uniqueDatesArray = Object.values(uniqueDates);
            // return uniqueDatesArray
            // Konwersja dat do formatu "dzień.miesiąc" i zapisanie ich w tablicy
            const formattedDates = uniqueDatesArray.map(date => {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                return `${day}.${month}`;
                });
                // setDisplayDates(formattedDates)
                return formattedDates
            }
            const uniqueDates = [...new Set(datesArr.map(date => date.toDateString()))];
            const firstUniqueDayHours = datesArr.filter(date => date.toDateString() === uniqueDates[0]);
            const secondUniqueDayHours = datesArr.filter(date => date.toDateString() === uniqueDates[1]);
            const thirdUniqueDayHours = datesArr.filter(date => date.toDateString() === uniqueDates[2]);
            const fourthUniqueDayHours = datesArr.filter(date => date.toDateString() === uniqueDates[3]);
            const fifthUniqueDayHours = datesArr.filter(date => date.toDateString() === uniqueDates[4]);
            console.log("datesArr", firstUniqueDayHours)

      function deleteBookedDatesFromDatesArray(){
        // console.log("datesArray: ", datesArray)
        // var receivedEvents = new Date(props.events.data)
        // console.log(props.events.data)

      }
      deleteBookedDatesFromDatesArray()


      function clickHandler(e, date){
        console.log("inside", e, date)    
        const convert_date = String(date[3]) + String(date[4] + '.' + String(date[0]) + String(date[1]) + String(date[5]) + String(date[6]) + String(date[7])+ String(date[8])+ String(date[9]))
        console.log(convert_date)
        const new_date = new Date(String(convert_date) + ' ' + String(e.target.innerHTML))
        const start_date = new Date(new_date.getTime() - 18e5) // - 20 minutes
        const end_date = new Date(new_date.getTime() + 18e5) // + 20 minutes
        console.log("start_date", start_date)
        console.log("new_date", new_date)
        console.log("end_date", end_date)
        function saveNewDate(){ // saving calendar event
            const data_obj = {
                shipping_address: {
                    address: shippingAddress.address,
                    city: shippingAddress.city,
                    postal_code: shippingAddress.postalCode,
                    country: shippingAddress.country,
                    // shipping_price: formData.totalPrice
                },
                planned_delivered_at: new_date,
                startDate: start_date,
                endDate: end_date,
                phone_number: shippingAddress.telNumber,
                email: 'hkobos63@gmail.com', // zmienić po potwierdzeniu zakupu !
                is_paid: true,
                total_price: "12.00",
            }
            // console.log("data_obj -> ", data_obj)
            axios.post(url, data_obj)
            .then(function(response){
                if (response.status === 200){
                    // localStorage.setItem("isBookedDateHIU", true)
                    dispatch(appendDeliveryDate(new_date))

                }
            })
            .catch(function(error){
                // localStorage.setItem("isBookedDateHIU", false)
                console.log("error", error)
            })
        }
        saveNewDate()

        // console.log("new_date: ", new_date)
      }
    //   console.log(uniqueDatesArray)
    return (
        <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Wybierz godzinę dostawy
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <h4>Centered Modal</h4> */}
            <Table>
                <tbody>
                    <tr>
                        <th>{formattedDates[0]}</th>
                        {/* {datesArray[0].toLocaleDateString([], {day: '2-digit', month: '2-digit'})} */}
                        {firstUniqueDayHours.map((event, index) => {
                            return(
                                <td key={index} onClick={(e)=>clickHandler(e, firstUniqueDayHours[index].toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}))}><Button size='sm' variant='outline-dark'>{event.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Button></td>
                            )
                        })}
                    </tr>
                    

                    <tr>
                        {/* <th>{datesArray[14].toLocaleDateString([], {day: '2-digit', month: '2-digit'})}</th> */}
                        <th>{formattedDates[1]}</th>
                        {secondUniqueDayHours.map((event, index) => {
                            return(
                                <td key={index} onClick={(e)=>clickHandler(e, secondUniqueDayHours[index].toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}))}><Button size='sm' variant='outline-dark'>{event.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Button></td>
                            )
                        })}
                    </tr>

                    <tr>
                        {/* <th>{datesArray[28].toLocaleDateString([], {day: '2-digit', month: '2-digit'})}</th> */}
                        <th>{formattedDates[2]}</th>
                        {thirdUniqueDayHours.map((event, index) => {
                            return(
                                <td key={index} onClick={(e)=>clickHandler(e, thirdUniqueDayHours[index].toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}))}><Button size='sm' variant='outline-dark'>{event.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Button></td>
                            )
                        })}
                    </tr>

                    <tr>
                        {/* <th>{datesArray[42].toLocaleDateString([], {day: '2-digit', month: '2-digit'})}</th> */}
                        <th><th>{formattedDates[3]}</th></th>
                        {fourthUniqueDayHours.map((event, index) => {
                            return(
                                <td key={index} onClick={(e)=>clickHandler(e, fourthUniqueDayHours[index].toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}))}><Button size='sm' variant='outline-dark'>{event.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Button></td>
                            )
                        })}
                    </tr>

                    <tr>
                        {/* <th>{datesArray[56].toLocaleDateString([], {day: '2-digit', month: '2-digit'})}</th> */}
                        <th><th>{formattedDates[4]}</th></th>
                        {fifthUniqueDayHours.map((event, index) => {
                            return(
                                <td key={index} onClick={(e)=>clickHandler(e, fifthUniqueDayHours[index].toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}))}><Button size='sm' variant='outline-dark'>{event.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Button></td>
                            )
                        })}
                    </tr>

                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            {/* <Button onClick={props.onHide} variant='dark'>Zamknij</Button> */}
            <Button variant='dark'>Zatwierdź</Button>
        </Modal.Footer>
        </Modal>
  );
}

