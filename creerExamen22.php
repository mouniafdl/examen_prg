<!-- <?php
session_start();

$host = "localhost";
$dbname = "my_login";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les groupes
    $stmtGroups = $conn->prepare("SELECT id, nom FROM groupes");
    $stmtGroups->execute();
    $groupes = $stmtGroups->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un Examen</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script>
        function ajouterQuestion() {
            const questionContainer = document.getElementById('questions');
            const index = questionContainer.childElementCount;
            const questionHTML = `
                <div class="question-item mb-4">
                    <label>Type de question :</label>
                    <select name="type_question[]" class="form-select mb-2" onchange="gererOptions(this, ${index})" required>
                        <option value="text">Texte libre</option>
                        <option value="qcm">Choix multiple</option>
                        <option value="true_false">Vrai ou Faux</option>
                    </select>
                    <input type="text" name="questions[]" class="form-control mb-2" placeholder="Texte de la question" required>
                    <div class="options-container" id="options-container-${index}"></div>
                </div>`;
            questionContainer.insertAdjacentHTML('beforeend', questionHTML);
        }

        function gererOptions(selectElement, index) {
            const container = document.getElementById(`options-container-${index}`);
            container.innerHTML = ""; // Effacer les anciennes options
            if (selectElement.value === "qcm") {
                for (let i = 1; i <= 4; i++) {
                    container.innerHTML += `
                        <div class="mb-1">
                            <input type="text" name="options[${index}][]" class="form-control mb-1" placeholder="Option ${i}" required>
                            <label><input type="checkbox" name="correct[${index}][]" value="${i}"> Correct</label>
                        </div>`;
                }
            }
        }
    </script>
</head>
<body>
    <div class="container mt-5">
        <h1>Créer un Examen</h1>
        <form action="creerExamen33.php" method="POST">
            <div class="mb-3">
                <label for="titre" class="form-label">Titre de l'examen :</label>
                <input type="text" id="titre" name="titre" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="heure_debut" class="form-label">Heure de début :</label>
                <input type="datetime-local" id="heure_debut" name="heure_debut" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="heure_fin" class="form-label">Heure de fin :</label>
                <input type="datetime-local" id="heure_fin" name="heure_fin" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="duree" class="form-label">Durée (en minutes) :</label>
                <input type="number" id="duree" name="duree" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="group_id" class="form-label">Groupe autorisé :</label>
                <select id="group_id" name="group_id" class="form-select" required>
                    <?php foreach ($groupes as $groupe): ?>
                        <option value="<?= htmlspecialchars($groupe['id']) ?>">
                            <?= htmlspecialchars($groupe['nom']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <h3>Questions</h3>
            <div id="questions"></div>
            <button type="button" class="btn btn-secondary mb-3" onclick="ajouterQuestion()">Ajouter une question</button>

            <button type="submit" class="btn btn-primary">Créer l'examen</button>
        </form>
    </div>
</body>
</html> -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un Examen</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

    <script>

       





        function ajouterQuestion() {
            const questionContainer = document.getElementById('questions');
            const index = questionContainer.childElementCount;
            const questionHTML = `
                <div class="question-item mb-4">
                    <label>Type de question :</label>
                    <select name="type_question[]" class="form-select mb-2" onchange="gererOptions(this, ${index})" required>
                        <option value="text">Texte libre</option>
                        <option value="qcm">Choix multiple</option>
                        <option value="true_false">Vrai ou Faux</option>
                    </select>
                    <input type="text" name="questions[]" class="form-control mb-2" placeholder="Texte de la question" required>
                    <div class="options-container" id="options-container-${index}"></div>
                </div>`;
            questionContainer.insertAdjacentHTML('beforeend', questionHTML);
        }

        function gererOptions(selectElement, index) {
            const container = document.getElementById(`options-container-${index}`);
            container.innerHTML = ""; // Effacer les anciennes options
            if (selectElement.value === "qcm") {
                for (let i = 1; i <= 4; i++) {
                    container.innerHTML += `
                        <div class="mb-1">
                            <input type="text" name="options[${index}][]" class="form-control mb-1" placeholder="Option ${i}" required>
                            <label><input type="checkbox" name="correct[${index}][]" value="${i}"> Correct</label>
                        </div>`;
                }
            }
        }
    </script>
</head>
<body>
    <div class="container mt-5">
        <h1>Créer un Examen</h1>
        <form action="creerExamen33.php" method="POST">
            <div class="mb-3">
                <label for="titre" class="form-label">Titre de l'examen :</label>
                <input type="text" id="titre" name="titre" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="heure_debut" class="form-label">Heure de début :</label>
                <input type="datetime-local" id="heure_debut" name="heure_debut" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="heure_fin" class="form-label">Heure de fin :</label>
                <input type="datetime-local" id="heure_fin" name="heure_fin" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="duree" class="form-label">Durée (en minutes) :</label>
                <input type="number" id="duree" name="duree" class="form-control" readonly>
            </div>
            <div class="mb-3">
                <label for="group_id" class="form-label">Groupe autorisé :</label>
                <select id="group_id" name="group_id" class="form-select" required>
                    <?php foreach ($groupes as $groupe): ?>
                        <option value="<?= htmlspecialchars($groupe['id']) ?>">
                            <?= htmlspecialchars($groupe['nom']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <h3>Questions</h3>
            <div id="questions"></div>
            <button type="button" class="btn btn-secondary mb-3" onclick="ajouterQuestion()">Ajouter une question</button>
            <button type="submit" class="btn btn-primary">Créer l'examen</button>
        </form>
    </div>

    <script>
        document.getElementById('heure_fin').addEventListener('input', function () {
            const heureDebut = document.getElementById('heure_debut').value;
            const heureFin = document.getElementById('heure_fin').value;

            if (heureDebut && heureFin) {
                const debut = new Date(heureDebut);
                const fin = new Date(heureFin);

                const duree = (fin - debut) / (1000 * 60); // Durée en minutes

                if (duree > 0) {
                    document.getElementById('duree').value = duree;
                } else {
                    document.getElementById('duree').value = "Invalide";
                }
            }
        });

//         document.addEventListener('contextmenu', (e) => e.preventDefault());
// document.addEventListener('keydown', (e) => {
//     if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
//         e.preventDefault();
//     }
// });

    </script>
</body>
</html>
