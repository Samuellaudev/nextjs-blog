import mongoose from 'mongoose';
import colors from 'colors';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(colors.bgGreen(`MongoDB connected: ${conn.connection.host}`));
  } catch (error) {
    console.log('Error: ', error);
    process.exit(1);
  }
};

export default connectDB;
