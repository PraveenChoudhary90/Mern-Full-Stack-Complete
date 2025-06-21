import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
  const [mydata, setMydata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);

  const itemsPerPage = 5;

  useEffect(() => {
    axios.get("https://mocki.io/v1/10512a17-105f-435d-a920-dce1478345bd").then(res => {
      setMydata(res.data);
    });
  }, []);

  // Search + Filter
  const filteredData = mydata
    .filter(item =>
      (item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.color.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(item =>
      filterColor ? item.color.toLowerCase() === filterColor.toLowerCase() : true
    );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const toggleSortOrder = () => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));

  // Add to cart
  const addToCart = (item) => {
    if (!cart.some(cartItem => cartItem.serialId === item.serialId)) {
      setCart([...cart, item]);
    } else {
      alert("Item already in cart.");
    }
  };

  return (
    <>
      <h1>
        Cart Page <Badge bg="secondary" onClick={()=>{navigate("/cartdata")}}>Cart: {cart.length}</Badge>
      </h1>

      {/* Search */}
      <Form.Control
        type="text"
        placeholder="Search by product, brand, or color..."
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-3"
      />

      {/* Filter */}
      <Form.Select
        value={filterColor}
        onChange={e => {
          setFilterColor(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-3"
      >
        <option value="">Filter by Color</option>
        <option value="red">Red</option>
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </Form.Select>

      {/* Sort */}
      <div className="d-flex gap-2 mb-3">
        <Form.Select
          value={sortField}
          onChange={e => setSortField(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">Sort By</option>
          <option value="productName">Product Name</option>
          <option value="brandName">Brand Name</option>
          <option value="price">Price</option>
        </Form.Select>

        <Button variant="secondary" onClick={toggleSortOrder}>
          Toggle Sort ({sortOrder})
        </Button>
      </div>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>serialId</th>
            <th>productName</th>
            <th>brandName</th>
            <th>color</th>
            <th>price</th>
            <th>size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td>{item.serialId}</td>
              <td>{item.productName}</td>
              <td>{item.brandName}</td>
              <td>{item.color}</td>
              <td>{item.price}</td>
              <td>{item.size}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
        <Button variant="outline-primary" onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button variant="outline-primary" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>

      {/* Optional: View Cart */}
      {cart.length > 0 && (
        <div>
          <h3>🛒 Cart Items:</h3>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.productName} - ₹{item.price} ({item.color})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Cart;
