
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BASE_URL from '../../BaseUrl';
import axios from 'axios';


const Registration = ()=>{
     

    const [input , setInput] = useState("");
    const [image, setImage] = useState("");
    
    
  const HandelInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInput(values=>({...values, [name]:value}))
    console.log(input);

  }
  


   const HandelImage = (e)=>{
    setImage(e.target.files);
    console.log(image);
   }


    const HandelSubmit = async(e)=>{
        e.preventDefault();

       const  api = `${BASE_URL}/student/insertstudent`;

        const formdata = new FormData();

        for(let key in input){
            formdata.append(key, input[key]);
        }


        for(let i=0;i<image.length;i++){
            formdata.append("image", image[i])
        }

        const response = await axios.post(api, formdata)
            window.alert("Student course is insert");
            console.log(response.data);

    }

    return(
        <>

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

      <Form.Group className="mb-3" controlId="formBasicEmaild">
        <Form.Label>Enter the Student Image</Form.Label>
        <Form.Control type="file" multiple   onChange={HandelImage}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={HandelSubmit}>
        Submit
      </Button>
    </Form>

    </div>

        
        </>
    )
}

export default Registration;