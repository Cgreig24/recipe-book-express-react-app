import mongoose from "mongoose";
const { Schema, model } = mongoose;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true },
});

export { userSchema };

// Default export for Recipe model
const User = mongoose.model("User", userSchema, "users");
export default User;
