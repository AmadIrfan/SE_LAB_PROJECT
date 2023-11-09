import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Button, Container, Row, Card, Alert } from 'react-bootstrap';
import { MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import AdminportalNAvbar from './adminportal';
import NotFoundPage from './fourofour';

const AddProduct = () => {

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('New');
    const [category, setCategory] = useState('Electronics'); // Default value for the category
    const [location, setLocation] = useState('');
    const [images, setImages] = useState('');
    const [soldOut, setSoldOut] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();

    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice('');
        setCondition('New');
        setCategory('Electronics'); // Reset the category to the default value
        setLocation('');
        setImages('');
        setSoldOut(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('condition', condition);
        formData.append('category', category);
        formData.append('location', location);
        formData.append('images', images);
        formData.append('soldOut', soldOut ? 1 : 0);

        try {
            const response = await fetch(`http://localhost:4000/addproduct?Id=${localStorage.getItem("UserID")}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Product added successfully
                setShowAlert(true);
                resetForm();

                // // Navigate to the previous page after a short delay
                // setTimeout(() => {
                //     console.log('Navigating to http://localhost:3000/admin');
                //     history.push('/admin');
                // }, 1000);
            } else {
                // Handle error
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
    <>
        {localStorage.getItem('role') === 'Admin' ?
            <>

                <AdminportalNAvbar />
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Col md={8}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">
                                        <MDBIcon icon="box" className="me-2" />
                                        Add Product
                                    </Card.Title>
                                    <form onSubmit={handleSubmit}>
                                        <MDBInput
                                            label="Product Name"
                                            type="text"
                                            id="productName"
                                            name="productName"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            required
                                        />
                                        <br />
                                        <MDBInput
                                            label="Description"
                                            type="text-area"
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                        <br />
                                        <MDBInput
                                            label="Price"
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                        <div className="mb-3">
                                            <label htmlFor="condition" className="form-label">
                                                Condition
                                            </label>
                                            <select
                                                id="condition"
                                                name="condition"
                                                className="form-select"
                                                value={condition}
                                                onChange={(e) => setCondition(e.target.value)}
                                            >
                                                <option value="New">New</option>
                                                <option value="Used">Used</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">
                                                Category
                                            </label>
                                            <select
                                                id="category"
                                                name="category"
                                                className="form-select"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                required
                                            >
                                                <option value="Electronics">Electronics</option>
                                                <option value="Clothing and Fashion">Clothing and Fashion</option>
                                                <option value="Home and Furniture">Home and Furniture</option>
                                                <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                                                <option value="Sports and Outdoors">Sports and Outdoors</option>
                                                <option value="Books and Stationery">Books and Stationery</option>
                                                <option value="Health and Wellness">Health and Wellness</option>
                                                <option value="Health and Wellness">Toys and Games</option>

                                                {/* Add more options as needed */}
                                            </select>
                                        </div>
                                        <br />
                                        <MDBInput
                                            label="Location"
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                        <div className="mb-3">
                                            <label htmlFor="images" className="form-label">
                                                Images
                                            </label>
                                            <input
                                                type="file"
                                                id="images"
                                                name="images"
                                                accept="image/*"
                                                onChange={(e) => setImages(e.target.files[0])}
                                                required
                                            />
                                        </div>
                                        {/* <div className="form-check mb-3">
                                        <input
                                            type="checkbox"
                                            id="soldOut"
                                            name="soldOut"
                                            className="form-check-input"
                                            checked={soldOut}
                                            onChange={(e) => setSoldOut(e.target.checked)}
                                        />
                                        <label htmlFor="soldOut" className="form-check-label">
                                            Sold Out
                                        </label>
                                    </div> */}
                                        <div className="d-grid">
                                            <Button type="submit" variant="primary" className="mt-3">
                                                Add Product
                                            </Button>
                                        </div>
                                    </form>
                                    {showAlert && (
                                        <Alert variant="success" className="mt-3">
                                            Product added successfully!
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
            : <NotFoundPage />}
    </>
    );
};

export default AddProduct;



