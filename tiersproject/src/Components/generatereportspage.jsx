import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup, Table } from "react-bootstrap";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NotFoundPage from "./fourofour";
import AdminportalNAvbar from "./adminportal";

const Generatereportspage = () => {
    const [Product, setProduct] = useState([]);
    const [selectedItem, setSelectedItem] = useState("Select an item");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:4000/report`);
                const data = await response.json();
                setProduct(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleSelect = (event) => {
        setSelectedItem(event.target.value);
    };

    const generatePDF = async () => {
        try {
            // Create a new jsPDF instance
            const pdfDoc = new jsPDF();

            // Add content to the PDF
            pdfDoc.text("Product Purchase Report", 20, 20);

            // Add a table with autotable
            pdfDoc.autoTable({
                head: [
                    ["Product Name", "Category", "Condition", "User ID", "Quantity", "Price"],
                ],
                body: Product.map((product) => [
                    product.Name,
                    product.Category,
                    product.Condition,
                    product.UserID,
                    product.TotalQuantitySold,
                    product.TotalRevenue,
                ]),
                theme: "grid", // Use 'grid' theme for better visual separation
                styles: {
                    fontSize: 10,
                    halign: "center",
                    cellPadding: 2,
                },
                margin: { top: 30 },
            });

            // Display Total Revenue after the table
            const totalRevenue = calculateTotalRevenue();
            pdfDoc.text(`Total Revenue: PKR ${totalRevenue}`, 20, pdfDoc.autoTable.previous.finalY + 10);

            // Save the PDF with file-saver
            pdfDoc.save("product_purchase_report.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const calculateTotalRevenue = () => {
        return Product.reduce((total, product) => total + product.TotalRevenue, 0);
    };

    return (
        <>
            {localStorage.getItem('role') === 'Admin' ?
                <div>
                    <AdminportalNAvbar />

                    <div style={{ width: "100%", display: "flex" }}>
                        <div style={{ width: "10%" }}></div>
                        <div style={{ width: "80%" }}>
                            <div style={{ margin: "35px" }}>
                                <h3 style={{ marginTop: "25px" }}>Analytical Reports</h3>
                                <div style={{ marginTop: "25px" }}>
                                    <InputGroup>
                                        <FormControl
                                            as="select"
                                            value={selectedItem}
                                            onChange={handleSelect}
                                        >
                                            <option>Product Purchase Report</option>
                                        </FormControl>
                                    </InputGroup>

                                    <Button
                                        variant="primary"
                                        type="button"
                                        className="mt-3"
                                        onClick={generatePDF}
                                    >
                                        Download Report
                                    </Button>
                                </div>

                                {/* Display the PDF content */}
                                <div style={{ marginTop: "20px" }}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Category</th>
                                                <th>Condition</th>
                                                <th>User ID</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Product.map((product, index) => (
                                                <tr key={index}>
                                                    <td>{product.Name}</td>
                                                    <td>{product.Category}</td>
                                                    <td>{product.Condition}</td>
                                                    <td>{product.UserID}</td>
                                                    <td>{product.TotalQuantitySold}</td>
                                                    <td>{product.TotalRevenue}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>

                                    {/* You can customize the display based on your requirements */}
                                    {/* <p>PDF content display goes here.</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "10%" }}></div>
                </div>
                : <NotFoundPage />}
        </>
    );
};

export default Generatereportspage;
