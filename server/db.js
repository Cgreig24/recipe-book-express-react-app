import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const x = await mongoose.connect(process.env.MONGODB_LINK);
    console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
