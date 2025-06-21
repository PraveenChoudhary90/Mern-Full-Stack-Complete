import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function About() {
  const [mydata, setMydata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <h1>About Page</h1>

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
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((key, index) => (
            <tr key={index}>
              <td>{key.serialId}</td>
              <td>{key.productName}</td>
              <td>{key.brandName}</td>
              <td>{key.color}</td>
              <td>{key.price}</td>
              <td>{key.size}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center gap-2">
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
    </>
  );
}

export default About;
