const Employee = require("../models/employee.model");

// CREATING NEW EMPLOYEE IN THE DATABASE
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TO GET ALL EMPLOYEE FROM THE DATABASE
const getEmployees = async (req, res) => {
  try {
    const {
      search,
      department,
      page = 1,
      limit = 100,  
      sort,
    } = req.query;

    let query = {};

    // Search
    if (search) {
      query.fullName = {
        $regex: search,
        $options: "i",
      };
    }

    // Department Filter
    if (department) {
      query.department = department;
    }

    let employeeQuery = Employee.find(query);

    // Sorting
    if (sort) {
      employeeQuery = employeeQuery.sort(sort);
    }

    // Pagination
    const skip = (page - 1) * limit;

    employeeQuery = employeeQuery
      .skip(skip)
      .limit(Number(limit));

    const employees = await employeeQuery;

    const totalEmployees = await Employee.countDocuments(query);

    res.status(200).json({
      success: true,
      totalEmployees,
      currentPage: Number(page),
      totalPages: Math.ceil(totalEmployees / limit),
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TO GET SINGLE EMPLOYEE
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TO UPDATE AN EMPLOYEE DETAILS
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TO DELETE AN EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};