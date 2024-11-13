/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function EmployeeCard({ employee, handleDelete, handleEdit }) {
  return (
    <tr key={employee._id} className="hover:bg-gray-50 text-black">
      <td className="p-2">{employee.Id}</td>
      <td className="p-2">
        <img
          src={employee.Image}
          alt={employee.Name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="p-2">{employee.Name}</td>
      <td className="p-2">{employee.Email}</td>
      <td className="p-2">{employee.Mobile}</td>
      <td className="p-2">{employee.Designation}</td>
      <td className="p-2">{employee.Gender}</td>
      <td className="p-2">{employee.Course.join(", ")}</td>{" "}
      {/* Join array for display */}
      <td className="p-2">
        {new Date(employee.Createdate).toLocaleDateString()}
      </td>
      <td className="p-2 space-x-2">
        <button
          onClick={() => handleEdit(employee.Id)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(employee.Id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default EmployeeCard;
