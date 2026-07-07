import { Hono } from "@hono/hono";
import { createEmployee, deleteEmployee, fetchCountries, fetchEmployee, fetchEmployeeTypes, updateEmployee, fetchEmployeeTypeCount, fetchEmployeDepartmentStats, fetchEmployeeGenderCount } from "./employee.controller.ts";

export const employeeRoutes = new Hono();

employeeRoutes.post("/employee", createEmployee);
employeeRoutes.get("/employee", fetchEmployee);
employeeRoutes.put("/employee/:id", updateEmployee)
employeeRoutes.delete("/employee/:id", deleteEmployee)
employeeRoutes.get("/countries", fetchCountries)
employeeRoutes.get("/employeeTypes", fetchEmployeeTypes)
employeeRoutes.get("/departmentStatsByCountry/:countryId", fetchEmployeDepartmentStats)
employeeRoutes.get("/employeeType/headcountByCountry/:countryId", fetchEmployeeTypeCount)
employeeRoutes.get("/employeeGender/headcountByCountry/:countryId", fetchEmployeeGenderCount)
