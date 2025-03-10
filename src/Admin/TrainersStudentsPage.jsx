import React, { useState } from "react";
import "./TrainersStudentsPage.css";

const TrainersStudentsPage = () => {
    const [users, setUsers] = useState([
        { id: 1, nom: "ELHAYYANI", prenom: "ISAM", email: "ELHAYYANI11@gmail.com", role: "Formateur", statut: "Actif" },
        { id: 2, nom: "Nizar", prenom: "nizar", email: "nizar01@example.com", role: "Étudiant", statut: "Inactif" },
    ]);

    const toggleStatus = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, statut: user.statut === "Actif" ? "Bloqué" : "Actif" } : user
        ));
    };

    return (
        <div className="trainers-students-page">
            <h2>Gestion des Formateurs et Étudiants</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.statut}</td>
                            <td>
                                <button onClick={() => toggleStatus(user.id)}>
                                    {user.statut === "Actif" ? "Bloquer" : "Activer"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainersStudentsPage;
