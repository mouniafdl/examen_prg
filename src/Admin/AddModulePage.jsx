import React, { useState } from "react";

const branchesByFiliere = {
    developmentDigital: ["dev1", "webFullStack"],
    gestionDesEntreprises: ["commerceMarketing", "comptabiliteFinance", "ges"],
};

const AddModulePage = () => {
    const [moduleData, setModuleData] = useState({
        moduleName: "",
        coefficient: "",
        description: "",
        type: "Regional",
        filieres: {
            developmentDigital: false,
            gestionDesEntreprises: false,
        },
        branches: {},
        trainer: "",
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            if (name.startsWith("filieres.")) {
                const filiereKey = name.split(".")[1];
                setModuleData((prevState) => {
                    const updatedFilieres = {
                        ...prevState.filieres,
                        [filiereKey]: checked,
                    };

                    let updatedBranches = { ...prevState.branches };
                    if (!checked) {
                        // Unchecking a filière removes its branches
                        branchesByFiliere[filiereKey]?.forEach((branch) => {
                            delete updatedBranches[branch];
                        });
                    }

                    return {
                        ...prevState,
                        filieres: updatedFilieres,
                        branches: updatedBranches,
                    };
                });
            } else if (name.startsWith("branches.")) {
                const branchKey = name.split(".")[1];
                setModuleData((prevState) => ({
                    ...prevState,
                    branches: {
                        ...prevState.branches,
                        [branchKey]: checked,
                    },
                }));
            }
        } else {
            setModuleData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Module Data:", moduleData);
        alert("Module ajouté avec succès !");
    };

    return (
        <div className="add-module-page">
            <h2>Ajouter un module</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom du module:
                    <input
                        type="text"
                        name="moduleName"
                        value={moduleData.moduleName}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Coefficient:
                    <input
                        type="number"
                        name="coefficient"
                        value={moduleData.coefficient}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Description (optionnelle):
                    <textarea
                        name="description"
                        value={moduleData.description}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Type:
                    <select name="type" value={moduleData.type} onChange={handleInputChange}>
                        <option value="Regional">Regional</option>
                        <option value="National">National</option>
                    </select>
                </label>

                <fieldset>
                    <legend>Filières:</legend>
                    {Object.keys(moduleData.filieres).map((filiere) => (
                        <label key={filiere}>
                            <input
                                type="checkbox"
                                name={`filieres.${filiere}`}
                                checked={moduleData.filieres[filiere]}
                                onChange={handleInputChange}
                            />
                            {filiere === "developmentDigital"
                                ? "Développement Digital"
                                : "Gestion des Entreprises"}
                        </label>
                    ))}
                </fieldset>

                {Object.keys(moduleData.filieres).some((filiere) => moduleData.filieres[filiere]) && (
                    <fieldset>
                        <legend>Branches:</legend>
                        {Object.keys(moduleData.filieres)
                            .filter((filiere) => moduleData.filieres[filiere])
                            .flatMap((filiere) => branchesByFiliere[filiere])
                            .map((branch) => (
                                <label key={branch}>
                                    <input
                                        type="checkbox"
                                        name={`branches.${branch}`}
                                        checked={!!moduleData.branches[branch]}
                                        onChange={handleInputChange}
                                    />
                                    {branch === "dev1"
                                        ? "Tronc Commun DEV1"
                                        : branch === "webFullStack"
                                            ? "Web Full Stack"
                                            : branch === "commerceMarketing"
                                                ? "Commerce et Marketing"
                                                : branch === "comptabiliteFinance"
                                                    ? "Comptabilité et Finance"
                                                    : "Tronc Commun GES"}
                                </label>
                            ))}
                    </fieldset>
                )}

                <label>
                    Formateur:
                    <input
                        type="text"
                        name="trainer"
                        value={moduleData.trainer}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <button type="submit">Ajouter le module</button>
            </form>
        </div>
    );
};

export default AddModulePage;
