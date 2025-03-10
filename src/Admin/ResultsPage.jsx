import React, { useReducer, useState } from "react";
import styles from "./ResultsPage.css"; // Assurez-vous que ce fichier existe

// Définir les variables COURSES et COURSE_GROUPS
const COURSES = {
    "1ère année": ["Informatique", "Mathématiques", "Physique"],
    "2ème année": ["Web Development", "Data Science", "AI"],
};

const COURSE_GROUPS = {
    Informatique: ["G1", "G2", "G3"],
    Mathématiques: ["G1", "G2"],
    Physique: ["G1", "G2"],
    "Web Development": ["G1", "G2"],
    "Data Science": ["G1", "G2", "G3"],
    AI: ["G1", "G2"],
};

// Données statiques avec les nouvelles informations
const ALL_RESULTS = {
    Informatique: {
        G1: [
            {
                name: "Alice Dupont",
                firstName: "Alice",
                lastName: "Dupont",
                cin: "A123456",
                group: "G1",
                birthDate: "1995-05-15",
                email: "alice.dupont@example.com",
                modules: [
                    {
                        name: "Algorithmique",
                        scores: { controle: [15, 14, 16], examen: 18 },
                    },
                    {
                        name: "Base de données",
                        scores: { controle: [12, 13, 14], examen: 15 },
                    },
                ],
                absences: [
                    {
                        type: "Python", // Type d'examen
                        date: "2023-10-01",
                        time: "11:00 - 13:30",
                        status: "Absent",
                        justified: false,
                        proof: null,
                    },
                    {
                        type: "Front-end", // Type d'examen
                        date: "2023-10-08",
                        time: "14:00 - 16:30",
                        status: "Absent",
                        justified: true,
                        proof: "https://example.com/proof.pdf",
                    },
                ],
            },
            // Nouvel étudiant sans absences
            {
                name: "Bob Martin",
                firstName: "Bob",
                lastName: "Martin",
                cin: "B654321",
                group: "G1",
                birthDate: "1996-08-22",
                email: "bob.martin@example.com",
                modules: [
                    {
                        name: "Algorithmique",
                        scores: { controle: [16, 15, 17], examen: 19 },
                    },
                    {
                        name: "Base de données",
                        scores: { controle: [13, 14, 15], examen: 16 },
                    },
                ],
                absences: [], // Aucune absence
            },
        ],
        // ... autres groupes
    },
};

// Reducer pour gérer les états
const initialState = {
    selectedYear: "",
    selectedCourse: "",
    selectedGroup: "",
    selectedStudent: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_YEAR":
            return { ...state, selectedYear: action.payload, selectedCourse: "", selectedGroup: "" };
        case "SET_COURSE":
            return { ...state, selectedCourse: action.payload, selectedGroup: "" };
        case "SET_GROUP":
            return { ...state, selectedGroup: action.payload };
        case "SET_STUDENT":
            return { ...state, selectedStudent: action.payload };
        case "RESET_STUDENT":
            return { ...state, selectedStudent: null };
        case "UPDATE_STUDENT":
            return { ...state, selectedStudent: action.payload };
        default:
            return state;
    }
}

// Composant pour les filtres
const Filters = ({ state, dispatch }) => {
    return (
        <div className={styles.resultsPageFilters}>
            <label>Sélectionner l'année :</label>
            <select
                value={state.selectedYear}
                onChange={(e) => dispatch({ type: "SET_YEAR", payload: e.target.value })}
            >
                <option value="">Choisir l'année</option>
                {Object.keys(COURSES).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            {state.selectedYear && (
                <>
                    <label>Sélectionner une filière :</label>
                    <select
                        value={state.selectedCourse}
                        onChange={(e) => dispatch({ type: "SET_COURSE", payload: e.target.value })}
                    >
                        <option value="">Choisir une filière</option>
                        {COURSES[state.selectedYear].map((course) => (
                            <option key={course} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {state.selectedCourse && (
                <>
                    <label>Sélectionner un groupe :</label>
                    <select
                        value={state.selectedGroup}
                        onChange={(e) => dispatch({ type: "SET_GROUP", payload: e.target.value })}
                    >
                        <option value="">Choisir un groupe</option>
                        {COURSE_GROUPS[state.selectedCourse].map((group) => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
};

// Composant pour afficher les résultats
const ResultsTable = ({ results, onDetailsClick }) => {
    return (
        <div className={styles.resultsPageTable}>
            <table>
                <thead>
                    <tr>
                        <th>Groupe</th>
                        <th>CIN</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Date de naissance</th>
                        <th>Email</th>
                        <th>Détails</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((student, index) => (
                        <tr key={index}>
                            <td>{student.group}</td>
                            <td>{student.cin}</td>
                            <td>{student.lastName}</td>
                            <td>{student.firstName}</td>
                            <td>{student.birthDate}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => onDetailsClick(student)}>Voir détails</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Composant pour afficher les détails de l'étudiant
const StudentDetails = ({ student, onBack, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState({ ...student });
    const [isProofModalOpen, setIsProofModalOpen] = useState(false);
    const [proofUrl, setProofUrl] = useState("");

    // Calculer la note générale pour chaque module
    const calculateModuleGrade = (module) => {
        const { controle, examen } = module.scores;
        const controleAverage = controle.reduce((a, b) => a + b, 0) / controle.length;
        return ((controleAverage + examen) / 2).toFixed(2);
    };

    // Calculer la note totale des modules
    const totalGrade = editedStudent.modules
        .reduce((total, module) => total + parseFloat(calculateModuleGrade(module)), 0)
        .toFixed(2);

    // Gérer les changements dans les absences
    const handleAbsenceChange = (index, field, value) => {
        const updatedAbsences = [...editedStudent.absences];
        updatedAbsences[index][field] = value;
        setEditedStudent((prev) => ({
            ...prev,
            absences: updatedAbsences,
        }));
    };

    // Gérer l'enregistrement des modifications
    const handleSave = () => {
        onSave(editedStudent);
        setIsEditing(false);
    };

    // Fonction pour ouvrir le modal avec la preuve
    const handleViewProof = (url) => {
        setProofUrl(url);
        setIsProofModalOpen(true);
    };

    // Fonction pour fermer le modal
    const handleCloseProofModal = () => {
        setIsProofModalOpen(false);
        setProofUrl("");
    };

    return (
        <div className={styles.resultsPageStudentDetails}>
            {/* Informations générales de l'étudiant */}
            <h4>Informations de l'étudiant : {editedStudent.name}</h4>
            <div className={styles.studentInfo}>
                <p><strong>CIN :</strong> {editedStudent.cin}</p>
                <p><strong>Groupe :</strong> {editedStudent.group}</p>
                <p><strong>Date de naissance :</strong> {editedStudent.birthDate}</p>
                <p><strong>Email :</strong> {editedStudent.email}</p>
            </div>

            {/* Boutons d'action */}
            <div className={styles.actions}>
                <button onClick={onBack} className={styles.backButton}>
                    Retour à la liste
                </button>
                {isEditing ? (
                    <button onClick={handleSave} className={styles.saveButton}>
                        Enregistrer
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                        Modifier
                    </button>
                )}
            </div>

            {/* Tableau des modules */}
            <h5>Résultats des modules :</h5>
            <table className={styles.modulesTable}>
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Contrôle 1</th>
                        <th>Contrôle 2</th>
                        <th>Contrôle 3</th>
                        <th>Examen</th>
                        <th>Note Générale</th>
                    </tr>
                </thead>
                <tbody>
                    {editedStudent.modules.map((module, index) => (
                        <tr key={index}>
                            <td>{module.name}</td>
                            <td>{module.scores.controle[0]}</td>
                            <td>{module.scores.controle[1]}</td>
                            <td>{module.scores.controle[2] || "-"}</td>
                            <td>{module.scores.examen}</td>
                            <td>{calculateModuleGrade(module)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Note totale des modules */}
            <div className={styles.totalGrade}>
                <strong>Note totale des modules :</strong> {totalGrade}
            </div>

            {/* Tableau des absences */}
            {editedStudent.absences.length > 0 ? (
                <>
                    <h5>Absences :</h5>
                    <table className={styles.absencesTable}>
                        <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Statut</th>
                                <th>Justifiée</th>
                                <th>Preuve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editedStudent.absences.map((absence, index) => (
                                <tr key={index}>
                                    <td>Exam {index + 1}</td>
                                    <td>{absence.type}</td>
                                    <td>{absence.date}</td>
                                    <td>{absence.time}</td>
                                    <td>{absence.status}</td>
                                    <td>
                                        {isEditing ? (
                                            <select
                                                value={absence.justified}
                                                onChange={(e) =>
                                                    handleAbsenceChange(index, "justified", e.target.value === "true")
                                                }
                                            >
                                                <option value={true}>Oui</option>
                                                <option value={false}>Non</option>
                                            </select>
                                        ) : (
                                            absence.justified ? "Oui" : "Non"
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={absence.proof || ""}
                                                onChange={(e) =>
                                                    handleAbsenceChange(index, "proof", e.target.value)
                                                }
                                            />
                                        ) : (
                                            absence.justified && absence.proof ? (
                                                <button
                                                    className={styles.proofButton}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleViewProof(absence.proof);
                                                    }}
                                                >
                                                    Voir la preuve
                                                </button>
                                            ) : (
                                                "Aucune preuve"
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>Aucune absence enregistrée pour cet étudiant.</p>
            )}

            {/* Modal pour afficher la preuve */}
            {isProofModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleCloseProofModal}>
                            &times;
                        </button>
                        {proofUrl.endsWith(".pdf") ? (
                            <embed src={proofUrl} type="application/pdf" width="100%" height="600px" />
                        ) : (
                            <img src={proofUrl} alt="Preuve d'absence" style={{ maxWidth: "100%", maxHeight: "80vh" }} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Composant principal
const ResultsPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const resultsForGroup = ALL_RESULTS[state.selectedCourse]?.[state.selectedGroup] || [];

    // Fonction pour sauvegarder les modifications
    const handleSave = (updatedStudent) => {
        const updatedResults = { ...ALL_RESULTS };
        const groupIndex = updatedResults[state.selectedCourse][state.selectedGroup].findIndex(
            (s) => s.cin === updatedStudent.cin
        );
        if (groupIndex !== -1) {
            updatedResults[state.selectedCourse][state.selectedGroup][groupIndex] = updatedStudent;
            console.log("Étudiant mis à jour :", updatedStudent);
            dispatch({ type: "UPDATE_STUDENT", payload: updatedStudent });
        }
    };

    return (
        <div className={styles.resultsPageContainer}>
            <h3>Voir les résultats</h3>
            {!state.selectedStudent ? (
                <>
                    <Filters state={state} dispatch={dispatch} />
                    {state.selectedGroup && (
                        <ResultsTable
                            results={resultsForGroup}
                            onDetailsClick={(student) =>
                                dispatch({ type: "SET_STUDENT", payload: student })
                            }
                        />
                    )}
                </>
            ) : (
                <StudentDetails
                    student={state.selectedStudent}
                    onBack={() => dispatch({ type: "RESET_STUDENT" })}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ResultsPage;
// import React, { useReducer, useState } from "react";
// import styles from "./ResultsPage.css"; // Assurez-vous que ce fichier existe

// // Définir les variables COURSES et COURSE_GROUPS
// const COURSES = {
//     "1ère année": ["Informatique", "Mathématiques", "Physique"],
//     "2ème année": ["Web Development", "Data Science", "AI"],
// };

// const COURSE_GROUPS = {
//     Informatique: ["G1", "G2", "G3"],
//     Mathématiques: ["G1", "G2"],
//     Physique: ["G1", "G2"],
//     "Web Development": ["G1", "G2"],
//     "Data Science": ["G1", "G2", "G3"],
//     AI: ["G1", "G2"],
// };

// // Données statiques avec les nouvelles informations
// const ALL_RESULTS = {
//     Informatique: {
//         G1: [
//             {
//                 name: "Alice Dupont",
//                 firstName: "Alice",
//                 lastName: "Dupont",
//                 cin: "A123456",
//                 group: "G1",
//                 birthDate: "1995-05-15",
//                 email: "alice.dupont@example.com",
//                 modules: [
//                     {
//                         name: "Algorithmique",
//                         scores: { controle: [15, 14, 16], examen: 18 },
//                     },
//                     {
//                         name: "Base de données",
//                         scores: { controle: [12, 13, 14], examen: 15 },
//                     },
//                 ],
//                 absences: [
//                     {
//                         type: "Python", // Type d'examen
//                         date: "2023-10-01",
//                         time: "11:00 - 13:30",
//                         status: "Absent",
//                         justified: false,
//                         proof: null,
//                     },
//                     {
//                         type: "Front-end", // Type d'examen
//                         date: "2023-10-08",
//                         time: "14:00 - 16:30",
//                         status: "Absent",
//                         justified: true,
//                         proof: "https://example.com/proof.pdf",
//                     },
//                 ],
//             },
//             // Nouvel étudiant sans absences
//             {
//                 name: "Bob Martin",
//                 firstName: "Bob",
//                 lastName: "Martin",
//                 cin: "B654321",
//                 group: "G1",
//                 birthDate: "1996-08-22",
//                 email: "bob.martin@example.com",
//                 modules: [
//                     {
//                         name: "Algorithmique",
//                         scores: { controle: [16, 15, 17], examen: 19 },
//                     },
//                     {
//                         name: "Base de données",
//                         scores: { controle: [13, 14, 15], examen: 16 },
//                     },
//                 ],
//                 absences: [], // Aucune absence
//             },
//         ],
//         // ... autres groupes
//     },
// };

// // Reducer pour gérer les états
// const initialState = {
//     selectedYear: "",
//     selectedCourse: "",
//     selectedGroup: "",
//     selectedStudent: null,
// };

// function reducer(state, action) {
//     switch (action.type) {
//         case "SET_YEAR":
//             return { ...state, selectedYear: action.payload, selectedCourse: "", selectedGroup: "" };
//         case "SET_COURSE":
//             return { ...state, selectedCourse: action.payload, selectedGroup: "" };
//         case "SET_GROUP":
//             return { ...state, selectedGroup: action.payload };
//         case "SET_STUDENT":
//             return { ...state, selectedStudent: action.payload };
//         case "RESET_STUDENT":
//             return { ...state, selectedStudent: null };
//         case "UPDATE_STUDENT":
//             return { ...state, selectedStudent: action.payload };
//         default:
//             return state;
//     }
// }

// // Composant pour les filtres
// const Filters = ({ state, dispatch }) => {
//     return (
//         <div className={styles.filters}>
//             <label>Sélectionner l'année :</label>
//             <select
//                 value={state.selectedYear}
//                 onChange={(e) => dispatch({ type: "SET_YEAR", payload: e.target.value })}
//             >
//                 <option value="">Choisir l'année</option>
//                 {Object.keys(COURSES).map((year) => (
//                     <option key={year} value={year}>
//                         {year}
//                     </option>
//                 ))}
//             </select>

//             {state.selectedYear && (
//                 <>
//                     <label>Sélectionner une filière :</label>
//                     <select
//                         value={state.selectedCourse}
//                         onChange={(e) => dispatch({ type: "SET_COURSE", payload: e.target.value })}
//                     >
//                         <option value="">Choisir une filière</option>
//                         {COURSES[state.selectedYear].map((course) => (
//                             <option key={course} value={course}>
//                                 {course}
//                             </option>
//                         ))}
//                     </select>
//                 </>
//             )}

//             {state.selectedCourse && (
//                 <>
//                     <label>Sélectionner un groupe :</label>
//                     <select
//                         value={state.selectedGroup}
//                         onChange={(e) => dispatch({ type: "SET_GROUP", payload: e.target.value })}
//                     >
//                         <option value="">Choisir un groupe</option>
//                         {COURSE_GROUPS[state.selectedCourse].map((group) => (
//                             <option key={group} value={group}>
//                                 {group}
//                             </option>
//                         ))}
//                     </select>
//                 </>
//             )}
//         </div>
//     );
// };

// // Composant pour afficher les résultats
// const ResultsTable = ({ results, onDetailsClick }) => {
//     return (
//         <div className={styles.resultsTable}>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Groupe</th>
//                         <th>CIN</th>
//                         <th>Nom</th>
//                         <th>Prénom</th>
//                         <th>Date de naissance</th>
//                         <th>Email</th>
//                         <th>Détails</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {results.map((student, index) => (
//                         <tr key={index}>
//                             <td>{student.group}</td>
//                             <td>{student.cin}</td>
//                             <td>{student.lastName}</td>
//                             <td>{student.firstName}</td>
//                             <td>{student.birthDate}</td>
//                             <td>{student.email}</td>
//                             <td>
//                                 <button onClick={() => onDetailsClick(student)}>Voir détails</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// // Composant pour afficher les détails de l'étudiant
// const StudentDetails = ({ student, onBack, onSave }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedStudent, setEditedStudent] = useState({ ...student });
//     const [isProofModalOpen, setIsProofModalOpen] = useState(false);
//     const [proofUrl, setProofUrl] = useState("");

//     // Calculer la note générale pour chaque module
//     const calculateModuleGrade = (module) => {
//         const { controle, examen } = module.scores;
//         const controleAverage = controle.reduce((a, b) => a + b, 0) / controle.length;
//         return ((controleAverage + examen) / 2).toFixed(2);
//     };

//     // Calculer la note totale des modules
//     const totalGrade = editedStudent.modules
//         .reduce((total, module) => total + parseFloat(calculateModuleGrade(module)), 0)
//         .toFixed(2);

//     // Gérer les changements dans les absences
//     const handleAbsenceChange = (index, field, value) => {
//         const updatedAbsences = [...editedStudent.absences];
//         updatedAbsences[index][field] = value;
//         setEditedStudent((prev) => ({
//             ...prev,
//             absences: updatedAbsences,
//         }));
//     };

//     // Gérer l'enregistrement des modifications
//     const handleSave = () => {
//         onSave(editedStudent);
//         setIsEditing(false);
//     };

//     // Fonction pour ouvrir le modal avec la preuve
//     const handleViewProof = (url) => {
//         setProofUrl(url);
//         setIsProofModalOpen(true);
//     };

//     // Fonction pour fermer le modal
//     const handleCloseProofModal = () => {
//         setIsProofModalOpen(false);
//         setProofUrl("");
//     };

//     return (
//         <div className={styles.studentDetails}>
//             {/* Informations générales de l'étudiant */}
//             <h4>Informations de l'étudiant : {editedStudent.name}</h4>
//             <div className={styles.studentInfo}>
//                 <p><strong>CIN :</strong> {editedStudent.cin}</p>
//                 <p><strong>Groupe :</strong> {editedStudent.group}</p>
//                 <p><strong>Date de naissance :</strong> {editedStudent.birthDate}</p>
//                 <p><strong>Email :</strong> {editedStudent.email}</p>
//             </div>

//             {/* Boutons d'action */}
//             <div className={styles.actions}>
//                 <button onClick={onBack} className={styles.backButton}>
//                     Retour à la liste
//                 </button>
//                 {isEditing ? (
//                     <button onClick={handleSave} className={styles.saveButton}>
//                         Enregistrer
//                     </button>
//                 ) : (
//                     <button onClick={() => setIsEditing(true)} className={styles.editButton}>
//                         Modifier
//                     </button>
//                 )}
//             </div>

//             {/* Tableau des modules */}
//             <h5>Résultats des modules :</h5>
//             <table className={styles.modulesTable}>
//                 <thead>
//                     <tr>
//                         <th>Module</th>
//                         <th>Contrôle 1</th>
//                         <th>Contrôle 2</th>
//                         <th>Contrôle 3</th>
//                         <th>Examen</th>
//                         <th>Note Générale</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {editedStudent.modules.map((module, index) => (
//                         <tr key={index}>
//                             <td>{module.name}</td>
//                             <td>{module.scores.controle[0]}</td>
//                             <td>{module.scores.controle[1]}</td>
//                             <td>{module.scores.controle[2] || "-"}</td>
//                             <td>{module.scores.examen}</td>
//                             <td>{calculateModuleGrade(module)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Note totale des modules */}
//             <div className={styles.totalGrade}>
//                 <strong>Note totale des modules :</strong> {totalGrade}
//             </div>

//             {/* Tableau des absences */}
//             {editedStudent.absences.length > 0 ? (
//                 <>
//                     <h5>Absences :</h5>
//                     <table className={styles.absencesTable}>
//                         <thead>
//                             <tr>
//                                 <th>Exam</th>
//                                 <th>Type</th>
//                                 <th>Date</th>
//                                 <th>Heure</th>
//                                 <th>Statut</th>
//                                 <th>Justifiée</th>
//                                 <th>Preuve</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {editedStudent.absences.map((absence, index) => (
//                                 <tr key={index}>
//                                     <td>Exam {index + 1}</td>
//                                     <td>{absence.type}</td>
//                                     <td>{absence.date}</td>
//                                     <td>{absence.time}</td>
//                                     <td>{absence.status}</td>
//                                     <td>
//                                         {isEditing ? (
//                                             <select
//                                                 value={absence.justified}
//                                                 onChange={(e) =>
//                                                     handleAbsenceChange(index, "justified", e.target.value === "true")
//                                                 }
//                                             >
//                                                 <option value={true}>Oui</option>
//                                                 <option value={false}>Non</option>
//                                             </select>
//                                         ) : (
//                                             absence.justified ? "Oui" : "Non"
//                                         )}
//                                     </td>
//                                     <td>
//                                         {isEditing ? (
//                                             <input
//                                                 type="text"
//                                                 value={absence.proof || ""}
//                                                 onChange={(e) =>
//                                                     handleAbsenceChange(index, "proof", e.target.value)
//                                                 }
//                                             />
//                                         ) : (
//                                             absence.justified && absence.proof ? (
//                                                 <button
//                                                     className={styles.proofButton}
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         handleViewProof(absence.proof);
//                                                     }}
//                                                 >
//                                                     Voir la preuve
//                                                 </button>
//                                             ) : (
//                                                 "Aucune preuve"
//                                             )
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             ) : (
//                 <p>Aucune absence enregistrée pour cet étudiant.</p>
//             )}

//             {/* Modal pour afficher la preuve */}
//             {isProofModalOpen && (
//                 <div className={styles.modalOverlay}>
//                     <div className={styles.modalContent}>
//                         <button className={styles.closeButton} onClick={handleCloseProofModal}>
//                             &times;
//                         </button>
//                         {proofUrl.endsWith(".pdf") ? (
//                             <embed src={proofUrl} type="application/pdf" width="100%" height="600px" />
//                         ) : (
//                             <img src={proofUrl} alt="Preuve d'absence" style={{ maxWidth: "100%", maxHeight: "80vh" }} />
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Composant principal
// const ResultsPage = () => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     const resultsForGroup = ALL_RESULTS[state.selectedCourse]?.[state.selectedGroup] || [];

//     // Fonction pour sauvegarder les modifications
//     const handleSave = (updatedStudent) => {
//         const updatedResults = { ...ALL_RESULTS };
//         const groupIndex = updatedResults[state.selectedCourse][state.selectedGroup].findIndex(
//             (s) => s.cin === updatedStudent.cin
//         );
//         if (groupIndex !== -1) {
//             updatedResults[state.selectedCourse][state.selectedGroup][groupIndex] = updatedStudent;
//             console.log("Étudiant mis à jour :", updatedStudent);
//             dispatch({ type: "UPDATE_STUDENT", payload: updatedStudent });
//         }
//     };

//     return (
//         <div className={styles.resultsPage}>
//             <h3>Voir les résultats</h3>
//             {!state.selectedStudent ? (
//                 <>
//                     <Filters state={state} dispatch={dispatch} />
//                     {state.selectedGroup && (
//                         <ResultsTable
//                             results={resultsForGroup}
//                             onDetailsClick={(student) =>
//                                 dispatch({ type: "SET_STUDENT", payload: student })
//                             }
//                         />
//                     )}
//                 </>
//             ) : (
//                 <StudentDetails
//                     student={state.selectedStudent}
//                     onBack={() => dispatch({ type: "RESET_STUDENT" })}
//                     onSave={handleSave}
//                 />
//             )}
//         </div>
//     );
// };

// export default ResultsPage;

