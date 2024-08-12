import React from "react";

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="card">
      <p>
        <span>Patient: </span>
        <span id="patientName"></span>
      </p>
      <p>
        <span>Doctor: </span>
        <span id="doctorName"></span>
      </p>
      <p>
        <span>Date: </span>
        <span id="date"></span>
      </p>
      <div className="btn-container">
        <button onClick={onEdit(appointment)}>Edit</button>
        <button onClick={onDelete(appointment._id)}>Delete</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
