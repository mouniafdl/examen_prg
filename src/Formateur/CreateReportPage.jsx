// CreateReportPage.js
import React, { useState, useContext } from "react";
import { FaPaperPlane, FaFileAlt } from "react-icons/fa";
import { ReportContext } from "../context/ReportContext"; // Chemin relatif correct
import "./CreateReportPage.css";

const CreateReportPage = () => {
    const { addReport } = useContext(ReportContext); // Utiliser le contexte
    const [reportData, setReportData] = useState({
        title: "",
        description: "",
        file: null,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportData({ ...reportData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setReportData({ ...reportData, file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReport = {
            id: Date.now(),
            title: reportData.title,
            description: reportData.description,
            file: reportData.file,
            date: new Date().toLocaleDateString(),
        };
        addReport(newReport); // Ajouter le rapport via le contexte
        setIsSubmitted(true);
        setReportData({ title: "", description: "", file: null }); // Réinitialiser le formulaire
    };

    return (
        <div className="create-report-page">
            <h2>Créer un Rapport</h2>
            <form onSubmit={handleSubmit} className="report-form">
                <div className="form-group">
                    <label htmlFor="title">Titre du Rapport</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={reportData.title}
                        onChange={handleInputChange}
                        placeholder="Entrez le titre du rapport"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={reportData.description}
                        onChange={handleInputChange}
                        placeholder="Décrivez le rapport en détail"
                        rows="5"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Joindre un fichier (optionnel)</label>
                    <div className="file-upload">
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                        />
                        <label htmlFor="file" className="file-upload-label">
                            <FaFileAlt /> {reportData.file ? reportData.file.name : "Choisir un fichier"}
                        </label>
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    <FaPaperPlane /> Envoyer le Rapport
                </button>

                {isSubmitted && (
                    <div className="success-message">
                        Le rapport a été soumis avec succès à l'administrateur.
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateReportPage;