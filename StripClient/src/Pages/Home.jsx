

import React, { useEffect, useState } from 'react'
import BASE_URL from '../config';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Home() {
 const [mydata, setMydata]  =useState([]);

 const LoadData = async()=>{
  const api = `${BASE_URL}/product/Display`;

  try {
    const response = await axios.get(api)
    console.log(response.data);
    setMydata(response.data);
  } catch (error) {
    console.log(error)
  }
 } 


 useEffect(()=>{
  LoadData();
 },[])


 const ans = mydata.map((key)=>{
  return(
    <>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${BASE_URL}/${key.defaultImage}`} width="150px" height="200px" />
      <Card.Body>
        <Card.Title>Home Products </Card.Title>
        <Card.Text>
          <h5>Name:{key.name}</h5>
          <h5>Brand:{key.brand}</h5>
          <h5>Price:{key.price}</h5>
        </Card.Text>
        <Button variant="warning">Add To Cart</Button>
      </Card.Body>
    </Card>

    
    </>
  )
 })

  return (
    <>
    <h1>Home Page</h1>
    <div id="data">
      {ans}
    </div>
    
    </>
  )
}

export default Home