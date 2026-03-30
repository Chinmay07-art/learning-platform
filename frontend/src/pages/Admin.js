import React from "react";
import "../App.css";

function Admin() {
  const stats = [
    { title: "Total Students", value: 0, note: "No students added yet" },
    { title: "Total Tutors", value: 0, note: "No tutors added yet" },
    { title: "Courses", value: 0, note: "No courses available" },
    { title: "Pending Requests", value: 0, note: "No pending requests" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="sidebar">
          <h2 className="logo-text">Admin</h2>
          <p className="sidebar-role">Administrator Panel</p>

          <div className="sidebar-menu">
            <button>Dashboard</button>
            <button>Students</button>
            <button>Tutors</button>
            <button>Courses</button>
            <button>Settings</button>
          </div>
        </div>

        <div className="main-dashboard">
          <div className="topbar">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Monitor platform activity and manage everything from one place.</p>
            </div>
            <button className="logout-btn">Logout</button>
          </div>

          <div className="hero-card admin-hero">
            <div>
              <h2>Welcome, Admin</h2>
              <p>Your central control panel is ready. Start managing users, tutors, and courses.</p>
            </div>
            <div className="hero-badge">System Overview</div>
          </div>

          <div className="stats-grid">
            {stats.map((item, index) => (
              <div className="stat-card" key={index}>
                <span>{item.title}</span>
                <h3>{item.value}</h3>
                <p>{item.note}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h2>Recent Activity</h2>
              <div className="empty-state">No activity available right now</div>
            </div>

            <div className="dashboard-card">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button>Add Student</button>
                <button>Add Tutor</button>
                <button>Manage Courses</button>
              </div>
            </div>
          </div>

          <div className="dashboard-card full-width-card">
            <h2>Platform Highlights</h2>
            <div className="activity-items">
              <div className="activity-box">No new platform updates</div>
              <div className="activity-box">No registrations yet</div>
              <div className="activity-box">No active announcements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
