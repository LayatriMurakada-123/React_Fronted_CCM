import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    loadComplaint();
  }, [id]);

  async function loadComplaint() {
    try {
      const complaintResponse = await api.get(`/complaints/${id}`);

      const complaintData = complaintResponse.data;

      setComplaint(complaintData);

      if (complaintData.officerId) {
        const officerResponse = await api.get(
          `/officers/${complaintData.officerId}`
        );

        setOfficer(officerResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!complaint) {
    return (
      <div className="loading-page">
        <div className="loading-spinner"></div>
        <h2>Loading complaint...</h2>
      </div>
    );
  }

  return (
    <div className="complaint-details-page">

      {/* HEADER */}

      <div className="details-topbar">
        <div>
          <span className="details-label">
            CASE MANAGEMENT
          </span>

          <h1>Complaint Details</h1>

          <p>
            Complete information and current status of this complaint.
          </p>
        </div>

        <Link
          to="/complaints"
          className="back-btn"
        >
          ← Back to Complaints
        </Link>
      </div>


      {/* HERO */}

      <div className="complaint-detail-hero">

        <div className="case-image-wrapper">

          <img
            src={complaint.image}
            alt={complaint.crimeType}
            className="case-image"
          />

          <span
            className={`priority-badge ${complaint.priority.toLowerCase()}`}
          >
            {complaint.priority} Priority
          </span>

        </div>


        <div className="case-summary">

          <div className="case-number-row">

            <div>
              <span className="small-label">
                CASE NUMBER
              </span>

              <h2>{complaint.complaintNumber}</h2>
            </div>

            <span
              className={`large-status ${complaint.status
                .toLowerCase()
                .replaceAll(" ", "-")}`}
            >
              {complaint.status}
            </span>

          </div>


          <h1>{complaint.crimeType}</h1>

          <p className="case-description">
            {complaint.description}
          </p>


          <div className="case-meta">

            <div>
              <span>📅 Date</span>
              <strong>{complaint.date}</strong>
            </div>

            <div>
              <span>🕐 Time</span>
              <strong>{complaint.time}</strong>
            </div>

            <div>
              <span>📍 Location</span>
              <strong>{complaint.location}</strong>
            </div>

            <div>
              <span>🏷️ Category</span>
              <strong>{complaint.category}</strong>
            </div>

          </div>

        </div>

      </div>


      {/* MAIN GRID */}

      <div className="details-content-grid">

        {/* COMPLAINANT */}

        <section className="detail-panel">

          <div className="panel-title">
            <span>👤</span>

            <div>
              <h2>Complainant Information</h2>
              <p>Person who registered this complaint</p>
            </div>
          </div>


          <div className="information-grid">

            <div className="info-item">
              <span>Full Name</span>
              <strong>{complaint.complainantName}</strong>
            </div>

            <div className="info-item">
              <span>Email Address</span>
              <strong>{complaint.email}</strong>
            </div>

            <div className="info-item">
              <span>Phone Number</span>
              <strong>{complaint.phone}</strong>
            </div>

            <div className="info-item">
              <span>Incident Location</span>
              <strong>{complaint.location}</strong>
            </div>

          </div>

        </section>


        {/* CASE INFORMATION */}

        <section className="detail-panel">

          <div className="panel-title">
            <span>📋</span>

            <div>
              <h2>Case Information</h2>
              <p>Complaint classification and evidence</p>
            </div>
          </div>


          <div className="information-grid">

            <div className="info-item">
              <span>Crime Type</span>
              <strong>{complaint.crimeType}</strong>
            </div>

            <div className="info-item">
              <span>Category</span>
              <strong>{complaint.category}</strong>
            </div>

            <div className="info-item">
              <span>Priority</span>
              <strong className="danger-text">
                {complaint.priority}
              </strong>
            </div>

            <div className="info-item">
              <span>Evidence</span>
              <strong>{complaint.evidence}</strong>
            </div>

          </div>

        </section>


        {/* OFFICER */}

        {officer && (
          <section className="detail-panel officer-assignment">

            <div className="panel-title">
              <span>👮</span>

              <div>
                <h2>Assigned Officer</h2>
                <p>Officer currently handling this case</p>
              </div>
            </div>


            <div className="assigned-officer">

              <img
                src={officer.image}
                alt={officer.name}
              />

              <div className="assigned-officer-info">

                <span className="officer-rank">
                  {officer.rank}
                </span>

                <h2>{officer.name}</h2>

                <p>
                  {officer.department}
                </p>

                <p>
                  📍 {officer.station}
                </p>

                <div className="officer-actions">

                  <a
                    href={`tel:${officer.phone}`}
                    className="call-officer-btn"
                  >
                    📞 Contact Officer
                  </a>

                  <Link
                    to={`/officers/${officer.id}`}
                    className="view-officer-btn"
                  >
                    View Profile →
                  </Link>

                </div>

              </div>

            </div>

          </section>
        )}


        {/* CASE TIMELINE */}

        <section className="detail-panel">

          <div className="panel-title">
            <span>🕒</span>

            <div>
              <h2>Case Timeline</h2>
              <p>Current progress of this complaint</p>
            </div>
          </div>


          <div className="timeline">

            <div className="timeline-item completed">
              <div className="timeline-dot">✓</div>

              <div>
                <h3>Complaint Registered</h3>
                <p>
                  Complaint submitted on {complaint.date}
                </p>
              </div>
            </div>


            <div
              className={`timeline-item ${
                complaint.status !== "Pending"
                  ? "completed"
                  : ""
              }`}
            >
              <div className="timeline-dot">
                {complaint.status !== "Pending" ? "✓" : "2"}
              </div>

              <div>
                <h3>Investigation Started</h3>

                <p>
                  {complaint.status === "Pending"
                    ? "Waiting for investigation"
                    : "Investigation is in progress"}
                </p>
              </div>
            </div>


            <div
              className={`timeline-item ${
                complaint.status === "Resolved"
                  ? "completed"
                  : ""
              }`}
            >
              <div className="timeline-dot">
                {complaint.status === "Resolved"
                  ? "✓"
                  : "3"}
              </div>

              <div>
                <h3>Case Resolution</h3>

                <p>
                  {complaint.status === "Resolved"
                    ? "Case has been resolved."
                    : "Case is awaiting resolution."}
                </p>
              </div>
            </div>

          </div>

        </section>

      </div>


      {/* DESCRIPTION */}

      <section className="description-panel">

        <div className="panel-title">
          <span>📝</span>

          <div>
            <h2>Complaint Description</h2>
            <p>Detailed incident information</p>
          </div>
        </div>

        <p className="full-description">
          {complaint.description}
        </p>

        <div className="last-update">
          Last updated: {complaint.lastUpdated}
        </div>

      </section>

    </div>
  );
}

export default ComplaintDetails;