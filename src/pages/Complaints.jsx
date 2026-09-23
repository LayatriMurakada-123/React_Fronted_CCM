import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ComplaintCard from "../components/ComplaintCard";

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    getComplaints();
  }, []);

  async function getComplaints() {
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load complaints.");
    }
  }

  async function deleteComplaint(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/complaints/${id}`);

      setComplaints(
        complaints.filter(
          (complaint) => complaint.id !== id
        )
      );

      alert("Complaint deleted successfully.");
    } catch (error) {
      console.log(error);
      alert("Unable to delete complaint.");
    }
  }

  const filteredComplaints = complaints.filter(
    (complaint) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
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
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    }
  );

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Pending"
  ).length;

  const investigationComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Under Investigation"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Resolved"
  ).length;

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  return (
    <div className="complaints-page">

      {/* HEADER */}

      <div className="complaints-header">

        <div>
          <span className="page-label">
            CRIMEGUARD PORTAL
          </span>

          <h1>
            Crime Complaints
          </h1>

          <p>
            Search, track and manage registered complaints.
          </p>
        </div>

        <Link
          to="/add-complaint"
          className="add-btn"
        >
          + Register Complaint
        </Link>

      </div>


      {/* SUMMARY CARDS */}

      <div className="complaint-summary">

        <div className="summary-card">
          <div className="summary-icon blue">
            📋
          </div>

          <div>
            <span>Total Cases</span>
            <strong>{totalComplaints}</strong>
          </div>
        </div>


        <div className="summary-card">
          <div className="summary-icon orange">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingComplaints}</strong>
          </div>
        </div>


        <div className="summary-card">
          <div className="summary-icon purple">
            🔎
          </div>

          <div>
            <span>Investigation</span>
            <strong>{investigationComplaints}</strong>
          </div>
        </div>


        <div className="summary-card">
          <div className="summary-icon green">
            ✓
          </div>

          <div>
            <span>Resolved</span>
            <strong>{resolvedComplaints}</strong>
          </div>
        </div>

      </div>


      {/* SEARCH SECTION */}

      <div className="complaint-search-panel">

        <div className="search-heading">

          <div>
            <h2>
              Find a Complaint
            </h2>

            <p>
              Search by complaint number, name,
              crime type or location.
            </p>
          </div>

          <span className="result-count">
            {filteredComplaints.length} Results
          </span>

        </div>


        <div className="complaint-filters">

          <div className="search-input-wrapper">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search complaints..."
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


          <button
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            ↻ Clear
          </button>

        </div>

      </div>


      {/* COMPLAINT LIST */}

      <div className="registered-section">

        <div className="registered-header">

          <div>
            <h2>
              Registered Complaints
            </h2>

            <p>
              Showing{" "}
              <strong>
                {filteredComplaints.length}
              </strong>{" "}
              of {complaints.length} complaints
            </p>
          </div>

        </div>


        {filteredComplaints.length === 0 ? (

          <div className="no-complaints">

            <div className="no-complaints-icon">
              🔍
            </div>

            <h2>
              No Complaints Found
            </h2>

            <p>
              Try changing your search or filters.
            </p>

            <button
              className="clear-empty-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="complaints-grid">

            {filteredComplaints.map(
              (complaint) => (

                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onDelete={deleteComplaint}
                />

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Complaints;