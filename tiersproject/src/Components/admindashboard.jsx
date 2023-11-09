import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import AdminportalNAvbar from './adminportal';
import NotFoundPage from './fourofour';

const Dashboard = () => {
  const [dataCounts, setDataCounts] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalShopkeepers: 0,
    totalPayments: 0,
    // Add more counts as needed
  });

  useEffect(() => {
    // Fetch data counts when the component mounts
    fetchDataCounts();
  }, []);

  const fetchDataCounts = async () => {
    try {
      const response = await fetch('http://localhost:4000/getCountsinadmin');

      if (response.ok) {
        const counts = await response.json();
        setDataCounts(counts);
      } else {
        console.error('Failed to fetch data counts');
      }
    } catch (error) {
      console.error('Error fetching data counts', error);
    }
  };

  return (

    <>
      {localStorage.getItem('role') === 'Admin' ?
        <>
          <AdminportalNAvbar />

          <Row className="mt-4">
            <Col md={3}>
              <Card className="h-100 bg-primary text-white p-3">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title className="mb-3">
                    <MDBIcon icon="box" className="me-2" />
                    Total Products
                  </Card.Title>
                  <Card.Text className="h1">{dataCounts.totalProducts}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 bg-success text-white p-3">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title className="mb-3">
                    <MDBIcon icon="user" className="me-2" />
                    Total Customers
                  </Card.Title>
                  <Card.Text className="h1">{dataCounts.totalCustomers}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 bg-info text-white p-3">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title className="mb-3">
                    <MDBIcon icon="store" className="me-2" />
                    Total Shopkeepers
                  </Card.Title>
                  <Card.Text className="h1">{dataCounts.totalShopkeepers}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 bg-warning text-dark p-3">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title className="mb-3">
                    <MDBIcon icon="credit-card" className="me-2" />
                    Total Payments
                  </Card.Title>
                  <Card.Text className="h1">{dataCounts.totalPayments}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* Add more Col components for additional data counts */}
          </Row>
        </>
        : <NotFoundPage />}
    </>
  );
};

export default Dashboard;
