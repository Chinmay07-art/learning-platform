import React, { useEffect, useState } from "react";
import "../App.css";

function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);

  const [studentCount, setStudentCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);

  const [courseName, setCourseName] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [duration, setDuration] = useState("");

  const loadCourses = async () => {
    try {
      const response = await fetch("http://localhost:8081/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch("http://localhost:8081/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const loadTutors = async () => {
    try {
      const response = await fetch("http://localhost:8081/tutors");
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error("Error loading tutors:", error);
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

  const loadTutorCount = async () => {
    try {
      const response = await fetch("http://localhost:8081/tutors/count");
      const data = await response.json();
      setTutorCount(data);
    } catch (error) {
      console.error("Error loading tutor count:", error);
    }
  };

  useEffect(() => {
    loadCourses();
    loadStudents();
    loadTutors();
    loadStudentCount();
    loadTutorCount();
  }, []);

  const refreshAllData = () => {
    loadCourses();
    loadStudents();
    loadTutors();
    loadStudentCount();
    loadTutorCount();
  };

  const addCourse = async () => {
    if (!courseName || !tutorName || !duration) {
      alert("Please fill all fields");
      return;
    }

    const newCourse = {
      courseName: courseName,
      tutorName: tutorName,
      duration: duration,
    };

    try {
      const response = await fetch("http://localhost:8081/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        alert("Course added successfully");
        setCourseName("");
        setTutorName("");
        setDuration("");
        refreshAllData();
        setActiveSection("courses");
      } else {
        alert("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Backend is not connected");
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Course deleted successfully");
        refreshAllData();
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const stats = [
    {
      title: "Total Students",
      value: studentCount,
      note: "Students stored in database",
    },
    {
      title: "Total Tutors",
      value: tutorCount,
      note: "Tutors stored in database",
    },
    {
      title: "Courses",
      value: courses.length,
      note: "Courses stored in database",
    },
    {
      title: "Pending Requests",
      value: 0,
      note: "No pending requests",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="sidebar">
          <h2 className="logo-text">EduAdmin</h2>
          <p className="sidebar-role">Administrator Panel</p>

          <div className="sidebar-menu">
            <button
              className={activeSection === "dashboard" ? "active-menu" : ""}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={activeSection === "students" ? "active-menu" : ""}
              onClick={() => setActiveSection("students")}
            >
              Students
            </button>

            <button
              className={activeSection === "tutors" ? "active-menu" : ""}
              onClick={() => setActiveSection("tutors")}
            >
              Tutors
            </button>

            <button
              className={activeSection === "courses" ? "active-menu" : ""}
              onClick={() => setActiveSection("courses")}
            >
              Courses
            </button>

            <button
              className={activeSection === "settings" ? "active-menu" : ""}
              onClick={() => setActiveSection("settings")}
            >
              Settings
            </button>
          </div>
        </div>

        <div className="main-dashboard">
          <div className="topbar">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Monitor platform activity and manage everything from one place.</p>
            </div>
           <button className="logout-btn" onClick={handleLogout}>
  Logout
</button>
          </div>

          <div className="hero-card admin-hero">
            <div>
              <h2>Welcome, Admin</h2>
              <p>Add, view, and manage platform data directly from your dashboard.</p>
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

          {activeSection === "dashboard" && (
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h2>Add Course</h2>

                <input
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="dashboard-input"
                />

                <input
                  type="text"
                  placeholder="Tutor Name"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                  className="dashboard-input"
                />

                <input
                  type="text"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="dashboard-input"
                />

                <button className="dashboard-btn" onClick={addCourse}>
                  Add Course
                </button>
              </div>

              <div className="dashboard-card">
                <h2>Quick Info</h2>
                <ul className="info-list">
                  <li>Total Students: {studentCount}</li>
                  <li>Total Tutors: {tutorCount}</li>
                  <li>Total Courses: {courses.length}</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === "students" && (
            <div className="dashboard-card full-width-card">
              <h2>All Students</h2>

              {students.length === 0 ? (
                <div className="empty-state">No students available</div>
              ) : (
                <div className="activity-items">
                  {students.map((student) => (
                    <div className="activity-box" key={student.id}>
                      <strong>Username:</strong> {student.username}
                      <br />
                      <strong>Role:</strong> {student.role}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "tutors" && (
            <div className="dashboard-card full-width-card">
              <h2>All Tutors</h2>

              {tutors.length === 0 ? (
                <div className="empty-state">No tutors available</div>
              ) : (
                <div className="activity-items">
                  {tutors.map((tutor) => (
                    <div className="activity-box" key={tutor.id}>
                      <strong>Username:</strong> {tutor.username}
                      <br />
                      <strong>Role:</strong> {tutor.role}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "courses" && (
            <div className="dashboard-card full-width-card">
              <h2>All Courses</h2>

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
                      <br />
                      <button
                        className="delete-btn"
                        onClick={() => deleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "settings" && (
            <div className="dashboard-card full-width-card">
              <h2>Settings</h2>
              <div className="empty-state">
                Settings section is ready for future features
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;