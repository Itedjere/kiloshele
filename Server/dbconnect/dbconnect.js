import mongoose from "mongoose";

export default async function dbconnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to Db: ", error);
  }
}
