import { useState, useEffect } from "react";
import axios from "axios";
import PatientCard from "./PatientCard";
import "./Patient.css";
import './main.css'

const Patients = () => {
  const [patient, setPatient] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/patients");
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patients: ", error);
      }
    };

    fetchData();
  }, []);

  const handleAddPatient = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/patients/add",
        newPatient
      );

      setPatient([...patient, response.data]);
      setNewPatient({ name: "", age: "", gender: "" });
    } catch (error) {
      console.error("Error adding patient: ", error);
    }
  };

  const handleUpdatePatient = async (id, e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/patients/update/${id}`;
      const updatePat = { ...selectedPatient, _id: id };

      const response = await axios.post(url, updatePat);

      setPatient(
        patient.map((patient) => (patient._id === id ? response.data : patient))
      );
      setSelectedPatient(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating patient: ", error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/delete/${id}`);
      setSelectedPatient(null);
      setPatient(patient.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error("Error deleting patient: ", error);
    }
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <div className="patient-main">
      <div className="form-selections">
        <h4>{isEditMode ? "Edit Patient" : "Add Patient"}</h4>
        <form
          onSubmit={
            isEditMode
              ? handleUpdatePatient.bind(null, selectedPatient._id)
              : handleAddPatient
          }
        >
          <label>Name: </label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.name : newPatient.name}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({
                    ...selectedPatient,
                    name: e.target.value,
                  })
                : setNewPatient({ ...newPatient, name: e.target.value })
            }
          />
          <br />
          <label>Age:</label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.age : newPatient.age}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({
                    ...selectedPatient,
                    age: e.target.value,
                  })
                : setNewPatient({ ...newPatient, age: e.target.value })
            }
          />
          <br />
          <label>Gender:</label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.gender : newPatient.gender}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({
                    ...selectedPatient,
                    gender: e.target.value,
                  })
                : setNewPatient({ ...newPatient, gender: e.target.value })
            }
          />
          <br />
          <button type="submit">{isEditMode ? 'Update Patient' : 'Add Patient'}</button>
        </form>
      </div>
      <div className="patients-section">
        <h3>Patients ({patient.length})</h3>
        <div className="patient-list">
          {patient.map((pat) => (
            <PatientCard key={pat._id} patient={pat} onDelete={handleDeletePatient} onEdit={handleEditPatient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
