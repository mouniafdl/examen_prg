// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './Login.css'; // Ajouter le fichier CSS pour la page de connexion

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:3001/users?email=${email}`);
//       const users = await response.json();

//       if (users.length > 0) {
//         const user = users[0];

//         if (user.password === password) {
//           localStorage.setItem("user", JSON.stringify(user));

//           switch (user.role) {
//             case "admin":
//               navigate("/admin");
//               break;
//             case "formateur":
//               navigate("/formateur");
//               break;
//             case "etudiant":
//               navigate("/etudiant");
//               break;
//             default:
//               setError("Rôle non reconnu.");
//           }
//         } else {
//           setError("Mot de passe incorrect.");
//         }
//       } else {
//         setError("Utilisateur non trouvé.");
//       }
//     } catch (error) {
//       setError("Une erreur est survenue.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Connexion</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter votre email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Mot de passe</label>
//           <input
//             type="password"
//             placeholder="Enter votre mot de passe"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="login-button">Se connecter</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];

        if (user.password === password) {
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
        } else {
          setError("Mot de passe incorrect.");
        }
      } else {
        setError("Utilisateur non trouvé.");
      }
    } catch (error) {
      setError("Une erreur est survenue.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Connexion</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label className="login-label">Mot de passe</label>
            <input
              type="password"
              className="login-input"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;