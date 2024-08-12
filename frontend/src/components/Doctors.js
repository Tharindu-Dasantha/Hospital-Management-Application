import { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import "./Doctor.css";
import "./main.css"

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // fetch doctors on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      }
    };

    fetchData();
  }, []);

  // handle form submission for adding or updating doctor
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const doctorData = isEditMode ? selectedDoctor : newDoctor;

    try {
      const url = isEditMode
        ? `http://localhost:5000/doctors/update/${selectedDoctor._id}`
        : `http://localhost:5000/doctors/add`;

      const response = await axios.post(url, doctorData);

      if (isEditMode) {
        setDoctors(
          doctors.map((doctor) =>
            doctor._id === selectedDoctor._id ? response.data : doctor
          )
        );
      } else {
        setDoctors([...doctors, response.data]);
      }

      setSelectedDoctor(null);
      setIsEditMode(false);
      setNewDoctor({ name: "", specialty: "" });
    } catch (error) {
      console.error(
        isEditMode ? "Error updating doctor: " : "Error adding doctor: ",
        error
      );
    }
  };

  // handle editing a doctor
  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  // handle deleting a doctor
  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctors/delete/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.error("Error deleting doctor: ", error);
    }
  };

  return (
    <div className="main-doc-container">
      <div className="form-sections">
        <h4>{isEditMode ? "Edit Doctor" : "Add New Doctor"}</h4>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={newDoctor.name}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, name: e.target.value })
            }
          />
          <br />
          <label htmlFor="specialty">Specialty</label>
          <input
            type="text"
            id="specialty"
            value={newDoctor.specialty}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, specialty: e.target.value })
            }
          />
          <br />
          <button type="submit">
            {isEditMode ? "Update Doctor" : "Add Doctor"}
          </button>
        </form>
      </div>
      <div className="doctors-section">
        <h3>Doctors({doctors.length})</h3>
        <div className="doctor-list">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onEdit={handleEditDoctor}
              onDelete={handleDeleteDoctor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
