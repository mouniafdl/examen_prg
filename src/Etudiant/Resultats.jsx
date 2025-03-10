import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./Resultats.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Resultats = () => {
    // Données modifiées pour inclure les contrôles et l'examen final avec leurs dates
    const results = [
        {
            module: "Python",
            controls: [
                { type: "Contrôle 1", score: 15, total: 20, coefficient: 1, date: "2025-01-05" },
                { type: "Contrôle 2", score: 14, total: 20, coefficient: 1, date: "2025-01-10" },
                { type: "Contrôle 3", score: 16, total: 20, coefficient: 1, date: "2025-01-15" },
            ],
            finalExam: { score: 18, total: 20, coefficient: 2, date: "2025-01-20" },
        },
        {
            module: "Javascript",
            controls: [
                { type: "Contrôle 1", score: 12, total: 20, coefficient: 1, date: "2025-01-07" },
                { type: "Contrôle 2", score: 13, total: 20, coefficient: 1, date: "2025-01-12" },
            ],
            finalExam: { score: 15, total: 20, coefficient: 2, date: "2025-01-17" },
        },
        {
            module: "Php",
            controls: [
                { type: "Contrôle 1", score: 18, total: 20, coefficient: 1, date: "2025-01-10" },
            ],
            finalExam: { score: 17, total: 20, coefficient: 2, date: "2025-01-25" },
        },
    ];

    // Calcul de la moyenne générale
    const averageScore = () => {
        let totalScore = 0;
        let totalCoeff = 0;

        results.forEach((module) => {
            module.controls.forEach((control) => {
                totalScore += control.score * control.coefficient;
                totalCoeff += control.coefficient;
            });
            totalScore += module.finalExam.score * module.finalExam.coefficient;
            totalCoeff += module.finalExam.coefficient;
        });

        return (totalScore / totalCoeff).toFixed(2);
    };

    // Données pour le graphique (basé sur les modules)
    const chartData = {
        labels: results.map((module) => module.module),
        datasets: [
            {
                label: "Moyenne des Modules",
                data: results.map((module) => {
                    const totalScore = module.controls.reduce((acc, control) => acc + control.score * control.coefficient, 0) +
                        module.finalExam.score * module.finalExam.coefficient;
                    const totalCoeff = module.controls.reduce((acc, control) => acc + control.coefficient, 0) +
                        module.finalExam.coefficient;
                    return (totalScore / totalCoeff).toFixed(2);
                }),
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div id="results">
            <h2>Résultats des Contrôles</h2>
            <div className="results-overview">
                <div className="average-score">
                    <h3>Moyenne Générale : {averageScore()} / 20</h3>
                </div>
                <div className="results-chart">
                    <Line key={JSON.stringify(chartData)} data={chartData} />
                </div>
            </div>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Contrôle 1</th>
                        <th>Date Contrôle 1</th>
                        <th>Contrôle 2</th>
                        <th>Date Contrôle 2</th>
                        <th>Contrôle 3</th>
                        <th>Date Contrôle 3</th>
                        <th>Examen Final</th>
                        <th>Date Examen Final</th>
                        <th>Coefficient</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((module, index) => (
                        <tr key={index}>
                            <td>{module.module}</td>
                            {/* Afficher les contrôles et leurs dates */}
                            {module.controls.map((control, idx) => (
                                <React.Fragment key={idx}>
                                    <td>
                                        {control.score} / {control.total}
                                    </td>
                                    <td>{control.date}</td>
                                </React.Fragment>
                            ))}
                            {/* Remplir les cases vides si moins de 3 contrôles */}
                            {module.controls.length < 3 &&
                                Array.from({ length: 3 - module.controls.length }).map((_, idx) => (
                                    <React.Fragment key={idx}>
                                        <td>-</td>
                                        <td>-</td>
                                    </React.Fragment>
                                ))}
                            {/* Afficher l'examen final et sa date */}
                            <td>
                                {module.finalExam.score} / {module.finalExam.total}
                            </td>
                            <td>{module.finalExam.date}</td>
                            <td>{module.finalExam.coefficient}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Resultats;