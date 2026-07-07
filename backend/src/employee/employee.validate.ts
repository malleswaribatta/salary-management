import { prisma } from "../../db.ts";

export const validateEmployeeType = async (employeeType: number) => {
  console.log("employeeType ---> ",employeeType)
  const employeeTypeDoc = await prisma.employeeType.findFirst({
    where: { id: employeeType },
  });
console.log("employeeTypeDoc--- ",employeeTypeDoc)
  if (!employeeTypeDoc) {
    throw new Error("Invalid employee type");
  }
  return employeeTypeDoc;
};

export const validateCountry = async (country: number) => {
  const countryDoc = await prisma.country.findFirst({
    where: { id: country },
  });
console.log("countryDoc --> ", countryDoc)
  if (!countryDoc) {
    throw new Error("Invalid Country");
  }
  return countryDoc;
};

export const validateEmail = async (email: string) => {
  const existing = await prisma.employee.findUnique({
    where: { email: email },
  });

  if (existing) {
    throw new Error("Email already exists");
  }
};
