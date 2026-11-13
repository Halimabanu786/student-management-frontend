
import React from 'react';
import { Users, Layers, CalendarCheck } from 'lucide-react';

const StatsCards = ({ students = [] }) => {
  const totalStudents = students.length;

  // Calculate unique departments
  const uniqueDepartments = new Set(
    students.map((s) => s.department?.trim()).filter(Boolean)
  ).size;

  // Calculate unique academic years
  const uniqueYears = new Set(
    students.map((s) => s.year?.trim()).filter(Boolean)
  ).size;

  return (
    <div className="stats-grid">
      {/* Total Students Card */}
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">{totalStudents}</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-blue">
          <Users size={26} />
        </div>
      </div>

      {/* Departments Card */}
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Departments</div>
          <div className="stat-value">{uniqueDepartments}</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-emerald">
          <Layers size={26} />
        </div>
      </div>

      {/* Academic Cohorts Card */}
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Academic Years</div>
          <div className="stat-value">{uniqueYears}</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-amber">
          <CalendarCheck size={26} />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
