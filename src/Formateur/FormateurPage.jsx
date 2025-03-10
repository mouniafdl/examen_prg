
import React, { useState, useContext, useEffect, useRef } from "react";
import { FaBell, FaBars, FaTimes, FaUserEdit, FaSave, FaFileAlt, FaCheckCircle, FaChartLine, FaUserCircle, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import CreateExamPage from "./CreateExamPage";
import CorrectExam from "./CorrectExam";
import CreateReportPage from "./CreateReportPage";
import { ReportContext } from "../context/ReportContext";
import "./FormateurPage.css";



const FormateurPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profile, setProfile] = useState({
    name: "Formateur",
    email: "formateur@example.com",
    photo: "https://via.placeholder.com/150",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const { notifications: reportNotifications } = useContext(ReportContext);
  const sidebarRef = useRef(null);

  // Fermer la sidebar en cliquant en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleEditProfile = () => setIsEditing(true);
  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };
  const toggleProfile = () => setShowProfile(!showProfile);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  return (
    <div className="formateur-page">
      {/* Top Bar */}
      <header className="header-formateur">
        <div className="top-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="formateur-title">Tableau de Bord</h1>
        </div>
        <div className="top-right">
          <div
            className="notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell size={24} />
            {reportNotifications.length > 0 && (
              <span className="notification-badge">
                {reportNotifications.length}
              </span>
            )}
          </div>
          {showNotifications && (
            <div className="notification-dropdown">
              {reportNotifications.length > 0 ? (
                reportNotifications.map((notif, index) => (
                  <div
                    key={index}
                    className="notification-item"
                  >
                    📄 {notif.message}
                  </div>
                ))
              ) : (
                <div className="notification-item">Aucune nouvelle notification</div>
              )}
            </div>
          )}
          <div className="profile-section" onClick={toggleProfile}>
            <FaUserCircle className="profile-icon" />
            <span>{profile.name}</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <button onClick={() => { setActiveSection("dashboard"); setIsSidebarOpen(false); }}>
          <FaChartLine className="sidebar-icon" /> Tableau de Bord
        </button>
        <button onClick={() => { setActiveSection("create-exam"); setIsSidebarOpen(false); }}>
          <FaFileAlt className="sidebar-icon" /> Créer un examen
        </button>
        {/* <button onClick={() => { setActiveSection("correct-exam"); setIsSidebarOpen(false); }}>
          <FaCheckCircle className="sidebar-icon" /> Corriger un examen
        </button> */}
        <button onClick={() => { setActiveSection("create-report"); setIsSidebarOpen(false); }}>
          <FaChartLine className="sidebar-icon" /> Créer un rapport
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {activeSection === "dashboard" && (
          <div className="dashboard-content">
            <h2>Bienvenue, {profile.name}</h2>
            <p className="welcome-message">
              Gérer vos examens, corriger les copies et générer des rapports en toute simplicité.
            </p>

            {/* Accès Rapide */}
            <div className="quick-links">
              <h3>Accès Rapide</h3>
              <div className="quick-links-grid">
                <button
                  className="quick-link-card"
                  onClick={() => setActiveSection("create-exam")}
                >
                  <FaFileAlt className="quick-link-icon" />
                  <span>Créer un Examen</span>
                </button>
                <button
                  className="quick-link-card"
                  onClick={() => setActiveSection("correct-exam")}
                >
                  <FaCheckCircle className="quick-link-icon" />
                  <span>Corriger un Examen</span>
                </button>
                <button
                  className="quick-link-card"
                  onClick={() => setActiveSection("create-report")}
                >
                  <FaChartLine className="quick-link-icon" />
                  <span>Générer un Rapport</span>
                </button>
              </div>
            </div>

            {/* Message d'encouragement ou info utile */}
            <div className="info-box">
              <p>
                💡 Astuce : Utilisez l'accès rapide pour gagner du temps dans vos tâches quotidiennes.
              </p>
            </div>
          </div>
        )}
        {activeSection === "create-exam" && <CreateExamPage />}
        {activeSection === "correct-exam" && <CorrectExam/>}
        {activeSection === "create-report" && <CreateReportPage />}
      </main>

      {/* Profile Popup */}
      {showProfile && (
        <div className="profile-popup">
          <div className="profile-content">
            <h2>Profil du Formateur</h2>
            {isEditing ? (
              <div className="edit-profile">
                <div className="profile-photo-edit">
                  <img
                    src={editedProfile.photo}
                    alt="Profil"
                    className="profile-img-large"
                  />
                  <label htmlFor="profile-photo" className="upload-btn">
                    Changer la photo
                  </label>
                  <input
                    id="profile-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="form-group">
                  <label>Nom:</label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="save-btn" onClick={handleSaveProfile}>
                  <FaSave /> Sauvegarder
                </button>
              </div>
            ) : (
              <div className="profile-details">
                <img
                  src={profile.photo}
                  alt="Profil"
                  className="profile-img-large"
                />
                <p><strong>Nom:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <button className="edit-btn" onClick={handleEditProfile}>
                  <FaUserEdit /> Modifier
                </button>
              </div>
            )}
            <button className="close-btn" onClick={toggleProfile}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormateurPage;