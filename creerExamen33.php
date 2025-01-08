<?php
session_start();

$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les données du formulaire
    $titre = $_POST['titre'];
    $heure_debut = $_POST['heure_debut'];
    $heure_fin = $_POST['heure_fin'];
    $duree = $_POST['duree'];
    $group_id = $_POST['group_id'];
    $questions = $_POST['questions'] ?? [];
    $type_question = $_POST['type_question'] ?? [];
    $options = $_POST['options'] ?? [];
    $correct = $_POST['correct'] ?? [];

    // Insérer l'examen
    $stmt = $conn->prepare("INSERT INTO examens3 (titre, heure_debut, heure_fin, duree, group_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$titre, $heure_debut, $heure_fin, $duree, $group_id]);

    $exam_id = $conn->lastInsertId();

    // Insérer les questions
    foreach ($questions as $index => $question) {
        $type = $type_question[$index];
        $stmtQuestion = $conn->prepare("INSERT INTO questions3 (exam_id, texte, type) VALUES (?, ?, ?)");
        $stmtQuestion->execute([$exam_id, $question, $type]);

        $question_id = $conn->lastInsertId();

        if ($type === "qcm" && isset($options[$index])) {
            foreach ($options[$index] as $optionIndex => $optionText) {
                $isCorrect = in_array($optionIndex + 1, $correct[$index] ?? []) ? 1 : 0;
                $stmtOption = $conn->prepare("INSERT INTO options3 (question_id, texte, correct) VALUES (?, ?, ?)");
                $stmtOption->execute([$question_id, $optionText, $isCorrect]);
            }
        }
    }

    echo "Examen créé avec succès !";

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>

