import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import NotFoundPage from './fourofour';

const AdminportalNAvbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-3 custom-navbar" style={{color:"white", fontWeight:"bolder"}}>
      <Container fluid>
        <Navbar.Brand  className="navbar-brand">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className={isExpanded ? 'show' : ''}>
          <Nav className="me-auto">
            <NavDropdown title="Manage Products" id="employee-dropdown">
              <NavDropdown.Item as={Link} to="/admin/addproduct">Add Product</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/updatedelproduct">Delete / Update Product</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/admin/generaterep">Generate Reports</Nav.Link>
            <Nav.Link as={Link} to="/admin/payments">View Payments</Nav.Link>
            <Nav.Link as={Link} to="/admin/CustomerService">Customer Service</Nav.Link>
          </Nav>
          <Nav>
            {/* <NavDropdown title="Manage Users" id="room-dropdown">
              <NavDropdown.Item as={Link} to="/admin/managecustomer">Manage Customer</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/manageshopkeeper">Manage Shopkeeper</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link as={Link} to="/admin/profile">
              <MDBIcon icon="user" className="me-1" /> My Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/logout" onClick={() => {
                if (window.confirm("Are you sure you want to Logout?")) {
                  Cookies.remove("Email");
                  Cookies.remove("token");
                  Cookies.remove("Password");
                  window.location.href = "/";
                }
              }}>
              <MDBIcon icon="sign-out-alt" className="me-1" /> Logout 
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminportalNAvbar;
