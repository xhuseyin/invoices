import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import Invoice from '../../models/Invoice';

// Insert mock data
const mockInvoices = [
  {
    customerName: 'John Smith',
    invoiceNumber: 'INV-0001',
    items: [
      { name: 'Item 1', price: 10.00, quantity: 2 },
      { name: 'Item 2', price: 5.00, quantity: 3 },
      { name: 'Item 3', price: 2.50, quantity: 1 },
    ],
    total: 27.50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    customerName: 'Jane Doe',
    invoiceNumber: 'INV-0002',
    items: [
      { name: 'Item 1', price: 7.50, quantity: 1 },
      { name: 'Item 2', price: 12.00, quantity: 2 },
    ],
    total: 31.50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    customerName: 'Bob Johnson',
    invoiceNumber: 'INV-0003',
    items: [
      { name: 'Item 1', price: 20.00, quantity: 1 },
      { name: 'Item 2', price: 15.00, quantity: 1 },
      { name: 'Item 3', price: 8.00, quantity: 2 },
    ],
    total: 51.00,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    //await Invoice.insertMany(mockInvoices);
    const invoices = await Invoice.find().sort('-createdAt');
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

handler.post(async (req, res) => {
  try {
    const { customerName, invoiceNumber, items, total } = req.body;
    const invoice = new Invoice({
      customerName,
      invoiceNumber,
      items,
      total,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await invoice.save();
    res.json({ message: 'Invoice created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler;
