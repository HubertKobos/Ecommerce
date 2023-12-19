import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { register } from "../../Redux/AuthSlice";

function RegisterForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data_obj = {
        email: email,
        password: password,
      };
      dispatch(register(data_obj));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Form>
        <Form.Text className="text-muted">
          Załóż swoje konto w celu otrzymywania zniżek zakupowych
        </Form.Text>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <br />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Wpisz adres email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Wpisz hasło"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Potwierdź swoje hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Wpisz hasło"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <div style={{ display: "flex" }}>
          <Button
            variant="dark"
            type="submit"
            style={{ marginLeft: "auto" }}
            onClick={(e) => submitHandler(e)}
          >
            Załóż konto
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
