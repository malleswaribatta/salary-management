import { getCountries, getEmployeeTypes } from "../api/lookupApi";
import type { Employee, Lookup } from "../types/employee";
import "./EditEmployeeModal.css";
import { useEffect, useState } from "react";
import { updateEmployee } from "../api/employeeApi";

type EditEmployeeModalProps = {
  employee: Employee;
  onClose: () => void;
  onUpdate: () => Promise<void>;
};

export function EditEmployeeModal({
  employee,
  onClose,
  onUpdate,
}: EditEmployeeModalProps) {
  const [formData, setFormData] = useState({
    role: employee.role.name,
    department: employee.department.name,
    countryId: employee.country.id,
    employeeTypeId: employee.employeeType.id,
    salary: employee.salary,
  });
  const [countries, setCountries] = useState<Lookup[]>([]);
  const [employeeTypes, setEmployeeTypes] = useState<Lookup[]>([]);

  async function handleSave() {
    try {
      await updateEmployee(employee.id, formData);

      await onUpdate();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update employee");
    }
  }

  useEffect(() => {
    async function loadLookups() {
      const countriesData = await getCountries();
      const employeeTypesData = await getEmployeeTypes();

      setCountries(countriesData.data);
      setEmployeeTypes(employeeTypesData.data);
    }

    loadLookups();
  }, []);
  console.log(countries);
  console.log(employeeTypes);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{employee.name}</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-toolbar">
          <div className="toolbar-left">
            <div className="avatar">{employee.name.charAt(0)}</div>

            <h3 className="h3">Editing: {employee.name}</h3>
          </div>

          <div className="toolbar-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>

        <div className="section-title">PERSONAL</div>

        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input value={employee.name} disabled />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={employee.email} disabled />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <input value={employee.gender} disabled />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input value={employee.joiningDate.split("T")[0]} disabled />
          </div>
        </div>

        <div className="section-title">ROLE & EMPLOYMENT</div>

        <div className="form-grid">
          <div className="form-group">
            <label>Role</label>

            <input
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <input
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Country</label>

            <select
              value={formData.countryId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  countryId: Number(e.target.value),
                })
              }
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Employee Type</label>

            <select
              value={formData.employeeTypeId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employeeTypeId: Number(e.target.value),
                })
              }
            >
              {employeeTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="section-title">COMPENSATION</div>

        <div className="salary-container">
          <div className="form-group salary-field">
            <label>Salary</label>

            <input
              type="number"
              value={formData.salary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
