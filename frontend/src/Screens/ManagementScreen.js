import React, {useEffect, useState} from 'react'
import CustomCalendar from '../Components/CustomCalendar'
import ManagmentHeader from '../Components/Layout/ManagementHeader'
import TESTSCHEDULER from '../Components/TestScheduler'
import CustomScheduler from '../Components/devExpressScheduler/CustomScheduler'
import UpdateInformations from '../Components/UpdateInformations'
import axios from 'axios'
import Layout from "../Components/Layout/Layout"

function ManagementScreen() {
  const WorkersURL = 'http://127.0.0.1:8000/api/notification/workers'
  const CarsURL = 'http://127.0.0.1:8000/api/notification/cars'
  const[loading, isLoading] = useState(true)
  const[carsLoading, setCarsLoading] = useState(true)
  const[workersLoading, setWorkersLoading] = useState(true)
  const[workers, setWorkers] = useState([{
    "is_insurance_expired": true,
    "is_agreement_expired": true,
    "worker_id": "12312313",
    "insurance": "2006-10-25",
    "agreement": "2006-10-25"

  }])
  const[cars, setCars] = useState([{
    "is_insurance_expired": true,
    "is_service_expired": true,
    "brand": "brand",
    "model": "model",
    "registration":"asd",
    "instaurance": "2006-10-25", 
    "service": "2006-10-25"
  }])

  async function getNotifications() {
    await axios.get(WorkersURL)
    .then(function(response){
      if(response.status === 200){
        console.log("here")
        setWorkers(response.data)
        setWorkersLoading(false)
      }
    })
    .catch(function(error){
      console.log(error)
    })

    await axios.get(CarsURL)
    .then(function(response){
      if (response.status === 200){
        setCars(response.data)
        setCarsLoading(false)
      }
    })
    .catch(function(error){
      console.log(error)
    })
     if(carsLoading && workersLoading){
      isLoading(false)
     }
  }
  useEffect(() =>{
    getNotifications()
  }, [])

  return (
    <Layout content={
      <div>
        <UpdateInformations workers={workers} cars={cars} loading={loading} />
        <ManagmentHeader />
        <CustomScheduler />
        {/* <TESTSCHEDULER /> */}
        {/* <CustomCalendar /> */}
    </div>  
    }/>

    
  )
}

export default ManagementScreen