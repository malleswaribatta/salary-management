export type Lookup = {
  id: number;
  name: string;
};

export type Employee = {
  id: number;
  name: string;
  email: string;
  joiningDate: string;
  gender: "Male" | "Female" | "Other";
  role: Lookup;
  department: Lookup;
  country: Lookup;
  employeeType: Lookup;
  salary: number;
};

export type GenderCount = {
  data: {
    female: number;
    male: number;
    other: number;
  };
};

export type EmployeeTypeeCount = {
  data: {
    "full-time": number;
    contract: number;
  };
};

export interface DepartmentStats  {
    department: string;
    headCount: number;
    avgSalary: number;
    minSalary: number;
    maxSalary: number;
};

export type SalarySummary = {
  headcount: number;
  averageSalary: number;
  minSalary: number;
  maxSalary: number;
  totalPayroll: number;
}
