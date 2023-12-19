import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/AuthSlice";
import { Alert } from "react-bootstrap";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { error } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      className="mt-4"
    >
      {error && (
        <div>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}

      <div>
        <Form
          onSubmit={submitHandler}
          style={{
            border: "solid 1px",
            padding: "40px",
          }}
        >
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ textAlign: "center" }}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Wpisz adres email"
              style={{ textAlign: "center" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ textAlign: "center" }}
            onChange={(e) => setPassword(e.target.value)}
          >
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz hasło"
              style={{ textAlign: "center", width: "300px" }}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Zaloguj
          </Button>
          <div style={{ display: "flex" }} className="mt-4">
            <h6 className="pt-2">Nie masz konta ?</h6>
            <Link to="/register" style={{ marginLeft: "auto" }}>
              <Button variant="dark">Zarejestruj się</Button>
            </Link>
          </div>
          <div style={{ display: "flex" }} className="mt-0">
            <Link to="/resetuj_haslo">
              <h6 className="pt-2" style={{ color: "black" }}>
                Nie pamiętasz swojego hasła ?
              </h6>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
