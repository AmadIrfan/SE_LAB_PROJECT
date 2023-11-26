import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  // MDBCardText,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

const cardsData = [
  {
    title: 'Peanut Butter ',
    imageSrc: './images/item1.jpg',
    // description: 'Description for Card 1',
  },
  {
    title: 'Watch',
    imageSrc: './images/item2.jpg',
    // description: 'Description for Card 2',
  },
  {
    title: 'Nike Shoes',
    imageSrc: './images/item3.jpg',
    // description: 'Description for Card 3',
  },
  {
    title: 'Coke',
    imageSrc: './images/item4.jpg',
    // description: 'Description for Card 4',
  },
  {
    title: 'Choco Milk',
    imageSrc: './images/item5.jpg',
    // description: 'Description for Card 5',
  },
  {
    title: 'Wireless HeadPhone',
    imageSrc: './images/item6.jpg',
  },
];

const CardRow = () => {
  return (
    <MDBContainer>
      <center></center>
      <h3 style={{ fontWeight: 'bold', fontSize: '30px' }}>Explore Popular Category</h3>
      <br />
      <MDBRow>
        {cardsData.map((card, index) => (
          <MDBCol key={index} size="12" sm="6" md="4" lg="2">
            <MDBCard className="d-flex flex-column justify-content-center" style={{ width: '100%', height: '100%' }}>
              <MDBCardImage
                src={card.imageSrc}
                alt={card.title}
                top
                style={{ objectFit: 'cover', height: '150px' }} // Set the desired height and maintain aspect ratio
              />
              <MDBCardBody>
                <MDBCardTitle>{card.title}</MDBCardTitle>
                {/* <MDBCardText>{card.description}</MDBCardText> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      <br />
    </MDBContainer>
  );
};

export default CardRow;
