import { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import "./Appointment.css";
import './main.css'

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.log("Error fetching appointments: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddAppontment = async (e) => {
    e.preventDefault();

    // function to add new appointment
    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/add",
        newAppointment
      );
      console.log(response.data);
      setAppointments([...appointments, response.data]);
      setNewAppointment({ patientName: "", doctorName: "", date: "" });
    } catch (error) {
      console.log("Error adding appointment: ", error);
    }
  };

  // function to handleupdateAppointment
  const handleUpdateAppointment = async (id, e) => {
    e.preventDefault();

    try {
      const updatedAppointment = { ...selectedAppointment, _id: id };
      setAppointments(
        appointments.map((appointment) =>
          appointment._id === id ? updatedAppointment : appointment
        )
      );

      const response = await axios.put(
        `http://localhost:5000/appointments/update/${id}`,
        selectedAppointment
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error updating appointment: ", error);

      setAppointments(
        appointments.map((appointment) =>
          appointment._id === id ? selectedAppointment : appointment
        )
      );

      alert("Failed to update appointment. Please try again.");
    } finally {
      setSelectedAppointment(null);
      setIsEditMode(false);
    }
  };

  // fuction to handle delete appointment
  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete(`http://localhost:5000/appointments/delete/${id}`)
        .then((response) => {
          console.log(response.data);
          setAppointments(
            appointments.filter((appointment) => appointment._id !== id)
          );
        })
        .catch((error) => {
          console.log("Error deleting appointment: ", error);
          alert("Failed to delete appointment. Please try again.");
        });
    }
  };

  // fuction to handle edit appointment
  const handleEditAppointment = (appointment) => {
    const appointmentCopy = JSON.parse(JSON.stringigy(appointment));
    setSelectedAppointment(appointmentCopy);
    setIsEditMode(true);
  };

  return (
    <div className="main-container">
      {isLoading ? (
        <p>Loading Appointments...</p>
      ) : (
        <>
          <div className="flex-column">
            <div className="add-form">
              <h4>
                {isEditMode ? "Edit  Appointment" : "Add New Appointment"}
              </h4>
              <form className="appointment-form" onSubmit={isEditMode ? (e) => handleUpdateAppointment(selectedAppointment._id, e) : handleAddAppontment}>
                {/* form fields with validation */}
                <label>Patient Name:</label>
                <input
                  type="text"
                  value={
                    isEditMode
                      ? selectedAppointment.patientName
                      : newAppointment.patientName
                  }
                  onChange={(e) => {
                    isEditMode
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          patientName: e.target.value,
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          patientName: e.target.value,
                        });
                  }}
                />
                <label>Doctor Name:</label>
                <input
                  type="text"
                  value={
                    isEditMode
                      ? selectedAppointment.doctorName
                      : newAppointment.doctorName
                  }
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          doctorName: e.target.value,
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          doctorName: e.target.value,
                        })
                  }
                />
                <label>Date:</label>
                <input
                  type="date"
                  value={
                    isEditMode ? selectedAppointment.date : newAppointment.date
                  }
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          date: e.target.value,
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          date: e.target.value,
                        })
                  }
                />
                <button type="submit">
                  {isEditMode ? "Update Appointment" : "Add Appointment"}
                </button>
              </form>
            </div>
          </div>
          <div className="appointments">
            <h3>Appointments ({appointments.length})</h3>
            <div className="appointment-list">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  onEdit={handleEditAppointment}
                  onDelete={handleDeleteAppointment}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;
