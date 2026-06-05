import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getEmployee,
  updateEmployee,
} from "../services/employeeService";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "",
    salary: "",
    joiningDate: "",
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployee(id);

      setFormData({
        fullName: res.data.data.fullName,
        email: res.data.data.email,
        phoneNumber: res.data.data.phoneNumber,
        department: res.data.data.department,
        salary: res.data.data.salary,
        joiningDate:
          res.data.data.joiningDate.split("T")[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateEmployee(id, formData);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Link
          to="/"
         
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Edit Employee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full shadow-lg rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full shadow-lg rounded-lg p-3"
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full shadow-lg rounded-lg p-3"
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full shadow-lg rounded-lg p-3"
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full shadow-lg rounded-lg p-3"
          />

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="w-full shadow-lg rounded-lg p-3"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Updating..."
              : "Update Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;