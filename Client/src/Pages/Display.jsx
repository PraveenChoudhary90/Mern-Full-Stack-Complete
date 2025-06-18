import { useEffect, useState } from "react";
import BASE_URL from "../../BaseUrl";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const Display = ()=>{

  const [mydata, setMydata] = useState([]);


  const LoadData= async()=>{
    const api = `${BASE_URL}/student/displaydata`;

    const response = await axios.get(api);
        console.log(response.data);
        setMydata(response.data);
  }


  useEffect(()=>{
    LoadData()
  },[]);



   let count = 0;

    const ans = mydata.map((key)=>{
        count++;
        return(
            <>
            <tr>
                <td>{count}</td>
                <td>
                <img src={`${BASE_URL}/${key.defaultImage}`} alt="pic" height="100px" width="100px" />
                 </td>
                <td>{key.name}</td>
                <td>{key.email}</td>
                <td>{key.course}</td>
            </tr>
            
            </>
        )
    })




    return(
        <>

        <h1>Display Page</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Count</th>
          <th>Image</th>
          <th> Full Name</th>
          <th>Email</th>
          <th>Course</th>
        </tr>
      </thead>
      <tbody>
         

          {ans}

        </tbody>
        </Table>


        </>
    )
}

export default Display;