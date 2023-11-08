import React from 'react'
import Navbar from './navbar'
// import Caraousel from './carousel'
import Footerstatic from './footer'
import CardRow from './cards'

export default function Static() {
  return (
    <div>
      <Navbar/>
      <br />
      <CardRow />
      <br />
      {/* <Caraousel/> */}
      <h3 style={{ fontWeight: 'bold', fontSize: '30px' }}>Popular Brands</h3>
      <br />
      <img src="./images/logos.png" alt="" />
      <br />
      <Footerstatic /> 
    </div>
  )
}
