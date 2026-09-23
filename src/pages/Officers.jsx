import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";


function Officers() {
  const [officers, setOfficers] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");

  useEffect(() => {
    getOfficers();
  }, []);

  async function getOfficers() {
    try {
      const response = await api.get("/officers");
      setOfficers(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load officers");
    }
  }

  async function deleteOfficer(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this officer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/officers/${id}`);

      setOfficers(
        officers.filter((officer) => officer.id !== id)
      );

      alert("Officer deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Unable to delete officer");
    }
  }

  const filteredOfficers = officers.filter((officer) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      officer.name.toLowerCase().includes(searchText) ||
      officer.badgeNumber.toLowerCase().includes(searchText) ||
      officer.department.toLowerCase().includes(searchText) ||
      officer.station.toLowerCase().includes(searchText);

    const matchesDepartment =
      department === "All Departments" ||
      officer.department === department;

    const matchesStatus =
      status === "All Status" ||
      officer.status === status;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus
    );
  });

  const totalOfficers = officers.length;

  const activeOfficers = officers.filter(
    (officer) => officer.status === "Active"
  ).length;

  const inactiveOfficers = officers.filter(
    (officer) => officer.status !== "Active"
  ).length;

  const departments = [
    ...new Set(officers.map((officer) => officer.department))
  ];

  return (
    <div className="officers-page">

      {/* HEADER */}
      <section className="officers-hero">

        <div className="officers-hero-content">

          <span className="page-badge">
            👮 CRIMEGUARD POLICE DIRECTORY
          </span>

          <h1>
            Police
            <span> Officers</span>
          </h1>

          <p>
            View police officers, departments, police
            stations and assigned responsibilities.
          </p>

        </div>

        <div className="officer-hero-icon">
          👮
        </div>

      </section>


      {/* STATISTICS */}
      <section className="officer-stats">

        <div className="officer-stat-card">

          <div className="officer-stat-icon">
            👮
          </div>

          <div>
            <span>Total Officers</span>
            <h2>{totalOfficers}</h2>
            <p>Registered officers</p>
          </div>

        </div>


        <div className="officer-stat-card active-officer">

          <div className="officer-stat-icon">
            🟢
          </div>

          <div>
            <span>Active Officers</span>
            <h2>{activeOfficers}</h2>
            <p>Currently active</p>
          </div>

        </div>


        <div className="officer-stat-card station-officer">

          <div className="officer-stat-icon">
            🏢
          </div>

          <div>
            <span>Departments</span>
            <h2>{departments.length}</h2>
            <p>Crime departments</p>
          </div>

        </div>


        <div className="officer-stat-card inactive-officer">

          <div className="officer-stat-icon">
            ⏸️
          </div>

          <div>
            <span>Inactive</span>
            <h2>{inactiveOfficers}</h2>
            <p>Currently inactive</p>
          </div>

        </div>

      </section>


      {/* SEARCH & FILTER */}
      <section className="officer-filter-section">

        <div className="filter-title">

          <div>
            <h2>🔍 Find an Officer</h2>

            <p>
              Search officers by name, badge, department
              or police station.
            </p>
          </div>

          <span className="result-count">
            {filteredOfficers.length} Results
          </span>

        </div>


        <div className="officer-filters">

          <div className="search-box">

            <span>🔎</span>

            <input
              type="text"
              placeholder="Search officers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
          >

            <option>All Departments</option>

            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}

          </select>


          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>

          </select>


          <button
            className="clear-officer-btn"
            onClick={() => {
              setSearch("");
              setDepartment("All Departments");
              setStatus("All Status");
            }}
          >
            ↻ Clear
          </button>

        </div>

      </section>


      {/* OFFICER LIST */}
      <section className="officer-list-section">

        <div className="officer-list-heading">

          <div>
            <h2>👮 Registered Officers</h2>

            <p>
              Showing {filteredOfficers.length} of{" "}
              {officers.length} officers
            </p>
          </div>

        </div>


        {filteredOfficers.length === 0 ? (

          <div className="officer-empty">

            <div>🔍</div>

            <h2>No Officers Found</h2>

            <p>
              Try changing your search or filter options.
            </p>

          </div>

        ) : (

          <div className="officers-grid">

            {filteredOfficers.map((officer) => (

              <div
                className="professional-officer-card"
                key={officer.id}
              >

                {/* CARD TOP */}
                <div className="officer-card-top">

                  <div className="officer-avatar-large">
                    👮
                  </div>

                  <div className="officer-status">

                    <span
                      className={
                        officer.status === "Active"
                          ? "active-status"
                          : "inactive-status"
                      }
                    >
                      ● {officer.status}
                    </span>

                  </div>

                </div>


                {/* NAME */}
                <div className="officer-main-info">

                  <span className="officer-rank">
                    {officer.rank}
                  </span>

                  <h2>{officer.name}</h2>

                  <p className="officer-department">
                    🛡️ {officer.department}
                  </p>

                </div>


                {/* DETAILS */}
                <div className="officer-details-list">

                  <div className="officer-detail-row">

                    <span>🪪</span>

                    <div>
                      <small>Badge Number</small>
                      <strong>
                        {officer.badgeNumber}
                      </strong>
                    </div>

                  </div>


                  <div className="officer-detail-row">

                    <span>📍</span>

                    <div>
                      <small>Police Station</small>
                      <strong>
                        {officer.station}
                      </strong>
                    </div>

                  </div>


                  <div className="officer-detail-row">

                    <span>📞</span>

                    <div>
                      <small>Phone</small>
                      <strong>
                        {officer.phone}
                      </strong>
                    </div>

                  </div>

                </div>


                {/* BUTTONS */}
                <div className="officer-card-buttons">

                  <Link
                    to={`/officers/${officer.id}`}
                    className="officer-view-btn"
                  >
                    👁️ View Profile
                  </Link>


                  <a
                    href={`tel:${officer.phone}`}
                    className="officer-call-btn"
                  >
                    📞 Call
                  </a>


                  <a
                    href={`mailto:${officer.email}`}
                    className="officer-email-btn"
                  >
                    ✉️
                  </a>


                  <button
                    className="officer-delete-btn"
                    onClick={() =>
                      deleteOfficer(officer.id)
                    }
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* INFORMATION BANNER */}
      <section className="officer-info-banner">

        <div className="officer-info-icon">
          🛡️
        </div>

        <div>

          <h2>CrimeGuard Officer Directory</h2>

          <p>
            Use this directory to view officer profiles,
            police stations, departments and contact
            information associated with the complaint
            management system.
          </p>

        </div>

        <Link
          to="/complaints"
          className="officer-info-btn"
        >
          View Complaints →
        </Link>

      </section>

    </div>
  );
}

export default Officers;