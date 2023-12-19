import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, getOrders } from "../features/requests";
import Table from "react-bootstrap/Table";
import OrderDetailsPopup from "../Components/OrderDetailsPopup";
import axios from "axios";
import Loader from "../Components/Loaders/Loader";
import Layout from "../Components/Layout/Layout";

function AccountScreen() {
  const [emailForm, setEmailForm] = useState();
  const [old_password, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [modelShow, setModalShow] = useState(false);
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
//   const { isLoading, error, orders } = useSelector((state) => state.orders);
  const { access, id, token, email, isAdmin, discount_points } = useSelector(
    (state) => state.auth.userData
  );

  useEffect(() => {
    // dispatch(getOrders(id));
    getOrders(id, token).then(response =>{
        if(response.status===200){
            setIsLoading(false)
            console.log(response.data)
        }
    }).catch(error => console.log(error))
  }, []);

  const changePasswordHandler = () => {
    if(password === confirmPassword){
      changePassword(
        {
          "id": id,
          "oldPassword":old_password,
          "newPassword": password
        },
        token
      ).then(response => console.log(response))
      .catch(error => console.log(error))
      
    }
  }


  console.log(orders);
  return (
    <Layout 
        content={
            <Row>
      <Col md={3}>
        <h3 className="mb-4">Dostępny rabat: {discount_points}zł</h3>
        <h2>Zmień hasło</h2>

        {/* {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>} */}
        {/* {loading && <Loader />} */}
        <Form>
          {/* <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group> */}

          {/* <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Wpisz adres email"
              onChange={(e) => setEmailForm(e.target.value)}
            ></Form.Control>
          </Form.Group> */}

          <Form.Group controlId="password">
            <Form.Label>Poprzednie hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz poprzednie hasło"
              onChange={(e) => setOldPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="new_password">
            <Form.Label>Nowe hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz nowe hasło"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password_confirm">
            <Form.Label>Potwierdź nowe hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz nowe hasło"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            className="mt-3"
            onClick={() => changePasswordHandler()}
          >
            Aktualizuj
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>Historia zakupów</h2>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Loader variant="danger">{error}</Loader>
        ) : (
          <Table striped responsive className="table-sm" bordered>
            <thead>
              <tr>
                <th>ID</th>
                {/* <th>Stworzenie zamówienia (data)</th> */}
                <th>Do zapłaty</th>
                <th>Metoda transportu</th>
                <th>Metoda płatnosci</th>
                <th>Dostarczone</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  style={
                    order.is_delivered
                      ? { background: "rgb(153, 255, 153)" }
                      : { background: "rgb(255, 153, 153)" }
                  }
                >
                  <td>{order.id}</td>
                  {/* <td>{order.created_at.substring(0, 19).replace("T", " ")}</td> */}
                  <td>{order.total_price} zł</td>
                  <td>
                    {order.transport_method === "home_transport"
                      ? "transport pod adres"
                      : "odbiór osobisty"}
                  </td>
                  <td>{order.payment_method === "office" && "w biurze"}</td>
                  {/* <td>{order.is_paid ? order.paid_at.substring(0, 19).replace("T", " ") : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td> */}
                  <td>
                    {order.is_delivered ? "dostarczono" : "nie dostarczono"}
                  </td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      className="btn-sm"
                      variant="dark"
                      onClick={() => setModalShow(true)}
                    >
                      Szczegóły
                    </Button>
                    <OrderDetailsPopup
                      show={modelShow}
                      onHide={() => setModalShow(false)}
                      order={order}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
        }
    />

    
  );
}

export default AccountScreen;
