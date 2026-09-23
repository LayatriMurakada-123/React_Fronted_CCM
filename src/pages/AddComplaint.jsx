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
      assignedOfficer: "Not Assigned",
      image: "",
      otherCrimeType: ""
    });

  const [imagePreview, setImagePreview] = useState("");

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  }

  function handleImageChange(e) {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;
      setForm(prev => ({
        ...prev,
        image: dataUrl
      }));
      setImagePreview(dataUrl);
    };

    reader.readAsDataURL(file);

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

      const { otherCrimeType, ...rest } = form;

      const finalCrimeType =
        form.crimeType === "Others"
          ? otherCrimeType.trim()
          : form.crimeType;

      await api.post(
        "/complaints",
        {
          ...rest,
          crimeType: finalCrimeType,
          image: form.image || "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80",
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
          <option>Others</option>
        </select>

        {form.crimeType === "Others" && (
          <input
            name="otherCrimeType"
            placeholder="Please specify the crime type"
            required
            value={form.otherCrimeType}
            onChange={handleChange}
          />
        )}

        <input
          name="location"
          placeholder="Incident Location"
          required
          onChange={handleChange}
        />

        <div className="form-field">
          <label htmlFor="crimeImage">
            Photo of the Incident (optional)
          </label>

          <input
            id="crimeImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Selected crime evidence"
              className="image-preview"
              style={{
                marginTop: "10px",
                width: "100%",
                maxWidth: "260px",
                borderRadius: "8px"
              }}
            />
          )}
        </div>

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