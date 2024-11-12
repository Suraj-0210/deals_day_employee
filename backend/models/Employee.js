import mongoose from "mongoose";

// Schema for the employee table
const employeeSchema = new mongoose.Schema(
  {
    Id: { type: Number, required: true, unique: true },
    Image: { type: String, required: false },
    Name: { type: String, required: true },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    Designation: { type: String, required: true },
    Gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    Course: { type: [String], required: true }, // Changed to array for multiple selections
    Createdate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Model creation
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
