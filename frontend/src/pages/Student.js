import React, { useEffect, useState } from "react";
import "../App.css";

function Student() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
  const [assignments, setAssignments] = useState([]);
  const [studentCount, setStudentCount] = useState(0);

  const loadCourses = async () => {
    try {
      const response = await fetch("http://localhost:8081/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const loadAssignments = async () => {
    try {
      const response = await fetch("http://localhost:8081/assignments");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error loading assignments:", error);
    }
  };

  const loadStudentCount = async () => {
    try {
      const response = await fetch("http://localhost:8081/students/count");
      const data = await response.json();
      setStudentCount(data);
    } catch (error) {
      console.error("Error loading student count:", error);
    }
  };

  useEffect(() => {
    loadCourses();
    loadAssignments();
    loadStudentCount();
  }, []);

  const stats = [
    { title: "Enrolled Courses", value: courses.length, note: "Courses available in database" },
    { title: "Assignments", value: assignments.length, note: "Assignments uploaded by tutors" },
    { title: "Results", value: 0, note: "Results feature coming next" },
    { title: "Students", value: studentCount, note: "Students stored in database" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="sidebar">
          <h2 className="logo-text">EduStudent</h2>
          <p className="sidebar-role">Student Panel</p>

          <div className="sidebar-menu">
            <button
              className={activeSection === "dashboard" ? "active-menu" : ""}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={activeSection === "courses" ? "active-menu" : ""}
              onClick={() => setActiveSection("courses")}
            >
              My Courses
            </button>

            <button
              className={activeSection === "assignments" ? "active-menu" : ""}
              onClick={() => setActiveSection("assignments")}
            >
              Assignments
            </button>

            <button
              className={activeSection === "results" ? "active-menu" : ""}
              onClick={() => setActiveSection("results")}
            >
              Results
            </button>

            <button
              className={activeSection === "profile" ? "active-menu" : ""}
              onClick={() => setActiveSection("profile")}
            >
              Profile
            </button>
          </div>
        </div>

        <div className="main-dashboard">
          <div className="topbar">
            <div>
              <h1>Student Dashboard</h1>
              <p>View courses, assignments, and your learning progress.</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
  Logout
</button>
          </div>

          <div className="hero-card student-hero">
            <div>
              <h2>Welcome, Student</h2>
              <p>Access your courses and assignments uploaded by tutors.</p>
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

          {activeSection === "dashboard" && (
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h2>Student Overview</h2>
                <ul className="info-list">
                  <li>Total Courses: {courses.length}</li>
                  <li>Total Assignments: {assignments.length}</li>
                  <li>Total Students: {studentCount}</li>
                </ul>
              </div>

              <div className="dashboard-card">
                <h2>Quick Info</h2>
                <div className="empty-state">
                  Student dashboard is connected with assignments and courses
                </div>
              </div>
            </div>
          )}

          {activeSection === "courses" && (
            <div className="dashboard-card full-width-card">
              <h2>My Courses</h2>

              {courses.length === 0 ? (
                <div className="empty-state">No courses available</div>
              ) : (
                <div className="activity-items">
                  {courses.map((course) => (
                    <div className="activity-box" key={course.id}>
                      <strong>Course:</strong> {course.courseName}
                      <br />
                      <strong>Tutor:</strong> {course.tutorName}
                      <br />
                      <strong>Duration:</strong> {course.duration}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "assignments" && (
            <div className="dashboard-card full-width-card">
              <h2>Assignments</h2>

              {assignments.length === 0 ? (
                <div className="empty-state">No assignments available</div>
              ) : (
                <div className="activity-items">
                  {assignments.map((assignment) => (
                    <div className="activity-box" key={assignment.id}>
                      <strong>Title:</strong> {assignment.title}
                      <br />
                      <strong>Description:</strong> {assignment.description}
                      <br />
                      <strong>Subject:</strong> {assignment.subject}
                      <br />
                      <strong>Tutor:</strong> {assignment.tutorName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "results" && (
            <div className="dashboard-card full-width-card">
              <h2>Results</h2>
              <div className="empty-state">
                Results section is ready for future backend connection
              </div>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="dashboard-card full-width-card">
              <h2>Profile</h2>
              <div className="empty-state">
                Student profile section is ready for future features
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Student;