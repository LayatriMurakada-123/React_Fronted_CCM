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
  const [passwordStrength, setPasswordStrength] = useState("");

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  // At least 8 characters, one uppercase, one lowercase,
  // one number, and one special character
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;

  function isValidEmail(email) {
    const trimmed = email.trim();

    if (!EMAIL_REGEX.test(trimmed)) {
      return false;
    }

    const domain = trimmed.split("@")[1];
    const firstLabel = domain.split(".")[0];

    // Reject domains where the name part is just numbers, e.g. 123.com
    if (/^\d+$/.test(firstLabel)) {
      return false;
    }

    return true;
  }

  function isStrongPassword(password) {
    return PASSWORD_REGEX.test(password);
  }

  function getPasswordStrengthLabel(password) {
    if (!password) {
      return "";
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    if (name === "password") {
      setPasswordStrength(getPasswordStrengthLabel(value));
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    if (!isValidEmail(form.email)) {
      alert("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    if (!isStrongPassword(form.password)) {
      alert(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
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

              {form.password && (
                <p
                  style={{
                    marginTop: "6px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color:
                      passwordStrength === "Strong"
                        ? "#22a55c"
                        : passwordStrength === "Medium"
                          ? "#e0a323"
                          : "#e0433a"
                  }}
                >
                  Password strength: {passwordStrength}
                </p>
              )}

              <small style={{ color: "#666" }}>
                Use 8+ characters with uppercase, lowercase, a number
                and a special character.
              </small>

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