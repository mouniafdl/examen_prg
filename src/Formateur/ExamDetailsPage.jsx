// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import logo from "../Pictures/OFPPT.png"; // Assurez-vous de mettre le bon chemin vers votre logo
// import "./ExamDetailsPage.css"; // Importez le fichier CSS

// const ExamDetailsPage = () => {
//     const location = useLocation();
//     const { exam: createdExam } = location.state || {};
//     const [studentAnswers, setStudentAnswers] = useState({});

//     const handleStudentAnswerChange = (questionIndex, answer) => {
//         setStudentAnswers({
//             ...studentAnswers,
//             [questionIndex]: answer,
//         });
//     };

//     if (!createdExam) {
//         return <div>Aucun examen trouvé. Veuillez créer un examen d'abord.</div>;
//     }

//     return (
//         <div className="created-exam">
//             {/* Conteneur pour le logo et le titre */}
//             <div className="header-container">
//                 <img src={logo} alt="Logo" /> {/* Logo à gauche */}
//                 <h2>OFFICE DE FORMATION PROFESSIONNELLE ET DE LA PROMOTION DU TRAVAIL</h2> {/* Titre à droite */}
//             </div>

//             {/* Sous-titre centré */}
//             <h3>ISTA Ifrane - Région Fès-Meknès</h3>

//             {/* Tableau des détails de l'examen */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Examen de Fin de Module</th>
//                         <th>Proposé par l’OFFPT : ISTA Ifrane</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>Fillière : {createdExam.group}</td>
//                         <td>Année : {createdExam.year}</td>
//                     </tr>
//                     <tr>
//                         <td>Module : {createdExam.module}</td>
//                         <td>Durée : {createdExam.duration} minutes</td>
//                     </tr>
//                     <tr>
//                         <td>Barème : … /40</td>
//                         <td>Variante : {createdExam.variant}</td>
//                     </tr>
//                 </tbody>
//             </table>

//             {/* Section des questions */}
//             <h3>Questions</h3>
//             {createdExam.questions.map((question, index) => (
//                 <div key={index} className="question">
//                     <p><strong>Question {index + 1} :</strong> {question.questionText}</p>
//                     {question.type === "Texte Libre" ? (
//                         <textarea
//                             placeholder="Votre réponse"
//                             value={studentAnswers[index] || ""}
//                             onChange={(e) => handleStudentAnswerChange(index, e.target.value)}
//                         />
//                     ) : (
//                         <>
//                             <p><strong>Options :</strong></p>
//                             <ul>
//                                 {question.options.map((option, i) => (
//                                     <li key={i}>
//                                         <label>
//                                             <input
//                                                 type="radio"
//                                                 name={`question-${index}`}
//                                                 value={option}
//                                                 onChange={(e) => handleStudentAnswerChange(index, e.target.value)}
//                                             />
//                                             {option}
//                                         </label>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ExamDetailsPage;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../Pictures/OFPPT.png"; // Assurez-vous de mettre le bon chemin vers votre logo
import "./ExamDetailsPage.css"; // Importez le fichier CSS

const ExamDetailsPage = () => {
    const location = useLocation();
    const { exam: createdExam } = location.state || {};
    const [studentAnswers, setStudentAnswers] = useState({});

    const handleStudentAnswerChange = (questionIndex, answer) => {
        setStudentAnswers({
            ...studentAnswers,
            [questionIndex]: answer,
        });
    };

    if (!createdExam) {
        return <div>Aucun examen trouvé. Veuillez créer un examen d'abord.</div>;
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
    const selectedFiliere = filieres.find((f) => f.id === createdExam.filiere)?.name || "Non spécifié";
    const selectedBranche = branches.find((b) => b.id === createdExam.branche)?.name || "Non spécifié";
    const selectedGroup = groupes.find((g) => g.id === createdExam.group)?.name || "Non spécifié";

    return (
        <div className="created-exam">
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
                        <th>{createdExam.evaluationType === "Contrôle" ? "Contrôle" : "Examen de Fin de Module"}</th>
                        <th>Proposé par l’OFFPT : ISTA Ifrane</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Filière : {selectedFiliere}</td>
                        <td>Année académique : {createdExam.academicYear}</td>
                    </tr>
                    <tr>
                        <td>Branche : {selectedBranche}</td>
                        <td>Année de formation : {createdExam.formationYear}</td>
                    </tr>
                    <tr>
                        <td>Groupe : {selectedGroup}</td>
                        <td>Durée : {createdExam.duration} minutes</td>
                    </tr>
                    <tr>
                        <td>Module : {createdExam.module}</td>
                        <td>Barème : … /{createdExam.maxScore}</td>
                    </tr>
                    <tr>
                        <td>Variante : {createdExam.variant || "Non spécifié"}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            {/* Section des questions */}
            <h3>Questions</h3>
            {createdExam.questions.map((question, index) => (
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
                                                type="radio"
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
        </div>
    );
};

export default ExamDetailsPage;