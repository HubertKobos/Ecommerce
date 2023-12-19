import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import { Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../features/requests";
import Loader from "../Components/Loaders/Loader";
import Layout from "../Components/Layout/Layout";
import { appendItem } from "../Redux/CartSlice";

export default function ProductScreen() {
  const { id } = useParams(); // dynamic params from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth.userData);
  const [product, setProductDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // quantity
  const [qty, setQty] = useState(1);
  const [dataURI, setDataURI] = useState()
  
  useEffect(() => {
    getProductDetails(id, token)
      .then((response) => {
        if(response.status === 200){
          setProductDetails(response.data);
          // setDataURI(`data:image/jpeg;base64,${product.image}`);
          setLoading(false);
        
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [id]);

  const addToCartHandler = () => {
    dispatch(appendItem({
      items: product,
      qty: qty
    }))
    // navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Layout
      content={
        <div>
          <Link to="/" className="btn btn-light my-3">
            Wróć
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row>
              <Col md={6}>
                <Image src={`data:image/jpeg;base64,${product.image}`} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3>{product.name}</h3>
                  </ListGroupItem>

                  {/* <ListGroupItem>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} opinie`}
                      color={"#f8e825"}
                    />
                  </ListGroupItem> */}

                  <ListGroupItem>Cena: {product.price} zł/t</ListGroupItem>

                  <ListGroupItem>Opis: {product.description}</ListGroupItem>
                </ListGroup>
              </Col>

              <Col md={3}>
                <Card>
                  <ListGroup>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Cena: </Col>
                          <Col>
                            <strong>{product.price} zł</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status: </Col>
                          <Col>
                            {product.countInStock > 0
                              ? "Dostępny"
                              : "Wyprzedano"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Ilość:</Col>
                            <Col xs="auto" className="my-1">
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {
                                  // here is an array out of countInStock, if the countInStock is 3 then array will be [0, 1, 2]
                                  [...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )
                                }
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item className="text-center">
                        <Button
                          className="btn-block "
                          disabled={product.countInStock == 0}
                          type="button"
                          onClick={addToCartHandler}
                          variant="dark"
                        >
                          Dodaj do koszyka
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      }
    />
  );
}
