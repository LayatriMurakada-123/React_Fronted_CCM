import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  removeComplaint,
  clearSaved
} from "../features/savedComplaintSlice";

function SavedComplaints() {
  const dispatch = useDispatch();

  const savedComplaints = useSelector(
    (state) => state.savedComplaints
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  /* =========================
     FILTER COMPLAINTS
  ========================== */

  const filteredComplaints = savedComplaints
    .filter((complaint) => {
      const searchText = search.toLowerCase();

      return (
        complaint.complaintNumber
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.complainantName
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.crimeType
          ?.toLowerCase()
          .includes(searchText) ||
        complaint.location
          ?.toLowerCase()
          .includes(searchText)
      );
    })
    .filter((complaint) => {
      if (statusFilter === "All") {
        return true;
      }

      return complaint.status === statusFilter;
    })
    .filter((complaint) => {
      if (priorityFilter === "All") {
        return true;
      }

      return complaint.priority === priorityFilter;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return Number(b.id) - Number(a.id);
      }

      if (sortBy === "oldest") {
        return Number(a.id) - Number(b.id);
      }

      if (sortBy === "priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3
        };

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );
      }

      if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }

      return 0;
    });

  /* =========================
     STATISTICS
  ========================== */

  const totalSaved = savedComplaints.length;

  const highPriority = savedComplaints.filter(
    (complaint) => complaint.priority === "High"
  ).length;

  const pendingCases = savedComplaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const investigationCases = savedComplaints.filter(
    (complaint) =>
      complaint.status === "Under Investigation"
  ).length;

  const resolvedCases = savedComplaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  /* =========================
     CLEAR ALL
  ========================== */

  function handleClearAll() {
    if (savedComplaints.length === 0) {
      return;
    }

    const confirmClear = window.confirm(
      "Are you sure you want to remove all saved complaints?"
    );

    if (confirmClear) {
      dispatch(clearSaved());
    }
  }

  /* =========================
     REMOVE
  ========================== */

  function handleRemove(id) {
    dispatch(removeComplaint(id));
  }

  return (
    <div className="saved-complaints-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="saved-hero">

        <div className="saved-hero-content">

          <span className="saved-badge">
            ❤️ SAVED CASES
          </span>

          <h1>
            Saved Complaints
          </h1>

          <p>
            Quickly access complaints that you have
            saved for future reference.
          </p>

        </div>

        <div className="saved-hero-icon">
          ❤️
        </div>

      </section>


      {/* =========================
          STATISTICS
      ========================== */}

      <section className="saved-stats-grid">

        <div className="saved-stat-card">

          <div className="saved-stat-icon">
            ❤️
          </div>

          <div>
            <span>Total Saved</span>
            <h2>{totalSaved}</h2>
          </div>

        </div>


        <div className="saved-stat-card high">

          <div className="saved-stat-icon">
            🔴
          </div>

          <div>
            <span>High Priority</span>
            <h2>{highPriority}</h2>
          </div>

        </div>


        <div className="saved-stat-card pending">

          <div className="saved-stat-icon">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <h2>{pendingCases}</h2>
          </div>

        </div>


        <div className="saved-stat-card investigation">

          <div className="saved-stat-icon">
            🔎
          </div>

          <div>
            <span>Investigation</span>
            <h2>{investigationCases}</h2>
          </div>

        </div>


        <div className="saved-stat-card resolved">

          <div className="saved-stat-icon">
            ✅
          </div>

          <div>
            <span>Resolved</span>
            <h2>{resolvedCases}</h2>
          </div>

        </div>

      </section>


      {/* =========================
          FILTER SECTION
      ========================== */}

      <section className="saved-controls">

        <div className="saved-controls-header">

          <div>
            <h2>🔎 Find Saved Cases</h2>

            <p>
              Search and filter your saved complaints.
            </p>
          </div>

          {savedComplaints.length > 0 && (
            <button
              className="clear-saved-btn"
              onClick={handleClearAll}
            >
              🗑️ Clear All
            </button>
          )}

        </div>


        <div className="saved-filter-grid">

          <div className="saved-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search complaint, person, crime or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Under Investigation">
              Under Investigation
            </option>

            <option value="Resolved">
              Resolved
            </option>
          </select>


          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >
            <option value="All">
              All Priority
            </option>

            <option value="High">
              High Priority
            </option>

            <option value="Medium">
              Medium Priority
            </option>

            <option value="Low">
              Low Priority
            </option>
          </select>


          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="latest">
              Latest Saved
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="priority">
              Priority
            </option>

            <option value="status">
              Status
            </option>
          </select>

        </div>

      </section>


      {/* =========================
          RESULTS HEADER
      ========================== */}

      <section className="saved-results-header">

        <div>

          <h2>
            📋 Saved Cases
          </h2>

          <p>
            Showing{" "}
            <strong>
              {filteredComplaints.length}
            </strong>{" "}
            of{" "}
            <strong>
              {savedComplaints.length}
            </strong>{" "}
            saved complaints
          </p>

        </div>

        <Link
          to="/complaints"
          className="browse-complaints-btn"
        >
          + Browse Complaints
        </Link>

      </section>


      {/* =========================
          EMPTY STATE
      ========================== */}

      {savedComplaints.length === 0 && (

        <div className="saved-empty-state">

          <div className="empty-heart">
            ❤️
          </div>

          <h2>
            No Saved Complaints
          </h2>

          <p>
            You haven't saved any complaints yet.
            Save important cases from the Complaints page
            for quick access.
          </p>

          <Link
            to="/complaints"
            className="browse-btn"
          >
            🔎 Browse Complaints
          </Link>

        </div>

      )}


      {/* =========================
          NO SEARCH RESULTS
      ========================== */}

      {savedComplaints.length > 0 &&
        filteredComplaints.length === 0 && (

        <div className="saved-empty-state">

          <div className="empty-heart">
            🔍
          </div>

          <h2>
            No Matching Complaints
          </h2>

          <p>
            Try changing your search or filter options.
          </p>

          <button
            className="browse-btn"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setPriorityFilter("All");
            }}
          >
            ↻ Reset Filters
          </button>

        </div>

      )}


      {/* =========================
          COMPLAINT CARDS
      ========================== */}

      {filteredComplaints.length > 0 && (

        <div className="saved-complaints-grid">

          {filteredComplaints.map((complaint) => (

            <article
              className="saved-complaint-card"
              key={complaint.id}
            >

              {/* CARD TOP */}

              <div className="saved-card-top">

                <div className="case-number">
                  {complaint.complaintNumber}
                </div>

                <span
                  className={`saved-priority ${complaint.priority
                    ?.toLowerCase()}`}
                >
                  {complaint.priority}
                </span>

              </div>


              {/* TITLE */}

              <div className="saved-card-title">

                <div className="crime-icon">
                  🚨
                </div>

                <div>

                  <h2>
                    {complaint.crimeType}
                  </h2>

                  <p>
                    {complaint.location}
                  </p>

                </div>

              </div>


              {/* DETAILS */}

              <div className="saved-card-details">

                <div className="saved-detail">

                  <span>
                    👤 Complainant
                  </span>

                  <strong>
                    {complaint.complainantName}
                  </strong>

                </div>


                <div className="saved-detail">

                  <span>
                    📅 Date
                  </span>

                  <strong>
                    {complaint.date}
                  </strong>

                </div>


                <div className="saved-detail">

                  <span>
                    🕐 Time
                  </span>

                  <strong>
                    {complaint.time}
                  </strong>

                </div>


                <div className="saved-detail">

                  <span>
                    📍 Location
                  </span>

                  <strong>
                    {complaint.location}
                  </strong>

                </div>

              </div>


              {/* STATUS */}

              <div className="saved-status-row">

                <span className="saved-status-label">
                  Case Status
                </span>

                <span
                  className={`saved-status ${complaint.status
                    ?.toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {complaint.status}
                </span>

              </div>


              {/* OFFICER */}

              <div className="assigned-officer">

                <div className="officer-mini-icon">
                  👮
                </div>

                <div>

                  <span>
                    Assigned Officer
                  </span>

                  <strong>
                    {complaint.assignedOfficer ||
                      "Not Assigned"}
                  </strong>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="saved-description">

                <span>
                  Complaint Description
                </span>

                <p>
                  {complaint.description}
                </p>

              </div>


              {/* ACTIONS */}

              <div className="saved-card-actions">

                <Link
                  to={`/complaints/${complaint.id}`}
                  className="saved-view-btn"
                >
                  👁️ View Details
                </Link>

                <button
                  className="saved-remove-btn"
                  onClick={() =>
                    handleRemove(complaint.id)
                  }
                >
                  🗑️ Remove
                </button>

              </div>

            </article>

          ))}

        </div>

      )}


      {/* =========================
          BOTTOM INFORMATION
      ========================== */}

      {savedComplaints.length > 0 && (

        <section className="saved-info-banner">

          <div className="saved-info-icon">
            🛡️
          </div>

          <div>

            <h2>
              Keep Important Cases Accessible
            </h2>

            <p>
              Saved complaints help you quickly access
              important case information without searching
              through the complete complaint list.
            </p>

          </div>

          <Link
            to="/statistics"
            className="saved-info-btn"
          >
            View Statistics →
          </Link>

        </section>

      )}

    </div>
  );
}

export default SavedComplaints;