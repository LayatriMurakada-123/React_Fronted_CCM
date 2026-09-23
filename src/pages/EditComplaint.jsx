import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditComplaint() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    complaintNumber: "",
    complainantName: "",
    email: "",
    phone: "",
    crimeType: "",
    location: "",
    date: "",
    time: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    assignedOfficer: "",
    officerId: ""
  });

  useEffect(() => {
    getComplaint();
  }, [id]);

  async function getComplaint() {

    try {

      const response = await api.get(
        `/complaints/${id}`
      );

      setFormData(response.data);

    } catch (error) {

      console.log(error);

    }
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.put(
        `/complaints/${id}`,
        formData
      );

      alert("Complaint updated successfully!");

      navigate("/complaints");

    } catch (error) {

      console.log(error);

      alert("Failed to update complaint");

    }

  }

  return (

    <div className="form-container">

      <h2>Edit Complaint</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="complaintNumber"
          placeholder="Complaint Number"
          value={formData.complaintNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="complainantName"
          placeholder="Complainant Name"
          value={formData.complainantName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="crimeType"
          value={formData.crimeType}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Crime Type
          </option>

          <option value="Theft">
            Theft
          </option>

          <option value="Cyber Crime">
            Cyber Crime
          </option>

          <option value="Fraud">
            Fraud
          </option>

          <option value="Missing Person">
            Missing Person
          </option>

          <option value="Assault">
            Assault
          </option>

          <option value="Harassment">
            Harassment
          </option>

          <option value="Vehicle Theft">
            Vehicle Theft
          </option>

          <option value="Online Scam">
            Online Scam
          </option>

          <option value="Property Dispute">
            Property Dispute
          </option>

          <option value="Lost Documents">
            Lost Documents
          </option>

        </select>

        <input
          type="text"
          name="location"
          placeholder="Crime Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>
          Complaint Date
        </label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>
          Complaint Time
        </label>

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Complaint Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="Pending">
            Pending
          </option>

          <option value="Under Investigation">
            Under Investigation
          </option>

          <option value="Resolved">
            Resolved
          </option>

        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

        </select>

        <input
          type="text"
          name="assignedOfficer"
          placeholder="Assigned Officer"
          value={formData.assignedOfficer}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
        >
          Update Complaint
        </button>

      </form>

    </div>

  );
}

export default EditComplaint;