
import React from 'react';
import { X, Mail, Phone, MapPin, Building, Calendar, Hash, Clock } from 'lucide-react';

const ViewStudentModal = ({ isOpen, onClose, student, onEdit }) => {
  if (!isOpen || !student) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Student Profile</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Header Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
              }}
            >
              {student.fullName ? student.fullName.slice(0, 2).toUpperCase() : 'ST'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {student.fullName}
              </h2>
              <span className="student-id-badge" style={{ marginTop: '4px' }}>
                ID: {student.studentId}
              </span>
            </div>
          </div>

          {/* Details List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Email</span>
                <strong>{student.email}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Phone</span>
                <strong>{student.phoneNumber}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Building size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Department</span>
                <span className="dept-badge">{student.department}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Academic Year</span>
                <span className="year-badge">{student.year}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Residential Address</span>
                <span>{student.address}</span>
              </div>
            </div>

            {student.createdAt && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '6px' }}>
                <Clock size={16} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Record Created: {formatDate(student.createdAt)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              if (onEdit) onEdit(student);
            }}
          >
            Edit Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;
