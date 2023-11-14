import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from 'mdb-react-ui-kit';
import AdminportalNAvbar from './adminportal';
import NotFoundPage from './fourofour';

const CustomerService = () => {
    const [customerCareRequests, setCustomerCareRequests] = useState([]);
    const [replyModalOpen, setReplyModalOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [Id, setid] = useState(0);
    const [Email, setEmail] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        reply: '',
        email: '',
    });

    useEffect(() => {
        // Fetch customer care requests from the backend
        const fetchCustomerCareRequests = async () => {
            try {
                const response = await fetch('http://localhost:4000/getCustomerCareRequests');
                if (response.ok) {
                    const data = await response.json();
                    setCustomerCareRequests(data);
                } else {
                    console.error('Failed to fetch customer care requests');
                }
            } catch (error) {
                console.error('Error fetching customer care requests:', error);
            }
        };

        fetchCustomerCareRequests();
    }, []);

    const handleReply = (customerCareRequestId) => {
        console.log(`Trying to reply to customer care request with ID ${customerCareRequestId}`);
        setReplyModalOpen(true);
        setSelectedRequestId(customerCareRequestId);
    };

    const handleModalClose = () => {
        setShowModal(false);
        // Reset form data when closing the modal
        setFormData({
            title: '',
            reply: '',
            email: '',
        });
    };

    const handleEdit = (request, email) => {
        console.log(`Submitting reply to customer care request with ID ${request}`);
        setid(request);
        setEmail(email);

        // Reset selectedImage when opening the modal
        // setSelectedImage(null);

        // Set the initial state of the modal based on the selected request
        setShowModal(true);
        // You may need to modify this based on the structure of your data
        // For example, if the email is inside a 'user' object, it would be request.user.email
        setFormData({
            title: request.Title,
            reply: '', // Clear the reply field initially
            email: request.Email,
        });
    };

    const fetchUpdatedData = async () => {
        try {
            const response = await fetch('http://localhost:4000/getCustomerCareRequests');
            if (response.ok) {
                const data = await response.json();
                setCustomerCareRequests(data);
            } else {
                console.error('Failed to fetch updated customer care requests');
            }
        } catch (error) {
            console.error('Error fetching updated customer care requests:', error);
        }
    };

    const handleReplySubmit = async () => {
        // Implement logic to submit the reply
        console.log(`Submitting reply to customer care request with ID ${selectedRequestId}`);
        console.log('Form Data:', formData);

        try {
            const response = await fetch('http://localhost:4000/submitReply', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: Id,
                    title: formData.title,
                    reply: formData.reply,
                    email: Email,
                }),
            });

            if (response.ok) {
                console.log('Reply submitted successfully');
                // Fetch the updated data after submitting the reply
                fetchUpdatedData();
            } else {
                console.error('Failed to submit reply');
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
        }

        // Close the modal and reset state
        setShowModal(false);
        setSelectedRequestId(null);
        setFormData({
            title: '',
            reply: '',
            email: '',
        });
    };

    return (
        <>
            {localStorage.getItem('role') === 'Admin' ?
                <>
                    <AdminportalNAvbar />
                    <section className="h-100 gradient-custom">
                        <MDBContainer className="py-5 h-100">
                            <MDBCard>
                                <MDBCardBody>
                                    <h5 className="mb-4">Customer Care Requests</h5>
                                    <MDBTable hover responsive>
                                        <MDBTableHead>
                                            <tr>
                                                {/* <th>User ID</th> */}
                                                <th>Title</th>
                                                <th>Issue</th>
                                                <th>Email</th>
                                                <th>Created At</th>
                                                <th>Replied</th>
                                                <th>Action</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {customerCareRequests.map((request) => (
                                                <tr key={request.CustomerCareID}>
                                                    {/* <td>{request.UserID}</td> */}
                                                    <td>{request.Title}</td>
                                                    <td>{request.Issue}</td>
                                                    <td>{request.Email}</td>
                                                    <td>{request.CreatedAt}</td>
                                                    <td>{request.replied}</td>
                                                    <td>
                                                        <MDBBtn color="primary" onClick={() => handleEdit(request.UserID, request.Email)}>
                                                            Reply
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    </section>

                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Reply to Customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formReply">
                                    <Form.Label>Reply to Issue</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Resolve issue"
                                        value={formData.reply}
                                        onChange={(e) => setFormData({ ...formData, reply: e.target.value })}
                                    />
                                </Form.Group>

                                {/* <Form.Group controlId="formToEmail">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formData.email}
                            />
                        </Form.Group> */}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                            {/* Add your update logic here */}
                            <Button variant="primary" onClick={handleReplySubmit}>
                                Send
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                : <NotFoundPage />}
        </>
    );
};

export default CustomerService;
