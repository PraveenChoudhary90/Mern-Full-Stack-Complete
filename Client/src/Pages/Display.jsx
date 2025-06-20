import { useEffect, useState } from "react";
import BASE_URL from "../../BaseUrl";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Display = ()=>{
 const navigate = useNavigate();
  const [mydata, setMydata] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  
  const [input , setInput] = useState({});
  
  
const HandelInput = (e)=>{
  const name = e.target.name;
  const value = e.target.value;
  setInput(values=>({...values, [name]:value}))
  console.log(input);

}



  const Myupdate = async(id)=>{
         handleShow(true)
     const  api = `${BASE_URL}/student/UpdateShowData`;

      console.log(id);
      const response = await axios.post(api, {id:id})
          console.log(response.data);
          setInput(response.data);

  }


   const Myupdatedata = async(e)=>{
    e.preventDefault();
    const api = `${BASE_URL}/student/UpDateAllData`;
    try {
      const response = await axios.post(api, input);
      console.log(response.data);
      alert("Your data is update");
    handleClose(false);
  
    } catch (error) {
      console.log(error);
    }

   }

  const LoadData= async()=>{
    const api = `${BASE_URL}/student/displaydata`;
    const response = await axios.get(api);
        console.log(response.data);
        setMydata(response.data);
  }


  useEffect(()=>{
    LoadData()
  },[]);




        const MyDelete = async(id)=>{
          console.log(id);
          const api = `${BASE_URL}/student/DeleteData`;
          const response = await axios.post(api, {id:id})
          window.alert(response.data.msg);
        }

  


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
                <td>
                  <button onClick={()=>{MyDelete(key._id)}}>
                  Delete
                  </button>
                  </td>
                <td>
                  <button onClick={()=>{Myupdate(key._id)}}>Update</button>
                </td>
            </tr>


           

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <div id="from">
                       <Form>
                 <Form.Group className="mb-3" controlId="formBasicEmails">
                   <Form.Label>Enter the Name</Form.Label>
                   <Form.Control type="text" placeholder='Enter your full name' name='name' value={input.name} onChange={HandelInput} />
                 </Form.Group>
           
                 <Form.Group className="mb-3" controlId="formBasicEmaila">
                   <Form.Label>Enter the Email </Form.Label>
                   <Form.Control type="text" placeholder='Enter your full email address' name='email' value={input.email} onChange={HandelInput} />
                 </Form.Group>
           
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Enter the Course Name</Form.Label>
                   <Form.Control type="text" placeholder='Enter the Course name'  name='course' value={input.course} onChange={HandelInput} />
                 </Form.Group>
           
                 <Form.Group className="mb-3" controlId="formBasicEmailf">
                   <Form.Label>Enter the Password</Form.Label>
                   <Form.Control type="password" placeholder='Password'  name='password' value={input.password} onChange={HandelInput} />
                 </Form.Group>
           
                 <Button variant="primary" type="submit" onClick={Myupdatedata}>
                   Submit
                 </Button>
               </Form>
           
               </div>


        </Modal.Body>
      </Modal>
            
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
          <th>Delete</th>
          <th>Update</th>
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