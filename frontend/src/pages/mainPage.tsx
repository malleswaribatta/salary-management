import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  uploadProfileImage,
} from "../api/employeeApi";
import type { CreateEmployeePayload, Employee } from "../types/employee";
import "./mainPage.css";
import { EditEmployeeModal } from "../components/EditEmployeeModal";
import { DeleteEmployeeModal } from "../components/DeleteEmployeeModal";
import { ViewEmployeeModal } from "../components/ViewEmployeeModal";
import { AddEmployeeModal } from "../components/AddEmployeeModal";
import { EmployeeList } from "../components/EmployeeListPage";
import InsightsPageModal from "../components/InsightsPageModal";

export function MainPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEmployeeListPage, setIsEmployeeListPage] = useState(true);
  const [isInsightsPage, setIsInsightsPage] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function loadEmployees() {
    const res = await getEmployees();
    setEmployees(res.data);
  }

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    try {
      await deleteEmployee(employeeId);

      await loadEmployees();

      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);

      alert("Employee deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee");
    }
  };

  const handleCreateEmployee = async (data: CreateEmployeePayload) => {
    try {
      const result = await createEmployee(data);
      const newEmployeeId = result.data.id;

      if (data.profileImage) {
        setUploadProgress(0);
        setUploadMessage(null);

        try {
          await uploadProfileImage(newEmployeeId, data.profileImage, (event) => {
            if (event.total) {
              setUploadProgress(
                Math.round((event.loaded * 100) / event.total),
              );
            }
          });

          setUploadProgress(null);
          setUploadMessage({
            type: "success",
            text: "Profile image uploaded successfully",
          });
        } catch {
          setUploadProgress(null);
          setUploadMessage({
            type: "error",
            text: "Failed to upload profile image",
          });
        }
      }

      await loadEmployees();

      if (!data.profileImage) {
        alert("Employee created successfully");
      }
    } catch {
      alert("Failed to create employee");
    }
  };

  const filteredEmployees = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) return employees;

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search),
    );
  }, [employees, searchText]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await getEmployees();
      setEmployees(res.data);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="main-page">
      {/* TOP HEADER */}
      <div className="top-bar">
        <h2 className="title">Salary Management</h2>

        <div className="tabs">
          <button
            className="active"
            onClick={() => {
              setIsEmployeeListPage(true);
              setIsInsightsPage(false);
            }}
          >
            Employees
          </button>

          <button
            className="active"
            onClick={() => {
              setIsEmployeeListPage(false);
              setIsInsightsPage(true);
            }}
          >
            Insights
          </button>
        </div>
      </div>

      {uploadProgress !== null && (
        <div className="upload-progress">
          <div className="upload-progress-bar">
            <div
              className="upload-progress-fill"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <span className="upload-progress-text">
            Uploading profile image... {uploadProgress}%
          </span>
        </div>
      )}

      {uploadMessage && (
        <div
          className={`upload-message ${uploadMessage.type === "success" ? "upload-success" : "upload-error"}`}
          onClick={() => setUploadMessage(null)}
        >
          {uploadMessage.text}
          <span className="upload-message-close">✕</span>
        </div>
      )}

      {isEmployeeListPage && (
        <EmployeeList
          employees={filteredEmployees}
          searchText={searchText}
          openMenuId={openMenuId}
          menuRef={menuRef}
          setOpenMenuId={setOpenMenuId}
          setViewEmployee={setViewEmployee}
          setSelectedEmployee={setSelectedEmployee}
          handleDeleteClick={handleDeleteClick}
          setIsAddModalOpen={setIsAddModalOpen}
          setSearchText={setSearchText}
          setSearchInput={setSearchInput}
          onSearch={() => setSearchText(searchInput)}
        />
      )}

      {isInsightsPage && <InsightsPageModal />}
      {selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onUpdate={loadEmployees}
        />
      )}

      <DeleteEmployeeModal
        isOpen={isDeleteModalOpen}
        employeeName={employeeToDelete?.name ?? ""}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          if (employeeToDelete) {
            handleDeleteEmployee(employeeToDelete.id);
          }
        }}
      />

      {viewEmployee && (
        <ViewEmployeeModal
          employee={viewEmployee}
          onClose={() => setViewEmployee(null)}
          onEdit={() => {
            setSelectedEmployee(viewEmployee);
            setViewEmployee(null);
          }}
          onDelete={() => {
            handleDeleteClick(viewEmployee);
            setViewEmployee(null);
          }}
        />
      )}

      {isAddModalOpen && (
        <AddEmployeeModal
          onClose={() => setIsAddModalOpen(false)}
          onCreate={handleCreateEmployee}
        />
      )}
    </div>
  );
}
