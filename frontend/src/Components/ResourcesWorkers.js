import axios from 'axios'
import React, {useState} from 'react'
import { Button, Table } from 'react-bootstrap'
import { deleteWorker } from '../features/requests'
import { useSelector } from 'react-redux'

function ResourcesWorkers({workers, ...props}) {
  const {token} = useSelector(state => state.auth.userData )
  const deleteHandler = (workerId) => {
    deleteWorker(workerId, token)
    .then(function(response){
      if (response.status===200){
        props.reload()
        props.deleteWorkerHandler(workerId)
      }
    }).catch(error => console.log(error))
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Pracownik</th>
          <th>Ubezpieczenie (do)</th>
          <th>Umowa (do)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {workers.map((worker, index) =>(
          <tr key={index}>
            <td>{index+1}</td>
            <td>{worker.workerId}</td>
            <td>{worker.insurance.substring(0, 10)}</td>
            <td>{worker.agreement.substring(0, 10)}</td>
            <td style={{display: "flex", justifyContent: "center"}}>
              {/* <Button variant='dark' className='mx-2'>Edytuj</Button> */}
              <Button variant='danger' onClick={() => deleteHandler(worker.id)}>Usuń</Button>
            </td>
        </tr>
        ))}
        

      </tbody>
    </Table>
  )
}

export default ResourcesWorkers