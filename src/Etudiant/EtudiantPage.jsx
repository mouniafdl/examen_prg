import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaChartLine,
  FaBook,
  FaAward,
  FaPlus,
} from "react-icons/fa";
import MesExamens from "./MesExamens";
import Resultats from "./Resultats";
import "./EtudiantPage.css";

// Composant principal
const EtudiantPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour ouvrir/fermer la sidebar
  const [notifications] = useState([
    "Nouvel examen ajouté : Mathématiques",
    "Résultats disponibles : Physique",
    "Rappel : Paiement des frais de scolarité",
  ]); // Notifications statiques
  const [showNotifications, setShowNotifications] = useState(false); // État pour afficher les notifications
  const [activeSection, setActiveSection] = useState("dashboard"); // Section active

  // État pour le profil de l'étudiant
  const [studentProfile, setStudentProfile] = useState({
    name: "Étudiant Nom",
    group: "Groupe A",
    email: "etudiant@example.com",
    phone: "0123456789",
    address: "123 Rue de l'Exemple",
    photo: "https://via.placeholder.com/150",
  });

  // Fonction pour mettre à jour le profil
  const handleUpdateProfile = (updatedData) => {
    setStudentProfile((prev) => ({ ...prev, ...updatedData }));
    console.log("Profil mis à jour :", updatedData);
  };

  // Fonction pour basculer la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fonction pour changer de section et masquer la sidebar
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Masquer la sidebar après le clic
  };

  return (
    <div className="student-page">
      {/* Barre supérieure */}
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        notifications={notifications}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSectionChange={handleSectionChange}
      />

      {/* Contenu principal */}
      <MainContent
        activeSection={activeSection}
        studentProfile={studentProfile}
        handleUpdateProfile={handleUpdateProfile}
        handleSectionChange={handleSectionChange} // Passer handleSectionChange ici
      />
    </div>
  );
};

// Composant Header
const Header = ({
  isSidebarOpen,
  toggleSidebar,
  notifications,
  showNotifications,
  setShowNotifications,
}) => {
  return (
    <header className="header-student">
      <div className="top-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="student-title">Tableau de Bord Étudiant</h1>
      </div>
      <div className="top-right">
        <div
          className="notifications"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaBell size={24} />
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </div>
        {showNotifications && (
          <div className="notification-dropdown">
            {notifications.map((notif, index) => (
              <div key={index} className="notification-item">
                {notif}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

// Composant Sidebar
const Sidebar = ({ isSidebarOpen, handleSectionChange }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
      <a href="#dashboard" onClick={() => handleSectionChange("dashboard")}>
        <FaChartLine /> Tableau de Bord
      </a>
      <a href="#profile" onClick={() => handleSectionChange("profile")}>
        <FaUser /> Profil
      </a>
      <a href="#exams" onClick={() => handleSectionChange("exams")}>
        <FaBook /> Mes Examens
      </a>
      <a href="#results" onClick={() => handleSectionChange("results")}>
        <FaAward /> Résultats
      </a>
    </div>
  );
};

// Composant MainContent
const MainContent = ({
  activeSection,
  studentProfile,
  handleUpdateProfile,
  handleSectionChange, // Recevoir handleSectionChange ici
}) => {
  return (
    <main className="main-content">
      {activeSection === "dashboard" && (
        <DashboardSection
          studentProfile={studentProfile}
          handleSectionChange={handleSectionChange} // Passer handleSectionChange ici
        />
      )}
      {activeSection === "profile" && (
        <ProfileSection
          studentProfile={studentProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
      {activeSection === "exams" && <MesExamens />}
      {activeSection === "results" && <Resultats />}
    </main>
  );
};

// Composant DashboardSection
const DashboardSection = ({ studentProfile, handleSectionChange }) => {
  return (
    <section id="dashboard">
      {/* Introduction personnalisée */}
      <div className="dashboard-intro">
        <h2>Bonjour, {studentProfile.name} !</h2>
        <p className="welcome-message">
          Bienvenue sur votre tableau de bord. Consultez vos examens, résultats,
          et restez informé des dernières mises à jour.
        </p>
      </div>

      {/* Accès rapide */}
      <div className="quick-access">
        <div
          className="quick-access-card"
          onClick={() => handleSectionChange("profile")}
        >
          <div className="quick-access-icon">
            <FaUser size={40} />
          </div>
          <h3>Profil</h3>
          <p>Consultez et modifiez votre profil étudiant.</p>
        </div>
        <div
          className="quick-access-card"
          onClick={() => handleSectionChange("exams")}
        >
          <div className="quick-access-icon">
            <FaBook size={40} />
          </div>
          <h3>Mes Examens</h3>
          <p>Consultez vos examens à venir et passés.</p>
        </div>
        <div
          className="quick-access-card"
          onClick={() => handleSectionChange("results")}
        >
          <div className="quick-access-icon">
            <FaAward size={40} />
          </div>
          <h3>Résultats</h3>
          <p>Consultez vos résultats et votre progression.</p>
        </div>
      </div>
    </section>
  );
};

// Composant ProfileSection
const ProfileSection = ({ studentProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: studentProfile.email,
    phone: studentProfile.phone,
    address: studentProfile.address,
    photo: studentProfile.photo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <section id="profile">
      <h2>Profil Étudiant</h2>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-photo-container">
            <img src={formData.photo} alt="Profile" className="profile-photo" />
            <label htmlFor="photo-upload" className="photo-upload-label">
              <FaPlus className="plus-icon" />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="photo-upload-input"
              />
            </label>
          </div>
          <h3>{studentProfile.name}</h3>
          <p>{studentProfile.group}</p>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <FaEnvelope /> Adresse e-mail :
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <FaPhone /> Téléphone :
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <FaMapMarker /> Adresse :
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="save-btn">
              Enregistrer
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <span>{studentProfile.email}</span>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <span>{studentProfile.phone}</span>
            </div>
            <div className="info-item">
              <FaMapMarker className="info-icon" />
              <span>{studentProfile.address}</span>
            </div>
            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
              <FaEdit /> Modifier le Profil
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EtudiantPage;
