import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addComplaint } from "../features/savedComplaintSlice";

function ComplaintCard({ complaint, onDelete }) {

  const dispatch = useDispatch();

  function saveComplaint() {
    dispatch(addComplaint(complaint));
    alert("Complaint saved successfully!");
  }

  return (
    <div className="complaint-card">

      <div className="complaint-image-wrapper">

        <img
          src={complaint.image}
          alt={complaint.crimeType}
          className="complaint-image"
        />

        <span
          className={`priority-pill ${complaint.priority.toLowerCase()}`}
        >
          {complaint.priority}
        </span>

      </div>


      <div className="complaint-card-content">

        <div className="card-header">

          <div>
            <span className="case-label">
              CASE
            </span>

            <h3>
              {complaint.complaintNumber}
            </h3>
          </div>

          <span
            className={`status ${complaint.status
              .toLowerCase()
              .replaceAll(" ", "-")}`}
          >
            {complaint.status}
          </span>

        </div>


        <h2>{complaint.crimeType}</h2>


        <div className="complaint-info-row">
          <span>👤</span>
          <p>{complaint.complainantName}</p>
        </div>

        <div className="complaint-info-row">
          <span>📍</span>
          <p>{complaint.location}</p>
        </div>

        <div className="complaint-info-row">
          <span>📅</span>
          <p>{complaint.date}</p>
        </div>


        <div className="card-buttons">

          <button
            className="save-btn"
            onClick={saveComplaint}
          >
            ❤️ Save
          </button>

          <Link
            className="details-btn"
            to={`/complaints/${complaint.id}`}
          >
            View Details →
          </Link>

          {onDelete && (
            <button
              className="delete-btn"
              onClick={() => onDelete(complaint.id)}
            >
              Delete
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ComplaintCard;