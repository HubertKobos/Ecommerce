import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Alert } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import { 
    calculateTotal,
    removeItem,
    changeQty,
    clearCartWithState,
    deleteDiscount,
    applyDiscount 
} from "../Redux/CartSlice";
import Layout from "../Components/Layout/Layout";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get products from redux state
  const { items, total, capacity } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.auth);
  const [discount, setDiscount] = useState(0);
  const [warning, setWaring] = useState(false);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, items]);

  useEffect(() => {
    setWaring(false);
    items.map((item) => {
      if (item.qty > item.count_in_stock) {
        setWaring(true);
      }
    });
  });

  useEffect(() => {
    console.log(total, discount);
    if (total < Number(discount)) {
      dispatch(deleteDiscount());
      setDiscount(0);
    }
  }, [discount, items, dispatch, total]);

  const buttonHandler = () => {
    if (userData.length !== 0) {
      navigate("/wysylka");
    } else {
      navigate("/wysylka/login");
    }
  };

  const discountHandler = () => {
    if (Number(discount) <= 100) {
      dispatch(applyDiscount(userData.discount_points));
      setDiscount(Number(userData.discount_points));
    }
  };

  const handleQty = (e, item) => {
    dispatch(changeQty({ item: item, newQty: e.target.value }));
  };
  console.log(total < userData.discount_points + 1);
  console.log(total);
  console.log(parseInt(userData.discount_points + 1));
  return (
        <Layout 
            content={
                <div>
                    <Row>
        <Col>
          <h1 className="mb-4">Twój koszyk</h1>
          {items.length === 0 ? (
            <>
              <Alert>Nie masz żadnych produktów w koszyku</Alert>
              <Link to="/" className="btn btn-dark">
                Wróć
              </Link>
            </>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Podgląd</th>
                  <th>Nazwa</th>
                  <th>Cena za jednostkę</th>
                  <th>Ilość</th>
                  <th>Cena za cały produkt</th>
                  <th width={10}>Usuń</th>
                </tr>
              </thead>
              <tbody sm={2} lg={2}>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.itemIndex}</td>
                    <td height={100} width={250}>
                      <Image
                        src={`data:image/jpeg;base64,${item.image}`}
                        style={{ width: "100%" }}
                        alt={"Brak zdjęcia"}
                        fluid
                        rounded
                      />
                    </td>
                    <td>
                      <Link
                        to={`/product/${item.id}`}
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      {item.price} zł/{item.storageUnit.toLowerCase()}
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min={1}
                        max={item.count_in_stock}
                        value={item.qty}
                        onChange={(e) => handleQty(e, item)}
                      >
                        {/* {
                                            [...Array(item.count_in_stock).keys()].map((x)=>(
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))
                                        } */}
                      </Form.Control>
                      <Form.Text className="text-muted">
                        (max. {item.count_in_stock})
                      </Form.Text>
                    </td>
                    <td>
                      {(parseFloat(item.price) * parseInt(item.qty)).toFixed(2)}{" "}
                      zł
                    </td>
                    <td>
                      <Button
                        onClick={() => dispatch(removeItem(item.id))}
                        variant="dark"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      {!(items.length === 0) && (
        <div>
          <Button variant="dark" onClick={() => dispatch(clearCartWithState())}>
            Wyczyść cały koszyk
          </Button>
          <br />
          <br />
          {userData.token ? (
            <div style={{ display: "block" }}>
              <h4>
                Razem do zapłaty: {total.toFixed(2)} zł{" "}
                {discount > 0 &&
                  total > userData.discount_points &&
                  `(w tym rabat ${discount} zł)`}
              </h4>
              {userData.discount_points >= 100 && (
                <>
                  <p>
                    Posiadasz {userData.discount_points}zł rabatu, który możesz
                    wykorzystać do obniżenia kwoty całościowej za ten koszyk!
                  </p>
                  <Form>
                    <Form.Group>
                      <Form.Text className="muted">
                        Korzystając z rabatu wykorzystujesz całość posiadanego
                        rabatu
                      </Form.Text>
                    </Form.Group>
                    <Button
                      variant="dark"
                      onClick={discountHandler}
                      disabled={total < parseInt(userData.discount_points) + 1}
                    >
                      Dodaj rabat
                    </Button>
                  </Form>
                </>
              )}
              <div
                style={{ float: "right" }}
                className="d-flex flex-column align-items-center"
              >
                {/* <Link to='/wysylka'>
                        </Link> */}
                <Button
                  variant="dark"
                  onClick={buttonHandler}
                  disabled={warning}
                >
                  Dokonaj zakupu
                </Button>
                {warning && <p className="text-muted">Sprawdź ilość towarów</p>}
              </div>
            </div>
          ) : (
            <div
              style={{ display: "block" }}
              //   className="d-flex flex-column align-items-center"
            >
              <h4>
                Razem do zapłaty: {total.toFixed(2)} zł{" "}
                {discount > 0 && `(w tym rabat ${discount} zł)`}
              </h4>
              <p className="muted">
                Dokunując zakupu bez logowania się tracisz możliwość uzyskania
                rabatu, który możeszy wykorzystać przy kolejnych zakupach
              </p>
              <Button variant="dark" onClick={() => navigate("/login")}>
                Zaloguj się
              </Button>
              <div style={{ float: "right" }}>
                {/* <Link to='/wysylka'>
                            </Link> */}
                <Button
                  variant="dark"
                  onClick={buttonHandler}
                  disabled={warning}
                >
                  Dokonaj zakupu
                </Button>
                {warning && <p className="text-muted">Sprawdź ilość towarów</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
            }
        />
      
  );
}