import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_USERNAME;

    if (!uri) {
      throw new Error('Missing MONGODB_URI environment variable');
    }

    if (!dbName) {
      throw new Error('Missing DB_USERNAME environment variable');
    }

    // Connect to MongoDB and explicitly set the database name
    const db = await mongoose.connect(uri, {
      dbName: dbName,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log(`Database connected successfully to: ${dbName}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    // Don't exit the process in a serverless environment; rethrow so callers can decide how to handle it.
    throw error;
  }
}

export default dbConnect;