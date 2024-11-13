import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import Navigation from "../component/Navigation";
import InfoForm from "../component/InfoForm";

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
  console.log(employee.Image);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

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
      setEmployee((prev) => ({ ...prev, [name]: value }));
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
          setUploadProgress(0); // Reset progress after upload
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3003/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee created successfully!");
        navigate("/employee-list");
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
      <Navigation />
      <div className="bg-yellow-400 text-black font-semibold p-2 text-lg">
        Create Employee
      </div>
      <main className="p-6 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add a New Employee
          </h2>
          <InfoForm
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            employee={employee}
            uploadProgress={uploadProgress}
            loading={loading}
            isCreate={true}
          />
        </div>
      </main>
    </div>
  );
}

export default CreateEmployee;
