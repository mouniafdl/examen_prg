import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaBirthdayCake, FaHome, FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        CIN: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        address: "",
        phone: "+212 6", // Pré-remplir avec +212 6
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    const phonePattern = /^\+212 6\d{2}-\d{6}$/; // Validation pour +212 6XX-XXXXXX

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Gestion spécifique pour le champ "phone"
        if (name === "phone") {
            // Empêcher la suppression ou la modification de "+212 6"
            if (!value.startsWith("+212 6")) {
                return; // Ne pas mettre à jour l'état si l'utilisateur essaie de modifier "+212 6"
            }

            // Limiter la saisie à des chiffres et ajouter automatiquement le tiret
            let newValue = value.slice(6); // Tout après "+212 6"
            newValue = newValue.replace(/\D/g, ""); // Supprimer tout ce qui n'est pas un chiffre

            // Ajouter le tiret après les 2 premiers chiffres (6XX-XXXXXX)
            if (newValue.length > 2) {
                newValue = `${newValue.slice(0, 2)}-${newValue.slice(2, 9)}`;
            }

            // Limiter la longueur totale à 15 caractères (+212 6XX-XXXXXX)
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }

            // Mettre à jour la valeur du champ
            setFormData({ ...formData, phone: `+212 6${newValue}` });
            return;
        }

        // Pour les autres champs, mise à jour normale
        setFormData({ ...formData, [name]: value });
    };

    const validateFields = () => {
        const newErrors = {};
        if (!formData.CIN.trim()) newErrors.CIN = "Le champ CIN est obligatoire.";
        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est obligatoire.";
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est obligatoire.";
        if (!formData.birthDate.trim()) newErrors.birthDate = "La date de naissance est obligatoire.";
        if (!formData.email.trim()) newErrors.email = "L'email est obligatoire.";
        if (!passwordPattern.test(formData.password)) newErrors.password = "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un symbole.";

        // Validation du téléphone (facultatif mais doit être au format +212 6XX-XXXXXX)
        if (formData.phone.trim() && !phonePattern.test(formData.phone)) {
            newErrors.phone = "Le numéro de téléphone doit être au format +212 6XX-XXXXXX.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Inscription réussie !", { position: "top-right" });
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                toast.error("Erreur lors de l'inscription.", { position: "top-right" });
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la soumission.", { position: "top-right" });
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2 className="signup-title">Inscription</h2>
                {errors.general && <p className="signup-error-message">{errors.general}</p>}

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="signup-input-group">
                        <label className="signup-label"><FaIdCard /> CIN</label>
                        <input
                            type="text"
                            name="CIN"
                            className={`signup-input-field ${errors.CIN ? "signup-input-error" : ""}`}
                            placeholder="Entrez votre CIN"
                            value={formData.CIN}
                            onChange={handleInputChange}
                        />
                        {errors.CIN && <p className="signup-error-message">{errors.CIN}</p>}
                    </div>

                    <div className="signup-input-group">
                        <label className="signup-label"><FaUser /> Prénom</label>
                        <input
                            type="text"
                            name="firstName"
                            className={`signup-input-field ${errors.firstName ? "signup-input-error" : ""}`}
                            placeholder="Entrez votre prénom"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        {errors.firstName && <p className="signup-error-message">{errors.firstName}</p>}
                    </div>

                    <div className="signup-input-group">
                        <label className="signup-label"><FaUser /> Nom</label>
                        <input
                            type="text"
                            name="lastName"
                            className={`signup-input-field ${errors.lastName ? "signup-input-error" : ""}`}
                            placeholder="Entrez votre nom"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        {errors.lastName && <p className="signup-error-message">{errors.lastName}</p>}
                    </div>

                    <div className="signup-input-group">
                        <label className="signup-label"><FaBirthdayCake /> Date de naissance</label>
                        <input
                            type="date"
                            name="birthDate"
                            className={`signup-input-field ${errors.birthDate ? "signup-input-error" : ""}`}
                            value={formData.birthDate}
                            onChange={handleInputChange}
                        />
                        {errors.birthDate && <p className="signup-error-message">{errors.birthDate}</p>}
                    </div>

                    <div className="signup-input-group">
                        <label className="signup-label"><FaHome /> Adresse</label>
                        <input
                            type="text"
                            name="address"
                            className={`signup-input-field ${errors.address ? "signup-input-error" : ""}`}
                            placeholder="Entrez votre adresse (facultatif)"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <p className="signup-error-message">{errors.address}</p>}
                    </div>

                    <div className="signup-input-group">
                        <label className="signup-label"><FaPhone /> Téléphone</label>
                        <input
                            type="text"
                            name="phone"
                            className={`signup-input-field ${errors.phone ? "signup-input-error" : ""}`}
                            placeholder="XX-XXX-XXXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                            maxLength={15} // Limite à 15 caractères (+212 6XX-XXXXXX)
                        />
                        {errors.phone && <p className="signup-error-message">{errors.phone}</p>}
                    </div>

                    <div className="signup-input-group">
                        <label className="signup-label"><FaEnvelope /> Email</label>
                        <input
                            type="email"
                            name="email"
                            className={`signup-input-field ${errors.email ? "signup-input-error" : ""}`}
                            placeholder="Entrez votre email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="signup-error-message">{errors.email}</p>}
                    </div>

                    <div className="signup-input-group">
                        <label className="signup-label"><FaLock /> Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            className={`signup-input-field ${errors.password ? "signup-input-error" : ""}`}
                            placeholder="Entrez votre mot de passe"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="signup-error-message">{errors.password}</p>}
                    </div>

                    <button type="submit" className="signup-submit-button">
                        S'inscrire
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;