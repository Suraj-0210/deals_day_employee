import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import Navigation from "../component/Navigation";

function EditEmployee() {
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
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { slno } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/api/employee/${slno}`
        );
        const data = await response.json();
        if (response.ok) {
          setEmployee(data);
        } else {
          setError("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("An error occurred while fetching employee details.");
      }
    };
    fetchEmployeeDetails();
  }, [slno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
        setImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setEmployee((prev) => ({ ...prev, Image: downloadURL }));
          setUploadProgress(0);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3003/api/employee/${slno}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        }
      );

      if (response.ok) {
        alert("Employee updated successfully!");
        navigate("/employee-list");
      } else {
        setError("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="bg-yellow-400 text-black font-semibold p-2 text-lg">
        Edit Employee
      </div>
      <main className="p-6 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edit Employee
          </h2>
          {error && (
            <div className="bg-red-500 text-white p-4 mb-4 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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

              <div className="form-control w-full">
                <label className="label text-gray-800">Employee Mobile</label>
                <input
                  type="text"
                  name="Mobile"
                  value={employee.Mobile}
                  onChange={handleChange}
                  maxLength={10}
                  className="input input-bordered w-full text-white placeholder-gray-500"
                  placeholder="Enter Mobile No"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label text-gray-800">Designation</label>
                <select
                  name="Designation"
                  value={employee.Designation}
                  onChange={handleChange}
                  className="select select-bordered w-full text-white"
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

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

              <div className="form-control w-full">
                <label className="label text-gray-800">Employee Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full"
                />
              </div>

              {uploadProgress > 0 && (
                <progress
                  value={uploadProgress}
                  max={100}
                  className="progress progress-info mt-2"
                >
                  {uploadProgress}%
                </progress>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white"
                disabled={
                  loading || (uploadProgress > 0 && uploadProgress < 100)
                }
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

export default EditEmployee;
