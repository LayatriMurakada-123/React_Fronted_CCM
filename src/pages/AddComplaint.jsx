import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function AddComplaint() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      complainantName: "",
      email: "",
      phone: "",
      crimeType: "Theft",
      location: "",
      date: "",
      time: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      assignedOfficer: "Not Assigned"
    });

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response =
        await api.get("/complaints");

      const number =
        `CMP${String(
          response.data.length + 1
        ).padStart(3, "0")}`;

      await api.post(
        "/complaints",
        {
          ...form,
          complaintNumber: number
        }
      );

      alert(
        `Complaint ${number} registered successfully!`
      );

      navigate("/complaints");

    } catch (error) {

      console.log(error);

      alert(
        "Unable to register complaint"
      );

    }
  }

  return (

    <div className="form-container">

      <h1>
        Register New Complaint
      </h1>

      <form
        className="complaint-form"
        onSubmit={handleSubmit}
      >

        <input
          name="complainantName"
          placeholder="Complainant Name"
          required
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />

        <select
          name="crimeType"
          onChange={handleChange}
        >
          <option>Theft</option>
          <option>Cyber Crime</option>
          <option>Fraud</option>
          <option>Missing Person</option>
          <option>Harassment</option>
          <option>Vehicle Theft</option>
          <option>Online Scam</option>
          <option>Property Dispute</option>
        </select>

        <input
          name="location"
          placeholder="Incident Location"
          required
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          required
          onChange={handleChange}
        />

        <select
          name="priority"
          onChange={handleChange}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe the incident..."
          rows="6"
          required
          onChange={handleChange}
        />

        <button className="submit-btn">
          Submit Complaint
        </button>

      </form>

    </div>
  );
}

export default AddComplaint;