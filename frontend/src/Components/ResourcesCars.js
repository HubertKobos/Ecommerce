import React from 'react'
import {Table} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import { deleteCar } from '../features/requests'
import { useSelector } from 'react-redux'

function ResourcesCars({cars, ...props}) {
  const {token} = useSelector(state => state.auth.userData)

  const deleteHandler = (carId) => {
    deleteCar(carId, token).then(response =>{
        if(response.status === 200){
            props.deleteCarHandler(carId)
        }
    }).catch(error => console.log(error))
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Marka</th>
          <th>Model</th>
          <th>Rejestracja</th>
          <th>Ubezpieczenie (do)</th>
          <th>Przegląd (do)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) =>(
          <tr key={index}>
            <td>{index+1}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.registration}</td>
            <td>{car.insurance.substring(0, 10)}</td>
            <td>{car.service.substring(0, 10)}</td>
            <td style={{display: "flex", justifyContent: "center"}}>
              {/* <Button variant='dark' className='mx-2'>Edytuj</Button> */}
              <Button variant='danger' onClick={() => deleteHandler(car.id)}>Usuń</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ResourcesCars