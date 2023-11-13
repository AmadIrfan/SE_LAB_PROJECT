// AdminPayments.js

import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    // MDBTable,
    // MDBTableHead,
    // MDBTableBody,
    MDBCard,
    MDBCardBody,
    MDBTypography,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import AdminportalNAvbar from './adminportal';
import NotFoundPage from './fourofour';

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // Fetch payments data from the server
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:4000/getPayments');
                if (response.data) {
                    setPayments(response.data);
                }
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <>
            {localStorage.getItem('role') === 'Admin' ?
                <>
                    <AdminportalNAvbar />
                    <MDBContainer className="py-5">
                        <MDBRow className="justify-content-center">
                            <MDBCol md="10">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBTypography tag="h1" className="mb-4">
                                            Payments
                                        </MDBTypography>

                                        {payments.length === 0 ? (
                                            <p>No payments available.</p>
                                        ) : (
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>User ID</th>
                                                        <th>Product Name</th>
                                                        <th>Product Image</th>

                                                        <th>Total Amount</th>
                                                        <th>Date</th>
                                                        <th>Status</th>
                                                        {/* Add more columns based on your payment data */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {payments.map((payment, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{payment.UserID}</td>
                                                            <td>{payment.Name}</td>
                                                            <td><img src={`http://localhost:4000/images/${payment.Images}`} alt={payment.Name} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                                                            <td>{`PKR ${payment.Price}`}</td>
                                                            <td>{new Date(payment.CreatedAt).toLocaleDateString()}</td>
                                                            <td>Received</td>

                                                            {/* Add more cells based on your payment data */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )}
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </>
                : <NotFoundPage />}
        </>
    );
};

export default AdminPayments;
