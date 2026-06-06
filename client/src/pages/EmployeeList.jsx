import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../services/employeeService";
import axios from "axios";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    const fetchEmployees = async (page = 1) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}?page=${page}&limit=6`
            );

            setEmployees(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };




  


    const filteredEmployees = employees.filter(
        (employee) => {
            const matchesSearch =
                employee.fullName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesDepartment =
                departmentFilter === "" ||
                employee.department === departmentFilter;

            return matchesSearch && matchesDepartment;
        }
    );



    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {
            await deleteEmployee(id);

            fetchEmployees(currentPage);

            setEmployees((prev) =>
                prev.filter((employee) => employee._id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold">
                        Employee Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your employees efficiently
                    </p>
                </div>

                <Link
                    to="/create"
                    className="bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                >
                    + Add Employee
                </Link>
            </div>

            

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search employee..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="flex-1 shadow-lg rounded-lg px-4 py-3"
                />

                <select
                    value={departmentFilter}
                    onChange={(e) =>
                        setDepartmentFilter(e.target.value)
                    }
                    className="shadow-lg rounded-lg px-4 py-3"
                >
                    <option value="">
                        All Departments
                    </option>

                    {[...new Set(
                        employees.map(
                            (emp) => emp.department
                        )
                    )].map((department) => (
                        <option
                            key={department}
                            value={department}
                        >
                            {department}
                        </option>
                    ))}
                </select>
            </div>


            <div className="overflow-x-auto  rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.length === 0 ? (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            <h2 className="text-xl font-semibold">
                                No Employees Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Try changing your search or filter.
                            </p>
                        </div>
                    ) :
                        (filteredEmployees.map((employee) => (
                            <div
                                key={employee._id}
                                className="bg-white rounded-xl shadow-lg p-5 ">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold">
                                        {employee.fullName}
                                    </h2>

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        {employee.department}
                                    </span>
                                </div>

                                <div className="space-y-2 text-gray-600">
                                    <p>{employee.email}</p>
                                    <p>{employee.phoneNumber}</p>
                                    <p>₹{employee.salary}</p>

                                    <p>
                                        {" "}
                                        {new Date(employee.joiningDate).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-5">
                                    <Link
                                        to={`/employee/${employee._id}`}
                                        className="flex-1 bg-gray-400 text-white text-center py-2 rounded"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/edit/${employee._id}`}
                                        className="flex-1 bg-blue-600 text-white text-center py-2 rounded"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="flex-1 bg-red-700 text-white py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>




                        )))}

                    
                </div>

                <div className="flex justify-center items-center gap-4 mt-10 mb-10">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === 1
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 text-white"
                                }`}
                        >
                            Previous
                        </button>

                        <span className="font-medium">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 text-white"
                                }`}
                        >
                            Next
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default EmployeeList;
