import { useEffect, useState } from "react";
import BASE_URL from "../../BaseUrl";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Display = ()=>{
 const navigate = useNavigate();
  const [mydata, setMydata] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const Myupdate = (id)=>{

       handleShow(true)
    

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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
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