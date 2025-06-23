import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BASE_URL from '../config';
import axios from "axios";

const Insert = ()=>{
     
    const [input, setInput] = useState("");
    const [image, setImage]  =useState("");

    const HandelInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInput(values=>({...values, [name]:value}));
        console.log(input);
    }

    const HandelImage = (e)=>{
        setImage(e.target.files);
        console.log(image);
    }

    const HandelSubmit =async (e)=>{
        e.preventDefault();
    const api = `${BASE_URL}/product/InsertProduct`;
       
    const formData = new FormData();

    for(let key in input){
        formData.append(key, input[key]);
    }

    for(let i = 0; i<=image.length;i++){
        formData.append("image", image[i]);
    }


    const response = await  axios.post(api,formData);
    console.log(response.data);
    alert("Your data is insert")

    }


    return(
        <>
        <div id="from">
        <h1>Registration Page</h1>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter the Product Name</Form.Label>
        <Form.Control type="text" name='name' value={input.name} onChange={HandelInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter the Brand Name</Form.Label>
        <Form.Control type="text" name='brand' value={input.brand} onChange={HandelInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter the Price</Form.Label>
        <Form.Control type="text" name='price' value={input.price} onChange={HandelInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter the Image Url</Form.Label>
        <Form.Control type="file" multiple onChange={HandelImage}  />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={HandelSubmit}>
        Submit
      </Button>
    </Form>

        </div>
        </>
    )
}

export default Insert;