import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBInput,
  MDBTypography,
} from "mdb-react-ui-kit";
import CustomerNavbar from "./customernavbar";
import NotFoundPage from "./fourofour";

export default function CustomerCare() {
  const UserID = localStorage.getItem("UserID");
  console.log(UserID);
  const [Title, setTitle] = useState("");
  const [Email, setEmail] = useState("");
  const [Issue, setIssue] = useState("");

  const handleSubmit = async () => {
    try {
      // Assuming you have a user ID stored in local storage
      const UserID = localStorage.getItem("UserID");
      //   alert(title)
      //   alert(email)
      //   alert(issue)

      // Send a request to the backend to log the customer care issue
      const response = await fetch("http://localhost:4000/CustomerCareIssue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID,
          Title,
          Email,
          Issue,
        }),
      });

      if (response.ok) {
        alert("Customer care issue submitted successfully!");
        setTitle("");
        setEmail("");
        setIssue(""); // Clear the input fields after submission
      } else {
        console.error("Failed to submit customer care issue");
      }
    } catch (error) {
      console.error("Error submitting customer care issue:", error);
    }
  };

  return (
    <>
      {localStorage.getItem('role') === 'customer' ?
        <>
          <CustomerNavbar />
          <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100 d-flex align-items-center justify-content-center">
              <MDBCard style={{ width: "500px" }}>
                <MDBCardBody>
                  <MDBTypography tag="h5" className="mb-4 text-center">
                    Customer Care Service
                  </MDBTypography>
                  <MDBInput
                    label="Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="Title"
                    className="mb-4"
                    size="lg" // Larger input size
                  />
                  <MDBInput
                    label="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mb-4"
                    name="Email"
                    size="lg" // Larger input size
                  />
                  <textarea
                    // label="Describe your issue"
                    placeholder="Decribe Your Issue"
                    textarea
                    rows={8}
                    value={Issue}
                    name="Issue"
                    onChange={(e) => setIssue(e.target.value)}
                    className="mb-4 w-100"
                    size="lg" // Larger input size
                  />

                  <MDBBtn color="primary" onClick={handleSubmit} block>
                    Submit Issue
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </section>
        </>
        : <NotFoundPage />
      }
    </>
  );
}
