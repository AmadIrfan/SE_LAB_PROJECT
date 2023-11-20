import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import CustomerNavbar from "./customernavbar";
import axios from 'axios';
import NotFoundPage from "./fourofour";
export default function CustomerCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalquantityf, setFinalQuantityf] = useState(0);
  const [Id, setId] = useState(0);
  // const [buysubmit, setBuysubmit] = useState(false);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        // Assuming you have a user ID stored in local storage
        const UserID = localStorage.getItem("UserID");
        setId(UserID);

        // Fetch user's cart data
        const response = await fetch(`http://localhost:4000/getUserCart?UserID=${UserID}`);

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.map((item) => ({ ...item, quantity: item.Quantity })));

          // Calculate total price and set it in state
          const calculatedTotalPrice = data.reduce((total, item) => total + item.Price * item.Quantity, 0);
          setTotalPrice(calculatedTotalPrice);
        } else {
          console.error("Failed to fetch user cart data");
        }
      } catch (error) {
        console.error("Error fetching user cart data:", error);
      }
    };

    fetchUserCart();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleDeleteItem = async (CartID) => {
    // Using the browser's built-in confirmation dialog
    const shouldDelete = window.confirm("Are you sure you want to delete this item?");

    if (shouldDelete) {
      try {
        // Assuming you have a user ID stored in local storage
        const UserID = localStorage.getItem("UserID");

        // Send a request to the backend to delete the item
        const response = await fetch(`http://localhost:4000/deleteCartItem?CartID=${CartID}&UserId=${localStorage.getItem("UserID")}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Update the local state to reflect the changes
          setCartItems((prevItems) => prevItems.filter((item) => item.CartID !== CartID));
        } else {
          console.error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleQuantityChange = (CartID, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.CartID === CartID
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );

    // Log the updated total price to the console
    const updatedTotalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
    const updatedQuantity = cartItems.find((item) => item.CartID === CartID)?.quantity + 1;
    const finalquantity = updatedQuantity;
    setFinalQuantityf(finalquantity);
    console.log(`Updated Quantity for CartID ${CartID}:`, finalquantity);
    // console.log("Updated Total Price:", updatedTotalPrice);
  };


  // ... (previous code)

  const handleCheckout = async () => {
    try {
      // Prepare an array of items with their quantities, unit prices, and ProductID
      const itemsWithQuantities = cartItems.map((item) => ({
        CartID: item.CartID,
        quantity: item.quantity,
        unitPrice: item.Price,
        productID: item.ProductID,
        Images: item.Images, // Add the Images property
      }));

      // Send a request to the backend for payment processing with Stripe
      const response = await fetch('http://localhost:4000/buyProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice: totalPrice,
          Id: Id,
          cartItems: itemsWithQuantities,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Log the data before redirecting (for debugging purposes)
        console.log('Data from server:', responseData);

        // Check if the sessionUrl is present in the response
        if (responseData.sessionUrl) {
          // Redirect to Stripe Checkout
          window.location.href = responseData.sessionUrl;
        } else {
          console.error('Session URL is missing in the server response');
        }
      } else {
        console.error('Failed to process payment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };





  // ... (rest of the code)

  // const handleBuy = async (image, price) => {
  //   // if (Cookies.get("userId") == null || Cookies.get("userId") == "") {
  //   //   alert("Login to buy product");
  //   // } else {
  //   const Data = {
  //     // userId: Cookies.get("userId"),
  //     productId: Id,
  //     image: image,
  //     price: price,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/buyProduct",
  //       Data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           // "api-key": process.env.REACT_APP_API_KEY,
  //         },
  //       }
  //     );

  //     const responseData = response.data;
  //     if (responseData.message ==="outofstock") {
  //       alert("Product is out of stock");
  //     } else {
  //       window.location.href = responseData.sessionUrl;
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     // setSubmit(false);
  //   }
  //   //     }
  // };

  // Update total price whenever cart items or their quantities change
  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
    setTotalPrice(calculatedTotalPrice);

    // Log the updated total price to the console
    console.log("Updated Total Price:", calculatedTotalPrice);
  }, [cartItems]);

  return (
    <>
      {localStorage.getItem('role') === 'customer' ?
        <>
          <CustomerNavbar />
          <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center my-4">
                <MDBCol md="8">
                  <MDBTypography tag="h5" className="mb-0">
                    MY CART
                  </MDBTypography>
                  {cartItems.map((item, index) => (
                    <MDBCard className="mb-4" key={index}>
                      <MDBCardHeader className="py-3"></MDBCardHeader>
                      <MDBCardBody>
                        <MDBRow className="mb-4">
                          <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                            <MDBRipple
                              rippleTag="div"
                              rippleColor="light"
                              className="bg-image rounded hover-zoom hover-overlay"
                            >
                              <img
                                src={`http://localhost:4000/images/${item.Images}`}
                                className="w-100"
                                alt={`Product ${index + 1}`}
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                ></div>
                              </a>
                            </MDBRipple>
                          </MDBCol>

                          <MDBCol lg="5" md="6" className="mb-4 mb-lg-0">
                            <p>
                              <strong>{item.Name}</strong>
                            </p>
                            <p>Category: {item.Category}</p>
                            <p>Condition: {item.Condition}</p>

                            <MDBTooltip
                              wrapperProps={{ size: "sm" }}
                              wrapperClass="me-1 mb-2"
                              title="Remove item"
                            >
                              <MDBIcon
                                fas
                                icon="trash"
                                onClick={() => handleDeleteItem(item.CartID)}
                                style={{ cursor: "pointer" }}
                              />
                            </MDBTooltip>

                            <MDBTooltip
                              wrapperProps={{ size: "sm", color: "danger" }}
                              wrapperClass="me-1 mb-2"
                              title="Move to the wish list"
                            >
                              <MDBIcon fas icon="heart" />
                            </MDBTooltip>
                          </MDBCol>

                          <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                              <MDBBtn
                                className="px-3 me-2"
                                onClick={() => handleQuantityChange(item.CartID, -1)}
                              >
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>

                              <MDBInput
                                value={item.quantity}
                                min={0}
                                type="number"
                                label="Quantity"
                                readOnly
                              />

                              <MDBBtn
                                className="px-3 ms-2"
                                onClick={() => handleQuantityChange(item.CartID, 1)}
                              >
                                <MDBIcon fas icon="plus" />
                              </MDBBtn>
                            </div>

                            <p className="text-start text-md-center">
                              <strong>Price: {`PKR ${item.Price}`}</strong>
                            </p>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  ))}

                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <p>
                        <strong>Expected shipping delivery</strong>
                      </p>
                      <p className="mb-0">12.10.2020 - 14.10.2020</p>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody>
                      <p>
                        <strong>We accept</strong>
                      </p>
                      <MDBCardImage
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                        alt="Visa"
                      />
                      <MDBCardImage
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                        alt="American Express"
                      />
                      <MDBCardImage
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                        alt="Mastercard"
                      />
                      <MDBCardImage
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                        alt="PayPal acceptance mark"
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                  <MDBCard className="mb-4">
                    <MDBCardHeader>
                      <MDBTypography tag="h5" className="mb-0">
                        Summary
                      </MDBTypography>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <MDBListGroup flush>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Products
                          <span>
                            {/* Calculate total price */}
                            PKR {cartItems.reduce((total, item) => total + item.Price * item.quantity, 0).toFixed(2)}
                          </span>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                          Shipping
                          <span>Gratis</span>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                            <strong>
                              <p className="mb-0">(including VAT)</p>
                            </strong>
                          </div>
                          <span>
                            {/* Calculate total price */}
                            PKR {cartItems.reduce((total, item) => total + item.Price * item.quantity, 0).toFixed(2)}
                          </span>
                        </MDBListGroupItem>
                      </MDBListGroup>

                      <MDBBtn block size="lg" onClick={handleCheckout}>
                        Go to checkout
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </>
        : <NotFoundPage />}
    </>
  );
}
