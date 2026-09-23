import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddOfficer() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    badgeNumber: "",
    rank: "",
    department: "",
    station: "",
    phone: "",
    email: "",
    status: "Active"
  });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.post(
        "/officers",
        formData
      );

      alert("Officer added successfully!");

      navigate("/officers");

    } catch (error) {

      console.log(error);

      alert("Failed to add officer");

    }

  }

  return (

    <div className="form-container">

      <h2>Add Police Officer</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Officer Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="badgeNumber"
          placeholder="Badge Number"
          value={formData.badgeNumber}
          onChange={handleChange}
          required
        />

        <select
          name="rank"
          value={formData.rank}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Rank
          </option>

          <option value="Inspector">
            Inspector
          </option>

          <option value="Sub Inspector">
            Sub Inspector
          </option>

          <option value="Assistant Sub Inspector">
            Assistant Sub Inspector
          </option>

          <option value="Head Constable">
            Head Constable
          </option>

          <option value="Constable">
            Constable
          </option>

        </select>

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="station"
          placeholder="Police Station"
          value={formData.station}
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

        <input
          type="email"
          name="email"
          placeholder="Official Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>

        <button
          type="submit"
          className="submit-btn"
        >
          Add Officer
        </button>

      </form>

    </div>

  );
}

export default AddOfficer;