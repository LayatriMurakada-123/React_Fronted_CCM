import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function OfficerDetails() {
  const { id } = useParams();

  const [officer, setOfficer] = useState(null);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadOfficer();
  }, [id]);

  async function loadOfficer() {
    try {
      const officerResponse = await api.get(
        `/officers/${id}`
      );

      setOfficer(officerResponse.data);

      const complaintResponse = await api.get(
        `/complaints?officerId=${id}`
      );

      setComplaints(complaintResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!officer) {
    return (
      <div className="loading-page">
        <div className="loading-spinner"></div>
        <h2>Loading officer profile...</h2>
      </div>
    );
  }

  const activeCases = complaints.filter(
    complaint =>
      complaint.status !== "Resolved"
  ).length;

  const resolvedCases = complaints.filter(
    complaint =>
      complaint.status === "Resolved"
  ).length;

  return (
    <div className="officer-details-page">

      {/* HEADER */}

      <div className="officer-details-header">

        <div>
          <span className="details-label">
            POLICE PERSONNEL
          </span>

          <h1>Officer Profile</h1>

          <p>
            Officer information and assigned case overview.
          </p>
        </div>

        <Link
          to="/officers"
          className="back-btn"
        >
          ← Back to Officers
        </Link>

      </div>


      {/* PROFILE HERO */}

      <section className="officer-profile-card">

        <div className="profile-image-container">

          <img
            src={officer.image}
            alt={officer.name}
          />

          <span className="active-status">
            ● {officer.status}
          </span>

        </div>


        <div className="profile-main">

          <span className="profile-rank">
            {officer.rank}
          </span>

          <h2>{officer.name}</h2>

          <p className="profile-department">
            {officer.department}
          </p>

          <p className="profile-station">
            📍 {officer.station}
          </p>

          <div className="profile-actions">

            <a
              href={`tel:${officer.phone}`}
              className="call-officer-btn"
            >
              📞 Call Officer
            </a>

            <a
              href={`mailto:${officer.email}`}
              className="email-officer-btn"
            >
              ✉️ Send Email
            </a>

          </div>

        </div>


        <div className="badge-card">

          <span>BADGE NUMBER</span>

          <strong>{officer.badgeNumber}</strong>

          <div className="badge-icon">
            👮
          </div>

        </div>

      </section>


      {/* STATISTICS */}

      <div className="officer-stats">

        <div className="officer-stat-card">
          <span>📁</span>
          <div>
            <strong>{officer.casesHandled}</strong>
            <p>Total Cases Handled</p>
          </div>
        </div>

        <div className="officer-stat-card">
          <span>🔎</span>
          <div>
            <strong>{activeCases}</strong>
            <p>Active Assigned Cases</p>
          </div>
        </div>

        <div className="officer-stat-card">
          <span>✅</span>
          <div>
            <strong>{resolvedCases}</strong>
            <p>Resolved Cases</p>
          </div>
        </div>

        <div className="officer-stat-card">
          <span>⭐</span>
          <div>
            <strong>{officer.experience}</strong>
            <p>Experience</p>
          </div>
        </div>

      </div>


      {/* INFORMATION */}

      <div className="officer-information-grid">

        <section className="officer-info-panel">

          <div className="panel-title">
            <span>👮</span>

            <div>
              <h2>Professional Information</h2>
              <p>Official profile details</p>
            </div>
          </div>


          <div className="officer-info-list">

            <div>
              <span>Full Name</span>
              <strong>{officer.name}</strong>
            </div>

            <div>
              <span>Rank</span>
              <strong>{officer.rank}</strong>
            </div>

            <div>
              <span>Department</span>
              <strong>{officer.department}</strong>
            </div>

            <div>
              <span>Specialization</span>
              <strong>{officer.specialization}</strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>{officer.experience}</strong>
            </div>

            <div>
              <span>Police Station</span>
              <strong>{officer.station}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{officer.phone}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{officer.email}</strong>
            </div>

          </div>

        </section>


        {/* ASSIGNED CASES */}

        <section className="officer-info-panel">

          <div className="panel-title">

            <span>📋</span>

            <div>
              <h2>Assigned Complaints</h2>
              <p>Cases currently associated with this officer</p>
            </div>

          </div>


          {complaints.length === 0 ? (

            <div className="no-cases">
              <span>📂</span>
              <h3>No assigned cases</h3>
              <p>
                No complaints are currently assigned
                to this officer.
              </p>
            </div>

          ) : (

            <div className="assigned-cases">

              {complaints.map(complaint => (

                <Link
                  key={complaint.id}
                  to={`/complaints/${complaint.id}`}
                  className="assigned-case"
                >

                  <div className="case-mini-image">

                    <img
                      src={complaint.image}
                      alt={complaint.crimeType}
                    />

                  </div>

                  <div className="assigned-case-info">

                    <strong>
                      {complaint.complaintNumber}
                    </strong>

                    <h3>
                      {complaint.crimeType}
                    </h3>

                    <p>
                      📍 {complaint.location}
                    </p>

                  </div>

                  <span
                    className={`status ${complaint.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {complaint.status}
                  </span>

                </Link>

              ))}

            </div>

          )}

        </section>

      </div>


      {/* FOOTER ACTION */}

      <div className="officer-bottom-banner">

        <div>
          <span>Need assistance?</span>

          <h2>
            Contact {officer.name}
          </h2>

          <p>
            Reach the assigned officer directly
            for case-related communication.
          </p>
        </div>

        <div className="banner-actions">

          <a
            href={`tel:${officer.phone}`}
            className="banner-call"
          >
            📞 Call
          </a>

          <a
            href={`mailto:${officer.email}`}
            className="banner-email"
          >
            ✉️ Email
          </a>

        </div>

      </div>

    </div>
  );
}

export default OfficerDetails;