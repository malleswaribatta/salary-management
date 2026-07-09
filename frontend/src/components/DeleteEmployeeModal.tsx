import "./DeleteEmployeeModal.css";

interface DeleteEmployeeModalProps {
  isOpen: boolean;
  employeeName: string;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteEmployeeModal({
  isOpen,
  employeeName,
  onClose,
  onDelete,
}: DeleteEmployeeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="delete-modal-header">
          <span className="warning-icon">!</span>
          <h2>Delete employee?</h2>
        </div>
        <p>
          This will permanently delete{" "}
          <strong>{employeeName}</strong>. This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>

          <button type="button" className="delete-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
