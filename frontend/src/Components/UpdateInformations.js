import React from 'react'
import { Alert, Spinner } from 'react-bootstrap'


function UpdateInformations(props) {
  console.log(props)
  return (
    <>
      {props.loading ? <Spinner/> :
        props.cars.map((car) =>(
          <Alert variant="info" className='mb-1 p-1'>
            <p key={car.id}>
              
              {car.is_insurance_expired && car.is_service_expired ? `Dnia ${car.insurance} wygasa ubezpieczenie oraz dnia ${car.service} wygasa przegląd dla ${car.model} ${car.brand} o rejestracji ${car.registration}`
            :
              car.is_insurance_expired || car.is_service_expired && `Dnia ${car.is_insurance_expired && car.insurance} ${car.is_service_expired && car.service} wygasa ${car.is_insurance_expired && "ubezpieczenie"} ${car.is_service_expired && "przegląd techniczny"} dla ${car.model} ${car.brand} o rejestracji ${car.registration}`
            }</p>
            
          </Alert>
        ))
        .concat(
          props.workers.map((worker)=>(
            <Alert variant="info" className='mb-1 p-1'>
            <p key={worker.id}>
              {worker.is_agreement_expired && worker.is_insurance_expired ? `Dnia ${worker.agreement} wygasa umowa oraz dnia ${worker.insurance} wygasa ubezpieczenie dla pracownika ${worker.worker_id}`
            :
            worker.is_agreement_expired || worker.is_insurance_expired && `Dnia ${worker.is_agreement_expired && worker.agreement} ${worker.is_insurance_expired && worker.agreement} wygasa ${worker.is_agreement_expired && "umowa"} ${worker.is_insurance_expired && "ubezpieczenie"} dla pracownika ${worker.worker_id}`
            }</p>
          </Alert>
          ))
        )
        
      }
    </>
  )
}

export default UpdateInformations