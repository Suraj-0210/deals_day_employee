import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../component/Navigation";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/api/employee?page=1&limit=5"
        );
        const data = await response.json();
        setEmployees(data.employees);
        setTotalCount(data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3003/api/employee/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Remove the deleted employee from the state
          setEmployees(employees.filter((employee) => employee._id !== id));
          setTotalCount(totalCount - 1);
          alert("Employee deleted successfully!");
        } else {
          alert("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("An error occurred while deleting the employee.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`); // Navigate to the EditEmployee page with the employee's ID
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navigation />

      {/* Dashboard Bar */}
      <div className="bg-yellow-400 text-black font-semibold p-2 text-lg">
        Employee List
      </div>

      {/* Main Content */}
      <main className="p-6 space-y-4">
        {/* White Bar - Employee Count and Create Employee Button */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <span className="text-gray-700 text-lg">
            Total Count: {totalCount}
          </span>
          <Link
            to="/create-employee"
            className="btn btn-primary text-white hover:bg-yellow-500"
          >
            Create Employee
          </Link>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <table className="table w-full">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="p-2">Unique Id</th>
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Designation</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Course</th>
                <th className="p-2">Create Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-gray-50 text-black"
                  >
                    <td className="p-2">{employee.Id}</td> {/* Unique Id */}
                    <td className="p-2">
                      <img
                        src={employee.Image}
                        alt={employee.Name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>{" "}
                    {/* Image */}
                    <td className="p-2">{employee.Name}</td> {/* Name */}
                    <td className="p-2">{employee.Email}</td> {/* Email */}
                    <td className="p-2">{employee.Mobile}</td> {/* Mobile */}
                    <td className="p-2">{employee.Designation}</td>{" "}
                    {/* Designation */}
                    <td className="p-2">{employee.Gender}</td> {/* Gender */}
                    <td className="p-2">{employee.Course}</td> {/* Course */}
                    <td className="p-2">
                      {new Date(employee.Createdate).toLocaleDateString()}
                    </td>{" "}
                    {/* Create Date */}
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(employee.Id)}
                        className="btn btn-sm btn-primary mr-2 hover:bg-blue-500"
                      >
                        Edit
                      </button>{" "}
                      {/* Edit Button */}
                      <button
                        onClick={() => handleDelete(employee.Id)}
                        className="btn btn-sm btn-danger hover:bg-red-500"
                      >
                        Delete
                      </button>{" "}
                      {/* Delete Button */}
                    </td>{" "}
                    {/* Actions */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-500 p-4">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default EmployeeList;
