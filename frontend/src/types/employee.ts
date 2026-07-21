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
  profileImageKey?: string | null;
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

export interface DepartmentStats {
  department: string;
  headCount: number;
  avgSalary: number;
  minSalary: number;
  maxSalary: number;
}

export type SalarySummary = {
  headcount: number;
  averageSalary: number;
  minSalary: number;
  maxSalary: number;
  totalPayroll: number;
};

export type CreateEmployeePayload = {
  name: string;
  email: string;
  gender: string;
  role: string;
  department: string;
  countryId: number;
  employeeTypeId: number;
  salary: number;
  joiningDate: string;
  profileImage?: File | null;
};
