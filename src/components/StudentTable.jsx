
import React from 'react';
import { Edit2, Trash2, Eye, UserX, Inbox } from 'lucide-react';

const StudentTable = ({
  students,
  loading,
  onEdit,
  onDelete,
  onView,
  searchTerm,
}) => {
  // Helper to generate initials from student full name
  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="table-card">
        <div className="loading-spinner-wrapper">
          <div className="spinner"></div>
          <p>Retrieving student records from MongoDB database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header-title">
        <h2>Student Directory ({students.length})</h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Real-time synchronized with MongoDB
        </span>
      </div>

      <div className="table-responsive">
        {students.length === 0 ? (
          <div className="table-empty-state">
            <Inbox size={48} className="table-empty-icon" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              {searchTerm ? 'No matching students found' : 'No student records yet'}
            </h3>
            <p>
              {searchTerm
                ? `No students match your search query "${searchTerm}". Try a different keyword.`
                : 'Click the "+ Add Student" button above to add your first student record to MongoDB.'}
            </p>
          </div>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <span className="student-id-badge">{student.studentId}</span>
                  </td>
                  <td>
                    <div className="student-profile">
                      <div className="student-avatar">
                        {getInitials(student.fullName)}
                      </div>
                      <span className="student-name-text">{student.fullName}</span>
                    </div>
                  </td>
                  <td>
                    <a
                      href={`mailto:${student.email}`}
                      style={{ color: 'var(--primary)', textDecoration: 'none' }}
                    >
                      {student.email}
                    </a>
                  </td>
                  <td>
                    <span className="dept-badge">{student.department}</span>
                  </td>
                  <td>
                    <span className="year-badge">{student.year}</span>
                  </td>
                  <td>{student.phoneNumber}</td>
                  <td
                    style={{
                      maxWidth: '180px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={student.address}
                  >
                    {student.address}
                  </td>
                  <td>
                    <div className="actions-cell" style={{ justifyContent: 'center' }}>
                      {/* View Action */}
                      <button
                        className="btn-icon"
                        title="View details"
                        onClick={() => onView(student)}
                      >
                        <Eye size={15} />
                      </button>

                      {/* Edit Action */}
                      <button
                        className="action-btn-edit"
                        title="Edit student"
                        onClick={() => onEdit(student)}
                      >
                        <Edit2 size={13} />
                        <span>Edit</span>
                      </button>

                      {/* Delete Action */}
                      <button
                        className="action-btn-delete"
                        title="Delete student"
                        onClick={() => onDelete(student)}
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentTable;
