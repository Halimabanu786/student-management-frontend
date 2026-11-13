
import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, student, deleting }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-body delete-dialog-content">
          <div className="delete-dialog-icon">
            <AlertTriangle size={28} />
          </div>

          <h3 className="delete-dialog-title">Delete Student Record?</h3>

          <p className="delete-dialog-desc">
            Are you sure you want to delete <strong>{student.fullName}</strong> (ID: <strong>{student.studentId}</strong>)?
            This action will permanently delete the record from the MongoDB database.
          </p>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(student._id)}
            disabled={deleting}
          >
            <Trash2 size={15} />
            <span>{deleting ? 'Deleting...' : 'Yes, Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
