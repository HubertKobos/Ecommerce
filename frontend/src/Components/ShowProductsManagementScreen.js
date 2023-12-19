import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllItems } from '../features/gettingItems/getAllItemsSlice'
import ManagementProduct from './ManagementProduct'
import { Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout/Layout'
import ManagmentHeader from './Layout/ManagementHeader'
import { getAllProducts } from '../Redux/ProductsSlice'

function ShowProductsManagementScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {items} = useSelector(state => state.products)
    const {token} = useSelector(state => state.auth.userData)
    const isLoading = false;
    const error=false;


    useEffect(() =>{
        dispatch(getAllProducts(token))
      }, [])


    
  return (
    <Layout 
        content={
            <div>
                <ManagmentHeader />
                <h1>Nasza oferta</h1>
                <Button variant='dark' className='m-2' onClick={() => navigate('/dodaj_produkt')}>Dodaj produkt</Button>
                {isLoading ? <h2><Spinner /></h2> : error ? <Alert variant='danger' errorMessage={error} />: 
                    <Row>
                        {items.map(product =>{
                            return(
                                <Col key={product.id}>
                                    {items && <ManagementProduct product={product} /> } 
                                </Col>
                            )
                        })}
                    </Row>
                }
            </div>
            
            
        }
    />
  )
}

export default ShowProductsManagementScreen