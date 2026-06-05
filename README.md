# Employee Management System

A full-stack Employee Management System built using the MERN stack. This application allows users to manage employee records with complete CRUD functionality, search and filtering capabilities, pagination, and sorting.

## Live Demo

**Frontend:** [Add Frontend URL Here]

**Backend:** [Add Backend URL Here]

---

## Features

### Employee Management

* Create Employee
* View All Employees
* View Employee Details
* Update Employee Information
* Delete Employee

### Additional Features

* Search Employees by Name
* Department Filter
* Pagination
* Sorting
* Responsive Design
* Form Validation
* Loading States
* Error Handling

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Deployment

* Vercel (Frontend)
* Vercel (Backend)

---

## Project Structure

### Frontend

```bash
client/
├── src/
│   ├── pages/
│   │   ├── EmployeeList.jsx
│   │   ├── AddEmployee.jsx
│   │   ├── EditEmployee.jsx
│   │   └── EmployeeDetails.jsx
│   ├── services/
│   │   └── employeeService.js
│   ├── App.jsx
│   └── main.jsx
├── .env
└── package.json
```

### Backend

```bash
server/
├── config/
│   └── db.js
├── controllers/
│   └── employeeController.js
├── models/
│   └── Employee.js
├── routes/
│   └── employeeRoutes.js
├── .env
├── server.js
└── package.json
```

---

## API Endpoints

### Create Employee

```http
POST /api/employees
```

### Get All Employees

```http
GET /api/employees
```

### Get Employee By ID

```http
GET /api/employees/:id
```

### Update Employee

```http
PUT /api/employees/:id
```

### Delete Employee

```http
DELETE /api/employees/:id
```

---

## Search, Filter, Pagination & Sorting

### Search Employee

```http
GET /api/employees?search=soheb
```

### Filter By Department

```http
GET /api/employees?department=IT
```

### Pagination

```http
GET /api/employees?page=1&limit=5
```

### Sorting

```http
GET /api/employees?sort=salary
```

Descending Order:

```http
GET /api/employees?sort=-salary
```

---

## Employee Schema

```javascript
{
  fullName: String,
  email: String,
  phoneNumber: String,
  department: String,
  salary: Number,
  joiningDate: Date
}
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend (.env)

```env
VITE_API_URL=your_backend_api_url
```

---

## Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---


## Author

**Soheb khan**

MERN Stack Developer
