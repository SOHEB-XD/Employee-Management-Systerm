import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployee } from "../services/employeeService";

const EmployeeDetails = () => {
    const { id } = useParams();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const res = await getEmployee(id);
            setEmployee(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Link
                to="/"
           
            >
                ← Back
            </Link>

            <div className="bg-white shadow-lg rounded-xl p-8 mt-4">
                <h1 className="text-3xl font-bold mb-6">
                    {employee.fullName}
                </h1>

                <div className="space-y-4">
                    <p>
                        <strong>Email:</strong> {employee.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {employee.phoneNumber}
                    </p>

                    <p>
                        <strong>Department:</strong>{" "}
                        {employee.department}
                    </p>

                    <p>
                        <strong>Salary:</strong> ₹
                        {employee.salary.toLocaleString()}
                    </p>

                    <p>
                        <strong>Joining Date:</strong>{" "}
                        {new Date(
                            employee.joiningDate
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;