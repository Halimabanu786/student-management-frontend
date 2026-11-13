import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, RefreshCw, Filter } from 'lucide-react';
import StatsCards from '../components/StatsCards';
import StudentTable from '../components/StudentTable';
import StudentModal from '../components/StudentModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ViewStudentModal from '../components/ViewStudentModal';
import NotificationToast from '../components/NotificationToast';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../services/studentService';

const Dashboard = () => {
  // ---------------------------------------------------------------------------
  // State Management (React Hooks)
  // ---------------------------------------------------------------------------
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null);
  const [submittingForm, setSubmittingForm] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [studentToView, setStudentToView] = useState(null);

  // Notification State
  const [notification, setNotification] = useState(null);

  const showToast = (type, title, message) => {
    setNotification({ type, title, message });
  };

  // ---------------------------------------------------------------------------
  // READ Operation: Fetch students from MongoDB via GET /api/students
  // ---------------------------------------------------------------------------
  const loadStudents = useCallback(async (searchQuery = '') => {
    try {
      setLoading(true);
      const response = await getStudents(searchQuery);
      if (response && response.data) {
        setStudents(response.data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      const errMsg =
        error.response?.data?.message ||
        'Unable to connect to the backend server. Please verify backend is running on port 5000.';
      showToast('error', 'Database Connection Error', errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle live search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadStudents(searchTerm);
    }, 350);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, loadStudents]);

  // ---------------------------------------------------------------------------
  // CREATE / UPDATE Operations: POST or PUT /api/students
  // ---------------------------------------------------------------------------
  const handleOpenAddModal = () => {
    setSelectedStudentForEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setSelectedStudentForEdit(student);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setSubmittingForm(true);
    try {
      if (selectedStudentForEdit && selectedStudentForEdit._id) {
        // UPDATE Operation (PUT /api/students/:id)
        const response = await updateStudent(selectedStudentForEdit._id, formData);
        showToast(
          'success',
          'Student Updated',
          response.message || `Successfully updated ${formData.fullName}`
        );
      } else {
        // CREATE Operation (POST /api/students)
        const response = await createStudent(formData);
        showToast(
          'success',
          'Student Created',
          response.message || `Successfully added ${formData.fullName} to the database`
        );
      }

      setIsFormModalOpen(false);
      setSelectedStudentForEdit(null);
      // Refresh list from MongoDB
      loadStudents(searchTerm);
    } catch (error) {
      console.error('Form submission failed:', error);
      const errMsg =
        error.response?.data?.message ||
        'Failed to save student record to MongoDB. Please try again.';
      showToast('error', 'Operation Failed', errMsg);
    } finally {
      setSubmittingForm(false);
    }
  };

  // ---------------------------------------------------------------------------
  // DELETE Operation: DELETE /api/students/:id
  // ---------------------------------------------------------------------------
  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (studentId) => {
    setDeletingRecord(true);
    try {
      const response = await deleteStudent(studentId);
      showToast(
        'success',
        'Student Deleted',
        response.message || 'Student record was permanently removed from MongoDB.'
      );
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
      // Refresh list from MongoDB
      loadStudents(searchTerm);
    } catch (error) {
      console.error('Failed to delete student:', error);
      const errMsg =
        error.response?.data?.message ||
        'Failed to delete student record. Please try again.';
      showToast('error', 'Delete Failed', errMsg);
    } finally {
      setDeletingRecord(false);
    }
  };

  // ---------------------------------------------------------------------------
  // VIEW Operation
  // ---------------------------------------------------------------------------
  const handleOpenViewModal = (student) => {
    setStudentToView(student);
    setIsViewModalOpen(true);
  };

  // Client-side department filtering
  const displayedStudents = departmentFilter
    ? students.filter((s) => s.department === departmentFilter)
    : students;

  // Extract unique departments for dropdown
  const departmentOptions = Array.from(
    new Set(students.map((s) => s.department).filter(Boolean))
  );

  return (
    <div className="content-container">
      {/* Notifications Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Live Statistics Cards */}
      <StatsCards students={students} />

      {/* Controls Bar: Search & Action Buttons */}
      <div className="controls-card">
        {/* Search Input */}
        <div className="search-box-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by student name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Department Filter & Action Buttons */}
        <div className="controls-right">
          {departmentOptions.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} style={{ color: 'var(--text-muted)' }} />
              <select
                className="form-select"
                style={{ width: 'auto', padding: '8px 12px', fontSize: '0.85rem' }}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Refresh Data Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => loadStudents(searchTerm)}
            title="Reload from MongoDB"
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'spinner' : ''} />
            <span>Refresh</span>
          </button>

          {/* Add Student Button */}
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Main Student Records Table */}
      <StudentTable
        students={displayedStudents}
        loading={loading}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        onView={handleOpenViewModal}
        searchTerm={searchTerm}
      />

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        student={selectedStudentForEdit}
        submitting={submittingForm}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
        deleting={deletingRecord}
      />

      {/* View Student Details Modal */}
      <ViewStudentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        student={studentToView}
        onEdit={(student) => {
          setIsViewModalOpen(false);
          handleOpenEditModal(student);
        }}
      />
    </div>
  );
};

export default Dashboard;
