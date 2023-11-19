import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import CustomerNavbar from "./customernavbar";
import NotFoundPage from "./fourofour";

function ViewSpecifiedProduct() {
  const { ProductID } = useParams();
  const history = useHistory();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/getspecefiedproducts/${ProductID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Failed to fetch product details:", error);
      });
  }, [ProductID]);

  const cardStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    borderRadius: "8px",
    overflow: "hidden",
    border: "3px solid grey",
  };

  const imageStyle = {
    maxHeight: "300px",
    objectFit: "cover",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",  // Change to column layout
    alignItems: "center",     // Center items horizontally
    marginTop: "20px",
  };

  const buttonStyle = {
    width: "48%", // Adjust the width as needed
  };

  const handleBuyNow = () => {
    // Add logic to handle the "Buy Now" button click
    console.log("Buy Now clicked");
  };

  const handleAddToCart = async () => {
    try {
      // Get UserID from local storage
      const UserID = localStorage.getItem('UserID');

      // Check if the product is already in the cart
      const isInCartResponse = await fetch('http://localhost:4000/isInCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ProductID: product.ProductID,
          UserID,
        }),
      });

      if (isInCartResponse.ok) {
        const { isInCart } = await isInCartResponse.json();

        if (isInCart) {
          // Product is already in the cart
          alert('This product is already in your cart.');
          return;
        }
      } else {
        console.error('Failed to check if the product is in the cart');
        alert('Failed to check if the product is in the cart');
        return;
      }

      // If the product is not in the cart, proceed to add it
      const response = await fetch('http://localhost:4000/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ProductID: product.ProductID,
          Name: product.Name,
          Price: product.Price,
          // Add other relevant information
          UserID, // Include UserID in the request
        }),
      });

      if (response.ok) {
        console.log('Product added to cart successfully');
        // You can perform additional actions here if needed
        alert('Product added to cart successfully');
      } else {
        console.error('Failed to add product to cart');
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };



  return (
    <>
      {localStorage.getItem('role') === 'customer' ?
        <>
          <CustomerNavbar />
          <div className="container my-5">
            <Row className="justify-content-center align-items-center h-100">
              {product && (
                <Col>
                  <Card style={cardStyle}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:4000/images/${product.Images}`}
                      style={imageStyle}
                    />
                    <Card.Body className="p-4">
                      <Card.Title className="text-center">
                        <h2 className="mb-0">Product Details</h2>
                        <small>Name: {product.Name}</small>
                      </Card.Title>
                      <hr className="my-3" />
                      <Row>
                        <Col md={6}>
                          <Card.Text>
                            <strong>Category:</strong> {product.Category}
                            <br />
                            <strong>Condition:</strong> {product.Condition}
                            <br />
                            <strong>Location:</strong> {product.Location}
                          </Card.Text>
                        </Col>
                        <Col md={6}>
                          <Card.Text>
                            <strong>Price:</strong> {product.Price} (PKR)
                          </Card.Text>
                        </Col>
                      </Row>
                      <Card.Text className="text-center mt-4">
                        <strong>Description:</strong> <br /> {product.Description}
                      </Card.Text>
                      <center>
                        <div style={buttonContainerStyle}>
                          {/* <Button
                      style={buttonStyle}
                      variant="success"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button> */}
                          <Button
                            style={buttonStyle}
                            variant="primary"
                            onClick={handleAddToCart}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </center>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </div>
        </>
        : <NotFoundPage />
      }
    </>
  );
}

export default ViewSpecifiedProduct;
