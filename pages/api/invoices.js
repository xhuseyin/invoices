import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import Invoice from '../../models/Invoice';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const invoices = await Invoice.find().sort('-createdAt');
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler;
