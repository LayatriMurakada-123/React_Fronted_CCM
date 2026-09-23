import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

function Statistics() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatistics();
  }, []);

  async function getStatistics() {
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const total = complaints.length;

  const pending = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const investigation = complaints.filter(
    (item) => item.status === "Under Investigation"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const highPriority = complaints.filter(
    (item) => item.priority === "High"
  ).length;

  const mediumPriority = complaints.filter(
    (item) => item.priority === "Medium"
  ).length;

  const lowPriority = complaints.filter(
    (item) => item.priority === "Low"
  ).length;

  const resolutionRate =
    total === 0 ? 0 : Math.round((resolved / total) * 100);

  const crimeTypes = useMemo(() => {
    const data = {};

    complaints.forEach((complaint) => {
      const type = complaint.crimeType;

      if (data[type]) {
        data[type]++;
      } else {
        data[type] = 1;
      }
    });

    return Object.entries(data).sort((a, b) => b[1] - a[1]);
  }, [complaints]);

  const locations = useMemo(() => {
    const data = {};

    complaints.forEach((complaint) => {
      const location = complaint.location;

      if (data[location]) {
        data[location]++;
      } else {
        data[location] = 1;
      }
    });

    return Object.entries(data).sort((a, b) => b[1] - a[1]);
  }, [complaints]);

  const recentComplaints = [...complaints]
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 5);

  if (loading) {
    return (
      <div className="statistics-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Crime Analytics...</h2>
        <p>Please wait while we prepare the statistics.</p>
      </div>
    );
  }

  return (
    <div className="statistics-page">

      {/* HEADER */}

      <div className="statistics-hero">

        <div>
          <span className="analytics-badge">
            📊 CRIMEGUARD ANALYTICS
          </span>

          <h1>Crime Statistics</h1>

          <p>
            Monitor complaints, case progress, priorities
            and crime trends from one dashboard.
          </p>
        </div>

        <div className="analytics-icon">
          📈
        </div>

      </div>


      {/* MAIN STATISTICS */}

      <div className="analytics-cards">

        <div className="analytics-card total-card">
          <div className="analytics-card-icon">
            📋
          </div>

          <div>
            <span>Total Cases</span>
            <h2>{total}</h2>
            <small>Registered complaints</small>
          </div>
        </div>


        <div className="analytics-card pending-card">
          <div className="analytics-card-icon">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <h2>{pending}</h2>
            <small>Awaiting action</small>
          </div>
        </div>


        <div className="analytics-card investigation-card">
          <div className="analytics-card-icon">
            🔎
          </div>

          <div>
            <span>Investigation</span>
            <h2>{investigation}</h2>
            <small>Under investigation</small>
          </div>
        </div>


        <div className="analytics-card resolved-card">
          <div className="analytics-card-icon">
            ✅
          </div>

          <div>
            <span>Resolved</span>
            <h2>{resolved}</h2>
            <small>Closed cases</small>
          </div>
        </div>

      </div>


      {/* RESOLUTION OVERVIEW */}

      <section className="analytics-section">

        <div className="analytics-section-header">
          <div>
            <span className="section-label">
              CASE PERFORMANCE
            </span>

            <h2>Resolution Overview</h2>

            <p>
              Current progress of registered complaints.
            </p>
          </div>
        </div>


        <div className="resolution-layout">

          <div className="resolution-circle">

            <div className="circle-inner">
              <strong>{resolutionRate}%</strong>
              <span>Resolved</span>
            </div>

          </div>


          <div className="resolution-details">

            <div className="progress-item">

              <div className="progress-label">
                <span>Pending</span>
                <strong>{pending}</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill pending-fill"
                  style={{
                    width: `${
                      total
                        ? (pending / total) * 100
                        : 0
                    }%`
                  }}
                ></div>
              </div>

            </div>


            <div className="progress-item">

              <div className="progress-label">
                <span>Under Investigation</span>
                <strong>{investigation}</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill investigation-fill"
                  style={{
                    width: `${
                      total
                        ? (investigation / total) * 100
                        : 0
                    }%`
                  }}
                ></div>
              </div>

            </div>


            <div className="progress-item">

              <div className="progress-label">
                <span>Resolved</span>
                <strong>{resolved}</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill resolved-fill"
                  style={{
                    width: `${
                      total
                        ? (resolved / total) * 100
                        : 0
                    }%`
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* PRIORITY + CRIME TYPE */}

      <div className="analytics-two-column">


        {/* PRIORITY */}

        <section className="analytics-panel">

          <div className="panel-header">
            <div>
              <span className="section-label">
                PRIORITY ANALYSIS
              </span>

              <h2>Case Priority</h2>
            </div>

            <span className="panel-icon">
              🚦
            </span>
          </div>


          <div className="priority-list">

            <div className="priority-row">

              <div className="priority-name">
                <span className="priority-dot high"></span>
                High Priority
              </div>

              <strong>{highPriority}</strong>

            </div>


            <div className="priority-bar">
              <div
                className="high-bar"
                style={{
                  width: `${
                    total
                      ? (highPriority / total) * 100
                      : 0
                  }%`
                }}
              ></div>
            </div>


            <div className="priority-row">

              <div className="priority-name">
                <span className="priority-dot medium"></span>
                Medium Priority
              </div>

              <strong>{mediumPriority}</strong>

            </div>


            <div className="priority-bar">
              <div
                className="medium-bar"
                style={{
                  width: `${
                    total
                      ? (mediumPriority / total) * 100
                      : 0
                  }%`
                }}
              ></div>
            </div>


            <div className="priority-row">

              <div className="priority-name">
                <span className="priority-dot low"></span>
                Low Priority
              </div>

              <strong>{lowPriority}</strong>

            </div>


            <div className="priority-bar">
              <div
                className="low-bar"
                style={{
                  width: `${
                    total
                      ? (lowPriority / total) * 100
                      : 0
                  }%`
                }}
              ></div>
            </div>

          </div>

        </section>


        {/* CRIME TYPES */}

        <section className="analytics-panel">

          <div className="panel-header">

            <div>
              <span className="section-label">
                CRIME ANALYSIS
              </span>

              <h2>Crime Types</h2>
            </div>

            <span className="panel-icon">
              ⚖️
            </span>

          </div>


          <div className="crime-type-list">

            {crimeTypes.length === 0 ? (

              <p className="no-data">
                No crime data available.
              </p>

            ) : (

              crimeTypes.map(([type, count]) => (

                <div
                  className="crime-type-row"
                  key={type}
                >

                  <div className="crime-type-info">

                    <span>
                      {type}
                    </span>

                    <strong>
                      {count}
                    </strong>

                  </div>


                  <div className="crime-type-bar">

                    <div
                      style={{
                        width: `${
                          total
                            ? (count / total) * 100
                            : 0
                        }%`
                      }}
                    ></div>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </div>


      {/* LOCATION ANALYSIS */}

      <section className="analytics-section">

        <div className="analytics-section-header">

          <div>

            <span className="section-label">
              LOCATION ANALYSIS
            </span>

            <h2>Cases by Location</h2>

            <p>
              Locations with registered complaints.
            </p>

          </div>

          <span className="panel-icon">
            📍
          </span>

        </div>


        <div className="location-grid">

          {locations.map(([location, count]) => (

            <div
              className="location-card"
              key={location}
            >

              <div className="location-icon">
                📍
              </div>

              <div>

                <h3>{location}</h3>

                <p>
                  {count} complaint
                  {count !== 1 ? "s" : ""}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* RECENT CASES */}

      <section className="analytics-section">

        <div className="analytics-section-header">

          <div>

            <span className="section-label">
              RECENT ACTIVITY
            </span>

            <h2>Recent Complaints</h2>

            <p>
              Latest registered cases in the system.
            </p>

          </div>

        </div>


        <div className="recent-case-table">

          <div className="table-header">

            <span>Case</span>
            <span>Crime</span>
            <span>Location</span>
            <span>Priority</span>
            <span>Status</span>

          </div>


          {recentComplaints.map((complaint) => (

            <div
              className="table-row"
              key={complaint.id}
            >

              <span className="case-number">
                {complaint.complaintNumber}
              </span>

              <span>
                {complaint.crimeType}
              </span>

              <span>
                📍 {complaint.location}
              </span>

              <span>
                <b
                  className={`priority-badge ${complaint.priority.toLowerCase()}`}
                >
                  {complaint.priority}
                </b>
              </span>

              <span>
                <b
                  className={`case-status ${
                    complaint.status
                      .toLowerCase()
                      .replaceAll(" ", "-")
                  }`}
                >
                  {complaint.status}
                </b>
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* FOOTER MESSAGE */}

      <div className="analytics-footer">

        <div className="analytics-footer-icon">
          🛡️
        </div>

        <div>

          <h3>CrimeGuard Monitoring Center</h3>

          <p>
            Use these statistics to monitor case progress,
            identify high-priority complaints and understand
            complaint trends.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Statistics;