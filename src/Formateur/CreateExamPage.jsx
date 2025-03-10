
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CreateExamPage.css";

// const CreateExamPage = () => {
//     const [examTitle, setExamTitle] = useState("");
//     const [module, setModule] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");
//     const [duration, setDuration] = useState("");
//     const [filiere, setFiliere] = useState("");
//     const [branche, setBranche] = useState("");
//     const [group, setGroup] = useState("");
//     const [variant, setVariant] = useState("V1");
//     const [academicYear, setAcademicYear] = useState("");
//     const [formationYear, setFormationYear] = useState("");
//     const [evaluationType, setEvaluationType] = useState("Contrôle");
//     const [maxScore, setMaxScore] = useState(20);
//     const [questions, setQuestions] = useState([
//         { questionText: "", type: "Texte Libre", options: [], correctAnswers: [], maxScorePerQuestion: 0 },
//     ]);
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();

//     // Données statiques pour les filières, branches et groupes
//     const filieres = [
//         { id: 1, name: "Développement Digital" },
//         { id: 2, name: "Gestion des Entreprises" },
//     ];

//     const branches = [
//         { id: 1, name: "Tronc Commun", filiereId: 1 },
//         { id: 2, name: "DEV1O Web Full Stack", filiereId: 1 },
//         { id: 3, name: "Marketing Digital", filiereId: 2 },
//         { id: 4, name: "Comptabilité", filiereId: 2 },
//     ];

//     const groupes = [
//         { id: 1, name: "Groupe 1", brancheId: 1 },
//         { id: 2, name: "Groupe 2", brancheId: 1 },
//         { id: 3, name: "Groupe 3", brancheId: 2 },
//         { id: 4, name: "Groupe 4", brancheId: 3 },
//         { id: 5, name: "Groupe 5", brancheId: 4 },
//     ];

//     // Filtrer les branches en fonction de la filière sélectionnée
//     const filteredBranches = branches.filter((b) => b.filiereId === filiere);

//     // Filtrer les groupes en fonction de la branche sélectionnée
//     const filteredGroupes = groupes.filter((g) => g.brancheId === branche);

//     // Calculer l'année académique automatiquement
//     useEffect(() => {
//         const currentDate = new Date();
//         const currentYear = currentDate.getFullYear();
//         const currentMonth = currentDate.getMonth() + 1;

//         let academicYearCalculated;
//         if (currentMonth >= 9) {
//             academicYearCalculated = `${currentYear}/${currentYear + 1}`;
//         } else {
//             academicYearCalculated = `${currentYear - 1}/${currentYear}`;
//         }

//         setAcademicYear(academicYearCalculated);
//     }, []);

//     // Mettre à jour la note maximale en fonction du type d'évaluation
//     useEffect(() => {
//         if (evaluationType === "Contrôle") {
//             setMaxScore(20);
//         } else if (evaluationType === "Examen de fin de module") {
//             setMaxScore(40);
//         }
//     }, [evaluationType]);

//     // Ajouter une nouvelle question
//     const addQuestion = () => {
//         setQuestions([
//             ...questions,
//             { questionText: "", type: "Texte Libre", options: [], correctAnswers: [], maxScorePerQuestion: 0 },
//         ]);
//     };

//     // Supprimer une question
//     const deleteQuestion = (index) => {
//         setQuestions(questions.filter((_, i) => i !== index));
//     };

//     // Gérer les changements dans les questions
//     const handleQuestionChange = (e, index, field) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[index][field] = e.target.value;
//         setQuestions(updatedQuestions);
//     };

//     // Gérer les changements dans les options des questions
//     const handleOptionChange = (e, questionIndex, optionIndex) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
//         setQuestions(updatedQuestions);
//     };

//     // Ajouter une option à une question
//     const addOption = (questionIndex) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[questionIndex].options.push("");
//         setQuestions(updatedQuestions);
//     };

//     // Gérer les réponses correctes (plusieurs réponses possibles)
//     const handleCorrectAnswersChange = (questionIndex, option) => {
//         const updatedQuestions = [...questions];
//         const correctAnswers = updatedQuestions[questionIndex].correctAnswers;

//         if (correctAnswers.includes(option)) {
//             // Si l'option est déjà sélectionnée, la retirer
//             updatedQuestions[questionIndex].correctAnswers = correctAnswers.filter((ans) => ans !== option);
//         } else {
//             // Sinon, l'ajouter
//             updatedQuestions[questionIndex].correctAnswers = [...correctAnswers, option];
//         }

//         setQuestions(updatedQuestions);
//     };

//     // Gérer les changements dans la note maximale par question
//     const handleMaxScoreChange = (e, index) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[index].maxScorePerQuestion = Number(e.target.value);
//         setQuestions(updatedQuestions);
//     };

//     // Soumettre le formulaire
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (
//             !examTitle ||
//             !module ||
//             !startTime ||
//             !endTime ||
//             !duration ||
//             !filiere ||
//             !branche ||
//             !group ||
//             !variant ||
//             !academicYear ||
//             !formationYear ||
//             !evaluationType ||
//             questions.some((q) => !q.questionText || q.maxScorePerQuestion <= 0 || (q.type === "Choix multiple" && q.correctAnswers.length === 0))
//         ) {
//             setErrorMessage("Tous les champs doivent être remplis.");
//             return;
//         }

//         const exam = {
//             examTitle,
//             module,
//             startTime,
//             endTime,
//             duration,
//             filiere,
//             branche,
//             group,
//             variant,
//             academicYear,
//             formationYear,
//             evaluationType,
//             maxScore,
//             questions,
//         };

//         // Naviguer vers la page ExamDetailsPage avec l'examen créé
//         navigate("/exam-details", { state: { exam } });

//     };

//     return (
//         <div className="create-exam-container">
//             <h2>Créer un Examen</h2>
//             <form className="create-exam-form" onSubmit={handleSubmit}>
//                 {/* Champs du formulaire */}
//                 <div className="form-group">
//                     <label htmlFor="examTitle">Titre de l'examen</label>
//                     <input
//                         type="text"
//                         id="examTitle"
//                         value={examTitle}
//                         onChange={(e) => setExamTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="module">Module</label>
//                     <input
//                         type="text"
//                         id="module"
//                         value={module}
//                         onChange={(e) => setModule(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="startTime">Heure de début</label>
//                     <input
//                         type="datetime-local"
//                         id="startTime"
//                         value={startTime}
//                         onChange={(e) => setStartTime(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="endTime">Heure de fin</label>
//                     <input
//                         type="datetime-local"
//                         id="endTime"
//                         value={endTime}
//                         onChange={(e) => setEndTime(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="duration">Durée (en minutes)</label>
//                     <input
//                         type="number"
//                         id="duration"
//                         value={duration}
//                         onChange={(e) => setDuration(e.target.value)}
//                         required
//                     />
//                 </div>

//                 {/* Année académique (lecture seule) */}
//                 <div className="form-group">
//                     <label htmlFor="academicYear">Année académique</label>
//                     <input
//                         type="text"
//                         id="academicYear"
//                         value={academicYear}
//                         readOnly
//                     />
//                 </div>

//                 {/* Année de formation */}
//                 <div className="form-group">
//                     <label htmlFor="formationYear">Année de formation</label>
//                     <input
//                         type="text"
//                         id="formationYear"
//                         value={formationYear}
//                         onChange={(e) => setFormationYear(e.target.value)}
//                         placeholder="Exemple : 1ère année, 2ème année"
//                         required
//                     />
//                 </div>

//                 {/* Type d'évaluation */}
//                 <div className="form-group">
//                     <label htmlFor="evaluationType">Type d'évaluation</label>
//                     <select
//                         id="evaluationType"
//                         value={evaluationType}
//                         onChange={(e) => setEvaluationType(e.target.value)}
//                         required
//                     >
//                         <option value="Contrôle">Contrôle (Barème sur 20)</option>
//                         <option value="Examen de fin de module">Examen de fin de module (Barème sur 40)</option>
//                     </select>
//                 </div>

//                 {/* Note maximale (affichage seulement) */}
//                 <div className="form-group">
//                     <label htmlFor="maxScore">Note maximale</label>
//                     <input
//                         type="text"
//                         id="maxScore"
//                         value={maxScore}
//                         readOnly
//                     />
//                 </div>

//                 {/* Sélection de la filière */}
//                 <div className="form-group">
//                     <label htmlFor="filiere">Filière</label>
//                     <select
//                         id="filiere"
//                         value={filiere}
//                         onChange={(e) => {
//                             setFiliere(Number(e.target.value));
//                             setBranche("");
//                             setGroup("");
//                         }}
//                         required
//                     >
//                         <option value="">Sélectionnez une filière</option>
//                         {filieres.map((f) => (
//                             <option key={f.id} value={f.id}>
//                                 {f.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Sélection de la branche */}
//                 <div className="form-group">
//                     <label htmlFor="branche">Branche</label>
//                     <select
//                         id="branche"
//                         value={branche}
//                         onChange={(e) => {
//                             setBranche(Number(e.target.value));
//                             setGroup("");
//                         }}
//                         required
//                         disabled={!filiere}
//                     >
//                         <option value="">Sélectionnez une branche</option>
//                         {filteredBranches.map((b) => (
//                             <option key={b.id} value={b.id}>
//                                 {b.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Sélection du groupe */}
//                 <div className="form-group">
//                     <label htmlFor="group">Groupe</label>
//                     <select
//                         id="group"
//                         value={group}
//                         onChange={(e) => setGroup(Number(e.target.value))}
//                         required
//                         disabled={!branche}
//                     >
//                         <option value="">Sélectionnez un groupe</option>
//                         {filteredGroupes.map((g) => (
//                             <option key={g.id} value={g.id}>
//                                 {g.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Variante */}
//                 <div className="form-group">
//                     <label htmlFor="variant">Variante</label>
//                     <select
//                         id="variant"
//                         value={variant}
//                         onChange={(e) => setVariant(e.target.value)}
//                         required
//                     >
//                         <option value="V1">V1</option>
//                         <option value="V2">V2</option>
//                         <option value="V3">V3</option>
//                         <option value="V4">V4</option>
//                     </select>
//                 </div>

//                 {/* Questions */}
//                 <h3>Questions</h3>
//                 <div className="questions-container">
//                     {questions.map((question, index) => (
//                         <div key={index} className="question">
//                             <div className="form-group">
//                                 <label htmlFor={`questionType-${index}`}>Type de question</label>
//                                 <select
//                                     id={`questionType-${index}`}
//                                     value={question.type}
//                                     onChange={(e) => handleQuestionChange(e, index, "type")}
//                                     required
//                                 >
//                                     <option value="Texte Libre">Texte Libre</option>
//                                     <option value="Choix multiple">Choix multiple</option>
//                                     <option value="Vrai ou Faux">Vrai ou Faux</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`questionText-${index}`}>Texte de la question</label>
//                                 <input
//                                     type="text"
//                                     id={`questionText-${index}`}
//                                     placeholder="Texte de la question"
//                                     value={question.questionText}
//                                     onChange={(e) => handleQuestionChange(e, index, "questionText")}
//                                     required
//                                 />
//                             </div>
//                             {question.type === "Choix multiple" && (
//                                 <>
//                                     {question.options.map((option, i) => (
//                                         <div key={i} className="form-group">
//                                             <label htmlFor={`option-${index}-${i}`}>Option {i + 1}</label>
//                                             <input
//                                                 type="text"
//                                                 id={`option-${index}-${i}`}
//                                                 placeholder={`Option ${i + 1}`}
//                                                 value={option}
//                                                 onChange={(e) => handleOptionChange(e, index, i)}
//                                                 required
//                                             />
//                                             <label>
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={question.correctAnswers.includes(option)}
//                                                     onChange={() => handleCorrectAnswersChange(index, option)}
//                                                 />
//                                                 Correct
//                                             </label>
//                                         </div>
//                                     ))}
//                                     <button type="button" onClick={() => addOption(index)}>
//                                         Ajouter une option
//                                     </button>
//                                 </>
//                             )}
//                             {question.type === "Vrai ou Faux" && (
//                                 <>
//                                     <div className="form-group">
//                                         <label>Options</label>
//                                         <div>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name={`trueFalse-${index}`}
//                                                     value="Vrai"
//                                                     checked={question.correctAnswers.includes("Vrai")}
//                                                     onChange={() => handleCorrectAnswersChange(index, "Vrai")}
//                                                 />
//                                                 Vrai
//                                             </label>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name={`trueFalse-${index}`}
//                                                     value="Faux"
//                                                     checked={question.correctAnswers.includes("Faux")}
//                                                     onChange={() => handleCorrectAnswersChange(index, "Faux")}
//                                                 />
//                                                 Faux
//                                             </label>
//                                         </div>
//                                     </div>
//                                 </>
//                             )}
//                             <div className="form-group">
//                                 <label htmlFor={`maxScorePerQuestion-${index}`}>Note maximale</label>
//                                 <input
//                                     type="number"
//                                     id={`maxScorePerQuestion-${index}`}
//                                     value={question.maxScorePerQuestion}
//                                     onChange={(e) => handleMaxScoreChange(e, index)}
//                                     required
//                                 />
//                             </div>
//                             <button type="button" onClick={() => deleteQuestion(index)}>
//                                 Supprimer
//                             </button>
//                         </div>
//                     ))}
//                     <button type="button" onClick={addQuestion}>
//                         Ajouter une question
//                     </button>
//                 </div>

//                 {/* Message d'erreur */}
//                 {errorMessage && <p className="error-message">{errorMessage}</p>}

//                 {/* Bouton de soumission */}
//                 <button type="submit">Créer l'examen</button>
//             </form>
//         </div>
//     );
// };

// export default CreateExamPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExamPage.css";

const CreateExamPage = () => {
    const [examTitle, setExamTitle] = useState("");
    const [module, setModule] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [duration, setDuration] = useState("");
    const [filiere, setFiliere] = useState("");
    const [branche, setBranche] = useState("");
    const [group, setGroup] = useState("");
    const [addVariants, setAddVariants] = useState(false); // Nouvel état pour gérer l'ajout de variantes
    const [variant, setVariant] = useState("V1");
    const [academicYear, setAcademicYear] = useState("");
    const [formationYear, setFormationYear] = useState("");
    const [evaluationType, setEvaluationType] = useState("Contrôle");
    const [maxScore, setMaxScore] = useState(20);
    const [questions, setQuestions] = useState([
        { questionText: "", type: "Texte Libre", options: [], correctAnswers: [], maxScorePerQuestion: 0 },
    ]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Données statiques pour les filières, branches et groupes
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

    // Filtrer les branches en fonction de la filière sélectionnée
    const filteredBranches = branches.filter((b) => b.filiereId === filiere);

    // Filtrer les groupes en fonction de la branche sélectionnée
    const filteredGroupes = groupes.filter((g) => g.brancheId === branche);

    // Calculer l'année académique automatiquement
    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        let academicYearCalculated;
        if (currentMonth >= 9) {
            academicYearCalculated = `${currentYear}/${currentYear + 1}`;
        } else {
            academicYearCalculated = `${currentYear - 1}/${currentYear}`;
        }

        setAcademicYear(academicYearCalculated);
    }, []);

    // Mettre à jour la note maximale en fonction du type d'évaluation
    useEffect(() => {
        if (evaluationType === "Contrôle") {
            setMaxScore(20);
        } else if (evaluationType === "Examen de fin de module") {
            setMaxScore(40);
        }
    }, [evaluationType]);

    // Ajouter une nouvelle question
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { questionText: "", type: "Texte Libre", options: [], correctAnswers: [], maxScorePerQuestion: 0 },
        ]);
    };

    // Supprimer une question
    const deleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    // Gérer les changements dans les questions
    const handleQuestionChange = (e, index, field) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = e.target.value;
        setQuestions(updatedQuestions);
    };

    // Gérer les changements dans les options des questions
    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
        setQuestions(updatedQuestions);
    };

    // Ajouter une option à une question
    const addOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push("");
        setQuestions(updatedQuestions);
    };

    // Gérer les réponses correctes (plusieurs réponses possibles)
    const handleCorrectAnswersChange = (questionIndex, option) => {
        const updatedQuestions = [...questions];
        const correctAnswers = updatedQuestions[questionIndex].correctAnswers;

        if (correctAnswers.includes(option)) {
            // Si l'option est déjà sélectionnée, la retirer
            updatedQuestions[questionIndex].correctAnswers = correctAnswers.filter((ans) => ans !== option);
        } else {
            // Sinon, l'ajouter
            updatedQuestions[questionIndex].correctAnswers = [...correctAnswers, option];
        }

        setQuestions(updatedQuestions);
    };

    // Gérer les changements dans la note maximale par question
    const handleMaxScoreChange = (e, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].maxScorePerQuestion = Number(e.target.value);
        setQuestions(updatedQuestions);
    };

    // Soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !examTitle ||
            !module ||
            !startTime ||
            !endTime ||
            !duration ||
            !filiere ||
            !branche ||
            !group ||
            !academicYear ||
            !formationYear ||
            !evaluationType ||
            questions.some((q) => !q.questionText || q.maxScorePerQuestion <= 0 || (q.type === "Choix multiple" && q.correctAnswers.length === 0))
        ) {
            setErrorMessage("Tous les champs doivent être remplis.");
            return;
        }

        const exam = {
            examTitle,
            module,
            startTime,
            endTime,
            duration,
            filiere,
            branche,
            group,
            variant: addVariants ? variant : null, // Inclure la variante uniquement si elle est activée
            academicYear,
            formationYear,
            evaluationType,
            maxScore,
            questions,
        };

        // Naviguer vers la page ExamDetailsPage avec l'examen créé
        navigate("/exam-details", { state: { exam } });
    };

    return (
        <div className="create-exam-container">
            <h2>Créer un Examen</h2>
            <form className="create-exam-form" onSubmit={handleSubmit}>
                {/* Champs du formulaire */}
                <div className="form-group">
                    <label htmlFor="examTitle">Titre de l'examen</label>
                    <input
                        type="text"
                        id="examTitle"
                        value={examTitle}
                        onChange={(e) => setExamTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="module">Module</label>
                    <input
                        type="text"
                        id="module"
                        value={module}
                        onChange={(e) => setModule(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Heure de début</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">Heure de fin</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Durée (en minutes)</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>

                {/* Année académique (lecture seule) */}
                <div className="form-group">
                    <label htmlFor="academicYear">Année académique</label>
                    <input
                        type="text"
                        id="academicYear"
                        value={academicYear}
                        readOnly
                    />
                </div>

                {/* Année de formation */}
                <div className="form-group">
                    <label htmlFor="formationYear">Année de formation</label>
                    <input
                        type="text"
                        id="formationYear"
                        value={formationYear}
                        onChange={(e) => setFormationYear(e.target.value)}
                        placeholder="Exemple : 1ère année, 2ème année"
                        required
                    />
                </div>

                {/* Type d'évaluation */}
                <div className="form-group">
                    <label htmlFor="evaluationType">Type d'évaluation</label>
                    <select
                        id="evaluationType"
                        value={evaluationType}
                        onChange={(e) => setEvaluationType(e.target.value)}
                        required
                    >
                        <option value="Contrôle">Contrôle (Barème sur 20)</option>
                        <option value="Examen de fin de module">Examen de fin de module (Barème sur 40)</option>
                    </select>
                </div>

                {/* Note maximale (affichage seulement) */}
                <div className="form-group">
                    <label htmlFor="maxScore">Note maximale</label>
                    <input
                        type="text"
                        id="maxScore"
                        value={maxScore}
                        readOnly
                    />
                </div>

                {/* Sélection de la filière */}
                <div className="form-group">
                    <label htmlFor="filiere">Filière</label>
                    <select
                        id="filiere"
                        value={filiere}
                        onChange={(e) => {
                            setFiliere(Number(e.target.value));
                            setBranche("");
                            setGroup("");
                        }}
                        required
                    >
                        <option value="">Sélectionnez une filière</option>
                        {filieres.map((f) => (
                            <option key={f.id} value={f.id}>
                                {f.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélection de la branche */}
                <div className="form-group">
                    <label htmlFor="branche">Branche</label>
                    <select
                        id="branche"
                        value={branche}
                        onChange={(e) => {
                            setBranche(Number(e.target.value));
                            setGroup("");
                        }}
                        required
                        disabled={!filiere}
                    >
                        <option value="">Sélectionnez une branche</option>
                        {filteredBranches.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélection du groupe */}
                <div className="form-group">
                    <label htmlFor="group">Groupe</label>
                    <select
                        id="group"
                        value={group}
                        onChange={(e) => setGroup(Number(e.target.value))}
                        required
                        disabled={!branche}
                    >
                        <option value="">Sélectionnez un groupe</option>
                        {filteredGroupes.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ajouter des variantes */}
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={addVariants}
                            onChange={(e) => setAddVariants(e.target.checked)}
                        />
                        Ajouter des variantes
                    </label>
                </div>

                {/* Variante (affiché uniquement si addVariants est true) */}
                {addVariants && (
                    <div className="form-group">
                        <label htmlFor="variant">Variante</label>
                        <select
                            id="variant"
                            value={variant}
                            onChange={(e) => setVariant(e.target.value)}
                        >
                            <option value="V1">V1</option>
                            <option value="V2">V2</option>
                            <option value="V3">V3</option>
                            <option value="V4">V4</option>
                        </select>
                    </div>
                )}

                {/* Questions */}
                <h3>Questions</h3>
                <div className="questions-container">
                    {questions.map((question, index) => (
                        <div key={index} className="question">
                            <div className="form-group">
                                <label htmlFor={`questionType-${index}`}>Type de question</label>
                                <select
                                    id={`questionType-${index}`}
                                    value={question.type}
                                    onChange={(e) => handleQuestionChange(e, index, "type")}
                                    required
                                >
                                    <option value="Texte Libre">Texte Libre</option>
                                    <option value="Choix multiple">Choix multiple</option>
                                    <option value="Vrai ou Faux">Vrai ou Faux</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor={`questionText-${index}`}>Texte de la question</label>
                                <input
                                    type="text"
                                    id={`questionText-${index}`}
                                    placeholder="Texte de la question"
                                    value={question.questionText}
                                    onChange={(e) => handleQuestionChange(e, index, "questionText")}
                                    required
                                />
                            </div>
                            {question.type === "Choix multiple" && (
                                <>
                                    {question.options.map((option, i) => (
                                        <div key={i} className="form-group">
                                            <label htmlFor={`option-${index}-${i}`}>Option {i + 1}</label>
                                            <input
                                                type="text"
                                                id={`option-${index}-${i}`}
                                                placeholder={`Option ${i + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(e, index, i)}
                                                required
                                            />
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={question.correctAnswers.includes(option)}
                                                    onChange={() => handleCorrectAnswersChange(index, option)}
                                                />
                                                Correct
                                            </label>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addOption(index)}>
                                        Ajouter une option
                                    </button>
                                </>
                            )}
                            {question.type === "Vrai ou Faux" && (
                                <>
                                    <div className="form-group">
                                        <label>Options</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`trueFalse-${index}`}
                                                    value="Vrai"
                                                    checked={question.correctAnswers.includes("Vrai")}
                                                    onChange={() => handleCorrectAnswersChange(index, "Vrai")}
                                                />
                                                Vrai
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`trueFalse-${index}`}
                                                    value="Faux"
                                                    checked={question.correctAnswers.includes("Faux")}
                                                    onChange={() => handleCorrectAnswersChange(index, "Faux")}
                                                />
                                                Faux
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="form-group">
                                <label htmlFor={`maxScorePerQuestion-${index}`}>Note maximale</label>
                                <input
                                    type="number"
                                    id={`maxScorePerQuestion-${index}`}
                                    value={question.maxScorePerQuestion}
                                    onChange={(e) => handleMaxScoreChange(e, index)}
                                    required
                                />
                            </div>
                            <button type="button" onClick={() => deleteQuestion(index)}>
                                Supprimer
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addQuestion}>
                        Ajouter une question
                    </button>
                </div>

                {/* Message d'erreur */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Bouton de soumission */}
                <button type="submit">Créer l'examen</button>
            </form>
        </div>
    );
};

export default CreateExamPage;