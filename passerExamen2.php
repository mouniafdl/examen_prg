<?php
session_start();

$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si l'utilisateur est connecté
    if (!isset($_SESSION['user']) || $_SESSION['user']['roleu'] !== 'etudiant') {
        die("Accès refusé. Vous devez être connecté en tant qu'étudiant.");
    }

    // Vérifier si un examen spécifique est demandé
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $id = intval($_GET['id']);

        // Récupérer les détails de l'examen
        $stmt = $conn->prepare("SELECT * FROM examens3 WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $examen = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$examen) {
            die("Examen introuvable.");
        }

        // Récupérer les questions de l'examen
        $stmtQuestions = $conn->prepare("SELECT * FROM questions3 WHERE exam_id = :examen_id");
        $stmtQuestions->execute([':examen_id' => $id]);
        $questions = $stmtQuestions->fetchAll(PDO::FETCH_ASSOC);
    } else {
        // Récupérer tous les examens si aucun examen spécifique n'est demandé
        $stmt = $conn->prepare("SELECT id, titre FROM examens3");
        $stmt->execute();
        $examens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Passer l'examen</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"><div id="timer" style="font-size: 24px; font-weight: bold;"></div>

<!-- <script>
    const dureeExamen = 3600; // Durée de l'examen en secondes (par exemple, 1h)
    let tempsRestant = dureeExamen;

    function updateTimer() {
        const minutes = Math.floor(tempsRestant / 60);
        const seconds = tempsRestant % 60;
        document.getElementById('timer').textContent = 
            `${minutes}m ${seconds}s`;

        if (tempsRestant <= 0) {
            clearInterval(timerInterval);
            alert("Temps écoulé ! L'examen sera soumis.");
            submitExam(); // Appel à la fonction de soumission du formulaire
        }
        tempsRestant--;
    }

    const timerInterval = setInterval(updateTimer, 1000);

    // Fonction pour soumettre automatiquement le formulaire à la fin
    function submitExam() {
        // Soumettre le formulaire
        document.getElementById('examForm').submit();
    }

setInterval(() => {
            const formData = new FormData(document.getElementById('examForm'));

            fetch('save_answers.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => console.log('Réponses sauvegardées : ', data))
            .catch(error => console.error('Erreur : ', error));
        }, 30000); // Toutes les 30 secondes
</script> -->
</head>
<body>
<div class="container mt-5">
    <?php if (isset($examen)): ?>
        <!-- Affichage de l'examen spécifique -->
        <h1>Examen : <?= htmlspecialchars($examen['titre']) ?></h1>
        <form action="soumettre_examen.php" method="POST">
            <input type="hidden" name="examen_id" value="<?= htmlspecialchars($id) ?>">
            <?php foreach ($questions as $index => $question): ?>
                <div class="mb-4">
                    <h4><?= ($index + 1) . ". " . htmlspecialchars($question['texte']) ?></h4>
                    <?php if ($question['type'] === 'text'): ?>
                        <textarea name="reponses[<?= htmlspecialchars($question['id']) ?>]" class="form-control" rows="3" required></textarea>
                    <?php elseif ($question['type'] === 'qcm'): ?>
                        <?php
                        // Récupérer les options de la question
                        $stmtOptions = $conn->prepare("SELECT * FROM options3 WHERE question_id = :question_id");
                        $stmtOptions->execute([':question_id' => $question['id']]);
                        $options = $stmtOptions->fetchAll(PDO::FETCH_ASSOC);
                        ?>
                        <?php foreach ($options as $option): ?>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="reponses[<?= htmlspecialchars($question['id']) ?>]" value="<?= htmlspecialchars($option['texte']) ?>" required>
                                <label class="form-check-label"><?= htmlspecialchars($option['texte']) ?></label>
                            </div>
                        <?php endforeach; ?>
                    <?php elseif ($question['type'] === 'true_false'): ?>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="reponses[<?= htmlspecialchars($question['id']) ?>]" value="true" required>
                            <label class="form-check-label">Vrai</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="reponses[<?= htmlspecialchars($question['id']) ?>]" value="false" required>
                            <label class="form-check-label">Faux</label>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    <?php else: ?>
        <!-- Liste des examens -->
        <h1>Liste des examens</h1>
        <?php foreach ($examens as $examen): ?>
            <a href="passerExamen2.php?id=<?= htmlspecialchars($examen['id']) ?>" class="btn btn-link"><?= htmlspecialchars($examen['titre']) ?></a><br>
        <?php endforeach; ?>
    <?php endif; ?>
</div>
</body>
</html>
