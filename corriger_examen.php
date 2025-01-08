<?php
session_start();

// Connexion à la base de données
$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les branches
    $stmtBranches = $conn->query("SELECT id, nom_branch FROM branches");
    $branches = $stmtBranches->fetchAll(PDO::FETCH_ASSOC);

    $groupes = [];
    $etudiants = [];
    $examens = [];
    $reponses = [];

    // Récupérer les groupes en fonction de la branche sélectionnée
    if (isset($_GET['branch_id'])) {
        $branch_id = $_GET['branch_id'];
        $stmtGroupes = $conn->prepare("SELECT id, nom FROM groupes WHERE branch_id = :branch_id");
        $stmtGroupes->bindParam(':branch_id', $branch_id);
        $stmtGroupes->execute();
        $groupes = $stmtGroupes->fetchAll(PDO::FETCH_ASSOC);
    }

    // Récupérer les étudiants en fonction du groupe sélectionné
    if (isset($_GET['groupe_id'])) {
        $groupe_id = $_GET['groupe_id'];
        $stmtEtudiants = $conn->prepare("SELECT u.id, u.nom FROM utilisateurs u
                                         JOIN etudiants_groupes eg ON u.id = eg.id
                                         WHERE eg.groupe_id = :groupe_id");
        $stmtEtudiants->bindParam(':groupe_id', $groupe_id);
        $stmtEtudiants->execute();
        $etudiants = $stmtEtudiants->fetchAll(PDO::FETCH_ASSOC);
    }

    // Récupérer les examens associés à un étudiant sélectionné
    if (isset($_GET['id'])) {
        $etudiant_id = $_GET['id'];
        $stmtExamens = $conn->prepare("SELECT id, titre FROM examens WHERE id = :id");
        $stmtExamens->bindParam(':id', $etudiant_id);
        $stmtExamens->execute();
        $examens = $stmtExamens->fetchAll(PDO::FETCH_ASSOC);
    }

    // Récupérer les réponses des étudiants pour un examen sélectionné
    if (isset($_GET['examen_id']) && isset($_GET['id'])) {
        $examen_id = intval($_GET['examen_id']);
        $etudiant_id = intval($_GET['id']);
        
        // Requête pour récupérer les réponses de l'étudiant sélectionné
        $stmtReponses = $conn->prepare("
            SELECT r.id AS reponse_id, u.nom AS etudiant_nom, q.texte_question, r.reponse 
            FROM reponses_etudiants2 r
            JOIN questions2 q ON r.question_id = q.id
            JOIN utilisateurs u ON r.etudiant_id = u.id
            WHERE r.examen_id = :examen_id AND r.etudiant_id = :etudiant_id
        ");
        $stmtReponses->bindParam(':examen_id', $examen_id, PDO::PARAM_INT);
        $stmtReponses->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
        $stmtReponses->execute();
        $reponses = $stmtReponses->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($reponses)) {
            echo "Aucune réponse trouvée pour cet étudiant et cet examen.";
        } else {
            echo "Réponses trouvées.";
        }
    
        // Enregistrer les notes si le formulaire est soumis
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $notes = $_POST['notes'];
            $stmtNote = $conn->prepare("UPDATE reponses_etudiants2 SET note = :note WHERE id = :id");
            foreach ($notes as $reponse_id => $note) {
                $stmtNote->bindParam(':note', $note);
                $stmtNote->bindParam(':id', $reponse_id);
                $stmtNote->execute();
            }
            echo "Les notes ont été enregistrées.";
        }
    }
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correction d'Examen</title>
</head>
<body>
    <h1>Correction des Examens</h1>

    <!-- Liste des branches -->
    <h2>Branches</h2>
    <ul>
        <?php foreach ($branches as $branch): ?>
            <li><a href="?branch_id=<?= htmlspecialchars($branch['id']) ?>"><?= htmlspecialchars($branch['nom_branch']) ?></a></li>
        <?php endforeach; ?>
    </ul>

    <!-- Liste des groupes -->
    <?php if (!empty($groupes)): ?>
        <h2>Groupes</h2>
        <ul>
            <?php foreach ($groupes as $groupe): ?>
                <li><a href="?branch_id=<?= htmlspecialchars($branch_id) ?>&groupe_id=<?= htmlspecialchars($groupe['id']) ?>">
                    <?= htmlspecialchars($groupe['nom']) ?>
                </a></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <!-- Liste des étudiants -->
    <?php if (!empty($etudiants)): ?>
        <h2>Étudiants</h2>
        <ul>
            <?php foreach ($etudiants as $etudiant): ?>
                <li><a href="?branch_id=<?= htmlspecialchars($branch_id) ?>&groupe_id=<?= htmlspecialchars($groupe_id) ?>&id=<?= htmlspecialchars($etudiant['id']) ?>">
                    <?= htmlspecialchars($etudiant['nom']) ?>
                </a></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <!-- Liste des examens -->
    <?php if (!empty($examens)): ?>
        <h2>Examens</h2>
        <ul>
            <?php foreach ($examens as $examen): ?>
                <li><a href="?branch_id=<?= htmlspecialchars($branch_id) ?>&groupe_id=<?= htmlspecialchars($groupe_id) ?>&id=<?= htmlspecialchars($etudiant_id) ?>&examen_id=<?= htmlspecialchars($examen['id']) ?>">
                    <?= htmlspecialchars($examen['titre']) ?>
                </a></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <!-- Liste des réponses et correction -->
    <?php if (!empty($reponses)): ?>
        <h2>Corriger les réponses</h2>
        <form method="POST">
            <?php foreach ($reponses as $reponse): ?>
                <p><strong>Étudiant :</strong> <?= htmlspecialchars($reponse['etudiant_nom']) ?></p>
                <p><strong>Question :</strong> <?= htmlspecialchars($reponse['texte_question']) ?></p>
                <p><strong>Réponse :</strong> <?= htmlspecialchars($reponse['reponse']) ?></p>
                <label for="note_<?= $reponse['reponse_id'] ?>">Note :</label>
                <input type="number" name="notes[<?= $reponse['reponse_id'] ?>]" id="note_<?= $reponse['reponse_id'] ?>" step="0.01" min="0" max="20">
                <br><br>
            <?php endforeach; ?>
            <button type="submit">Enregistrer les notes</button>
        </form>
    <?php endif; ?>
</body>
</html>
