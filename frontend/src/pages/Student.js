import React from "react";
import "../App.css";

function Student() {
  const stats = [
    { title: "Enrolled Courses", value: 0, note: "No courses enrolled" },
    { title: "Assignments", value: 0, note: "No assignments available" },
    { title: "Completed", value: 0, note: "Nothing completed yet" },
    { title: "Messages", value: 0, note: "No new messages" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="sidebar">
          <h2 className="logo-text">Student</h2>
          <p className="sidebar-role">Student Panel</p>

          <div className="sidebar-menu">
            <button>Dashboard</button>
            <button>My Courses</button>
            <button>Assignments</button>
            <button>Results</button>
            <button>Profile</button>
          </div>
        </div>

        <div className="main-dashboard">
          <div className="topbar">
            <div>
              <h1>Student Dashboard</h1>
              <p>Track your learning journey, assignments, and course activity here.</p>
            </div>
            <button className="logout-btn">Logout</button>
          </div>

          <div className="hero-card student-hero">
            <div>
              <h2>Welcome, Student</h2>
              <p>Your learning space is ready. Explore courses, complete assignments, and stay updated.</p>
            </div>
            <div className="hero-badge">Learning Zone</div>
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
              <h2>My Learning</h2>
              <div className="empty-state">No course progress available yet</div>
            </div>

            <div className="dashboard-card">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button>Browse Courses</button>
                <button>View Assignments</button>
                <button>Check Results</button>
              </div>
            </div>
          </div>

          <div className="dashboard-card full-width-card">
            <h2>Recent Updates</h2>
            <div className="activity-items">
              <div className="activity-box">No new course notifications</div>
              <div className="activity-box">No pending assignment alerts</div>
              <div className="activity-box">No recent tutor messages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;