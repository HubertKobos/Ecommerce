import React, { createRef, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
// import { createProduct } from '../features/products/createProductSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import ManagmentHeader from '../Components/Layout/ManagementHeader'
import CreateProductForm from '../Components/Forms/CreateProductForm'

function AppendProductScreen() {
    const userData = useSelector(state => state.auth.userData)
  return (
    <Layout 
        content={
            <div>
                <ManagmentHeader />
                <CreateProductForm userData={userData}/>
            </div>
        }
    
    />
    
  )
}

export default AppendProductScreen