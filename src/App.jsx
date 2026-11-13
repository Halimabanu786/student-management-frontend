import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, updateStudent, deleteStudent } from './services/studentService';
import './index.css';

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    department: '',
    year: '',
    phoneNumber: '',
    address: '',
  });

  // Show temporary message
  const notify = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3500);
  };

  // Fetch all students (READ)
  const fetchStudents = async (query = '') => {
    try {
      setLoading(true);
      const res = await getStudents(query);
      setStudents(res.data.data);
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to fetch students. Is MongoDB running?', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(search);
  }, [search]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for Adding
  const openAddModal = () => {
    setEditId(null);
    setFormData({ studentId: '', fullName: '', email: '', department: '', year: '', phoneNumber: '', address: '' });
    setShowModal(true);
  };

  // Open modal for Editing (UPDATE)
  const openEditModal = (student) => {
    setEditId(student._id);
    setFormData({
      studentId: student.studentId,
      fullName: student.fullName,
      email: student.email,
      department: student.department,
      year: student.year,
      phoneNumber: student.phoneNumber,
      address: student.address,
    });
    setShowModal(true);
  };

  // Handle Form Submit (CREATE & UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateStudent(editId, formData);
        notify('Student updated successfully!');
      } else {
        await addStudent(formData);
        notify('Student added successfully!');
      }
      setShowModal(false);
      fetchStudents(search);
    } catch (err) {
      notify(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  // Handle Delete (DELETE)
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteStudent(id);
        notify('Student deleted successfully!');
        fetchStudents(search);
      } catch (err) {
        notify('Failed to delete student', 'error');
      }
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">🎓 EduManage</div>
        <nav className="nav">
          <button className="nav-btn active">👥 Students</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Top Header */}
        <header className="header">
          <h1>Student Management System</h1>
          <button className="btn btn-primary" onClick={openAddModal}>+ Add Student</button>
        </header>

        {/* Notifications */}
        {message.text && (
          <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
            {message.text}
          </div>
        )}

        {/* Stats & Search Bar */}
        <div className="controls">
          <div className="stat-card">
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Student Records Table */}
        <div className="table-wrapper">
          {loading ? (
            <p className="loading">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="empty">No students found. Add one above!</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td><span className="badge">{s.studentId}</span></td>
                    <td><strong>{s.fullName}</strong></td>
                    <td>{s.email}</td>
                    <td>{s.department}</td>
                    <td>{s.year}</td>
                    <td>{s.phoneNumber}</td>
                    <td>{s.address}</td>
                    <td>
                      <button className="btn-sm btn-edit" onClick={() => openEditModal(s)}>Edit</button>
                      <button className="btn-sm btn-delete" onClick={() => handleDelete(s._id, s.fullName)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>{editId ? 'Edit Student' : 'Add New Student'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Student ID</label>
                  <input name="studentId" value={formData.studentId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input name="department" value={formData.department} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input name="year" value={formData.year} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Save'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
