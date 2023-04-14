import { useState, useEffect } from 'react';

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch('/api/invoices')
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {invoices.map(invoice => (
        <div key={invoice._id}>
          <h2>{invoice.customerName}</h2>
          <p>{invoice.invoiceNumber}</p>
          <p>{invoice.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Invoices;
