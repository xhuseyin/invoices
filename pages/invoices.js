import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f5f5f5;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setCustomerName('');
    setInvoiceNumber('');
    setItemName('');
    setItemPrice('');
    setItemQuantity('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate inputs
    if (!customerName || !invoiceNumber || !itemName || !itemPrice || !itemQuantity) {
      setErrorMessage('Please fill all fields');
      return;
    }

    // create new invoice object
    const newItem = {
      customerName,
      invoiceNumber,
      items: [
        {
          name: itemName,
          price: parseFloat(itemPrice),
          quantity: parseInt(itemQuantity),
        },
      ],
      total: parseFloat(itemPrice) * parseInt(itemQuantity),
    };

    try {
      // post new invoice to server
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      // add new invoice to state and reset form
      const data = await response.json();
      setInvoices([...invoices, data]);
      setInvoices([...invoices, newItem]); // update state immediately
      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create invoice');
    }
  };

  const fetchInvoices = async () => {
    try {
      // get all invoices from server
      const response = await fetch('/api/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch invoices');
    }
  };

  React.useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <>
      <h1>Create New Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            type="text"
            id="invoiceNumber"
            value={invoiceNumber}
            onChange={(event) => setInvoiceNumber(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
          </div>
          <div>
  <label htmlFor="itemPrice">Item Price:</label>
  <input
    type="number"
    id="itemPrice"
    value={itemPrice}
    onChange={(event) => setItemPrice(event.target.value)}
  />
</div>
<div>
  <label htmlFor="itemQuantity">Item Quantity:</label>
  <input
    type="number"
    id="itemQuantity"
    value={itemQuantity}
    onChange={(event) => setItemQuantity(event.target.value)}
  />
</div>
<div>
  <button type="submit">Create Invoice</button>
  {errorMessage && <p>{errorMessage}</p>}
</div>
<StyledTable>
  <thead>
    <tr>
      <th>Customer Name</th>
      <th>Invoice Number</th>
      <th>Item Name</th>
      <th>Item Price</th>
      <th>Item Quantity</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
  {invoices.map((invoice) => (
  <tr key={invoice.id}>
    <td>{invoice.customerName}</td>
    <td>{invoice.invoiceNumber}</td>
    <td>{invoice.items?.[0]?.name}</td>
    <td>{invoice.items?.[0]?.price}</td>
    <td>{invoice.items?.[0]?.quantity}</td>
    <td>{invoice.total}</td>
  </tr>
))}

  </tbody>
</StyledTable>
    </form>
    </>
)
    }
    
export default InvoicesPage
