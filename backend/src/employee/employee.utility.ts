import { prisma } from "../../db.ts";

export const createRoleIfNotExists = async (role: string) => {
  return await prisma.role.upsert({
    where: { name: role },
    update: {},
    create: { name: role },
  });
};

export const createDepartmentIfNotExists = async (department: string) => {
  return await prisma.department.upsert({
    where: { name: department },
    update: {},
    create: { name: department },
  });
};

export const createCountryIfNotExists = async (country: string) => {
  return await prisma.country.upsert({
    where: { name: country },
    update: {},
    create: { name: country },
  });
};