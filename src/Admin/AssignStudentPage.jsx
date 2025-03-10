import React, { useState } from "react";
import "./UserManagementPage.css";

const AssignStudentPage = ({ users, groups, assignedStudents, setAssignedStudents }) => {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [error, setError] = useState("");

    const handleAssignStudent = () => {
        if (!selectedStudent || !selectedGroup) {
            setError("Veuillez sélectionner un étudiant et un groupe.");
            return;
        }
        setAssignedStudents([
            ...assignedStudents,
            { student: selectedStudent, group: selectedGroup, id: Date.now() },
        ]);
        setError("");
    };

    return (
        <div className="user-management-page">
            {error && <div className="error-message">{error}</div>}

            <h3>Assigner un étudiant à un groupe</h3>
            <form>
                <label htmlFor="student">Choisir un étudiant :</label>
                <select id="student" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                    <option value="">Sélectionner un étudiant</option>
                    {users.filter((user) => user.role === "etudiant").map((user) => (
                        <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                </select>
                <label htmlFor="group">Choisir un groupe :</label>
                <select id="group" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value="">Sélectionner un groupe</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.groupName}>{group.groupName}</option>
                    ))}
                </select>
                <button type="button" onClick={handleAssignStudent}>Assigner</button>
            </form>
        </div>
    );
};

export default AssignStudentPage;