import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../services/api";
import StateCard from "../components/StateCard";

function Home() {
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getDashboardData();
  }, []);

  async function getDashboardData() {
    try {
      const complaintResponse = await api.get("/complaints");
      const officerResponse = await api.get("/officers");

      setComplaints(complaintResponse.data);
      setOfficers(officerResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const investigationComplaints = complaints.filter(
    (complaint) => complaint.status === "Under Investigation"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            🚨 CRIMEGUARD PORTAL
          </span>

          <h1>
            Crime Complaint
            <br />
            <span>Management System</span>
          </h1>

          <p>
            A centralized platform to report,
            track and manage crime complaints
            efficiently.
          </p>

          <div className="hero-buttons">

            <Link
              to="/add-complaint"
              className="hero-primary-btn"
            >
              📝 Register Complaint
            </Link>

            <Link
              to="/complaints"
              className="hero-secondary-btn"
            >
              🔍 Track Complaint
            </Link>

          </div>

        </div>

        <div className="hero-visual">

          <div className="shield">
            🛡️
          </div>

          <h3>
            Your Safety Matters
          </h3>

          <p>
            Report • Track • Resolve
          </p>

        </div>

      </section>


      {/* ================= WELCOME ================= */}

      {user && (
        <div className="welcome-banner">

          <div>

            <span>
              Welcome back 👋
            </span>

            <h2>
              {user.name}
            </h2>

          </div>

          <div className="role-badge">
            {user.role}
          </div>

        </div>
      )}


      {/* ================= STATISTICS ================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>

            <h2>
              📊 Complaint Overview
            </h2>

            <p>
              Current system statistics
            </p>

          </div>

          <Link to="/statistics">
            View Full Statistics →
          </Link>

        </div>


        <div className="stats-grid">

          <StateCard
            icon="📋"
            title="Total Complaints"
            value={totalComplaints}
            description="Registered cases"
          />

          <StateCard
            icon="⏳"
            title="Pending"
            value={pendingComplaints}
            description="Awaiting action"
            className="pending-stat"
          />

          <StateCard
            icon="🔎"
            title="Investigation"
            value={investigationComplaints}
            description="Cases under investigation"
            className="investigation-stat"
          />

          <StateCard
            icon="✅"
            title="Resolved"
            value={resolvedComplaints}
            description="Successfully resolved"
            className="resolved-stat"
          />

        </div>

      </section>


      {/* ================= QUICK SERVICES ================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>

            <h2>
              ⚡ Quick Services
            </h2>

            <p>
              Access important services quickly
            </p>

          </div>

        </div>


        <div className="quick-services">

          <Link
            to="/add-complaint"
            className="quick-card"
          >

            <div className="quick-icon">
              📝
            </div>

            <div>

              <h3>
                Register Complaint
              </h3>

              <p>
                Submit a new complaint
              </p>

            </div>

            <span>
              →
            </span>

          </Link>


          <Link
            to="/complaints"
            className="quick-card"
          >

            <div className="quick-icon">
              🔍
            </div>

            <div>

              <h3>
                Track Complaint
              </h3>

              <p>
                Check complaint status
              </p>

            </div>

            <span>
              →
            </span>

          </Link>


          <Link
            to="/officers"
            className="quick-card"
          >

            <div className="quick-icon">
              👮
            </div>

            <div>

              <h3>
                Police Officers
              </h3>

              <p>
                View police officers
              </p>

            </div>

            <span>
              →
            </span>

          </Link>


          <Link
            to="/citizen-services"
            className="quick-card"
          >

            <div className="quick-icon">
              👤
            </div>

            <div>

              <h3>
                Citizen Services
              </h3>

              <p>
                Explore citizen services
              </p>

            </div>

            <span>
              →
            </span>

          </Link>

        </div>

      </section>


      {/* ================= MAIN MODULES ================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>

            <h2>
              🛡️ System Modules
            </h2>

            <p>
              Explore all CrimeGuard features
            </p>

          </div>

        </div>


        <div className="module-grid">

          <Link
            to="/complaints"
            className="module-card"
          >

            <span>
              📋
            </span>

            <h3>
              Complaints
            </h3>

            <p>
              View and manage crime complaints.
            </p>

          </Link>


          <Link
            to="/officers"
            className="module-card"
          >

            <span>
              👮
            </span>

            <h3>
              Police Officers
            </h3>

            <p>
              View assigned police officers.
            </p>

          </Link>


          <Link
            to="/statistics"
            className="module-card"
          >

            <span>
              📊
            </span>

            <h3>
              Crime Statistics
            </h3>

            <p>
              Analyze complaint statistics.
            </p>

          </Link>


          <Link
            to="/saved-complaints"
            className="module-card"
          >

            <span>
              ❤️
            </span>

            <h3>
              Saved Complaints
            </h3>

            <p>
              Access saved cases quickly.
            </p>

          </Link>


          <Link
            to="/emergency-contacts"
            className="module-card"
          >

            <span>
              🚨
            </span>

            <h3>
              Emergency Contacts
            </h3>

            <p>
              Important emergency numbers.
            </p>

          </Link>


          <Link
            to="/citizen-services"
            className="module-card"
          >

            <span>
              👤
            </span>

            <h3>
              Citizen Services
            </h3>

            <p>
              Services available for citizens.
            </p>

          </Link>

        </div>

      </section>


      {/* ================= RECENT COMPLAINTS ================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>

            <h2>
              🕒 Recent Complaints
            </h2>

            <p>
              Recently registered cases
            </p>

          </div>

          <Link to="/complaints">
            View All →
          </Link>

        </div>


        <div className="recent-list">

          {complaints
            .slice(-4)
            .reverse()
            .map((complaint) => (

              <div
                className="recent-item"
                key={complaint.id}
              >

                <div className="recent-number">

                  {complaint.complaintNumber}

                </div>


                <div className="recent-info">

                  <h3>
                    {complaint.crimeType}
                  </h3>

                  <p>
                    {complaint.complainantName}
                    {" • "}
                    {complaint.location}
                  </p>

                </div>


                <span
                  className={`status ${complaint.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {complaint.status}
                </span>


                <Link
                  to={`/complaints/${complaint.id}`}
                  className="recent-view"
                >
                  View →
                </Link>

              </div>

            ))}

        </div>

      </section>


      {/* ================= SAFETY BANNER ================= */}

      <section className="safety-banner">

        <div className="safety-icon">
          🛡️
        </div>

        <div>

          <h2>
            Stay Safe. Stay Alert.
          </h2>

          <p>
            In an emergency, contact the
            appropriate emergency service immediately.
          </p>

        </div>

        <Link
          to="/emergency-contacts"
          className="safety-btn"
        >
          Emergency Contacts
        </Link>

      </section>

    </div>
  );
}

export default Home;