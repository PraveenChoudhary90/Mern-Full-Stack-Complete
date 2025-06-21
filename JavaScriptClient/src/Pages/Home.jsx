// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import Table from 'react-bootstrap/Table';
// function Home() {
//   const [mydata, setMydata] = useState([]);

//      useEffect(()=>{
//         axios.get("https://mocki.io/v1/10512a17-105f-435d-a920-dce1478345bd").then(res=>{
//             console.log(res.data);
//             setMydata(res.data);

//         })
//      },[])



//      const ans  = mydata.map(key=>{
//         return(
//             <>
//             <tr>
//                 <th>{key.serialId}</th>
//                 <th>{key.productName}</th>
//                 <th>{key.brandName}</th>
//                 <th>{key.color}</th>
//                 <th>{key.price}</th>
//                 <th>{key.size}</th>
//             </tr>
            
//             </>
//         )
//      })



//   return (

//     <>
//      <h1>Home Page</h1>
//      <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>serialId</th>
//           <th>productName</th>
//           <th>brandName</th>
//           <th>color</th>
//           <th>price</th>
//           <th>size</th>
//         </tr>
//       </thead>
//       <tbody>
//         {ans}
//        </tbody>
//        </Table>
//     </>
//   )
// }

// export default Home

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';

// function Home() {
//   const [mydata, setMydata] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     axios.get("https://mocki.io/v1/10512a17-105f-435d-a920-dce1478345bd").then(res => {
//       console.log(res.data);
//       setMydata(res.data);
//     });
//   }, []);

//   const filteredData = mydata.filter(item => 
//     item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.color.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const ans = filteredData.map((key, index) => (
//     <tr key={index}>
//       <td>{key.serialId}</td>
//       <td>{key.productName}</td>
//       <td>{key.brandName}</td>
//       <td>{key.color}</td>
//       <td>{key.price}</td>
//       <td>{key.size}</td>
//     </tr>
//   ));

//   return (
//     <>
//       <h1>Home Page</h1>

//       <Form.Control
//         type="text"
//         placeholder="Search by product, brand, or color..."
//         value={searchTerm}
//         onChange={e => setSearchTerm(e.target.value)}
//         className="mb-3"
//       />

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>serialId</th>
//             <th>productName</th>
//             <th>brandName</th>
//             <th>color</th>
//             <th>price</th>
//             <th>size</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ans}
//         </tbody>
//       </Table>
//     </>
//   );
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Home() {
  const [mydata, setMydata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'

  useEffect(() => {
    axios.get("https://mocki.io/v1/10512a17-105f-435d-a920-dce1478345bd").then(res => {
      setMydata(res.data);
    });
  }, []);

  // Search + Filter logic
  const filteredData = mydata
    .filter(item =>
      (item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.color.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(item => (filterColor ? item.color.toLowerCase() === filterColor.toLowerCase() : true));

  // Sort logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (sortOrder === 'asc') return valA > valB ? 1 : -1;
    else return valA < valB ? 1 : -1;
  });

  const ans = sortedData.map((key, index) => (
    <tr key={index}>
      <td>{key.serialId}</td>
      <td>{key.productName}</td>
      <td>{key.brandName}</td>
      <td>{key.color}</td>
      <td>{key.price}</td>
      <td>{key.size}</td>
    </tr>
  ));

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <h1>Home Page</h1>

      {/* Search */}
      <Form.Control
        type="text"
        placeholder="Search by product, brand, or color..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      {/* Filter */}
      <Form.Select
        value={filterColor}
        onChange={e => setFilterColor(e.target.value)}
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
        <tbody>{ans}</tbody>
      </Table>
    </>
  );
}

export default Home;

