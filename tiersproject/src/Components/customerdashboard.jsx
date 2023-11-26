import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
// import AdminportalNAvbar from './adminportal';
import CustomerNavbar from './customernavbar';
import NotFoundPage from './fourofour';
const CustomerDashboard = () => {
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
    // try {
    //   // Use your API function to fetch data counts
    //   const counts = await getCountData();
    //   setDataCounts(counts);
    // } catch (error) {
    //   console.error('Error fetching data counts', error);
    // }
  };

  return (
    <>
      {localStorage.getItem('role') === 'customer' ?
        <>
          <CustomerNavbar />

          <Row>
            <Col md={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <MDBIcon icon="box" className="me-2" />
                    Total Products
                  </Card.Title>
                  <Card.Text>{dataCounts.totalProducts}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <MDBIcon icon="user" className="me-2" />
                    Total Customers
                  </Card.Title>
                  <Card.Text>{dataCounts.totalCustomers}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <MDBIcon icon="store" className="me-2" />
                    Total Shopkeepers
                  </Card.Title>
                  <Card.Text>{dataCounts.totalShopkeepers}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <MDBIcon icon="credit-card" className="me-2" />
                    Total Payments
                  </Card.Title>
                  <Card.Text>{dataCounts.totalPayments}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* Add more Card components for additional data counts */}
          </Row>
        </>
        : <NotFoundPage />}
    </>
  );
};

export default CustomerDashboard;
