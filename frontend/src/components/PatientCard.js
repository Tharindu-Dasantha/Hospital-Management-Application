import React from "react";

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h4>{patient.name}</h4>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <div className="btn-container">
        <button type="button" onClick={() => onEdit(patient)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(patient._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientCard;