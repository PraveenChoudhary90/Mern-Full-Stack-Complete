

import React, { useEffect, useState } from 'react'
import BASE_URL from '../config';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../CartSlice';
import { useNavigate } from 'react-router-dom';


function Home() {
 const [mydata, setMydata]  =useState([]);
 const navigate = useNavigate();
 const Product = useSelector(state=>state.mycart.cart);
 console.log(Product);
 const ProductLength = Product.length;
 const dispatch = useDispatch();


 

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
        <Card.Title>Home Products</Card.Title>
        <Card.Text>
          <h5>Name:{key.name}</h5>
          <h5>Brand:{key.brand}</h5>
          <h5>Price:{key.price}</h5>
        </Card.Text>
        <Button variant="warning" onClick={()=>{dispatch(AddToCart({id:key._id, name:key.name, brand:key.brand, 
          price:key.price, defaultImage:key.defaultImage, image:key.image, qnty:1}))}}>Add To Cart</Button>
      </Card.Body>
    </Card>

    
    </>
  )
 })

  return (
    <>
    <h1 id='store' onClick={()=>{navigate("/cartdata")}}>Store:{ProductLength} </h1>
    <div id="data">
      {ans}
    </div>
    
    </>
  )
}

export default Home