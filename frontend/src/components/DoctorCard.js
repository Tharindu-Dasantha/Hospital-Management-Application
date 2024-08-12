import React from "react";

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  const { name, specialty } = doctor;

  return (
    <div className="doctor-card">
      <p>
        {name} - {specialty}
      </p>
      <div className="btn-container">
        <button type="button" onClick={() => onEdit(doctor)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(doctor._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
