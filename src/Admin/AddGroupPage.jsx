import React, { useState } from "react";
import "./UserManagementPage.css";

const AddGroupPage = ({ groups, setGroups }) => {
    const [newGroup, setNewGroup] = useState({
        groupName: "",
        filiere: "developpement-digital",
        type: "tronc-commun",
        branche: "",
    });
    const [error, setError] = useState("");

    const handleGroupInputChange = (event) => {
        const { name, value } = event.target;
        setNewGroup((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddGroup = () => {
        if (!newGroup.groupName || !newGroup.filiere || !newGroup.type) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (newGroup.type === "branche" && !newGroup.branche) {
            setError("Veuillez sélectionner une branche.");
            return;
        }
        setGroups([...groups, { ...newGroup, id: Date.now() }]);
        setNewGroup({ groupName: "", filiere: "developpement-digital", type: "tronc-commun", branche: "" });
        setError("");
    };

    return (
        <div className="user-management-page">
            {error && <div className="error-message">{error}</div>}

            <h3>Créer un groupe</h3>
            <form>
                <label htmlFor="groupName">Nom du groupe :</label>
                <input type="text" id="groupName" name="groupName" value={newGroup.groupName} onChange={handleGroupInputChange} />

                <label htmlFor="filiere">Choisir une filière :</label>
                <select id="filiere" name="filiere" value={newGroup.filiere} onChange={handleGroupInputChange}>
                    <option value="developpement-digital">Développement Digital</option>
                    {/* Ajoutez d'autres filières ici si nécessaire */}
                </select>

                <label>Type :</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="tronc-commun"
                            checked={newGroup.type === "tronc-commun"}
                            onChange={handleGroupInputChange}
                        />
                        Tronc Commun
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="branche"
                            checked={newGroup.type === "branche"}
                            onChange={handleGroupInputChange}
                        />
                        Branche
                    </label>
                </div>

                {newGroup.type === "branche" && (
                    <div>
                        <label htmlFor="branche">Choisir une branche :</label>
                        <select id="branche" name="branche" value={newGroup.branche} onChange={handleGroupInputChange}>
                            <option value="">Sélectionner une branche</option>
                            <option value="dev1">DEV1</option>
                            {/* Ajoutez d'autres branches ici si nécessaire */}
                        </select>
                    </div>
                )}

                <button type="button" onClick={handleAddGroup}>Ajouter</button>
            </form>
        </div>
    );
};

export default AddGroupPage;