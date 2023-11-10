import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import AdminportalNAvbar from './adminportal';
import NotFoundPage from './fourofour';

const Manageprodinadmin = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const UserID = localStorage.getItem("UserID");





    const fetchProductData = async () => {
        try {
            const response = await fetch('http://localhost:4000/getproducts');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleDelete = async (productId) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (!confirmed) {
            return; // Do nothing if not confirmed
        }
        try {
            await fetch(`http://localhost:4000/deleteproduct?productID=${productId}&Id=${localStorage.getItem("UserID")}`, {
                method: 'DELETE',
            });
            // Refetch product data after deleting
            fetchProductData();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleToggleActive = async (productId, isActive) => {
        try {
            await fetch(`http://localhost:4000/updateproduct?productID=${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: !isActive }),
            });
            // Refetch product data after updating
            fetchProductData();
        } catch (error) {
            console.error('Error toggling product activation:', error);
        }
    };

    const handleEdit = (product) => {
        // Reset selectedImage when opening the modal
        setSelectedImage(null);

        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
        // Reset selectedImage when closing the modal
        setSelectedImage(null);
    };

    useEffect(() => {
        fetchProductData();
    }, []);
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('pname', selectedProduct.Name);
            formData.append('pdesc', selectedProduct.Description);
            formData.append('price', selectedProduct.Price);
            formData.append('pcond', selectedProduct.Condition);
            formData.append('pcat', selectedProduct.Category);
            formData.append('ploc', selectedProduct.Location);

            // Add this line to ensure 'img' field is present even when not updating the image
            formData.append('img', '');

            // Add this condition to append the image file only if selectedImage is present
            if (selectedImage) {
                formData.append('img', selectedImage);
            }

            const response = await fetch(`http://localhost:4000/updateproductdata?productID=${selectedProduct.ProductID}&Id=${localStorage.getItem("UserID")}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                // setShowAlert(true);
                // setTimeout(() => {
                handleModalClose();
                fetchProductData();
                // }, 3000);
            } else {
                console.error('Update failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        // Optionally, you can preview the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            // Update the state to include the image data URL
            setSelectedProduct({ ...selectedProduct, Images: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            {localStorage.getItem('role') === 'Admin' ?
                <>
                    <div>
                        <AdminportalNAvbar />
                        <h1>Product Management</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Condition</th>
                                    <th>Category</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.ProductID}>
                                        <td>{product.Name}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:4000/images/${product.Images}`}
                                                alt={product.Name}
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                        </td>
                                        <td>{product.Description}</td>
                                        <td>{product.Price}</td>
                                        <td>{product.Condition}</td>
                                        <td>{product.Category}</td>
                                        <td>{product.Location}</td>
                                        <td>
                                            <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(product)}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleDelete(product.ProductID)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant={product.IsActive ? 'success' : 'warning'}
                                                size="sm"
                                                onClick={() => handleToggleActive(product.ProductID, product.IsActive)}
                                            >
                                                {product.IsActive ? 'Active' : 'Inactive'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedProduct && (
                                <Form>
                                    <Form.Group controlId="productName">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            name='pname'
                                            type="text"
                                            value={selectedProduct.Name}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, Name: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="productImage">
                                        <Form.Label>Image</Form.Label>
                                        <br />
                                        <img
                                            src={selectedProduct.Images}
                                            alt={selectedProduct.Name}
                                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            name='img'
                                        />
                                        <Form.Control type="file" onChange={handleImageChange} />
                                    </Form.Group>
                                    <Form.Group controlId="productDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name='pdesc'
                                            value={selectedProduct.Description}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, Description: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="productPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name='price'
                                            value={selectedProduct.Price}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, Price: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="productCondition">
                                        <Form.Label>Condition</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name='pcond'
                                            value={selectedProduct.Condition}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, Condition: e.target.value })}
                                        >
                                            <option value="New">New</option>
                                            <option value="Used">Used</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="productCategory">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name='pcat'
                                            value={selectedProduct.Category}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, Category: e.target.value })}
                                        >
                                            <option value="Electronics">Electronics</option>
                                            <option value="Clothing and Fashion">Clothing and Fashion</option>
                                            <option value="Home and Furniture">Home and Furniture</option>
                                            <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                                            <option value="Sports and Outdoors">Sports and Outdoors</option>
                                            <option value="Books and Stationery">Books and Stationery</option>
                                            <option value="Health and Wellness">Health and Wellness</option>
                                            <option value="Health and Wellness">Toys and Games</option>
                                        </Form.Control>

                                    </Form.Group>
                                    <Form.Group controlId="productLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name='ploc'
                                            value={selectedProduct.Location}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, Location: e.target.value })}
                                        />
                                    </Form.Group>
                                </Form>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                            {/* Add your update logic here */}
                            <Button variant="primary" onClick={handleUpdate}>
                                Update
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </>
                : <NotFoundPage />}
        </>
    );
};

export default Manageprodinadmin;
