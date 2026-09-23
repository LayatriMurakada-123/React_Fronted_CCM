import Navbar from "./components/Navbar";

import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <>
      <Navbar />

      <main className="main-container">

        <AppRoutes />

      </main>

      <footer className="footer">

        <h3>
          🚨 CrimeGuard
        </h3>

        <p>
          Crime Complaint Management System
        </p>

      </footer>
    </>
  );
}

export default App;