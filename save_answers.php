<?php
session_start();

$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $exam_id = $_SESSION['exam_id'];
    $answers = $_POST['answers'];

    foreach ($answers as $question_id => $answer) {
        $stmt = $conn->prepare("
            INSERT INTO reponses_etudiants2 (exam_id, question_id, étudiant_id, réponse) 
            VALUES (:exam_id, :question_id, :étudiant_id, :réponse)
            ON DUPLICATE KEY UPDATE réponse = :réponse
        ");
        $stmt->execute([
            ':exam_id' => $exam_id,
            ':question_id' => $question_id,
            ':étudiant_id' => $_SESSION['user_id'],
            ':réponse' => $answer
        ]);
    }

    echo "Réponses sauvegardées.";
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>
