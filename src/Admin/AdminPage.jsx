
import React, { useState } from "react";
import { FaBell, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./AdminPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "Nouvelle notification 1",
    "Nouvelle notification 2",
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profile, setProfile] = useState({
    name: "Administrateur",
    email: "admin@example.com",
    photo: null,
  });
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isUserManagementVisible, setIsUserManagementVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "formateur",
  });
  const [newGroup, setNewGroup] = useState({ groupName: "" });
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserManagementClick = () => {
    setIsUserManagementVisible(true);
    setIsProfileVisible(false);
  };

  const handleProfileClick = () => {
    setIsProfileVisible(true);
    setIsUserManagementVisible(false);
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Veuillez remplir tous les champs avant d'ajouter un utilisateur.");
      return;
    }
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "", password: "", role: "formateur" });
  };

  const handleGroupInputChange = (e) => {
    setNewGroup({ groupName: e.target.value });
  };

  const handleAddGroup = () => {
    if (!newGroup.groupName) {
      alert("Veuillez saisir un nom de groupe.");
      return;
    }
    setGroups([...groups, newGroup.groupName]);
    setNewGroup({ groupName: "" });
  };

  const handleAssignStudent = () => {
    if (!selectedStudent || !selectedGroup) {
      alert("Veuillez sélectionner un étudiant et un groupe.");
      return;
    }
    setAssignedStudents([
      ...assignedStudents,
      { student: selectedStudent, group: selectedGroup },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, photo: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveChanges = () => {
    alert("Modifications enregistrées !");
  };

  return (
    <div className="admin-page">
      <header className="header-admin">
        <div className="top-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="admin-title">Tableau de Bord</h1>
        </div>
        <div className="top-right">
          <div className="notifications" onClick={() => setShowNotifications(!showNotifications)}>
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
          <FaUserCircle size={30} onClick={handleProfileClick} style={{ cursor: "pointer" }} />
        </div>
      </header>

      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <a href="#users" onClick={handleUserManagementClick}>
          Gérer les utilisateurs
        </a>
        <a href="#results">Voir les résultats</a>
        <a href="#reports">Voir les rapports</a>
      </div>

      <main className="main-content">
        {isProfileVisible && (
          <div className="profile-settings">
            <h3>Modifier vos informations</h3>
            <div className="profile-photo-section">
              <img src={profile.photo || "https://via.placeholder.com/150"} alt="Profil" className="profile-photo" />
              <input type="file" id="photoUpload" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
              <label htmlFor="photoUpload" className="upload-btn">
                Modifier la photo
              </label>
            </div>
            <label>
              Nom :
              <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
            </label>
            <label>
              Email :
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
            </label>
            <button className="save-btn" onClick={handleSaveChanges}>
              Enregistrer les modifications
            </button>
          </div>
        )}

        {isUserManagementVisible && (
          <div className="user-management">
            <h3>Ajouter un utilisateur</h3>
            <form>
              <label>
                Nom :
                <input type="text" name="name" value={newUser.name} onChange={handleUserInputChange} />
              </label>
              <label>
                Email :
                <input type="email" name="email" value={newUser.email} onChange={handleUserInputChange} />
              </label>
              <label>
                Mot de passe :
                <input type="password" name="password" value={newUser.password} onChange={handleUserInputChange} />
              </label>
              <label>
                Rôle :
                <select name="role" value={newUser.role} onChange={handleUserInputChange}>
                  <option value="formateur">Formateur</option>
                  <option value="etudiant">Étudiant</option>
                </select>
              </label>
              <button type="button" onClick={handleAddUser}>
                Ajouter
              </button>
            </form>

            <h3>Créer un groupe</h3>
            <form>
              <label>
                Nom du groupe :
                <input type="text" value={newGroup.groupName} onChange={handleGroupInputChange} />
              </label>
              <button type="button" onClick={handleAddGroup}>
                Créer
              </button>
            </form>

            <h3>Assigner un étudiant à un groupe</h3>
            <form>
              <label>
                Choisir un étudiant :
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">Sélectionner un étudiant</option>
                  {users
                    .filter((user) => user.role === "etudiant")
                    .map((user, index) => (
                      <option key={index} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </label>
              <label>
                Choisir un groupe :
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  <option value="">Sélectionner un groupe</option>
                  {groups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={handleAssignStudent}>
                Assigner
              </button>
            </form>

            <h4>Étudiants assignés aux groupes :</h4>
            <ul>
              {assignedStudents.map((assignment, index) => (
                <li key={index}>
                  {assignment.student} est assigné au groupe {assignment.group}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;