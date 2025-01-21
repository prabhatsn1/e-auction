import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@auctioncluster.v0p9h.mongodb.net/?retryWrites=true&w=majority&appName=auctionCluster`;
if (!connectionString) {
  console.log(
    "please define the MONGODB_URI environment variable inside .env.local"
  );
  throw new Error("Please define the MONGODB_URI environment variable");
}

const connectDB = async () => {
  console.log("---- Connecting to MongoDB ----", connectionString);
  if (mongoose.connection?.readyState >= 1) {
    console.log("---- Already connected to MongoDB ----");
    return;
  }

  try {
    await mongoose.connect(connectionString);
    console.log("---- Connected to MongoDB ----");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
  }
};

export default connectDB;
