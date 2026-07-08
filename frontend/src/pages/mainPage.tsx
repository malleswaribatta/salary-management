import { useEffect, useState, useRef } from "react";
import { useMemo } from "react";
import {
  getEmployees,
  deleteEmployee,
  createEmployee,
} from "../api/employeeApi";
import type { Employee } from "../types/employee";
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

  const handleCreateEmployee = async (data: any) => {
    try {
      await createEmployee(data);
      await loadEmployees();
      alert("Employee created successfully");
    } catch (err) {
      console.log("--->", err)
      alert("Failed to create employee");
    }
  };

 const filteredEmployees = useMemo(() => {
  const search = searchText.trim().toLowerCase();

  if (!search) return employees;

  return employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search)
  );
}, [employees, searchText]);

  useEffect(() => {
    loadEmployees();
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
          onSearch={() => {console.log("=====> inside onsearch") 
            return setSearchText(searchInput)}}
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
