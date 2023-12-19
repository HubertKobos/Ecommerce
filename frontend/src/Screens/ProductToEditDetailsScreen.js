import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, ListGroupItem, Button, Form, Alert, Spinner} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// import { getItem } from '../features/gettingItems/getItemSlice'
import axios from 'axios'
// import { createProduct } from '../features/products/createProductSlice'
// import { updateProduct } from '../features/products/updateProductSlice'
import Layout from '../Components/Layout/Layout'
import ManagmentHeader from '../Components/Layout/ManagementHeader'
import { getProductDetails } from '../features/requests'

export default function ProductToEditDetailsScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token} = useSelector(state => state.auth.userData)
    const Item = useSelector(state => state.getItem)
    const [item, setItem] = useState()
    const { id } = useParams()
    const[name, setName] = useState()
    const[countInStock, setCountInStock] = useState()
    const[storageUnit, setStorageUnit] = useState()
    const[description, setDescription] = useState()
    const[price, setPrice] = useState()
    const[deliveredFrom, setDeliveredFrom] = useState()
    const[picture, setPicture] = useState()
    const[pictureToRender, setPictureToRender] = useState()
    const[loading, setLoading] = useState(true)

    useEffect(() =>{
        getProductDetails(id, token).then(response => 
            {
                if(response.status === 200){
                    setItem(response.data)
                    setLoading(false)
        }}).catch(error => console.log(error))
        // dispatch(getItem(id)).then(() => setLoading(false))
    }, [id])
    
    useEffect(() => {
        if(Item?.items){
            setName(Item.items.name)
            setCountInStock(Item.items.count_in_stock)
            setStorageUnit(Item.items.storage_unit)
            setDescription(Item.items.description)
            setPrice(Item.items.price)
            setDeliveredFrom(Item.items.delivered_from)
            setPicture(Item.items.image)
            setPictureToRender(Item.items.image)
        }
    }, [Item])

    const deleteHandler = async(id) =>{
        try{
          const resp = await axios.delete(
            `http://127.0.0.1:8000/api/product/delete/${id}/`
          )
          navigate('/wyswietl_produkty')
          return resp.data
        }catch(error){
          console.log(error)
        } 
      }

    const updateHandler = async(id) =>{
        const formData = {
            'name': name,
            'count_in_stock': countInStock,
            "storage_unit": storageUnit,
            "description": description,
            "price": price,
            "deliveredFrom": deliveredFrom,
            "image": picture
        }
        console.log('przesyłam', formData)
        // dispatch(updateProduct({"email": userInfo['userData']['email'], "id": id, "formData": formData}))
        navigate("/wyswietl_produkty")

    }
    
    return (
        <>
            <Layout 
                content={
                    <div>
                        <ManagmentHeader />
                        <Link to='/wyswietl_produkty'><Button variant='dark' className='my-1'>Wróć</Button></Link>
            {loading ? <h2><Spinner /></h2> : Item.error ? <Alert variant='danger' errorMessage={Item.error} /> :
                <Row>
                    <Col>
                        <Image src={pictureToRender} fluid />
                    </Col>
                    <Col>
                        <ListGroup variant="flush">
                        <Form >
                            <Form.Group className="mb-3" controlId="name" onChange={(e) => setName(e.target.value)}>
                                <Form.Label>Nazwa</Form.Label>
                                <Form.Control type="text" defaultValue={name} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="count_in_stock" onChange={(e) => setCountInStock(e.target.value)}>
                                <Form.Label>Ilość</Form.Label>
                                <Form.Control type="number" min="0" defaultValue={countInStock} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="storage_unit" onChange={(e) => setStorageUnit(e.target.value)}>
                                <Form.Label>Jednostka</Form.Label>
                                <div key={'inline-radio'}>
                                <Form.Check 
                                    inline
                                    type="radio"
                                    label="kg"
                                    name="group"
                                    id="inline-radio-kg"
                                    key="kg"
                                    value="kg"
                                    defaultChecked={storageUnit==="kg" && true}
                                />
                                <Form.Check 
                                    inline
                                    type="radio"
                                    label="l"
                                    name="group"
                                    id="inline-radio-l"
                                    value="l"
                                    defaultChecked={storageUnit==="l" && true}
                                />
                                <Form.Check 
                                    inline
                                    type="radio"
                                    label="szt."
                                    name="group"
                                    id="inline-radio-szt"
                                    key="szt"
                                    value="szt."
                                    defaultChecked={storageUnit==="szt." && true}
                                />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description" onChange={(e) => setDescription(e.target.value)}>
                                <Form.Label>Opis produktu</Form.Label>
                                <Form.Control type="text" defaultValue={description} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="price" onChange={(e) => setPrice(e.target.value)}>
                                <Form.Label>Cena za jednostkę (zł/{storageUnit})</Form.Label>
                                <Form.Control type="text" defaultValue={price} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="delivered_from" onChange={(e) => setDeliveredFrom(e.target.value)}>
                                <Form.Text className="text-muted">
                                Jeśli brak informacji odnośnię pochodzenia pozostaw puste
                                </Form.Text>
                                <br />
                                <Form.Label>Miejsce pochodzenia</Form.Label>
                                <Form.Control type="text" defaultValue={deliveredFrom} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="img" onChange={(e) => setPicture(e.target.files[0])}>
                                <Form.Label>Zdjęcie poglądowe</Form.Label>
                                <Form.Control type="file" name="img"/>
                            </Form.Group>
                        </Form>
                            
                            <ListGroupItem>
                                <Button variant='dark' onClick={() => updateHandler(id)}>Aktualizuj</Button>
                                <Button variant='danger' className='mx-2' onClick={() => deleteHandler(id)}>Usuń</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            }
                    </div>
                }
            />
            
            </>
    );
}