import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
// import { MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import boughtProductsinCustomer from './boughtProductsinCustomer';
const CustomerNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div style={{ backgroundColor: 'darkblue', color: 'white', padding: '5px', textAlign: 'center' }}>
        <h3>Customer Portal</h3>
      </div>
      {/* Custom CSS styles */}
      <style>
        {`
          .custom-navbar {
            background-color: #007bff;
            justify-content: space-between;
          }
        
          .custom-toggle {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            transition: transform 0.3s;
          }
        
          .custom-bar {
            width: 25px;
            height: 2px;
            background-color: white;
            margin: 4px 0;
          }
        
          .custom-toggle.active .custom-bar {
            background-color: #fff;
            transform: rotate(45deg);
          }
        
          .custom-toggle.active .custom-bar:nth-child(2) {
            display: none;
          }
        
          .custom-toggle.active .custom-bar:last-child {
            transform: rotate(-45deg);
          }
        
          @media (min-width: 768px) {
            /* Custom styles for the Navbar when it's not in mobile view */
            .custom-navbar {
              /* Add your custom styles for the Navbar container */
              background-color: #007bff;
            }
        
            .custom-toggle {
              display: none; /* Hide the custom toggle button in non-mobile view */
            }
          }
        `}
      </style>
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-3 custom-navbar">
        <Container>
          {/* Custom toggle button */}
          <button
            className={`custom-toggle ${isExpanded ? 'active' : ''}`}
            onClick={handleToggle}
            aria-label="Menu"
            type="button"
            aria-expanded={isExpanded}
            // aria-label="Toggle navigation"
          >
            <span className="custom-bar"></span>
            <span className="custom-bar"></span>
            <span className="custom-bar"></span>
          </button>
          <Navbar.Brand >
            {/* Replace the image URL with your own logo image */}
            <img
              src="https://png.pngitem.com/pimgs/s/78-786314_computer-user-icon-peolpe-avatar-group-people-avatar.png"
              alt="Logo"
              style={{ height: '40px', marginLeft: '10px' }}
            />
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav" className={isExpanded ? 'show' : ''}>
            {/* Add the additional options here */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/customer/viewproducts" eventKey="view-available-products">
                View Available Proucts
              </Nav.Link>
              <Nav.Link as={Link} to="/customer/viewcart" eventKey="add-to-cart">
                View My Cart
              </Nav.Link>
              <Nav.Link as={Link} to="/customer/ccare" eventKey="cart">
                Customer Care Service
              </Nav.Link>
              {/* <NavDropdown title="Payment Gateway" id="collapsible-nav-dropdown"> */}
              <Nav.Link as={Link} to="/customer/boughtProducts">View Bought Products</Nav.Link>
              {/* Add other payment gateways if needed */}
              {/* </NavDropdown> */}
              {/* <Nav.Link as={Link} to="/customer/reviews" eventKey="reviews">
                Reviews
              </Nav.Link> */}
            </Nav>
            <Nav>
              <NavDropdown title="My Account" id="basic-nav-dropdown" align="end">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <NavDropdown.Item as={Link} to="/customer/profile" style={{ textAlign: 'center' }}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/" style={{ textAlign: 'center' }} onClick={() => {
                    if (window.confirm("Are you sure you want to Logout?")) {
                      Cookies.remove("Email");
                      Cookies.remove("token");
                      Cookies.remove("Password");
                      window.location.href = "/";
                    }
                  }}>
                    Log Out
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomerNavbar;
