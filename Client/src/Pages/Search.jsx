
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BASE_URL from '../../BaseUrl';
import axios from 'axios';
const Search = ()=>{

 const [name, setName] = useState("");
 const [course, setCourse ] = useState("");
 const [mydata, setMyData] = useState([]);

 const HandelSubmit = async(e)=>{
    e.preventDefault();
    const api = `${BASE_URL}/student/SearchData`;
    const resposne = await axios.post(api, {name:name, course:course});
    console.log(resposne.data);
    alert("data is searched");

 }



    return(
        <>
        <div id="search">
        <h1>Search Student Page</h1>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Name</Form.Label>
        <Form.Control type="text" placeholder="search by name" name='name' value={name} onChange={(e)=>{setName(e.target.value)}}   />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter the Course</Form.Label>
        <Form.Control type="text" placeholder="search by course" name='course' value={course} onChange={(e)=>{setCourse(e.target.value)}} />
      </Form.Group>
    
      <Button variant="primary" type="submit" onClick={HandelSubmit}>
        Submit
      </Button>
    </Form>
    </div>

        </>
    )
}


export default Search;