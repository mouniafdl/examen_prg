import React, { useState } from "react";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import "./EtudiantPage.css";

const EtudiantPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "Nouvelle notification 1",
    "Nouvelle notification 2",
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Exemple de données des examens
  const [exams, setExams] = useState([
    { id: 1, title: "Examen Python", status: "Autorisé", result: "En attente" },
    { id: 2, title: "Examen Javascript", status: "Non autorisé", result: "En attente" },
    { id: 3, title: "Examen Php", status: "Autorisé", result: "15/20" },
  ]);

  // Informations du profil étudiant
  const studentProfile = {
    name: "Étudiant Nom",
    group: "Groupe A",
    email: "etudiant@example.com",
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleStartExam = (id) => {
    const selectedExam = exams.find((exam) => exam.id === id);
    if (selectedExam && selectedExam.status === "Autorisé") {
      alert(`Début de l'examen : ${selectedExam.title}`);
    } else {
      alert("Vous n'êtes pas autorisé à débuter cet examen.");
    }
  };

  return (
    <div className="student-page">
      {/* Top Bar */}
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

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
      <a href="#exams">Mes Examens</a>
      <a href="#results">Résultats</a>
      <a href="#profile">Profil</a>
    </div>

      {/* Main Content */ }
  <main className="main-content">
    {/* Section Profil Étudiant */}
    <section id="profile">
      <h2>Profil Étudiant</h2>
      <div className="profile-info">
        <p><strong>Nom :</strong> {studentProfile.name}</p>
        <p><strong>Groupe :</strong> {studentProfile.group}</p>
        <p><strong>Email :</strong> {studentProfile.email}</p>
      </div>
    </section>

    {/* Section Liste des Examens */}
    <section id="exams">
      <h2>Liste des Examens</h2>
      <table className="exam-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom de l'examen</th>
            <th>Statut</th>
            <th>Résultat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.id}</td>
              <td>{exam.title}</td>
              <td
                className={
                  exam.status === "Autorisé" ? "status-allowed" : "status-denied"
                }
              >
                {exam.status}
              </td>
              <td>{exam.result}</td>
              <td>
                <button
                  className="start-exam-btn"
                  onClick={() => handleStartExam(exam.id)}
                  disabled={exam.status !== "Autorisé"}
                >
                  Commencer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </main>
    </div >
  );
};

export default EtudiantPage;