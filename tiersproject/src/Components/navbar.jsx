import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
  MDBInputGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import Caraousel from './carousel';
// import CardRow from './cards';
// import Footerstatic from './footer';

export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <>
      <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <MDBIcon icon='star' className='me-2' /> Second Trust Ecommerce
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                  <MDBIcon icon='home' /> Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>
                  <MDBIcon icon='info-circle' /> About
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>
                  <MDBIcon icon='envelope' /> Contact Us
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                    <MDBIcon icon='user' /> Account
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <Link to="/signup">
                      <MDBBtn color='primary' className='w-100' href='#'>
                        Signup
                      </MDBBtn>
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                    <Link to="/login">
                      <MDBBtn color='info' className='w-100' href='#'>
                        Login
                      </MDBBtn>
                      </Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBInputGroup className='my-2 my-lg-0'>
              <input type='search' className='form-control' placeholder='Search' aria-label='Search' />
              <MDBBtn color='light'>Search</MDBBtn>
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      {/* <Caraousel /> */}
      <br />


    </>


  );
}
