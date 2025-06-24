import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../config";
import Table from 'react-bootstrap/Table';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Decrement, Increment, RemoveItem } from "../CartSlice";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const CartData = ()=>{
     const navigate = useNavigate();
    const Product = useSelector(state=>state.mycart.cart);
     console.log(Product);

     const dispatch = useDispatch();

 let totalAmount = 0;
    const ans =Product.map(key=>{
        totalAmount+=key.price * key.qnty;
        return(
            <>
            <tr>
                <td>
                    <img src={`${BASE_URL}/${key.defaultImage}`} alt="" width="100px" height="100px" />
                </td>
                <td>{key.name}</td>
                <td>{key.brand}</td>
                <td>{key.price}</td>
                <td>
                <FaMinus style={{fontSize:"20px", marginRight:"10px"}} onClick={()=>{dispatch(Decrement({id:key.id}))}} />
                  {key.qnty}
                  <FaPlus  style={{fontSize:"20px", marginLeft:"10px"}} onClick={()=>{dispatch(Increment({id:key.id}))}} />
                </td>
                <td>{key.price * key.qnty}</td>
                <td>
                <MdDelete style={{fontSize:"20px", margin:"auto"}} onClick={()=>{dispatch(RemoveItem({id:key.id}))}} />
                </td>
            </tr>
            </>
        )
    })

    return(
        <>
        <h1 style={{textAlign:'center'}}>Cart Data Pages</h1>
        <Button variant="warning" style={{margin:'20px', fontSize:"20px", float:'right'}} onClick={()=>{navigate("/checkout")}}>CheckOut</Button>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Qunatity</th>
          <th>TotalAmount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
       {ans}
        </tbody>
        </Table>

        </>
    )
}

export default CartData;