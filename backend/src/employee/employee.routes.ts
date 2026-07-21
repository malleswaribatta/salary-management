import { Hono } from "@hono/hono";
import {
  createEmployee,
  deleteEmployee,
  fetchCountries,
  fetchEmployeDepartmentStats,
  fetchEmployee,
  fetchEmployeeGenderCount,
  fetchEmployeeTypeCount,
  fetchEmployeeTypes,
  updateEmployee,
  uploadProfileImage,
} from "./employee.controller.ts";

export const employeeRoutes = new Hono();

employeeRoutes.post("/employee", createEmployee);
employeeRoutes.get("/employee", fetchEmployee);
employeeRoutes.put("/employee/:id", updateEmployee);
employeeRoutes.delete("/employee/:id", deleteEmployee);
employeeRoutes.post("/employee/:id/profile-image", uploadProfileImage);
employeeRoutes.get("/countries", fetchCountries);
employeeRoutes.get("/employeeTypes", fetchEmployeeTypes);
employeeRoutes.get(
  "/departmentStatsByCountry/:countryId",
  fetchEmployeDepartmentStats,
);
employeeRoutes.get(
  "/employeeType/headcountByCountry/:countryId",
  fetchEmployeeTypeCount,
);
employeeRoutes.get(
  "/employeeGender/headcountByCountry/:countryId",
  fetchEmployeeGenderCount,
);
employeeRoutes.get("/api/test", (c) => {
  return c.json({ message: "API is working" });
});
