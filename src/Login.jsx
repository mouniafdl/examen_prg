import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      console.log("Réponse de l'API :", response); // Affiche la réponse HTTP
      const users = await response.json();
      console.log("Données de l'API :", users); // Affiche les données JSON

      if (users.length === 0) {
        setError("Utilisateur non trouvé.");
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        setError("Mot de passe incorrect.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "formateur":
          navigate("/formateur");
          break;
        case "etudiant":
          navigate("/etudiant");
          break;
        default:
          setError("Rôle non reconnu.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error); // Affiche l'erreur dans la console
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Connexion</h2>
        {error && <p className="login-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Champ Email */}
          <div className="login-input-group">
            <label className="login-label"><FaEnvelope /> Email</label>
            <div className="login-input-wrapper">
              <input
                type="email"
                className="login-input-field"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="login-input-group">
            <label className="login-label"><FaLock /> Mot de passe</label>
            <div className="login-input-wrapper">
              <input
                type="password"
                className="login-input-field"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="login-submit-button">Se connecter</button>
        </form>
        <p className="login-signup-link">
          Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous ici</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;