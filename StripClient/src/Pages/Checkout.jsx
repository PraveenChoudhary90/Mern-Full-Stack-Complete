import { useSelector } from "react-redux";
import BASE_URL from "../config";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";



const stripePromise = loadStripe('pk_test_51RKGV8I6Nv23y5n8CnPSGkkDTdti3DAKy5CKr9blkVJaYN3U0NZ5YAQSrPSMsSSn8yHWdeGx0LNhGWOwOSIbcpEz00lPNnsd4y'); // Replace with your Stripe Publishable Key


const Checkout = ()=>{
    

    const Product = useSelector(state=>state.mycart.cart);
    // const TotalAmount = Product.reduce((acc, item) => acc + item.price * item.qnty, 0);
    console.log(Product);


    var TotalAmount = 0;
    let count= 0;

  
    const handlePay = async () => {
        const stripe = await stripePromise;
    
        const cartItems = Product.map((item) => ({
      name: item.name,
      price: item.price,
      qnty: item.qnty,
      image: `${BASE_URL}/${item.defaultImage}`,
    }));
    
    console.log(cartItems);
        const response = await axios.post(`${BASE_URL}/create-checkout-session`, {
          cartItems,
        });
    
        const session = response.data;
    
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
    
        if (result.error) {
          console.error(result.error.message);
        }
      };
    
      if (Product.length === 0) return <h4 align="center">Your cart is empty!</h4>;
    




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

      <Button variant="success" style={{margin:'20px',
         marginLeft:"600px", padding:"14px",fontSize:"15px"}}  onClick={handlePay}>Pay Now!!!!</Button>



        </>
    )
}

export default Checkout;