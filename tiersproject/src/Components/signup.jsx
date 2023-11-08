import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import './styleslogin.css';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

function SignUpForm() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Password: '',
    role: '',
    rememberMe: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform custom validation here
    if (formData.FirstName.trim() === '') {
      alert('Please enter a valid username.');
      return;
    }

    if (formData.Email.trim() === '' || !formData.Email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (formData.Password.trim().length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    console.log('Form data:', formData);
    document.getElementById('registerform').submit(); // Clear the form fields after successful submission
    // Show a success alert
    alert('You are registered!');

    // You can also redirect to another page if needed
    // For example, if you have a 'Success' component to display after registration
  };

  return (
    <div className="signup-container" style={{ backgroundColor: "#B0BEC5" }}>
      {/* Header */}
      <header className="py-4 px-3 bg-primary text-white header">
        <h2 className="fw-bold">Sign Up</h2>
      </header>

      {/* Form */}
      <div className="form-container">
        <MDBContainer fluid className="p-3 my-5 h-custom" style={{ backgroundColor: "#B0BEC5" }}>
          <MDBRow>
            <MDBCol col='10' md='6'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="A pic" />
            </MDBCol>

            <MDBCol col='4' md='6'>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <MDBBtn floating size='md' tag='a' className='me-2'>
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>
                <MDBBtn floating size='md' tag='a' className='me-2'>
                  <MDBIcon fab icon='twitter' />
                </MDBBtn>
                <MDBBtn floating size='md' tag='a' className='me-2'>
                  <MDBIcon fab icon='linkedin-in' />
                </MDBBtn>
              </div>

              <center><div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div></center>


              <form action="http://localhost:4000/signup" id="registerform" method="post" onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='FirstName'
                  name='FirstName'
                  value={formData.FirstName}
                  onChange={handleChange}
                  id='formControlLg'
                  type='text'
                  size='lg'
                  style={{ background: 'white', color: "black" }}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='LastName'
                  name='LastName'
                  value={formData.LastName}
                  onChange={handleChange}
                  id='formControlLg'
                  type='text'
                  size='lg'
                  style={{ background: 'white', color: "black" }}
                  required
                />
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
                  label='Phone Number'
                  name='Phone'
                  value={formData.Phone}
                  onChange={handleChange}
                  id='formControlLg'
                  type='number'
                  size='lg'
                  style={{ background: 'white', color: "black" }}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  name='Password'  // <-- Corrected name attribute
                  value={formData.Password}
                  onChange={handleChange}
                  id='formControlLg'
                  type='password'
                  size='lg'
                  style={{ background: 'white', color: "black" }}
                  required
                />
                <label htmlFor='dropdownControlLg' className='form-label'>
                  Role
                </label>
                <select
                  className='form-select form-select-lg mb-4'
                  id='dropdownControlLg'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  style={{ background: 'white', color: "black" }}
                >
                  <option value='shopkeeper'>Shopkeeper</option>
                  <option value='customer'>Customer</option>
                </select>


                <div className='d-flex justify-content-between mb-4'>
                  <MDBCheckbox
                    name='rememberMe'
                    id='flexCheckDefault'
                    label='Remember me'
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  {/* <a href='!#'>Forgot password?</a> */}
                </div>

                <div className='text-center text-md-start mt-4 pt-2'>
                  <center>
                    <MDBBtn className='mb-0 px-5' size='lg' type='submit'>
                      Sign Up
                    </MDBBtn>
                  </center>
                  <p className='small fw-bold mt-2 pt-1 mb-2'>
                    Already have an account? <Link to='/login' className='link-danger'>Login</Link>
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

export default SignUpForm;
