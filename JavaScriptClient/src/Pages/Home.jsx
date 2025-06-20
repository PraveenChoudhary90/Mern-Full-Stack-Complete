import React, { useEffect, useState } from 'react'
import axios from "axios"
import Table from 'react-bootstrap/Table';
function Home() {
  const [mydata, setMydata] = useState([]);

     useEffect(()=>{
        axios.get("https://mocki.io/v1/10512a17-105f-435d-a920-dce1478345bd").then(res=>{
            console.log(res.data);
            setMydata(res.data);

        })
     },[])



     const ans  = mydata.map(key=>{
        return(
            <>
            <tr>
                <th>{key.serialId}</th>
                <th>{key.productName}</th>
                <th>{key.brandName}</th>
                <th>{key.color}</th>
                <th>{key.price}</th>
                <th>{key.size}</th>
            </tr>
            
            </>
        )
     })



  return (

    <>
     <h1>Home Page</h1>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>serialId</th>
          <th>productName</th>
          <th>brandName</th>
          <th>color</th>
          <th>price</th>
          <th>size</th>
        </tr>
      </thead>
      <tbody>
        {ans}
       </tbody>
       </Table>
    </>
  )
}

export default Home