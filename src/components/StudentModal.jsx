
import React, { useState, useEffect } from 'react';
import { X, UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Business Administration',
  'Data Science & AI',
];

const YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
];

const initialFormState = {
  studentId: '',
  fullName: '',
  email: '',
  department: '',
  year: '',
  phoneNumber: '',
  address: '',
};

const StudentModal = ({ isOpen, onClose, onSubmit, student = null, submitting }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(student && student._id);

  // Sync form data with student prop whenever modal opens or student changes
  useEffect(() => {
    if (student) {
      setFormData({
        studentId: student.studentId || '',
        fullName: student.fullName || '',
        email: student.email || '',
        department: student.department || '',
        year: student.year || '',
        phoneNumber: student.phoneNumber || '',
        address: student.address || '',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [student, isOpen]);

  if (!isOpen) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required (e.g. STU101)';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email (e.g. student@college.edu)';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Please select a department';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Please select the year of study';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Residential address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3>{isEditMode ? 'Edit Student Details' : 'Add New Student'}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Student ID */}
              <div className="form-group">
                <label className="form-label" htmlFor="studentId">
                  Student ID <span className="required-star">*</span>
                </label>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  placeholder="e.g. STU101"
                  className={`form-input ${errors.studentId ? 'input-error' : ''}`}
                  value={formData.studentId}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.studentId && <span className="error-hint">{errors.studentId}</span>}
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.fullName && <span className="error-hint">{errors.fullName}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. alex@college.edu"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.email && <span className="error-hint">{errors.email}</span>}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label className="form-label" htmlFor="phoneNumber">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="e.g. +1 555-019-2831"
                  className={`form-input ${errors.phoneNumber ? 'input-error' : ''}`}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.phoneNumber && <span className="error-hint">{errors.phoneNumber}</span>}
              </div>

              {/* Department */}
              <div className="form-group">
                <label className="form-label" htmlFor="department">
                  Department <span className="required-star">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  className={`form-select ${errors.department ? 'input-error' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                  disabled={submitting}
                >
                  <option value="">-- Select Department --</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <span className="error-hint">{errors.department}</span>}
              </div>

              {/* Year */}
              <div className="form-group">
                <label className="form-label" htmlFor="year">
                  Year of Study <span className="required-star">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  className={`form-select ${errors.year ? 'input-error' : ''}`}
                  value={formData.year}
                  onChange={handleChange}
                  disabled={submitting}
                >
                  <option value="">-- Select Academic Year --</option>
                  {YEARS.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
                {errors.year && <span className="error-hint">{errors.year}</span>}
              </div>

              {/* Residential Address */}
              <div className="form-group form-group-full">
                <label className="form-label" htmlFor="address">
                  Residential Address <span className="required-star">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="e.g. 742 Evergreen Terrace, Springfield"
                  className={`form-textarea ${errors.address ? 'input-error' : ''}`}
                  value={formData.address}
                  onChange={handleChange}
                  disabled={submitting}
                ></textarea>
                {errors.address && <span className="error-hint">{errors.address}</span>}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting
                ? 'Saving to MongoDB...'
                : isEditMode
                ? 'Update Student'
                : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
