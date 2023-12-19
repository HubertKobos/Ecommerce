import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ResourcesCars from '../Components/ResourcesCars'
import ResourcesWorkers from '../Components/ResourcesWorkers'
import axios from 'axios'
import CreateCarPopup from '../Components/Popups/CreateCarPopup'
import CreateWorkerPopup from '../Components/Popups/CreateWorkerPopup'
import Layout from '../Components/Layout/Layout'
import { useSelector } from 'react-redux'
import { getAllResourceCars, getAllWorkers } from '../features/requests'

function ResourcesScreen() {
  const {token} = useSelector(state => state.auth.userData)

  const [cars, setCars] = useState()
  const [workers, setWorkers] = useState()
  const [loaderCars, setLoaderCars] = useState(false)
  const [loaderWorkers, setLoaderWorkers] = useState(false)
  const [createWorkerShow, setCreateWorkerShow] = useState(false)
  const [createCarShow, setCreateCarrShow] = useState(false)
  const [reload, setReload] = useState(false)

    
  useEffect(() =>{
    getAllWorkers(token).then(response =>{
        if(response.status === 200){
            setLoaderWorkers(false)
            setWorkers(response.data)
        }
    }).catch(error => console.log(error))
    
    getAllResourceCars(token).then(response =>{
        if(response.status === 200){
            setLoaderCars(false)
            setCars(response.data)
        }
    }).catch(error => console.log(error))
    console.log(workers)
  }, [])

  const newWorkerHandler = (worker) => {
    setWorkers(state => [...state, worker]);
  }
  const newCarHandler = (car) =>{
    setCars(state => [...state, car])
  }
  const deleteCarHander = (carId) =>{
    const newCars = cars.filter((car) => car.id !== carId)
    setCars(newCars)
  }
  const deleteWorkerHandler = (workerId) =>{
    const newWorkers = workers.filter((worker) => worker.id !== workerId)
    setWorkers(newWorkers);
  }
  return (
    
        <Layout 
            content={
                <div>
                    <CreateWorkerPopup newWorkerHandler={newWorkerHandler} show={createWorkerShow} onHide={() => setCreateWorkerShow(false)} reload={() => setReload(prev => !prev)}/>
                    <CreateCarPopup newCarHandler={newCarHandler} show={createCarShow} onHide={() => setCreateCarrShow(false)} reload={() => setReload(prev => !prev)} />
                    <Button variant='dark' className='mb-3 mx-2' onClick={() => setCreateWorkerShow(true)}>Dodaj pracownika</Button>
                    <Button variant='dark' className='mb-3' onClick={() => setCreateCarrShow(true)}>Dodaj auto</Button>
                    <h1>Auta</h1>
                    {!loaderCars && cars !== undefined ? <ResourcesCars deleteCarHandler={deleteCarHander} cars={cars} reload={() => setReload(prev => !prev)} /> : <Spinner />}
                    <h1>Pracownicy</h1>
                    {!loaderWorkers && workers !== undefined ? <ResourcesWorkers deleteWorkerHandler={deleteWorkerHandler} workers={workers} reload={() => setReload(prev => !prev)} /> : <Spinner />}
                </div>
            }
        />

      
  )
}

export default ResourcesScreen