
import React from 'react';
import {
  GraduationCap,
  Users,
  LayoutDashboard,
  Layers,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ activeTab = 'students', setActiveTab }) => {
  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <GraduationCap size={22} />
        </div>
        <div>
          <div className="sidebar-title">EduManage</div>
          <div className="sidebar-subtitle">Student Portal</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab && setActiveTab('students')}
        >
          <Users size={18} />
          <span>Students Directory</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab && setActiveTab('dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveTab && setActiveTab('departments')}
        >
          <Layers size={18} />
          <span>Departments</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab && setActiveTab('settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
          MERN Stack v1.0
        </div>
        <div>MongoDB & Express REST API</div>
      </div>
    </aside>
  );
};

export default Sidebar;
