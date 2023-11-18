import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomerNavbar from "./customernavbar";
import NotFoundPage from "./fourofour";

function Showproducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/getproducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched product data:", data);
        // Filter products with IsActive equal to 1
        const activeProducts = data.filter((product) => product.IsActive === 1);
        setProducts(activeProducts);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  const cardStyle = {
    margin: "10px",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#fff",
    border: "2px solid grey",
  };

  const imageStyle = {
    objectFit: "cover",
    maxHeight: "200px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    color: "#fff",
    transition: "background-color 0.3s",
  };

  const scrollContainerStyle = {
    maxHeight: "70vh",
    overflowY: "auto",
  };

  return (
    <>
      {localStorage.getItem('role') === 'customer' ?
        <>
          <CustomerNavbar />
          <Container className="my-5" style={scrollContainerStyle}>
            <Row xs={1} md={3} className="g-4">
              {products.map((product) => (
                <Col key={product.ProductID} className="mb-4">
                  <Card style={cardStyle}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:4000/images/${product.Images}`}
                      style={imageStyle}
                    />
                    <Card.Body>
                      <Card.Title>{product.Name}</Card.Title>
                      <Card.Text>
                        <strong>Price:</strong> PKR {product.Price}
                        <br />
                        <strong>Condition:</strong> {product.Condition}
                        <br />
                        <strong>Category:</strong> {product.Category}
                        <br />
                        <strong>Location:</strong> {product.Location}
                      </Card.Text>
                      <Link to={`/customer/product/${product.ProductID}`}>
                        <Button style={buttonStyle}>Details</Button>
                      </Link>

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
        : <NotFoundPage />}
    </>
  );
}

export default Showproducts;
