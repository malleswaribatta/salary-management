import { z } from "zod";

export const GenderEnum = z.enum(["Male", "Female", "Other"]);

export const EmployeeTypeEnum = z.enum(["Full-Time", "Contract"]);

export const CreateEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().email("Invalid email format"),

  joiningDate: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Invalid joining date"),

  gender: GenderEnum,

  role: z.string().min(1, "Role is required"),

  department: z.string().min(1, "Department is required"),

  countryId: z.number().min(1, "Country is required"),

  employeeTypeId: z.number().min(1, "EmployeeType is required"),
  salary: z.number(),
});

export const UpdateEmployeeSchema = z.object({
  role: z.string().min(1, "Role is required"),

  department: z.string().min(1, "Department is required"),

  countryId: z.number().min(1, "Country is required"),

  employeeTypeId: z.number().min(1, "EmployeeType is required"),

  salary: z.number().positive("Salary must be greater than 0"),
});

export type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;
export type UpdateEmployeeSchema = z.infer<typeof UpdateEmployeeSchema>;
