import axios from "axios";
import type {
  DepartmentStats,
  EmployeeTypeeCount,
  GenderCount,
} from "../types/employee";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_ORIGIN = BASE_URL.replace(/\/api$/, "");

export function getProfileImageUrl(profileImageKey: string | null | undefined): string | null {
  if (!profileImageKey) return null;
  return `${API_ORIGIN}/uploads/profile-images/${profileImageKey}`;
}

export async function getEmployees() {
  const response = await axios.get(`${BASE_URL}/employee`);
  console.log(response);

  return response.data;
}

export async function updateEmployee(id: number, employeeData: unknown) {
  const response = await axios.put(`${BASE_URL}/employee/${id}`, employeeData);

  return response.data;
}

export async function deleteEmployee(id: number) {
  const response = await axios.delete(`${BASE_URL}/employee/${id}`);

  return response.data;
}

export async function createEmployee(employeeData: unknown) {
  const response = await axios.post(`${BASE_URL}/employee`, employeeData);

  return response.data;
}

export async function getGenderStatsByCountry(
  countryId: number,
): Promise<GenderCount> {
  const response = await axios.get(
    `${BASE_URL}/employeeGender/headcountByCountry/${countryId}`,
  );
  console.log(response);

  return response.data;
}
export async function getEmployeeTypeByCountry(
  countryId: number,
): Promise<EmployeeTypeeCount> {
  const response = await axios.get(
    `${BASE_URL}/employeeType/headcountByCountry/${countryId}`,
  );
  console.log(response);

  return response.data;
}
export async function getDepartmentStatsByCountry(
  countryId: number,
): Promise<DepartmentStats[]> {
  const response = await axios.get(
    `${BASE_URL}/departmentStatsByCountry/${countryId}`,
  );
  console.log("response--", response.data);

  return response.data.data;
}

export async function uploadProfileImage(
  employeeId: number,
  file: File,
  onUploadProgress?: (progressEvent: { loaded: number; total?: number }) => void,
) {
  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await axios.post(
    `${BASE_URL}/employee/${employeeId}/profile-image`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    },
  );

  return response.data;
}
