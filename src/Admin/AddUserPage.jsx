import React, { useState } from "react";
import "./UserManagementPage.css";

const AddUserPage = ({ users, setUsers }) => {
    const [newUser, setNewUser] = useState({
        cin: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        telephone: "",
        adresse: "",
        email: "",
        password: "",
        role: "formateur",
    });
    const [error, setError] = useState("");

    // Regex pour valider le mot de passe
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddUser = () => {
        // Vérification que tous les champs obligatoires sont remplis
        if (!newUser.cin || !newUser.nom || !newUser.prenom || !newUser.dateNaissance || !newUser.telephone || !newUser.adresse || !newUser.email || !newUser.password) {
            setError("Veuillez remplir tous les champs avant d'ajouter un utilisateur.");
            return;
        }

        // Vérification du mot de passe avec la regex
        if (!passwordRegex.test(newUser.password)) {
            setError("Le mot de passe doit contenir au moins 8 caractères, incluant des lettres, des chiffres et des symboles.");
            return;
        }

        // Ajouter l'utilisateur
        setUsers([...users, { ...newUser, id: Date.now() }]);
        setNewUser({
            cin: "",
            nom: "",
            prenom: "",
            dateNaissance: "",
            telephone: "",
            adresse: "",
            email: "",
            password: "",
            role: "formateur",
        });
        setError("");
    };

    return (
        <div className="user-management-page">
            {error && <div className="error-message">{error}</div>}

            <h3>Ajouter un utilisateur</h3>
            <form>
                <label htmlFor="cin">CIN :</label>
                <input type="text" id="cin" name="cin" value={newUser.cin} onChange={handleUserInputChange} />

                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" value={newUser.nom} onChange={handleUserInputChange} />

                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" value={newUser.prenom} onChange={handleUserInputChange} />

                <label htmlFor="dateNaissance">Date de naissance :</label>
                <input type="date" id="dateNaissance" name="dateNaissance" value={newUser.dateNaissance} onChange={handleUserInputChange} />

                <label htmlFor="telephone">Téléphone :</label>
                <input type="text" id="telephone" name="telephone" value={newUser.telephone} onChange={handleUserInputChange} />

                <label htmlFor="adresse">Adresse :</label>
                <input type="text" id="adresse" name="adresse" value={newUser.adresse} onChange={handleUserInputChange} />

                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" value={newUser.email} onChange={handleUserInputChange} />

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" name="password" value={newUser.password} onChange={handleUserInputChange} />
                <small>Le mot de passe doit contenir au moins 8 caractères, incluant des lettres, des chiffres et des symboles.</small>

                <label htmlFor="role">Rôle :</label>
                <select id="role" name="role" value={newUser.role} onChange={handleUserInputChange}>
                    <option value="formateur">Formateur</option>
                    <option value="etudiant">Étudiant</option>
                </select>

                <button type="button" onClick={handleAddUser}>Ajouter</button>
            </form>
        </div>
    );
};

export default AddUserPage;