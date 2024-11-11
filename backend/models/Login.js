import mongoose from "mongoose";

// Schema for the login table
const loginSchema = new mongoose.Schema(
  {
    Sno: {
      type: Number,
      required: true,
      unique: true,
    },
    Username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", loginSchema);

export default Login;
