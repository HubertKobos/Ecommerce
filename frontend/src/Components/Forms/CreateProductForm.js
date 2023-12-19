import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../features/requests'
import bigDecimal from 'js-big-decimal'
function CreateProductForm({userData}) {
    
    const navigate = useNavigate()

    const[name, setName] = useState()
    const[countInStock, setCountInStock] = useState()
    const[storageUnit, setStorageUnit] = useState()
    const[description, setDescription] = useState()
    const[price, setPrice] = useState()
    const[deliveredFrom, setDeliveredFrom] = useState()
    const[picture, setPicture] = useState([])

    const submitHandler = async(e) =>{
        e.preventDefault()
        const formData = new FormData()
        var data = {}
        // var formData = {}
        // data['email'] = userData.email
        data['name'] = name
        data['countInStock'] = parseInt(countInStock)
        data['storageUnit'] = storageUnit.toUpperCase()
        data['description'] = description
        data['price'] = new bigDecimal(price).getValue()
        data['deliveredFrom'] = deliveredFrom
        
        formData.append("file", picture)
        formData.append("product", new Blob([JSON.stringify(data)], {type:'application/json'}))
        
        createProduct(formData, userData.token).then(response => {
            if(response.status === 201){
                navigate('/wyswietl_produkty')
            }
        }).catch(error => console.log(error))
        
    }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name" onChange={(e) => setName(e.target.value)}>
        <Form.Label>Nazwa</Form.Label>
        <Form.Control type="text" placeholder="Wpisz nazwe" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="count_in_stock" onChange={(e) => setCountInStock(e.target.value)}>
        <Form.Label>Ilość</Form.Label>
        <Form.Control type="number" min="0" placeholder="Wpisz ilość" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="storage_unit" onChange={(e) => setStorageUnit(e.target.value)}>
        <Form.Label>Jednostka:</Form.Label>
        <br />
        <div key={'inline-radio'}>
          <Form.Check 
            inline
            type="radio"
            label="kg"
            name="group"
            id="inline-radio-kg"
            key="kg"
            value="kg"
          />
          <Form.Check 
            inline
            type="radio"
            label="l"
            name="group"
            id="inline-radio-l"
            value="l"
          />
          <Form.Check 
            inline
            type="radio"
            label="wor."
            name="group"
            id="inline-radio-szt"
            key="bag"
            value="bag"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description" onChange={(e) => setDescription(e.target.value)}>
        <Form.Label>Opis produktu</Form.Label>
        <Form.Control type="text" placeholder="Wpisz opis produktu" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="price" onChange={(e) => setPrice(e.target.value)}>
        <Form.Label>Cena za jednostkę</Form.Label>
        <Form.Control type="text" placeholder="Wpisz cenę za jednostkę" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="delivered_from" onChange={(e) => setDeliveredFrom(e.target.value)}>
        <Form.Text className="text-muted">
          Jeśli brak informacji odnośnię pochodzenia pozostaw puste
        </Form.Text>
        <br />
        <Form.Label>Miejsce pochodzenia</Form.Label>
        <Form.Control type="text" placeholder="Wpisz miejsce pochodzenia" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="img" onChange={(e) => setPicture(e.target.files[0])}>
        <Form.Label>Zdjęcie poglądowe</Form.Label>
        <Form.Control type="file" placeholder="Wpisz opis produktu" name="img"/>
      </Form.Group>

      <Button variant="dark" type="submit">
        Dodaj
      </Button>
    </Form>
  )
}

export default CreateProductForm