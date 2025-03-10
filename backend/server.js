const express = require("express");
const cors = require("cors"); // Importez le module cors
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const app = express();

const corsOptions = {
    origin: "http://localhost:3000", // Autoriser uniquement ce domaine
    methods: "GET,POST", // Autoriser uniquement les méthodes GET et POST
    optionsSuccessStatus: 200, // Renvoyer un statut 200 pour les requêtes OPTIONS
};

app.use(cors(corsOptions)); // Activez CORS avec les options
app.use(express.json());

const filePath = path.join(__dirname, "utilisateurs.xlsx");

const readExcelFile = () => {
    if (fs.existsSync(filePath)) {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    return [];
};

let isFileLocked = false; // Verrou pour synchroniser l'accès au fichier

const writeExcelFile = (data) => {
    if (isFileLocked) {
        console.log("Le fichier est en cours d'utilisation. Veuillez réessayer plus tard.");
        return;
    }

    isFileLocked = true; // Verrouiller le fichier

    try {
        console.log("Données à écrire dans le fichier Excel :", data);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Utilisateurs");
        XLSX.writeFile(workbook, filePath);
        console.log("Fichier Excel créé/mis à jour avec succès :", filePath);
    } catch (error) {
        console.error("Erreur lors de l'écriture du fichier Excel :", error);
    } finally {
        isFileLocked = false; // Déverrouiller le fichier
    }
};

app.post("/users", (req, res) => {
    const userData = req.body;
    console.log("Données reçues :", userData); // Log des données reçues

    try {
        const existingData = readExcelFile();
        existingData.push(userData);
        writeExcelFile(existingData);
        res.status(201).json({ message: "Utilisateur ajouté avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
    }
});

app.listen(3001, () => console.log("Serveur démarré sur le port 3001"));
// const express = require("express");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");
// const app = express();
// app.use(express.json());

// const filePath = path.join(__dirname, "utilisateurs.xlsx");

// const readExcelFile = () => {
//     if (fs.existsSync(filePath)) {
//         const workbook = XLSX.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//     }
//     return [];
// };


// const writeExcelFile = (data) => {
//     console.log("Données à écrire dans le fichier Excel :", data); // Log des données
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Utilisateurs");
//     XLSX.writeFile(workbook, filePath);
//     console.log("Fichier Excel créé/mis à jour avec succès :", filePath); // Log du chemin du fichier
// };

// app.post("/users", (req, res) => {
//     const userData = req.body;

//     try {
//         const existingData = readExcelFile();
//         existingData.push(userData);
//         writeExcelFile(existingData);
//         res.status(201).json({ message: "Utilisateur ajouté avec succès" });
//     } catch (error) {
//         console.error("Erreur lors de l'ajout de l'utilisateur :", error);
//         res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
//     }
// });

// app.listen(3001, () => console.log("Serveur démarré sur le port 3001"));