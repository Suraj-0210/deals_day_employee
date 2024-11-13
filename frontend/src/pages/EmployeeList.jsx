import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Importing the search icon
import Navigation from "../component/Navigation";
import EmployeeCard from "../component/EmployeeCard";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  const fetchEmployees = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3003/api/employee?page=${page}&limit=5&sortBy=Id&sortOrder=asc`
      );
      const data = await response.json();
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []); // Fetch employees whenever the search query changes

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(
          `http://localhost:3003/api/employee/${id}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.Id !== id)
          );
          setTotalCount(totalCount - 1);
          alert("Employee deleted successfully!");
        } else {
          alert("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = (id) => navigate(`/edit-employee/${id}`);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchEmployees(page);
  };

  const handleSearch = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3003/api/employee?page=${page}&limit=6&sortBy=Email&sortOrder=asc&search=${searchQuery}`
      );
      const data = await response.json();
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
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
      <Navigation />
      <div className="bg-yellow-400 text-black font-semibold p-2 text-lg">
        Employee List
      </div>

      <main className="p-6 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <span className="text-gray-700 text-lg">
            Total Employees: {totalCount}
          </span>
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-2">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered text-white placeholder-gray-500"
              />
              <button
                onClick={handleSearch}
                className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                <FaSearch className="mr-2" />
              </button>
            </div>
            <Link
              to="/create-employee"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              + Add Employee
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <table className="table-auto w-full border">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {[
                  "Unique ID",
                  "Image",
                  "Name",
                  "Email",
                  "Mobile",
                  "Designation",
                  "Gender",
                  "Course",
                  "Create Date",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className="p-2 text-left">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  // eslint-disable-next-line react/jsx-key
                  <EmployeeCard
                    employee={employee}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
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

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default EmployeeList;
