import { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import "./Appointment.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

      alert("Failed to update appointment. Please try again.")
    } finally {
        setSelectedAppointment(null);
        setIsEditing(false);
    }
  };

  // fuction to handle delete appointment
  const handleDeleteAppointment = async (id) => {
    if(window.confirm("Are you sure you want to delete this appointment?")) {
        a
    }
  }
  // fuction to handle edit appointment
};

export default Appointments;
