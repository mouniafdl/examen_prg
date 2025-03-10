// ReportContext.js
import React, { createContext, useState } from "react";

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
    const [reports, setReports] = useState([]); // Liste des rapports
    const [notifications, setNotifications] = useState([]); // Notifications pour l'admin

    // Fonction pour ajouter un rapport
    const addReport = (report) => {
        setReports((prev) => [...prev, report]); // Ajouter le rapport à la liste
        setNotifications((prev) => [
            ...prev,
            { id: Date.now(), message: `Nouveau rapport : ${report.title}` }, // Ajouter une notification
        ]);
    };

    // Valeur du contexte (accessible par les composants enfants)
    const contextValue = {
        reports,
        notifications,
        addReport,
        setNotifications, // Ajouter setNotifications pour permettre la suppression des notifications
    };

    return (
        <ReportContext.Provider value={contextValue}>
            {children}
        </ReportContext.Provider>
    );
};