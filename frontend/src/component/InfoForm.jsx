function InfoForm({
  handleSubmit,
  employee,
  handleChange,
  handleImageChange,
  uploadProgress,
  loading,
  isCreate,
}) {
  return (
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
          disabled={uploadProgress < 100 && uploadProgress < 0}
        >
          {isCreate
            ? loading
              ? "Creating..."
              : "Create Employee"
            : loading
            ? "Updating..."
            : "Update Employee"}
        </button>
      </div>
    </form>
  );
}

export default InfoForm;
