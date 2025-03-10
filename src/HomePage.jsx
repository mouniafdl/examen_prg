

import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Specific CSS file for this page
import { FaBook, FaUser, FaHome, FaPhone, FaEnvelope } from "react-icons/fa"; // Import icons
import exam from './Pictures/exam.jpeg'; // Import exam illustration
import OFPPT from './Pictures/OFPPT.png'; // Import OFPPT logo

// Header Component
const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <header className="homepage-header">
      <div className="homepage-header__logo">
        <FaBook className="homepage-header__logo-icon" /> {/* Use FaBook icon for exam */}
        QuickExams
      </div>
      <nav>
        <ul className="homepage-header__nav">
          <li>
            <button
              type="button"
              className="homepage-header__btn"
              onClick={handleLoginClick}
              aria-label="Se connecter"
            ><FaUser color="white" />  {/* Changez la couleur de l'icône en blanc */}
              Se connecter
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// HomePage Component
const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <main className="homepage-main">
        <div className="homepage-main__content">
          <div className="homepage-main__text">
            <h1 className="homepage-main__title">
              Bienvenue sur <span className="app-name">QuickExams</span>
            </h1>
            <p className="homepage-main__description">
              QuickExams est votre plateforme en ligne pour passer des examens de manière simple, rapide et efficace. Que vous soyez étudiant ou professionnel, notre application vous permet de vous préparer et de passer vos examens à tout moment, où que vous soyez.
            </p>
            <p className="homepage-main__description">
              Profitez d'une interface intuitive, de résultats instantanés et d'un suivi détaillé de vos progrès. Rejoignez-nous dès aujourd'hui et simplifiez votre parcours d'apprentissage !
            </p>
          </div>
          <div className="homepage-main__image-container">
            <img
              src={exam}
              alt="Illustration d'examen en ligne"
              className="homepage-main__image"
            />
          </div>
        </div>
      </main>
      <footer className="homepage-footer">
        <div className="homepage-footer__content">
          <p>&copy; 2025 QuickExams. Tous droits réservés.</p>
          <div className="homepage-footer__logo">
            <img
              src={OFPPT}
              alt="Logo OFPPT"
              className="homepage-footer__logo-image"
            />
          </div>
          <div className="homepage-footer__links">
            <a href="/privacy-policy"><FaEnvelope /> Politique de confidentialité</a>
            <a href="/terms-of-service"><FaBook /> Conditions d'utilisation</a>
            <a href="/contact"><FaPhone /> Contact</a>
            <a href="/about"><FaHome /> En savoir plus</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;