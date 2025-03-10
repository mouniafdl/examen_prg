// ReportsPage.js
import React, { useState, useContext } from "react";
import { FaDownload, FaEye, FaBell } from "react-icons/fa";
import { ReportContext } from "../context/ReportContext"; // Chemin relatif correct
import "./ReportsPage.css";

const ReportsPage = () => {
    const { reports, notifications, setNotifications } = useContext(ReportContext); // Utiliser le contexte
    const [showNotifications, setShowNotifications] = useState(false);

    const handleViewDetails = (report) => {
        alert(`Détails du rapport : ${report.title}`);
    };

    const handleDownload = (report) => {
        alert(`Téléchargement du rapport : ${report.title}`);
    };

    const handleMarkAsRead = () => {
        setNotifications([]); // Supprime toutes les notifications
    };

    return (
        <div className="reports-page">
            <div className="reports-header">
                <h3>Rapports reçus</h3>
                <div className="reports-notifications">
                    <FaBell
                        size={24}
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ cursor: "pointer" }}
                    />
                    {notifications.length > 0 && (
                        <span className="notification-badge">
                            {notifications.length}
                        </span>
                    )}
                </div>
                {showNotifications && (
                    <div className="notifications-dropdown">
                        {notifications.length > 0 ? (
                            <>
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className="notification-item"
                                    >
                                        📄 {notif.message}
                                    </div>
                                ))}
                                <button onClick={handleMarkAsRead} className="mark-as-read-btn">
                                    Marquer comme lues
                                </button>
                            </>
                        ) : (
                            <div className="notification-item">Aucune nouvelle notification</div>
                        )}
                    </div>
                )}
            </div>

            <div className="reports-list">
                {reports.length > 0 ? (
                    <table className="reports-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.id}</td>
                                    <td>{report.title}</td>
                                    <td>{report.date}</td>
                                    <td>
                                        <button
                                            className="view-btn"
                                            onClick={() => handleViewDetails(report)}
                                        >
                                            <FaEye /> Voir
                                        </button>
                                        <button
                                            className="download-btn"
                                            onClick={() => handleDownload(report)}
                                        >
                                            <FaDownload /> Télécharger
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun rapport disponible pour le moment.</p>
                )}
            </div>
        </div>
    );
};

export default ReportsPage;