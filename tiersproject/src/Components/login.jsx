import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBSpinner } from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';

function LoginForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if UserID is already stored in local storage
    const storedUserID = localStorage.getItem('UserID');
    if (storedUserID) {
      // You can redirect or perform any action based on the stored UserID
      console.log('UserID retrieved from local storage:', storedUserID);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token, role, UserID, Email, Password } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('UserID', UserID);
        localStorage.setItem('Email', Email);
        localStorage.setItem('Password', Password);
        Cookies.set("token", token, { expires: 2 });
        Cookies.set("email", Email, { expires: 2 });
        Cookies.set("Password", Password, { expires: 2 });

        console.log('UserID stored in local storage:', UserID);

        // Redirect based on the user's role
        if (role === 'Admin') {
          history.push('/admin');
        } else if (role === 'customer') {
          history.push('/customer/viewproducts');
        }
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container" style={{ backgroundColor: "#B0BEC5" }}>
      {/* Header */}
      <header className="py-4 px-3 bg-primary text-white header">
        <h2 className="fw-bold">Login</h2>
      </header>

      {/* Form */}
      <div className="form-container">
        <MDBContainer fluid className="p-3 my-5 h-custom" style={{ backgroundColor: "#B0BEC5" }}>
          <MDBRow>
            <MDBCol col='10' md='6'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="A pic" />
            </MDBCol>

            <MDBCol col='4' md='6'>
              <form action="http://localhost:4000/login" id="loginform" method="post" onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email address'
                  name='Email'
                  value={formData.Email}
                  onChange={handleChange}
                  id='formControlLg'
                  type='email'
                  size='lg'
                  style={{ background: 'white', color: "black" }}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  name='Password'
                  value={formData.Password}
                  onChange={handleChange}
                  id='formControlLg'
                  type='password'
                  size='lg'
                  style={{ background: 'white', color: "black" }}
                  required
                />

                <div className='text-center text-md-start mt-4 pt-2'>
                  <center>
                    <MDBBtn className='mb-0 px-5' size='lg' type='submit' disabled={loading}>
                      {loading ? <MDBSpinner small grow /> : 'Login'}
                    </MDBBtn>
                  </center>
                  <p className='small fw-bold mt-2 pt-1 mb-2'>
                    Don't have an account? <Link to='/signup' className='link-danger'>Sign Up</Link>
                  </p>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      {/* Footer */}
      <div className="footer-container">
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2023. All rights reserved.
          </div>

          <div>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
              <MDBIcon fab icon='facebook-f' size="md" />
            </MDBBtn>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
              <MDBIcon fab icon='twitter' size="md" />
            </MDBBtn>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
              <MDBIcon fab icon='google' size="md" />
            </MDBBtn>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
              <MDBIcon fab icon='linkedin-in' size="md" />
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
