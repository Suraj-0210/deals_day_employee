import Employee from "../models/Employee.js";

// Create a new employee
export const createEmployee = async (req, res) => {
  try {
    // Fetch the last created entry to determine the latest Id
    const lastEmployee = await Employee.findOne().sort({ Id: -1 });
    const newId = lastEmployee ? lastEmployee.Id + 1 : 1;

    const newEmployee = new Employee({ ...req.body, Id: newId });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get employees with filters, sorting, and pagination
export const getEmployees = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "Createdate",
    sortOrder = "desc",
    search = "",
  } = req.query;

  try {
    const query = {
      $or: [
        { Name: new RegExp(search, "i") },
        { Email: new RegExp(search, "i") },
      ],
    };

    const employees = await Employee.find(query)
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalEmployees = await Employee.countDocuments(query);

    res.json({
      employees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ Id: req.params.Id });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { Id: req.params.Id },
      req.body,
      { new: true }
    );
    if (!updatedEmployee)
      return res.status(404).json({ error: "Employee not found" });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ Id: req.params.Id });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
