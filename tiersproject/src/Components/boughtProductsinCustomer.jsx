import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerNavbar from './customernavbar';
import NotFoundPage from './fourofour';

const BoughtProductsinCustomer = () => {
    const UserID = localStorage.getItem("UserID");
    const [boughtProducts, setBoughtProducts] = useState([]);

    useEffect(() => {
        const fetchBoughtProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/boughtproducts?UserID=${UserID}`);
                setBoughtProducts(response.data);
            } catch (error) {
                console.error("Error fetching bought products:", error);
            }
        };

        fetchBoughtProducts();
    }, [UserID]);

    return (
        <>
            {localStorage.getItem('role') === 'customer' ?
                <div>
                    <CustomerNavbar />
                    <h2>Products Bought by You</h2>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {/* <th scope="col">ProductID</th> */}
                                <th scope="col">ProductName</th>
                                <th scope="col">ProductPrice</th>
                                {/* <th scope="col">ProductDescription</th> */}
                                {/* <th scope="col">ProductCategory</th> */}
                                <th scope="col">ProductQuantity</th>
                                <th scope="col">ProductImage</th>
                                {/* <th scope="col">ProductStatus</th>
                        <th scope="col">ProductRating</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {boughtProducts.map((product) => (
                                <tr key={product.ProductID}>
                                    {/* <td>{product.ProductID}</td> */}
                                    <td>{product.Name}</td>
                                    <td>{product.Price}</td>
                                    {/* <td>{product.Description}</td> */}
                                    {/* <td>{product.Category}</td> */}
                                    <td>{product.Quantity}</td>
                                    <td><img src={`http://localhost:4000/images/${product.Images}`} alt={product.Name} style={{ maxWidth: '100px' }} /></td>
                                    {/* <td>{product.ProductStatus}</td>
                            <td>{product.ProductRating}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <NotFoundPage />}
        </>
    );
};

export default BoughtProductsinCustomer;
