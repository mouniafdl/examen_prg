// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./MesExamens.css";
// import logo from "../Pictures/OFPPT.png"; // Importez l'image

// const ExamInterface = () => {
//     const { id } = useParams(); // Récupérer l'ID de l'examen depuis l'URL
//     const navigate = useNavigate();
//     const [showDuration, setShowDuration] = useState(false);

//     // Simuler une liste d'examens (remplacez cela par une requête API si nécessaire)
//     const exams = [
//         { id: 1, title: "Examen Python", status: "Autorisé", result: "En attente", duration: "3H" },
//         { id: 2, title: "Examen Javascript", status: "Non autorisé", result: "En attente", duration: "2H" },
//         { id: 3, title: "Examen Php", status: "Autorisé", result: "15/20", duration: "1H" },
//     ];

//     // Trouver l'examen correspondant à l'ID
//     const exam = exams.find((exam) => exam.id === parseInt(id));

//     if (!exam) {
//         return <div>Examen non trouvé</div>; // Gérer le cas où l'examen n'existe pas
//     }

//     const handleFinishExam = () => {
//         alert(`Examen ${exam.title} terminé !`);
//         navigate("/"); // Retourner à la liste des examens
//     };

//     const toggleDuration = () => {
//         setShowDuration(!showDuration);
//     };

//     return (
//         <div className="exam-interface">
//             {/* Fenêtre pour afficher/masquer la durée */}
//             <div className="duration-window">
//                 <button onClick={toggleDuration} className="duration-toggle-btn">
//                     {showDuration ? "Masquer la durée" : "Afficher la durée"}
//                 </button>
//                 {showDuration && <p>Durée de l'examen : {exam.duration}</p>}
//             </div>
//             <div className="exam-header">
//                 <div className="logo-section">
//                     <img
//                         src={logo} // Utilisez l'image importée
//                         alt="Logo OFPPT"
//                         className="ofppt-logo"
//                     />
//                     <div className="ista-info">
//                         <h2>OFFICE DE FORMATION PROFESSIONNELLE ET DE LA PROMOTION DU TRAVAIL</h2>
//                         <h3>ISTA Ifrane - Région Fès-Meknès</h3>
//                     </div>
//                 </div>
//             </div>

//             <div className="exam-info">
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>Examen de Fin de Module</td>
//                             <td>Proposé par l’OFPPT : ISTA Ifrane</td>
//                         </tr>
//                         <tr>
//                             <td>Filière : TRI</td>
//                             <td>Année : 1A 2A</td>
//                         </tr>
//                         <tr>
//                             <td>Module 11 : Administration Réseau Sous Windows</td>
//                             <td>Durée : 3H</td>
//                         </tr>
//                         <tr>
//                             <td>Barème : … /40</td>
//                             <td>Variante : V1</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             <div className="exam-body">

//                 <div className="questions">
//                     <h3>Questions :</h3>
//                     <div className="question">
//                         <p>Question 1 : Quelle est la capitale de la France ?</p>
//                         <input type="text" placeholder="Votre réponse" />
//                     </div>
//                     <div className="question">
//                         <p>Question 2 : Quel est le résultat de 2 + 2 ?</p>
//                         <input type="text" placeholder="Votre réponse" />
//                     </div>
//                 </div>
//                 <div className="questions">
//                     <h3>Questions :</h3>

//                     {/* Question QCM */}
//                     <div className="question">
//                         <p>Question 1 : Quelle est la capitale de la France ?</p>
//                         <div className="options">
//                             <label>
//                                 <input type="radio" name="q1" value="Paris" /> Paris
//                             </label>
//                             <label>
//                                 <input type="radio" name="q1" value="Lyon" /> Lyon
//                             </label>
//                             <label>
//                                 <input type="radio" name="q1" value="Marseille" /> Marseille
//                             </label>
//                             <label>
//                                 <input type="radio" name="q1" value="Toulouse" /> Toulouse
//                             </label>
//                         </div>
//                     </div>

//                     {/* Question Vrai/Faux */}
//                     <div className="question">
//                         <p>Question 2 : Le soleil tourne autour de la Terre.</p>
//                         <div className="options">
//                             <label>
//                                 <input type="radio" name="q2" value="Vrai" /> Vrai
//                             </label>
//                             <label>
//                                 <input type="radio" name="q2" value="Faux" /> Faux
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <button className="finish-exam-btn" onClick={handleFinishExam}>
//                     Terminer l'examen
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ExamInterface;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Pictures/OFPPT.png"; // Assurez-vous de mettre le bon chemin vers votre logo
import "./ExamInterface.css"; // Utilisez le fichier CSS de votre composant

const ExamInterface = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { exam } = location.state || {}; // Récupérer l'examen passé via l'état de navigation
    const [studentAnswers, setStudentAnswers] = useState({});

    // Gérer les réponses de l'étudiant
    const handleStudentAnswerChange = (questionIndex, answer) => {
        setStudentAnswers({
            ...studentAnswers,
            [questionIndex]: answer,
        });
    };

    // Soumettre les réponses de l'étudiant
    const handleSubmit = () => {
        console.log("Réponses de l'étudiant :", studentAnswers);
        alert("Vos réponses ont été soumises avec succès !");
        navigate("/student-dashboard"); // Rediriger l'étudiant vers son tableau de bord
    };

    if (!exam) {
        return <div>Aucun examen trouvé. Veuillez sélectionner un examen.</div>;
    }

    // Récupérer les données statiques pour afficher les noms des filières, branches et groupes
    const filieres = [
        { id: 1, name: "Développement Digital" },
        { id: 2, name: "Gestion des Entreprises" },
    ];

    const branches = [
        { id: 1, name: "Tronc Commun", filiereId: 1 },
        { id: 2, name: "DEV1O Web Full Stack", filiereId: 1 },
        { id: 3, name: "Marketing Digital", filiereId: 2 },
        { id: 4, name: "Comptabilité", filiereId: 2 },
    ];

    const groupes = [
        { id: 1, name: "Groupe 1", brancheId: 1 },
        { id: 2, name: "Groupe 2", brancheId: 1 },
        { id: 3, name: "Groupe 3", brancheId: 2 },
        { id: 4, name: "Groupe 4", brancheId: 3 },
        { id: 5, name: "Groupe 5", brancheId: 4 },
    ];

    // Trouver les noms correspondants aux IDs
    const selectedFiliere = filieres.find((f) => f.id === exam.filiere)?.name || "Non spécifié";
    const selectedBranche = branches.find((b) => b.id === exam.branche)?.name || "Non spécifié";
    const selectedGroup = groupes.find((g) => g.id === exam.group)?.name || "Non spécifié";

    return (
        <div className="exam-interface">
            {/* Conteneur pour le logo et le titre */}
            <div className="header-container">
                <img src={logo} alt="Logo" /> {/* Logo à gauche */}
                <h2>OFFICE DE FORMATION PROFESSIONNELLE ET DE LA PROMOTION DU TRAVAIL</h2> {/* Titre à droite */}
            </div>

            {/* Sous-titre centré */}
            <h3>ISTA Ifrane - Région Fès-Meknès</h3>

            {/* Tableau des détails de l'examen */}
            <table>
                <thead>
                    <tr>
                        <th>{exam.evaluationType === "Contrôle" ? "Contrôle" : "Examen de Fin de Module"}</th>
                        <th>Proposé par l’OFFPT : ISTA Ifrane</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Filière : {selectedFiliere}</td>
                        <td>Année académique : {exam.academicYear}</td>
                    </tr>
                    <tr>
                        <td>Branche : {selectedBranche}</td>
                        <td>Année de formation : {exam.formationYear}</td>
                    </tr>
                    <tr>
                        <td>Groupe : {selectedGroup}</td>
                        <td>Durée : {exam.duration} minutes</td>
                    </tr>
                    <tr>
                        <td>Module : {exam.module}</td>
                        <td>Barème : … /{exam.maxScore}</td>
                    </tr>
                    <tr>
                        <td>Variante : {exam.variant || "Non spécifié"}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            {/* Section des questions */}
            <h3>Questions</h3>
            {exam.questions.map((question, index) => (
                <div key={index} className="question">
                    <p><strong>Question {index + 1} :</strong> {question.questionText}</p>
                    {question.type === "Texte Libre" ? (
                        <textarea
                            placeholder="Votre réponse"
                            value={studentAnswers[index] || ""}
                            onChange={(e) => handleStudentAnswerChange(index, e.target.value)}
                        />
                    ) : (
                        <>
                            <p><strong>Options :</strong></p>
                            <ul>
                                {question.options.map((option, i) => (
                                    <li key={i}>
                                        <label>
                                            <input
                                                type={question.type === "Choix multiple" ? "checkbox" : "radio"}
                                                name={`question-${index}`}
                                                value={option}
                                                onChange={(e) => handleStudentAnswerChange(index, e.target.value)}
                                            />
                                            {option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}

            {/* Bouton de soumission */}
            <button onClick={handleSubmit} className="submit-button">
                Soumettre l'examen
            </button>
        </div>
    );
};

export default ExamInterface;