
import React, { useState, useContext } from "react";
import AddUserPage from "./AddUserPage";
import AddGroupPage from "./AddGroupPage";
import AssignStudentPage from "./AssignStudentPage";
import ResultsPage from "./ResultsPage";
import ReportsPage from "./ReportsPage";
import AddModulePage from "./AddModulePage";
import TrainersStudentsPage from "./TrainersStudentsPage";
import { FaBell, FaUserCircle, FaBars, FaTimes, FaChartLine, FaFileAlt, FaPlusCircle, FaChalkboardTeacher, FaUserPlus, FaUserFriends, FaUserCheck } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ReportContext } from "../context/ReportContext";
import "./AdminPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profile, setProfile] = useState({
    name: "Administrateur",
    email: "admin@example.com",
    photo: null,
  });
  const [currentPage, setCurrentPage] = useState("dashboard");

  // États pour gérer les données
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [allResults] = useState([]); // Suppression de setAllResults car non utilisé
  const [courses] = useState([]); // Suppression de setCourses car non utilisé
  const [courseGroups] = useState([]); // Suppression de setCourseGroups car non utilisé

  // Utiliser le contexte pour les notifications
  const { notifications: reportNotifications } = useContext(ReportContext); // Suppression de reports car non utilisé

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Close sidebar on page change for mobile
  };

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevState) => ({
          ...prevState,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save profile changes
  const handleSaveChanges = () => {
    alert("Modifications enregistrées !");
  };

  // Dashboard Page Component
  const DashboardPage = () => {
    return (
      <div className="dashboard-page">
        <div className="dashboard-content">
          <h2>Bienvenue, {profile.name} !</h2>
          <p className="dashboard-welcome-text">
            Nous sommes ravis de vous revoir sur votre tableau de bord. Ici, vous pouvez gérer les utilisateurs, les groupes, les modules, et bien plus encore. Utilisez les options du menu pour naviguer et effectuer les tâches nécessaires. Si vous avez des questions ou besoin d'aide, n'hésitez pas à consulter notre guide ou à contacter le support.
          </p>
          <div className="dashboard-quick-links">
            <h3>Accès Rapide</h3>
            <div className="quick-links-grid">
              <button onClick={() => handlePageChange("addUser")}>
                <FaUserPlus className="quick-link-icon" /> Ajouter un utilisateur
              </button>
              <button onClick={() => handlePageChange("addGroup")}>
                <FaUserFriends className="quick-link-icon" /> Créer un groupe
              </button>
              <button onClick={() => handlePageChange("assignStudent")}>
                <FaUserCheck className="quick-link-icon" /> Assigner un étudiant
              </button>
              <button onClick={() => handlePageChange("addModule")}>
                <FaPlusCircle className="quick-link-icon" /> Ajouter un module
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-top-left">
          <button className="admin-menu-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="admin-title">Tableau de Bord</h1>
        </div>
        <div className="admin-top-right">
          <div
            className="admin-notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell size={24} style={{ color: "white" }} /> {/* Icône de notification en blanc */}
            {reportNotifications.length > 0 && (
              <span className="admin-notification-badge">
                {reportNotifications.length}
              </span>
            )}
          </div>
          {showNotifications && (
            <div className="admin-notification-dropdown">
              {reportNotifications.length > 0 ? (
                reportNotifications.map((notif, index) => (
                  <div key={index} className="admin-notification-item">
                    📄 {notif.message}
                  </div>
                ))
              ) : (
                <div className="admin-notification-item">Aucune nouvelle notification</div>
              )}
            </div>
          )}
          <FaUserCircle
            size={30}
            onClick={() => handlePageChange("profile")}
            style={{ cursor: "pointer", color: "white" }}
          />
        </div>
      </header>

      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? "active" : ""}`}>
        <button onClick={() => handlePageChange("dashboard")}>
          <FaChartLine className="sidebar-icon" /> Tableau de Bord
        </button>
        <button onClick={() => handlePageChange("addUser")}>
          <FaUserPlus className="sidebar-icon" /> Ajouter un utilisateur
        </button>
        <button onClick={() => handlePageChange("addGroup")}>
          <FaUserFriends className="sidebar-icon" /> Créer un groupe
        </button>
        <button onClick={() => handlePageChange("assignStudent")}>
          <FaUserCheck className="sidebar-icon" /> Assigner un étudiant
        </button>
        <button onClick={() => handlePageChange("results")}>
          <FaChartLine className="sidebar-icon" /> Voir les résultats
        </button>
        <button onClick={() => handlePageChange("reports")}>
          <FaFileAlt className="sidebar-icon" /> Voir les rapports
        </button>
        <button onClick={() => handlePageChange("addModule")}>
          <FaPlusCircle className="sidebar-icon" /> Ajouter un module
        </button>
        <button onClick={() => handlePageChange("trainersStudents")}>
          <FaChalkboardTeacher className="sidebar-icon" /> Gérer formateurs & étudiants
        </button>
      </div>

      {/* Main Content */}
      <main className="admin-main-content">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "profile" && (
          <div className="admin-profile-settings">
            <h3>Modifier vos informations</h3>
            <div className="admin-profile-photo-section">
              <img
                src={profile.photo || "https://via.placeholder.com/150"}
                alt="Profile"
                className="admin-profile-photo"
              />
              <input
                type="file"
                id="photoUpload"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              <label htmlFor="photoUpload" className="admin-upload-btn">
                Modifier la photo
              </label>
            </div>
            <label>Nom:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />
            <button className="admin-save-btn" onClick={handleSaveChanges}>
              Enregistrer les modifications
            </button>
          </div>
        )}

        {currentPage === "addUser" && (
          <AddUserPage
            users={users}
            setUsers={setUsers}
          />
        )}

        {currentPage === "addGroup" && (
          <AddGroupPage
            groups={groups}
            setGroups={setGroups}
          />
        )}

        {currentPage === "assignStudent" && (
          <AssignStudentPage
            users={users}
            groups={groups}
            assignedStudents={assignedStudents}
            setAssignedStudents={setAssignedStudents}
          />
        )}

        {currentPage === "results" && (
          <ResultsPage
            allResults={allResults}
            courses={courses}
            courseGroups={courseGroups}
          />
        )}

        {currentPage === "reports" && <ReportsPage />}
        {currentPage === "addModule" && <AddModulePage />}
        {currentPage === "trainersStudents" && <TrainersStudentsPage />}
      </main>
    </div>
  );
};

export default AdminPage;