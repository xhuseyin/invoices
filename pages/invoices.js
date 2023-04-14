import Invoice from '../models/Invoice';

export default function Invoices({ invoices }) {
  return (
    <div>
      <h1>Invoices</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice._id}>
            <h2>Invoice #{invoice.invoiceNumber}</h2>
            <p>Customer Name: {invoice.customerName}</p>
            <p>Total: ${invoice.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch invoice data from the Invoice API
    const response = await fetch('http://localhost:3000/api/invoices');
    const data = await response.json();

    // Create an array of Invoice model instances from the data
    const invoices = data.map((invoiceData) => new Invoice(invoiceData));

    // Pass the invoices data to the Invoices component as props
    return {
      props: {
        invoices,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        invoices: [],
      },
    };
  }
}
