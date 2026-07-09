import { prisma } from "../../db.ts";
import { CreateEmployeeDTO, UpdateEmployeeSchema } from "./employee.dto.ts";
import {
  createDepartmentIfNotExists,
  createRoleIfNotExists,
} from "./employee.utility.ts";
import {
  validateCountry,
  validateEmail,
  validateEmployeeType,
} from "./employee.validate.ts";

export const createEmployeeService = async (data: CreateEmployeeDTO) => {
  await validateEmail(data.email);

  const employeeType = await validateEmployeeType(Number(data.employeeTypeId));
  const role = await createRoleIfNotExists(data.role);
  const department = await createDepartmentIfNotExists(data.department);
  const country = await validateCountry(Number(data.countryId));

  return await prisma.employee.create({
    data: {
      name: data.name,
      email: data.email,
      joiningDate: new Date(data.joiningDate),
      gender: data.gender,
      salary: data.salary,
      roleId: role.id,
      departmentId: department.id,
      countryId: country.id,
      employeeTypeId: employeeType.id,
    },
  });
};

export const getEmployeeService = async (id: number) => {
  return await prisma.employee.findMany({
    where: id ? { id } : {},
    include: {
      role: true,
      department: true,
      country: true,
      employeeType: true,
    },
  });
};

export const getCountriesService = async (id: number) => {
  return await prisma.country.findMany({
    where: id ? { id } : {},
  });
};

export const getEmployeeTypesService = async (id: number) => {
  return await prisma.employeeType.findMany({
    where: id ? { id } : {},
  });
};

export const getEmployeeDepartmentCountService = async () => {
  const departments = await prisma.department.findMany({
    select: {
      name: true,
      _count: {
        select: {
          employees: true,
        },
      },
    },
  });

  return departments.map((department) => ({
    department: department.name,
    count: department._count,
  }));
};

export const updateEmployeeService = async (
  id: number,
  data: UpdateEmployeeSchema,
) => {
  const role = await createRoleIfNotExists(data.role);
  const department = await createDepartmentIfNotExists(data.department);
  const employeeType = await validateEmployeeType(data.employeeTypeId);
  const country = await validateCountry(data.countryId);
  // const country = await createCountryIfNotExists(data.country);

  return await prisma.employee.update({
    where: { id },
    data: {
      salary: data.salary,
      roleId: role.id,
      departmentId: department.id,
      countryId: country.id,
      employeeTypeId: employeeType.id,
    },
  });
};

export const deleteEmployeeService = async (id: number) => {
  return await prisma.employee.delete({
    where: { id },
  });
};

export const getEmployeeDepartmentStats = async (countryId: number) => {
  const [departmentStats, departments] = await Promise.all([
    prisma.employee.groupBy({
      where: { countryId },
      by: ["departmentId"],
      _count: {
        _all: true,
      },
      _avg: {
        salary: true,
      },
      _min: {
        salary: true,
      },
      _max: {
        salary: true,
      },
    }),

    prisma.department.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  type DepartmentStat = (typeof departmentStats)[number];
  type Department = (typeof departments)[number];

  const result = departmentStats.map((stat: DepartmentStat) => ({
    department: departments.find((d: Department) => d.id === stat.departmentId)
      ?.name,
    headCount: Number(stat._count._all ?? 0),
    avgSalary: Number(stat._avg.salary ?? 0),
    minSalary: Number(stat._min.salary ?? 0),
    maxSalary: Number(stat._max.salary ?? 0),
  }));

  console.log(result);
  return result;
};

export const getEmployeeTypeCount = async (countryId: number) => {
  const [fullTimeCount, contractCount] = await Promise.all([
    prisma.employee.count({
      where: {
        countryId: countryId,
        employeeTypeId: 1,
      },
    }),
    prisma.employee.count({
      where: {
        countryId: countryId,
        employeeTypeId: 2,
      },
    }),
  ]);

  const result = {
    "full-time": fullTimeCount,
    contract: contractCount,
  };
  console.log(fullTimeCount, "-----", contractCount);
  return result;
};

export const getEmployeeGenderCount = async (countryId: number) => {
  const genderCounts = await prisma.employee.groupBy({
    by: ["gender"],
    where: {
      countryId,
    },
    _count: {
      gender: true,
    },
  });

  const result = {
    female: 0,
    male: 0,
    other: 0,
  };

  for (const { gender, _count } of genderCounts) {
    result[gender.toLowerCase() as keyof typeof result] = _count.gender;
  }

  return result;
};
