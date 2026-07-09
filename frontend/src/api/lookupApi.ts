import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getCountries = async () => {
  const res = await axios.get(`${BASE_URL}/countries`);
  return res.data;
};

export const getEmployeeTypes = async () => {
  const res = await axios.get(`${BASE_URL}/employeeTypes`);
  return res.data;
};