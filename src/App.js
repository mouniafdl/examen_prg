import './App.css';
import HomePage from './HomePage';
import './HomePage.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import AdminPage from './Admin/AdminPage';
import FormateurPage from './Formateur/FormateurPage';
import EtudiantPage from './Etudiant/EtudiantPage';


function App() {
  return (
    <Router> {/* Router autour de toute l'application */}
      <div className="App">
        {/* Le Header peut maintenant utiliser useNavigate */}
        <Routes> {/* Routes gérées par le Router */}
          {/* Routes pour chaque page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/formateur" element={<FormateurPage />} />
          <Route path="/etudiant" element={<EtudiantPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
