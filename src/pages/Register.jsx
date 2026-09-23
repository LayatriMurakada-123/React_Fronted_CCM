import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const existingUsers = await api.get("/users", {
        params: {
          email: form.email
        }
      });

      if (existingUsers.data.length > 0) {
        alert("An account with this email already exists.");
        return;
      }

      await api.post("/users", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "Citizen"
      });

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {
      console.log(error);

      alert(
        "Unable to create account. Please make sure JSON Server is running."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-wrapper">

        {/* LEFT SIDE */}

        <div className="auth-info register-info">

          <div className="auth-brand">
            🚨 CrimeGuard
          </div>

          <span className="auth-tag">
            CITIZEN REGISTRATION
          </span>

          <h1>
            Join
            <br />
            <span>CrimeGuard.</span>
          </h1>

          <p>
            Create your citizen account and access
            a secure platform for reporting and
            tracking complaints.
          </p>

          <div className="auth-features">

            <div className="auth-feature">
              <span>✓</span>

              <div>
                <strong>Register complaints</strong>
                <small>Report incidents securely</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>✓</span>

              <div>
                <strong>Track your cases</strong>
                <small>Monitor complaint progress</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>✓</span>

              <div>
                <strong>Access citizen services</strong>
                <small>All services in one place</small>
              </div>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="auth-container">

          <div className="auth-icon">
            👤
          </div>

          <h1>Create Account</h1>

          <p className="auth-subtitle">
            Register as a citizen
          </p>


          <form
            className="auth-form"
            onSubmit={handleRegister}
          >

            <div className="input-group">

              <label>
                Full Name
              </label>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            <div className="input-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">
                <span>✉️</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            <div className="input-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

            </div>


            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>

          </form>


          <div className="security-note">
            🔒 Your account information is stored securely
            for this demo portal.
          </div>


          <p className="auth-text">
            Already registered?
            {" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;