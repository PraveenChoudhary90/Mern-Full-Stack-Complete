import { useSelector } from "react-redux";
import BASE_URL from "../config";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Checkout = ()=>{
    

    const Product = useSelector(state=>state.mycart.cart);
    console.log(Product);


    var TotalAmount = 0;
    let count= 0;

    const ans = Product.map(key=>{
        TotalAmount+=key.price*key.qnty;
        count++;
        return(
            <>
            <tr>
                <td>{count}</td>
                <td>
                    <img src={`${BASE_URL}/${key.defaultImage}`} alt="" width="100px" height="100px" />
                    
                    </td>
                    <td>{key.name}</td>
                    <td>{key.brand}</td>
                    <td>{key.price}</td>
                    <td>{key.price*key.qnty}</td>

            </tr>
            </>
        )
    })


    return(
        <>
        <h1 style={{textAlign:"center"}}>Checkout Page Stripe Payment Gateway</h1>
        <h1 style={{alignItems:"center",textAlign:"center", color:"green"}}>Your Total Payable Amount:{TotalAmount} </h1>
        <Table striped bordered hover>
      <thead>
        <tr>
            <th>Index</th>
          <th>Image</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>TotalAmount</th>
        </tr>
      </thead>
      <tbody>
       {ans}
        </tbody>
        </Table>

      <Button variant="success" style={{margin:'20px', marginLeft:"600px", padding:"14px",fontSize:"15px"}} >Pay Now!!!!</Button>



        </>
    )
}

export default Checkout;