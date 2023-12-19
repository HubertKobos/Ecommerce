import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const temp_img_src = "https://picsum.photos/id/237/200/200";
  const dataURI = `data:image/jpeg;base64,${product.image}`;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img src={dataURI} variant="top" alt="Brak zdjęcia" fluid />
        <Card.Title className="mt-2">
          {product.name.length > 22
            ? product.name.substring(0, 22) + "..."
            : product.name}
        </Card.Title>
        <Card.Text className="mb-2">
          {product.description.length > 30
            ? product.description.substring(0, 29) + "..."
            : product.description}
        </Card.Text>
        <Card.Text>
          Cena: {product.price} zł/{product.storageUnit}
        </Card.Text>
        <Link to={`product/${product.id}`}>
          <Button variant="outline-dark">Więcej</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
