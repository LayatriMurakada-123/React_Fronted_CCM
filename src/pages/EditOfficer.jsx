import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditOfficer() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [officer, setOfficer] = useState({
    name: "",
    badgeNumber: "",
    rank: "",
    department: "",
    station: "",
    phone: "",
    email: "",
    status: ""
  });

  useEffect(() => {
    getOfficer();
  }, [id]);

  async function getOfficer() {

    try {

      const response = await api.get(
        `/officers/${id}`
      );

      setOfficer(response.data);

    } catch (error) {

      console.log(error);

    }
  }

  function handleChange(e) {

    setOfficer({
      ...officer,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.put(
        `/officers/${id}`,
        officer
      );

      alert("Officer updated successfully!");

      navigate("/officers");

    } catch (error) {

      console.log(error);

    }
  }

  return (

    <div className="form-container">

      <h2>Edit Police Officer</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Officer Name"
          value={officer.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="badgeNumber"
          placeholder="Badge Number"
          value={officer.badgeNumber}
          onChange={handleChange}
        />

        <input
          type="text"
          name="rank"
          placeholder="Rank"
          value={officer.rank}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={officer.department}
          onChange={handleChange}
        />

        <input
          type="text"
          name="station"
          placeholder="Police Station"
          value={officer.station}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={officer.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={officer.email}
          onChange={handleChange}
        />

        <select
          name="status"
          value={officer.status}
          onChange={handleChange}
        >

          <option value="">
            Select Status
          </option>

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
          Update Officer
        </button>

      </form>

    </div>

  );
}

export default EditOfficer;