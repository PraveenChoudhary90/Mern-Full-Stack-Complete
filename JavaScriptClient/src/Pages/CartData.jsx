// src/Cart.js
import React, { useContext } from 'react';
import { CartContext } from './ContextApi';
import Table from 'react-bootstrap/Table';

function CartData() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart ({cart.length} items)</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>serialId</th>
              <th>productName</th>
              <th>brandName</th>
              <th>color</th>
              <th>price</th>
              <th>size</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <td>{item.serialId}</td>
                <td>{item.productName}</td>
                <td>{item.brandName}</td>
                <td>{item.color}</td>
                <td>{item.price}</td>
                <td>{item.size}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default CartData;
