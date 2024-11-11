import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee); // Create employee
router.get("/", getEmployees); // Get employees with filters
router.get("/:Id", getEmployeeById); // Get employee by ID
router.put("/:Id", updateEmployee); // Update employee
router.delete("/:Id", deleteEmployee); // Delete employee

export default router;
