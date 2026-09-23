import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  async function handleLogin(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/users", {
        params: {
          email: form.email,
          password: form.password
        }
      });

      if (response.data.length === 0) {
        alert("Invalid email or password.");
        return;
      }

      const user = response.data[0];

      localStorage.setItem("user", JSON.stringify(user));

      alert(`Welcome back, ${user.name}!`);

      navigate("/");

      window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Unable to login. Please make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  }

  function useDemoAccount() {
    setForm({
      email: "admin@crimeportal.com",
      password: "admin123"
    });
  }

  return (
    <div className="auth-page">

      <div className="auth-wrapper">

        {/* LEFT SIDE */}
        <div className="auth-info">

          <div className="auth-brand">
            🚨 CrimeGuard
          </div>

          <span className="auth-tag">
            SECURE CITIZEN PORTAL
          </span>

          <h1>
            Welcome
            <br />
            <span>Back.</span>
          </h1>

          <p>
            Access your CrimeGuard account and manage
            your complaints from one secure platform.
          </p>

          <div className="auth-features">

            <div className="auth-feature">
              <span>✓</span>
              <div>
                <strong>View your complaints</strong>
                <small>Access registered cases</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>✓</span>
              <div>
                <strong>Track investigation status</strong>
                <small>Stay updated on your cases</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>✓</span>
              <div>
                <strong>Access citizen services</strong>
                <small>Manage services easily</small>
              </div>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="auth-container">

          <div className="auth-icon">
            🔐
          </div>

          <h1>Welcome Back</h1>

          <p className="auth-subtitle">
            Login to your CrimeGuard account
          </p>

          <form
            className="auth-form"
            onSubmit={handleLogin}
          >

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
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login to Account →"}
            </button>

          </form>


          {/* DEMO ACCOUNT */}

          <div className="demo-account">

            <div className="demo-title">
              🧪 Demo Account
            </div>

            <div className="demo-details">
              <p>
                <strong>Email:</strong>
                admin@crimeportal.com
              </p>

              <p>
                <strong>Password:</strong>
                admin123
              </p>
            </div>

            <button
              type="button"
              className="demo-btn"
              onClick={useDemoAccount}
            >
              Use Demo Account
            </button>

          </div>


          <p className="auth-text">
            Don't have an account?
            {" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;