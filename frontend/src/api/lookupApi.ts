import axios from "axios";

const BASE_URL = "http://localhost:8002/api";

export const getCountries = async () => {
  const res = await axios.get(`${BASE_URL}/countries`);
  return res.data;
};

export const getEmployeeTypes = async () => {
  const res = await axios.get(`${BASE_URL}/employeeTypes`);
  return res.data;
};