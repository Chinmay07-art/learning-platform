import React from "react";
import "../App.css";

function Tutor() {
  const stats = [
    { title: "My Students", value: 0, note: "No students assigned yet" },
    { title: "My Courses", value: 0, note: "No courses created yet" },
    { title: "Assignments", value: 0, note: "No assignments uploaded" },
    { title: "Messages", value: 0, note: "Inbox is empty" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="sidebar">
          <h2 className="logo-text">Tutor</h2>
          <p className="sidebar-role">Tutor Panel</p>

          <div className="sidebar-menu">
            <button>Dashboard</button>
            <button>My Students</button>
            <button>Courses</button>
            <button>Assignments</button>
            <button>Profile</button>
          </div>
        </div>

        <div className="main-dashboard">
          <div className="topbar">
            <div>
              <h1>Tutor Dashboard</h1>
              <p>Manage your classes, assignments, and student progress here.</p>
            </div>
            <button className="logout-btn">Logout</button>
          </div>

          <div className="hero-card tutor-hero">
            <div>
              <h2>Welcome, Tutor</h2>
              <p>Stay organized and guide your students with a clean and smart teaching dashboard.</p>
            </div>
            <div className="hero-badge">Teaching Hub</div>
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
              <h2>Upcoming Work</h2>
              <div className="empty-state">No classes or assignment tasks available</div>
            </div>

            <div className="dashboard-card">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button>Create Course</button>
                <button>Upload Assignment</button>
                <button>View Students</button>
              </div>
            </div>
          </div>

          <div className="dashboard-card full-width-card">
            <h2>Teaching Activity</h2>
            <div className="activity-items">
              <div className="activity-box">No assignment submissions yet</div>
              <div className="activity-box">No recent messages</div>
              <div className="activity-box">No course announcements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutor;