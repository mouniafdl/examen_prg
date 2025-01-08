<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Admin</title>
</head>
<body>
    <h1>Bienvenue, Administrateur</h1>
    <p>Vous êtes connecté en tant qu'administrateur.</p>
    <form method="POST" action="admin_action.php">
        <h3>Ajouter un utilisateur</h3>
        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom" required>
        
        <label for="email">Email :</label>
        <input type="email" id="email" name="email" required>
        
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required>
        
        <label for="roleu">Rôle :</label>
        <select id="roleu" name="roleu" required>
            <option value="formateur">Formateur</option>
            <option value="etudiant">Étudiant</option>
        </select>
        
        <button type="submit" name="action" value="add_user">Ajouter</button>
    </form>
    <form method="POST" action="admin_action.php">
        <h3>Créer un groupe</h3>
        <label for="groupe_nom">Nom du groupe :</label>
        <input type="text" id="groupe_nom" name="groupe_nom" required>
        
        <button type="submit" name="action" value="create_group">Créer</button>
    </form>
    <?php
session_start();

$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}

?>
    <?php
// Récupérer tous les étudiants
$stmt = $conn->query("SELECT id, nom FROM utilisateurs WHERE roleu = 'etudiant'");
$etudiants = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Récupérer tous les groupes
$stmt = $conn->query("SELECT id, nom FROM groupes");
$groupes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
    <form method="POST" action="admin_action.php">
        <h3>Assigner un étudiant à un groupe</h3>
        <label for="etudiant_id">Étudiant :</label>
        <select id="etudiant_id" name="etudiant_id" required>
            <?php foreach ($etudiants as $etudiant): ?>
        <option value="<?= $etudiant['id'] ?>"><?= $etudiant['nom'] ?></option>
    <?php endforeach; ?>
        </select>
        
        <label for="groupe_id">Groupe :</label>
        <select id="groupe_id" name="groupe_id" required>
        <?php foreach ($groupes as $groupe): ?>
        <option value="<?= $groupe['id'] ?>"><?= $groupe['nom'] ?></option>
    <?php endforeach; ?>
        </select>
        
        <button type="submit" name="action" value="assign_group">Assigner</button>
    </form>
    
</body>
</html>