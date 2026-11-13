
import React from 'react';
import { Database, AlertCircle } from 'lucide-react';

const Header = ({ isDbConnected = true }) => {
  return (
    <header className="top-header">
      <div className="header-left">
        <h1>Student Management System</h1>
        <p>Full-Stack MERN Application with Real-Time Database Operations</p>
      </div>

      <div className="header-right">
        {isDbConnected ? (
          <div className="system-badge" title="Mongoose is actively connected to MongoDB">
            <span className="pulse-dot"></span>
            <Database size={14} />
            <span>MongoDB Connected</span>
          </div>
        ) : (
          <div
            className="system-badge system-badge-warning"
            title="MongoDB is not connected. Start local service or configure Atlas URI in .env"
          >
            <span className="pulse-dot pulse-dot-amber"></span>
            <AlertCircle size={14} />
            <span>MongoDB Disconnected</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
