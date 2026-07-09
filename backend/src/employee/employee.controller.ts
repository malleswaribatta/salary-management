import { Context } from "node:vm";
import { CreateEmployeeSchema } from "./employee.dto.ts";
import {
  createEmployeeService,
  deleteEmployeeService,
  getCountriesService,
  getEmployeeDepartmentStats,
  getEmployeeGenderCount,
  getEmployeeService,
  getEmployeeTypeCount,
  getEmployeeTypesService,
  updateEmployeeService,
} from "./employee.service.ts";

export const createEmployee = async (c: Context) => {
  try {
    const body = await c.req.json();

    // validate using Zod
    const validatedData = CreateEmployeeSchema.parse(body);

    const result = await createEmployeeService(validatedData);
    return c.json({ success: true, data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};

export const fetchEmployee = async (c: Context) => {
  try {
    const id = Number(c.req.query("id"));

    // validate using Zod
    // const validatedData = CreateEmployeeSchema.parse(body);

    const result = await getEmployeeService(id);

    return c.json({ data: result });
  } catch (error: unknown) {
    console.error("===== ERROR =====");
    console.error(error);

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Name:", error.name);
      console.error("Stack:", error.stack);
    }

    return c.json(
      {
        error,
        message: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  }
};

export const fetchCountries = async (c: Context) => {
  try {
    const id = Number(c.req.query("id"));

    // validate using Zod
    // const validatedData = CreateEmployeeSchema.parse(body);

    const result = await getCountriesService(id);

    return c.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};

export const fetchEmployeeTypes = async (c: Context) => {
  try {
    const id = Number(c.req.query("id"));

    // validate using Zod
    // const validatedData = CreateEmployeeSchema.parse(body);

    const result = await getEmployeeTypesService(id);

    return c.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};

export const updateEmployee = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const data = await c.req.json();
    const result = await updateEmployeeService(id, data);

    return c.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};

export const deleteEmployee = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const result = await deleteEmployeeService(id);

    return c.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};

export const fetchEmployeDepartmentStats = async (c: Context) => {
  try {
    const countryId = Number(c.req.param("countryId"));
    const result = await getEmployeeDepartmentStats(countryId);

    return c.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};

export const fetchEmployeeTypeCount = async (c: Context) => {
  try {
    const countryId = Number(c.req.param("countryId"));
    const result = await getEmployeeTypeCount(countryId);

    return c.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};
export const fetchEmployeeGenderCount = async (c: Context) => {
  try {
    const countryId = Number(c.req.param("countryId"));
    const result = await getEmployeeGenderCount(countryId);

    return c.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error
      ? err.message
      : "An unexpected error occurred";

    return c.json(
      {
        success: false,
        error: message,
      },
      400,
    );
  }
};
