import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../component/Navigation";

function CreateEmployee() {
  const [employee, setEmployee] = useState({
    Image: "",
    Name: "",
    Email: "",
    Mobile: "",
    Designation: "",
    Gender: "",
    Course: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For checkboxes (Course)
    if (name === "Course") {
      setEmployee((prev) => {
        const updatedCourses = prev.Course.includes(value)
          ? prev.Course.filter((course) => course !== value)
          : [...prev.Course, value];
        return { ...prev, Course: updatedCourses };
      });
    } else {
      setEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3003/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee created successfully!");
        navigate("/employee-list"); // Redirect to employee list
      } else {
        alert("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navigation />

      {/* Dashboard Bar */}
      <div className="bg-yellow-400 text-black font-semibold p-2 text-lg">
        Create Employee
      </div>

      {/* Main Content */}
      <main className="p-6 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add a New Employee
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name */}
              <div className="form-control w-full">
                <label className="label text-gray-800">Employee Name</label>
                <input
                  type="text"
                  name="Name"
                  value={employee.Name}
                  onChange={handleChange}
                  className="input input-bordered w-full text-white placeholder-gray-500"
                  placeholder="Enter Name"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label text-gray-800">Employee Email</label>
                <input
                  type="email"
                  name="Email"
                  value={employee.Email}
                  onChange={handleChange}
                  className="input input-bordered w-full text-white placeholder-gray-500"
                  placeholder="Enter Email"
                  required
                />
              </div>

              {/* Mobile */}
              <div className="form-control w-full">
                <label className="label text-gray-800">Employee Mobile</label>
                <input
                  type="text"
                  name="Mobile"
                  value={employee.Mobile}
                  onChange={handleChange}
                  className="input input-bordered w-full text-white placeholder-gray-500"
                  placeholder="Enter Mobile No"
                  required
                />
              </div>

              {/* Designation */}
              <div className="form-control w-full">
                <label className="label text-gray-800">Designation</label>
                <select
                  name="Designation"
                  value={employee.Designation}
                  onChange={handleChange}
                  className="select select-bordered w-full text-white"
                  required
                >
                  <option value="" className="text-gray-800">
                    Select Designation
                  </option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              {/* Gender (Radio Buttons) */}
              <div className="form-control w-full">
                <label className="label text-gray-800">Gender</label>
                <div className="flex gap-4 text-black">
                  <label>
                    <input
                      type="radio"
                      name="Gender"
                      value="Male"
                      checked={employee.Gender === "Male"}
                      onChange={handleChange}
                      className="radio"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="Gender"
                      value="Female"
                      checked={employee.Gender === "Female"}
                      onChange={handleChange}
                      className="radio"
                    />
                    Female
                  </label>
                </div>
              </div>

              {/* Course (Checkboxes) */}
              <div className="form-control w-full">
                <label className="label text-gray-800">Course</label>
                <div className="flex gap-4 text-black">
                  <label>
                    <input
                      type="checkbox"
                      name="Course"
                      value="MCA"
                      checked={employee.Course.includes("MCA")}
                      onChange={handleChange}
                      className="checkbox"
                    />
                    MCA
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Course"
                      value="BCA"
                      checked={employee.Course.includes("BCA")}
                      onChange={handleChange}
                      className="checkbox"
                    />
                    BCA
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="Course"
                      value="BSC"
                      checked={employee.Course.includes("BSC")}
                      onChange={handleChange}
                      className="checkbox"
                    />
                    BSC
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="form-control w-full">
                <label className="label text-gray-800">Employee Image</label>
                <input
                  type="file"
                  name="Image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setEmployee((prev) => ({
                        ...prev,
                        Image: imageUrl,
                      }));
                    }
                  }}
                  className="file-input file-input-bordered w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Employee"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateEmployee;
