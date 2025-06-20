
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BASE_URL from '../../BaseUrl';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
const Search = ()=>{

 const [name, setName] = useState("");
 const [course, setCourse ] = useState("");
 const [mydata, setMyData] = useState([]);

 const HandelSubmit = async(e)=>{
    e.preventDefault();
    const api = `${BASE_URL}/student/SearchData`;
    const resposne = await axios.post(api, {name:name, course:course});
    console.log(resposne.data);
    setMyData(resposne.data);

 }



  const ans = mydata.map((key)=>{
    return(
        <>
        <tr>
            <td>
                <img src={`${BASE_URL}/${key.defaultImage}`} alt="" width="100px" height="100px" />
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
        <div id="search">
        <h1>Search Student Page</h1>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Name</Form.Label>
        <Form.Control type="text" placeholder="search by name"  name='name' value={name} onChange={(e)=>{setName(e.target.value)}}   />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Course Name</Form.Label>
        <Form.Control type="text" placeholder="search by course"  name='course' value={course} onChange={(e)=>{setCourse(e.target.value)}} />
      </Form.Group>
    
      <Button variant="primary" type="submit" onClick={HandelSubmit}>
        Submit
      </Button>
    </Form>
    </div>
        
      
      <br size="4" color='black' />

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
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


export default Search;