import React, { useEffect, useState } from "react";
import "../App.css";

function Tutor() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [tutorCount, setTutorCount] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [tutorName, setTutorName] = useState("");

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

  const loadAssignments = async () => {
    try {
      const response = await fetch("http://localhost:8081/assignments");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error loading assignments:", error);
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
    loadAssignments();
    loadTutorCount();
  }, []);

  const refreshAllData = () => {
    loadCourses();
    loadStudents();
    loadAssignments();
    loadTutorCount();
  };

  const addAssignment = async () => {
    if (!title || !description || !subject || !tutorName) {
      alert("Please fill all fields");
      return;
    }

    const newAssignment = {
      title,
      description,
      subject,
      tutorName,
    };

    try {
      const response = await fetch("http://localhost:8081/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssignment),
      });

      if (response.ok) {
        alert("Assignment uploaded successfully");
        setTitle("");
        setDescription("");
        setSubject("");
        setTutorName("");
        refreshAllData();
        setActiveSection("assignments");
      } else {
        alert("Failed to upload assignment");
      }
    } catch (error) {
      console.error("Error uploading assignment:", error);
      alert("Backend is not connected");
    }
  };

  const deleteAssignment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/assignments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Assignment deleted successfully");
        refreshAllData();
      } else {
        alert("Failed to delete assignment");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const stats = [
    { title: "My Students", value: students.length, note: "Students available in database" },
    { title: "My Courses", value: courses.length, note: "Courses available in database" },
    { title: "Assignments", value: assignments.length, note: "Assignments uploaded" },
    { title: "Tutors", value: tutorCount, note: "Tutors stored in database" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="sidebar">
          <h2 className="logo-text">EduTutor</h2>
          <p className="sidebar-role">Tutor Panel</p>

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
              className={activeSection === "courses" ? "active-menu" : ""}
              onClick={() => setActiveSection("courses")}
            >
              Courses
            </button>

            <button
              className={activeSection === "assignments" ? "active-menu" : ""}
              onClick={() => setActiveSection("assignments")}
            >
              Assignments
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
              <h1>Tutor Dashboard</h1>
              <p>Manage students, courses, and assignments.</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
  Logout
</button>
          </div>

          <div className="hero-card tutor-hero">
            <div>
              <h2>Welcome, Tutor</h2>
              <p>Upload assignments and help students access them easily.</p>
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

          {activeSection === "dashboard" && (
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h2>Upload Assignment</h2>

                <input
                  type="text"
                  placeholder="Assignment Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="dashboard-input"
                />

                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="dashboard-input"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="dashboard-input"
                />

                <input
                  type="text"
                  placeholder="Tutor Name"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                  className="dashboard-input"
                />

                <button className="dashboard-btn" onClick={addAssignment}>
                  Upload Assignment
                </button>
              </div>

              <div className="dashboard-card">
                <h2>Quick Info</h2>
                <ul className="info-list">
                  <li>Total Students: {students.length}</li>
                  <li>Total Courses: {courses.length}</li>
                  <li>Total Assignments: {assignments.length}</li>
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "assignments" && (
            <div className="dashboard-card full-width-card">
              <h2>All Assignments</h2>

              {assignments.length === 0 ? (
                <div className="empty-state">No assignments uploaded</div>
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
                      <br />
                      <button
                        className="delete-btn"
                        onClick={() => deleteAssignment(assignment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "profile" && (
            <div className="dashboard-card full-width-card">
              <h2>Profile</h2>
              <div className="empty-state">
                Tutor profile section is ready for future features
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tutor;