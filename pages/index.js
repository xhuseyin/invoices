import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Container,
  TableContainer,
  Flex
} from "@chakra-ui/react";

// dynamic import
const Button = dynamic(() => import('cakmak-ui').then(mod => mod.Button), { ssr: false })
const Input = dynamic(() => import('cakmak-ui').then(mod => mod.Input), { ssr: false })

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
<Container maxW={{ base: "100%", sm: "640px", md: "768px", lg: "960px", xl: "1200px" }}>
  <Text as="h3" fontSize="3xl" fontWeight="bold" mb="5" color="primary.700">
    Create New Invoice
  </Text>
  <Box as="form" onSubmit={handleSubmit}>
  <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap="2">
    <Box mb="4">
      <Text htmlFor="customerName" fontWeight="bold">
        Customer Name:
      </Text>
      <Input
        type="text"
        id="customerName"
        value={customerName}
        onChange={(event) => setCustomerName(event.target.value)}
      />
    </Box>
    <Box mb="4">
      <Text htmlFor="invoiceNumber" fontWeight="bold">
        Invoice Number:
      </Text>
      <Input
        type="text"
        id="invoiceNumber"
        value={invoiceNumber}
        onChange={(event) => setInvoiceNumber(event.target.value)}
      />
    </Box>
    <Box mb="4">
      <Text htmlFor="itemName" fontWeight="bold">
        Item Name:
      </Text>
      <Input
        type="text"
        id="itemName"
        value={itemName}
        onChange={(event) => setItemName(event.target.value)}
      />
    </Box>
    <Box mb="4">
      <Text htmlFor="itemPrice" fontWeight="bold">
        Item Price:
      </Text>
      <Input
        type="number"
        id="itemPrice"
        value={itemPrice}
        onChange={(event) => setItemPrice(event.target.value)}
      />
    </Box>
    <Box mb="4">
      <Text htmlFor="itemQuantity" fontWeight="bold">
        Item Quantity:
      </Text>
      <Input
        type="number"
        id="itemQuantity"
        value={itemQuantity}
        onChange={(event) => setItemQuantity(event.target.value)}
      />
    </Box>
    </Flex>
    <Box>
    <Button type="submit" color="white">
      Create Invoice
    </Button>
    {errorMessage && <Text color="red">{errorMessage}</Text>}
    </Box>
  </Box>
  <Box>
  <TableContainer>
  <Table variant="simple" mt="5">
    <Thead>
      <Tr>
        <Th>Customer Name</Th>
        <Th>Invoice Number</Th>
        <Th>Item Name</Th>
        <Th>Item Price</Th>
        <Th>Item Quantity</Th>
        <Th>Total</Th>
        <Th>Created Date</Th>
      </Tr>
    </Thead>
    <Tbody>
      {invoices.map((invoice) => (
        <Tr key={invoice.id}>
          <Td>{invoice.customerName}</Td>
          <Td>{invoice.invoiceNumber}</Td>
          <Td>{invoice.items?.[0]?.name}</Td>
          <Td>{invoice.items?.[0]?.price}</Td>
          <Td>{invoice.items?.[0]?.quantity}</Td>
          <Td>{invoice.total}</Td>
          <Td>{new Date(invoice.createdAt).toLocaleDateString('tr-TR')}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
  </TableContainer>
  </Box>
</Container>
)
    }
    
export default InvoicesPage
