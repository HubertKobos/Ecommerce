import axios from 'axios'
import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../features/requests'
import { getAllProducts } from '../Redux/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from '../Redux/ProductsSlice'

function ManagementProduct({product}) {
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth.userData)
  
  const deleteHandler = async(id) =>{
    deleteProduct(product.id, token).then(response => {
      if(response.status === 200){
      dispatch(deleteItem(product.id)) 
    }}).catch(error => console.log(error))
  
  }
  

  const dataURI = `data:image/jpeg;base64,${product.image}`;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Img src={dataURI} variant='top' alt="Brak zdjęcia" fluid />
        <Card.Title className='mt-2'>{product.name}</Card.Title>
        <Card.Text className='mb-2'>{product.description.length>30 ? product.description.substring(0, 29)+'...' : product.description}</Card.Text>
        <Card.Text>Cena: {product.price} zł/t</Card.Text>
        <Link><Button variant='danger' className='mx-2' onClick={() => deleteHandler(product.id)}>Usuń</Button></Link>
        <Link to={`/edytuj_produkt/${product.id}`}><Button variant='outline-dark'>Więcej</Button></Link>
      </Card.Body>
    </Card>
  )
}

export default ManagementProduct