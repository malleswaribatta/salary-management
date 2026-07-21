import { getCountries, getEmployeeTypes } from "../api/lookupApi";
import { getProfileImageUrl } from "../api/employeeApi";
import type { Employee, Lookup } from "../types/employee";
import "./EditEmployeeModal.css";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setProfileImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

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
            <div
              className="avatar image-upload-trigger"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Profile preview" className="avatar-preview" />
              ) : getProfileImageUrl(employee.profileImageKey) ? (
                <img
                  src={getProfileImageUrl(employee.profileImageKey)!}
                  alt="Profile"
                  className="avatar-preview"
                />
              ) : (
                employee.name.charAt(0)
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

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
                })}
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
                })}
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
                })}
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
                })}
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
                })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
