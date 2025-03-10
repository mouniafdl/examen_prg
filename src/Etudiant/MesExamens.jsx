// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./MesExamens.css";

// const MesExamens = () => {
//     const [exams] = useState([
//         { id: 1, title: "Examen Python", status: "Autorisé", result: "En attente" },
//         { id: 2, title: "Examen Javascript", status: "Non autorisé", result: "En attente" },
//         { id: 3, title: "Examen Php", status: "Autorisé", result: "15/20" },
//     ]);

//     const navigate = useNavigate();

//     const handleStartExam = (id) => {
//         const selectedExam = exams.find((exam) => exam.id === id);
//         if (selectedExam && selectedExam.status === "Autorisé") {
//             navigate(`/exam/${id}`); // Naviguer vers la page de l'examen
//         } else {
//             alert("Vous n'êtes pas autorisé à débuter cet examen.");
//         }
//     };

//     return (
//         <section id="exams">
//             <h2>Liste des Examens</h2>
//             <table className="exam-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Nom de l'examen</th>
//                         <th>Statut</th>
//                         <th>Résultat</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {exams.map((exam) => (
//                         <tr key={exam.id}>
//                             <td>{exam.id}</td>
//                             <td>{exam.title}</td>
//                             <td
//                                 className={
//                                     exam.status === "Autorisé" ? "status-allowed" : "status-denied"
//                                 }
//                             >
//                                 {exam.status}
//                             </td>
//                             <td>{exam.result}</td>
//                             <td>
//                                 <button
//                                     className="start-exam-btn"
//                                     onClick={() => handleStartExam(exam.id)}
//                                     disabled={exam.status !== "Autorisé"}
//                                 >
//                                     Commencer
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </section>
//     );
// };

// export default MesExamens;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MesExamens.css";

const MesExamens = () => {
    const [exams] = useState([
        {
            id: 1,
            title: "Examen Python",
            status: "Autorisé",
            result: "En attente",
            module: "Programmation Python",
            duration: 60,
            filiere: 1,
            branche: 2,
            group: 3,
            variant: "V1",
            academicYear: "2023/2024",
            formationYear: "1ère année",
            evaluationType: "Contrôle",
            maxScore: 20,
            questions: [
                {
                    questionText: "Qu'est-ce qu'une boucle en Python ?",
                    type: "Texte Libre",
                    options: [],
                    correctAnswers: [],
                    maxScorePerQuestion: 5,
                },
                {
                    questionText: "Quelle est la sortie de 'print(2 + 2)' ?",
                    type: "Choix multiple",
                    options: ["2", "4", "6", "8"],
                    correctAnswers: ["4"],
                    maxScorePerQuestion: 5,
                },
            ],
        },
        {
            id: 2,
            title: "Examen Javascript",
            status: "Non autorisé",
            result: "En attente",
            module: "Programmation JavaScript",
            duration: 90,
            filiere: 1,
            branche: 2,
            group: 3,
            variant: "V2",
            academicYear: "2023/2024",
            formationYear: "1ère année",
            evaluationType: "Examen de fin de module",
            maxScore: 40,
            questions: [
                {
                    questionText: "Qu'est-ce qu'une fonction en JavaScript ?",
                    type: "Texte Libre",
                    options: [],
                    correctAnswers: [],
                    maxScorePerQuestion: 10,
                },
            ],
        },
        {
            id: 3,
            title: "Examen Php",
            status: "Autorisé",
            result: "15/20",
            module: "Programmation PHP",
            duration: 60,
            filiere: 1,
            branche: 2,
            group: 3,
            variant: "V1",
            academicYear: "2023/2024",
            formationYear: "1ère année",
            evaluationType: "Contrôle",
            maxScore: 20,
            questions: [
                {
                    questionText: "Qu'est-ce que PHP ?",
                    type: "Texte Libre",
                    options: [],
                    correctAnswers: [],
                    maxScorePerQuestion: 5,
                },
            ],
        },
    ]);

    const navigate = useNavigate();

    const handleStartExam = (id) => {
        const selectedExam = exams.find((exam) => exam.id === id);
        if (selectedExam && selectedExam.status === "Autorisé") {
            // Naviguer vers la page de l'examen en passant les détails de l'examen
            navigate("/exam-interface", { state: { exam: selectedExam } });
        } else {
            alert("Vous n'êtes pas autorisé à débuter cet examen.");
        }
    };

    return (
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
    );
};

export default MesExamens;