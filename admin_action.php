<?php
session_start();

$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $action = $_POST['action'] ?? '';

        switch ($action) {
            case 'add_user':
                // Ajouter un utilisateur
                $nom = $_POST['nom'];
                $email = $_POST['email'];
                $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
                $roleu = $_POST['roleu'];

                $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe, roleu) VALUES (:nom, :email, :mot_de_passe, :roleu)");
                $stmt->execute([
                    ':nom' => $nom,
                    ':email' => $email,
                    ':mot_de_passe' => $password,
                    ':roleu' => $roleu
                ]);

                echo "Utilisateur ajouté avec succès.";

                // Si le rôle est étudiant, afficher la phase d'insertion dans un groupe
                if ($roleu === 'etudiant') {
                    header("Location: assign_group.php?etudiant_id=" . $conn->lastInsertId());
                    exit();
                }
                break;

            case 'create_group':
                // Créer un groupe
                $groupe_nom = $_POST['groupe_nom'];

                $stmt = $conn->prepare("INSERT INTO groupes (nom) VALUES (:nom)");
                $stmt->execute([':nom' => $groupe_nom]);

                echo "Groupe créé avec succès.";
                break;

            case 'assign_group':
                // Assigner un étudiant à un groupe
                $etudiant_id = $_POST['etudiant_id'];
                $groupe_id = $_POST['groupe_id'];

                $stmt = $conn->prepare("INSERT INTO etudiants_groupes (etudiant_id, groupe_id) VALUES (:etudiant_id, :groupe_id)");
                $stmt->execute([
                    ':etudiant_id' => $etudiant_id,
                    ':groupe_id' => $groupe_id
                ]);

                echo "Étudiant assigné au groupe avec succès.";
                break;

            default:
                echo "Action non reconnue.";
        }
    }
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
