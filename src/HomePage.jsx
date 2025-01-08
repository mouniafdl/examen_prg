import React from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'avoir installé react-router-dom
import "./HomePage.css"; // Ajouter un fichier CSS pour styliser la page d'accueil
import exam from './Pictures/exam.jpeg';
import OFPPT from './Pictures/OFPPT.png'; // Importer l'image du logo OFPPT

// Composant Header
const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirige l'utilisateur vers la page de connexion
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">ExamApp</div>
      <nav>
        <ul>
          <li>
            <button onClick={handleLoginClick}>Se connecter</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Composant HomePage
const HomePage = () => {
  return (
    <div className="home-page">
      {/* Inclure le composant Header */}
      <Header />

      <h1>Bienvenue sur l'application d'examen en ligne</h1>
      <p>Passez vos examens en toute simplicité et à tout moment !</p>
      
      <div className="image-container">
        <img
          src={exam}
          alt="Illustration d'examen en ligne"
          className="home-page-image"
        />
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 ExamApp. Tous droits réservés.</p>
          <div className="footer-logo">
            <img src={OFPPT} alt="Logo OFPPT" className="footer-logo-image" />
          </div>
          <div className="footer-links">
            <a href="/privacy-policy">Politique de confidentialité</a>
            <a href="/terms-of-service">Conditions d'utilisation</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-link">
            <a href="/about">En savoir plus</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
