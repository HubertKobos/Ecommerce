import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loaders/Loader";
import Product from "../Components/Product";
import { Alert, Row, Col } from "react-bootstrap";
import { getAllProducts } from "../Redux/ProductsSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Header from "../Components/Layout/Header";
import Layout from "../Components/Layout/Layout";

function MainScreen() {
  const dispatch = useDispatch();
  const { items, errorMessage, isLoading } = useSelector(
    (state) => state.products
  );
  const { token } = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, [token]);
  return (
    <Layout
      content={
        <div>
          <h1>Nasza oferta</h1>
          {isLoading ? (
            <h2>
              <Loader />
            </h2>
          ) : errorMessage ? (
            <Alert variant="danger">{errorMessage}</Alert>
          ) : (
            <Row>
              {items.map((product) => {
                return (
                  <Col key={product.id} style={{ margin: "8px" }}>
                    {items && <Product product={product} />}
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      }
    />
  );
}

export default MainScreen;
