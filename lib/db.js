import mongoose from 'mongoose';
import colors from 'colors';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

// Global Cache for Mongoose Connection:
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * If a connection does not exist, we check if a promise is already in progress.
 * If a promise is already in progress, we wait for it to resolve to get the connection.
 * i.e. to ensure that there is only one connection attempt happening at a time.
 */
const connectDB = async () => {
  if (!cached.promise) {
    const connectionOptions = {
      bufferCommands: false, // Disable buffering of commands to improve error handling
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, connectionOptions)
      .then((mongooseInstance) => {
        console.log(
          colors.green('MongoDB connected:', mongooseInstance.connection.host),
        );
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDB;
