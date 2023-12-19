import React from "react";
import Header from "./Header";
import { Col, Row } from "react-bootstrap";

function Layout({
  left_col = null,
  middle_col = null,
  right_col = null,
  content = null,
}) {
  return (
    <div>
      <Header />
      {left_col === null && middle_col === null && right_col === null ? (
        <div className="body_without_header">{content}</div>
      ) : (
        <Row>
          <Col style={{ marginTop: "30px", marginLeft: "20px" }}>
            {left_col}
          </Col>
          <Col xs={6} style={{ marginTop: "30px" }}>
            {middle_col}
          </Col>
          <Col>{right_col}</Col>
        </Row>
      )}
    </div>
  );
}

export default Layout;
