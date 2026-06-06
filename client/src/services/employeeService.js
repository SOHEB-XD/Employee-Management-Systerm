import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const getEmployee = (id) =>
  axios.get(`${API}/${id}`);

export const createEmployee = (data) =>
  axios.post(API, data);

export const updateEmployee = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteEmployee = (id) =>
  axios.delete(`${API}/${id}`);
