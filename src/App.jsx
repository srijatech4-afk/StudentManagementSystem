import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  Menu,
  X,
  GraduationCap,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  Plus,
} from "lucide-react";

import pecLogo from "./assets/pec-logo.png";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Manoj Kumar",
      rollNo: "AIML001",
      department: "AI & ML",
      year: "III",
      section: "B",
      email: "manoj@example.com",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "B. Priya",
      rollNo: "AIDS002",
      department: "AI & DS",
      year: "III",
      section: "A",
      email: "priya@example.com",
      phone: "9876543211",
    },
    {
      id: 3,
      name: "C. Rahul",
      rollNo: "CSE003",
      department: "CSE",
      year: "II",
      section: "B",
      email: "rahul@example.com",
      phone: "9876543212",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    year: "",
    section: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  const filteredStudents = students.filter((student) =>
    Object.values(student)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.rollNo ||
      !formData.department ||
      !formData.year ||
      !formData.section ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId) {
      setStudents(
        students.map((student) =>
          student.id === editingId
            ? { ...formData, id: editingId }
            : student
        )
      );

      setEditingId(null);
      alert("Student updated successfully.");
    } else {
      setStudents([
        ...students,
        {
          ...formData,
          id: Date.now(),
        },
      ]);

      alert("Student added successfully.");
    }

    setFormData({
      name: "",
      rollNo: "",
      department: "",
      year: "",
      section: "",
      email: "",
      phone: "",
    });

    setActivePage("Students");
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      department: student.department,
      year: student.year,
      section: student.section,
      email: student.email,
      phone: student.phone,
    });

    setEditingId(student.id);
    setActivePage("Add Student");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const openAddStudent = () => {
    setEditingId(null);

    setFormData({
      name: "",
      rollNo: "",
      department: "",
      year: "",
      section: "",
      email: "",
      phone: "",
    });

    setActivePage("Add Student");
  };

  const renderDashboard = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="page-label">OVERVIEW</p>
          <h2>Dashboard</h2>
          <p className="page-description">
            Welcome to the Student Management System.
          </p>
        </div>

        <button className="primary-button" onClick={openAddStudent}>
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div>
            <p>Total Students</p>
            <h3>{students.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <GraduationCap size={24} />
          </div>
          <div>
            <p>Departments</p>
            <h3>4</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CalendarDays size={24} />
          </div>
          <div>
            <p>Academic Year</p>
            <h3>2026-27</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Building2 size={24} />
          </div>
          <div>
            <p>College</p>
            <h3>PEC</h3>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <div>
            <h3>Recent Students</h3>
            <p>Recently added students</p>
          </div>

          <button
            className="text-button"
            onClick={() => setActivePage("Students")}
          >
            View All
          </button>
        </div>

        <StudentTable
          students={students.slice(0, 5)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );

  const renderStudents = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="page-label">MANAGEMENT</p>
          <h2>Students</h2>
          <p className="page-description">
            View and manage all student records.
          </p>
        </div>

        <button className="primary-button" onClick={openAddStudent}>
          <UserPlus size={18} />
          Add Student
        </button>
      </div>

      <div className="content-card">
        <div className="student-toolbar">
          <div className="search-box">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <span className="student-count">
            {filteredStudents.length} Students
          </span>
        </div>

        <StudentTable
          students={filteredStudents}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );

  const renderAddStudent = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="page-label">
            {editingId ? "MANAGEMENT" : "NEW RECORD"}
          </p>

          <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

          <p className="page-description">
            {editingId
              ? "Update the student's information."
              : "Enter student information to create a new record."}
          </p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-section-title">
              <Users size={20} />
              <div>
                <h3>Student Information</h3>
                <p>Basic information about the student</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Roll Number</label>
                <input
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  placeholder="Example: AIML001"
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select department</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="AI & DS">AI & DS</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                </select>
              </div>

              <div className="form-group">
                <label>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">Select year</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>

              <div className="form-group">
                <label>Section</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                >
                  <option value="">Select section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group full-width">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setActivePage("Students")}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {editingId ? "Update Student" : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </>
  );

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="logo-area">
          <img
            src={pecLogo}
            alt="Prathyusha Engineering College"
            className="pec-logo"
          />

          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="college-name">
          <strong>Student Management</strong>
          <span>Prathyusha Engineering College</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-title">MAIN MENU</p>

          <button
            className={`nav-item ${
              activePage === "Dashboard" ? "active" : ""
            }`}
            onClick={() => {
              setActivePage("Dashboard");
              setSidebarOpen(false);
            }}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            className={`nav-item ${
              activePage === "Students" ? "active" : ""
            }`}
            onClick={() => {
              setActivePage("Students");
              setSidebarOpen(false);
            }}
          >
            <Users size={20} />
            Students
          </button>

          <button
            className={`nav-item ${
              activePage === "Add Student" ? "active" : ""
            }`}
            onClick={() => {
              openAddStudent();
              setSidebarOpen(false);
            }}
          >
            <UserPlus size={20} />
            Add Student
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="footer-icon">
            <GraduationCap size={18} />
          </div>
          <div>
            <strong>PEC</strong>
            <span>Academic Portal</span>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <img
            src={pecLogo}
            alt="Prathyusha Engineering College"
            className="topbar-logo"
          />

          <div className="topbar-title">
            <p>Prathyusha Engineering College</p>
            <h1>Student Management System</h1>
          </div>
        </header>

        <section className="page-content">
          {activePage === "Dashboard" && renderDashboard()}
          {activePage === "Students" && renderStudents()}
          {activePage === "Add Student" && renderAddStudent()}
        </section>
      </main>
    </div>
  );
}

function StudentTable({ students, handleEdit, handleDelete }) {
  return (
    <div className="table-wrapper">
      {students.length === 0 ? (
        <div className="empty-state">
          <Users size={42} />
          <h3>No students found</h3>
          <p>Try adding a new student or changing your search.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No.</th>
              <th>Department</th>
              <th>Year</th>
              <th>Section</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="student-name">
                    <div className="avatar">
                      {student.name.charAt(0)}
                    </div>

                    <div>
                      <strong>{student.name}</strong>
                      <span>{student.email}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="roll-badge">
                    {student.rollNo}
                  </span>
                </td>

                <td>{student.department}</td>

                <td>{student.year}</td>

                <td>
                  <span className="section-badge">
                    {student.section}
                  </span>
                </td>

                <td>
                  <div className="contact-info">
                    <span>
                      <Phone size={13} />
                      {student.phone}
                    </span>

                    <span>
                      <Mail size={13} />
                      {student.email}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(student)}
                      title="Edit student"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(student.id)}
                      title="Delete student"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;