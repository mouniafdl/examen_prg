// App.js
import './App.css';
import HomePage from './HomePage';
import './HomePage.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import AdminPage from './Admin/AdminPage';
import FormateurPage from './Formateur/FormateurPage';
import EtudiantPage from './Etudiant/EtudiantPage';
import Signup from './Signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReportProvider } from "./context/ReportContext"; // Importer le Provider
import ExamInterface from './Etudiant/ExamInterface';
import ExamDetailsPage from './Formateur/ExamDetailsPage';
// import TakeExamPage from './Formateur/TakeExamPage';
// import CreateExamPage from './Formateur/CreateExamPage';

function App() {
  return (
    <ReportProvider> {/* Envelopper toute l'application avec ReportProvider */}
      <Router> {/* Router autour de toute l'application */}
        <div className="App">
          <ToastContainer position="top-right" autoClose={3000} />
          {/* Le Header peut maintenant utiliser useNavigate */}
          <Routes> {/* Routes gérées par le Router */}
            {/* Routes pour chaque page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/formateur" element={<FormateurPage />} />
            {/* <Route path="/create-exam" element={<CreateExamPage />} /> */}
            {/* <Route path="/take-exam" element={<TakeExamPage />} /> */}
            <Route path="/exam-details" element={<ExamDetailsPage />} />
            <Route path="/etudiant" element={<EtudiantPage />} />
            <Route path="/exam/:id" element={<ExamInterface />} />
          </Routes>
        </div>
      </Router>
    </ReportProvider>
  );
}

export default App;