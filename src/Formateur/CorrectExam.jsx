

import React, { useState } from "react";
// import "./CorrectExamPage.css";

const CorrectExam = () => {
    const students = [
        { id: 1, name: "Ahmed", group: "DD101", status: "Non passé" },
        { id: 2, name: "Boulahfa", group: "DD101", status: "Non passé" },
        { id: 3, name: "Fadili", group: "DD101", status: "Passé" },
    ];

    const questions = [
        { id: 1, text: "Définition de CSS", correctAnswer: "CSS est un langage de style utilisé pour décrire la présentation d'un document HTML.", maxScore: 5.0 },
        { id: 2, text: "True-False (True)", correctAnswer: "Vrai", maxScore: 5.0 },
    ];

    const branches = ["Développement Digital", "Réseaux et Sécurité"];
    const filieresByBranch = {
        "Développement Digital": ["DEV1", "DEV2"],
        "Réseaux et Sécurité": ["RS1"],
    };
    const groupsByFiliere = {
        "DEV1": ["DD101", "DD102"],
        "DEV2": ["DD101", "DD102"],
        "RS1": ["RS101"],
    };
    const exams = ["cc1 HTML&CSS", "cc2 JavaScript", "cc3 React"];

    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedFiliere, setSelectedFiliere] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [showStudentList, setShowStudentList] = useState(false);
    const [showCorrectionPage, setShowCorrectionPage] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [notes, setNotes] = useState({});

    const filteredStudents = students.filter(student => student.group === selectedGroup);

    const handleFilterStudents = () => {
        if (!selectedBranch || !selectedFiliere || !selectedGroup || !selectedExam) {
            alert("Veuillez sélectionner une branche, une filière, un groupe et un examen.");
            return;
        }
        setShowStudentList(true);
    };

    const handleCorrectExam = (student) => {
        setSelectedStudent(student);
        setShowCorrectionPage(true);
    };

    const handleGoBackToList = () => {
        setShowCorrectionPage(false);
        setSelectedStudent(null);
    };

    const handleGoBackToFilter = () => {
        setShowStudentList(false);
    };

    const handleNoteChange = (questionId, value) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            [questionId]: value,
        }));
    };

    const handleSaveNotes = () => {
        alert("Notes enregistrées avec succès !");
        console.log("Notes attribuées :", notes);
    };

    return (
        <div className="corriger-examen-container">
            {!showStudentList ? (
                <>
                    <h2>Correction des Examens</h2>

                    <div>
                        <label htmlFor="branch">Choisir une branche:</label>
                        <select
                            id="branch"
                            value={selectedBranch}
                            onChange={(e) => {
                                setSelectedBranch(e.target.value);
                                setSelectedFiliere("");
                                setSelectedGroup("");
                                setSelectedExam("");
                            }}
                        >
                            <option value="">Sélectionner une branche</option>
                            {branches.map((branch, index) => (
                                <option key={index} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>

                    {selectedBranch && (
                        <div>
                            <label htmlFor="filiere">Choisir une filière:</label>
                            <select
                                id="filiere"
                                value={selectedFiliere}
                                onChange={(e) => {
                                    setSelectedFiliere(e.target.value);
                                    setSelectedGroup("");
                                    setSelectedExam("");
                                }}
                            >
                                <option value="">Sélectionner une filière</option>
                                {filieresByBranch[selectedBranch].map((filiere, index) => (
                                    <option key={index} value={filiere}>{filiere}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedFiliere && (
                        <div>
                            <label htmlFor="group">Choisir un groupe:</label>
                            <select
                                id="group"
                                value={selectedGroup}
                                onChange={(e) => {
                                    setSelectedGroup(e.target.value);
                                    setSelectedExam("");
                                }}
                            >
                                <option value="">Sélectionner un groupe</option>
                                {groupsByFiliere[selectedFiliere].map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedGroup && (
                        <div>
                            <label htmlFor="exam">Choisir un examen:</label>
                            <select
                                id="exam"
                                value={selectedExam}
                                onChange={(e) => setSelectedExam(e.target.value)}
                            >
                                <option value="">Sélectionner un examen</option>
                                {exams.map((exam, index) => (
                                    <option key={index} value={exam}>{exam}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button onClick={handleFilterStudents}>Filtrer les étudiants</button>
                </>
            ) : !showCorrectionPage ? (
                <>
                    <button className="back-button" onClick={handleGoBackToFilter}>← Retour au filtrage</button>

                    <h2>Liste des Étudiants</h2>
                    <div className="info-section">
                        <p><strong>Examen :</strong> {selectedExam}</p>
                        <p><strong>Groupe :</strong> {selectedGroup}</p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Nom de l'étudiant</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.status}</td>
                                    <td>
                                        {student.status === "Passé" && (
                                            <button onClick={() => handleCorrectExam(student)}>Corriger</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <button className="back-button" onClick={handleGoBackToList}>← Retour à la liste des étudiants</button>

                    <h2>Correction des Examens</h2>

                    <div className="info-section">
                        <p><strong>Étudiant :</strong> {selectedStudent.name}</p>
                        <p><strong>Examen :</strong> {selectedExam}</p>
                        <p><strong>Groupe :</strong> {selectedGroup}</p>
                    </div>

                    <div>
                        {questions.map((question) => (
                            <div key={question.id} className="question-section">
                                <p><strong>Question :</strong> {question.text}</p>
                                <p><strong>Réponse :</strong> {question.correctAnswer}</p>
                                <p><strong>Note maximale :</strong> {question.maxScore}</p>
                                <label>
                                    <strong>Note attribuée :</strong>
                                    <input
                                        type="number"
                                        step="0.01"
                                        max={question.maxScore}
                                        value={notes[question.id] || ""}
                                        onChange={(e) => handleNoteChange(question.id, parseFloat(e.target.value))}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSaveNotes}>Enregistrer les notes</button>
                </>
            )}
        </div>
    );
};

export default CorrectExam;
