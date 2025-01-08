<?php
session_start();

$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si l'étudiant est connecté
    if (!isset($_SESSION['user']) || $_SESSION['user']['roleu'] !== 'etudiant') {
        die("Accès refusé.");
    }

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $examen_id = $_POST['examen_id']; // Correction : Utiliser 'examen_id' car 'id' est ambigu
        $etudiant_id = $_SESSION['user']['id']; // ID de l'étudiant connecté
        $reponses = $_POST['reponses']; // Tableau des réponses

        try {
            // Vérifier si l'examen existe
            $stmt = $conn->prepare("SELECT * FROM examens3 WHERE id = :id");
            $stmt->execute([':id' => $examen_id]);
            $examen = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$examen) {
                die("Examen introuvable.");
            }

            // Insérer les réponses des étudiants
            foreach ($reponses as $question_id => $reponse) {
                $stmtReponse = $conn->prepare("
                    INSERT INTO reponses_etudiants2 (examen_id, etudiant_id, question_id, reponse) 
                    VALUES (:examen_id, :etudiant_id, :question_id, :reponse)
                ");
                $stmtReponse->execute([
                    ':examen_id' => $examen_id,
                    ':etudiant_id' => $etudiant_id,
                    ':question_id' => $question_id,
                    ':reponse' => $reponse
                ]);
            }

            echo "Examen soumis avec succès.";
        } catch (Exception $e) {
            die("Erreur lors de la soumission : " . $e->getMessage());
        }
    }
} catch (PDOException $e) {
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
}
?>
