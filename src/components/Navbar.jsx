import {
  Link,
  NavLink
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

function Navbar() {

  const savedComplaints =
    useSelector(
      state => state.savedComplaints
    );

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        🚨 CrimeGuard
      </Link>

      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        {user && (
          <>
            <NavLink to="/complaints">
              Complaints
            </NavLink>

            <NavLink to="/officers">
              Officers
            </NavLink>

            <NavLink to="/statistics">
              Statistics
            </NavLink>

            <NavLink to="/saved-complaints">
              ❤️ Saved
              ({savedComplaints.length})
            </NavLink>
          </>
        )}

        <NavLink to="/emergency-contacts">
          🚨 Emergency
        </NavLink>

        {!user && (
          <>
            <NavLink to="/register">
              Register
            </NavLink>

            <NavLink to="/login">
              Login
            </NavLink>
          </>
        )}

        {user && (
          <>

            <span className="user-badge">
              👤 {user.name}
            </span>

            <NavLink to="/logout">
              Logout
            </NavLink>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;