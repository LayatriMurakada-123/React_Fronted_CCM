import { Link } from "react-router-dom";

function CitizenServices() {

  return (
    <div className="page citizen-page">

      {/* Header */}

      <div className="service-header">

        <div>
          <h1>👤 Citizen Services</h1>

          <p>
            Access important services for reporting,
            tracking and managing your complaints.
          </p>
        </div>

      </div>


      {/* Services */}

      <div className="services-grid">

        {/* Register Complaint */}

        <div className="service-card">

          <div className="service-icon">
            📝
          </div>

          <h2>Register Complaint</h2>

          <p>
            Submit a new crime complaint with
            incident details and contact information.
          </p>

          <Link
            to="/add-complaint"
            className="service-btn"
          >
            Register Now →
          </Link>

        </div>


        {/* Track Complaint */}

        <div className="service-card">

          <div className="service-icon">
            🔍
          </div>

          <h2>Track Complaint</h2>

          <p>
            View your registered complaints and
            check their current status.
          </p>

          <Link
            to="/complaints"
            className="service-btn"
          >
            Track Complaint →
          </Link>

        </div>


        {/* Saved Complaints */}

        <div className="service-card">

          <div className="service-icon">
            ❤️
          </div>

          <h2>Saved Complaints</h2>

          <p>
            Quickly access complaints that you
            have saved for future reference.
          </p>

          <Link
            to="/saved-complaints"
            className="service-btn"
          >
            View Saved →
          </Link>

        </div>


        {/* Crime Statistics */}

        <div className="service-card">

          <div className="service-icon">
            📊
          </div>

          <h2>Crime Statistics</h2>

          <p>
            View complaint statistics including
            pending, investigation and resolved cases.
          </p>

          <Link
            to="/statistics"
            className="service-btn"
          >
            View Statistics →
          </Link>

        </div>


        {/* Police Officers */}

        <div className="service-card">

          <div className="service-icon">
            👮
          </div>

          <h2>Police Officers</h2>

          <p>
            View available police officers and
            their assigned departments.
          </p>

          <Link
            to="/officers"
            className="service-btn"
          >
            View Officers →
          </Link>

        </div>


        {/* Emergency */}

        <div className="service-card emergency-service">

          <div className="service-icon">
            🚨
          </div>

          <h2>Emergency Contacts</h2>

          <p>
            Quickly access important emergency
            contact numbers.
          </p>

          <Link
            to="/emergency-contacts"
            className="service-btn emergency-btn"
          >
            Emergency Help →
          </Link>

        </div>

      </div>


      {/* Information Section */}

      <div className="citizen-info">

        <h2>🛡️ Citizen Safety Information</h2>

        <div className="info-grid">

          <div>
            <h3>📌 Report Incidents</h3>

            <p>
              Provide accurate information when
              submitting a complaint.
            </p>
          </div>

          <div>
            <h3>🔐 Protect Your Information</h3>

            <p>
              Do not share passwords, OTPs or
              sensitive account information.
            </p>
          </div>

          <div>
            <h3>📞 Emergency Situations</h3>

            <p>
              For immediate emergencies, use the
              appropriate emergency service.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CitizenServices;