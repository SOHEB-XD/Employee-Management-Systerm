const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller");


/**
 * @method post
 * @API "/"
 * @description Api to get employee data from the frontend and create and store employee in the database
 */
router.post("/", createEmployee);


/**
 * @method get
 * @API "/"
 * @description Api to fetch all the employees data from the database and send to the frontend
 */
router.get("/", getEmployees);


/**
 * @method get
 * @API "/:id"
 * @description Api to get a sigle employee data from database 
 */
router.get("/:id", getEmployee);


/**
 * @method put
 * @API "/:id"
 * @description Api to get updated data from the frontend and update the existing employee data in the database
 */
router.put("/:id", updateEmployee);


/**
 * @method delete
 * @API "/:id"
 * @description Api to delete an existing data in the database
 */
router.delete("/:id", deleteEmployee);

module.exports = router;
