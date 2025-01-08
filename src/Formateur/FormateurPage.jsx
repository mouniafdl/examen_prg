import React, { useState } from "react";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import "./FormateurPage.css";

const FormateurPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "Nouvelle notification 1",
    "Nouvelle notification 2",
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profile, setProfile] = useState({
    name: "Formateur",
    email: "formateur@example.com",
    photo: null,
  });
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveChanges = () => {
    alert("Informations mises à jour avec succès !");
  };

  const handleProfileClick = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleNotificationClick = () => {
    setNotifications([]); // Clear notifications on click
    setShowNotifications(false);
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
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </div>
          {showNotifications && (
            <div className="notification-dropdown">
              {notifications.map((notif, index) => (
                <div key={index} className="notification-item" onClick={handleNotificationClick}>
                  {notif}
                </div>
              ))}
            </div>
          )}
          <div className="profile-section" onClick={handleProfileClick}>
            <img
              src={profile.photo || "https://via.placeholder.com/30"}
              alt="Profil"
              className="profile-img"
            />
            <span>{profile.name}</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
      <a href="#create-exam">Créer un examen</a>
      <a href="#correct-exam">Corriger un examen</a>
      <a href="#create-reports">Créer des rapports</a>
    </div>

      {/* Main Content */ }
  <main className="main-content">
    <h2>Tableau de bord</h2>

    {isProfileVisible && (
      <div className="profile-settings">
        <h3>Modifier vos informations</h3>
        <div className="profile-photo-section">
          <img
            src={profile.photo || "https://via.placeholder.com/150"}
            alt="Profil"
            className="profile-photo"
          />
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />
          <label htmlFor="photoUpload" className="upload-btn">
            Modifier la photo
          </label>
        </div>
        <div className="profile-form">
          <label>
            Nom :
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />
          </label>
          <button className="save-btn" onClick={handleSaveChanges}>
            Enregistrer les modifications
          </button>
        </div>
      </div>
    )}
  </main>
    </div >
  );
};

export default FormateurPage;