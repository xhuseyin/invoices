import mongoose from 'mongoose';

const database = async (req, res, next) => {
  if (mongoose.connections[0].readyState) {
    // Use current database connection
    return next();
  }

  // Create new database connection
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: false,
    });
    console.error('connected to mondoDB!!!');
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default database;
