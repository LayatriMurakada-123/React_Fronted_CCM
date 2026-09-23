import { useState } from "react";

function EmergencyContacts() {
  const [location, setLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState(
    "Click the button to find your current location."
  );
  const [loading, setLoading] = useState(false);

  const emergencyContacts = [
    {
      icon: "🚔",
      title: "Police",
      number: "112",
      description: "Emergency Police Assistance",
      color: "red"
    },
    {
      icon: "🚑",
      title: "Ambulance",
      number: "108",
      description: "Medical Emergency",
      color: "blue"
    },
    {
      icon: "🔥",
      title: "Fire & Rescue",
      number: "101",
      description: "Fire and Rescue Services",
      color: "orange"
    },
    {
      icon: "👩",
      title: "Women Helpline",
      number: "181",
      description: "Women Support Helpline",
      color: "pink"
    },
    {
      icon: "💻",
      title: "Cyber Crime",
      number: "1930",
      description: "Report Cyber Crime",
      color: "purple"
    },
    {
      icon: "👶",
      title: "Child Helpline",
      number: "1098",
      description: "Child Protection Assistance",
      color: "green"
    }
  ];

  function callNumber(number) {
    window.location.href = `tel:${number}`;
  }

  async function copyNumber(number) {
    try {
      await navigator.clipboard.writeText(number);
      alert(`Emergency number ${number} copied!`);
    } catch (error) {
      console.log(error);
    }
  }

  function findMyLocation() {
    setLoading(true);
    setLocationMessage("Detecting your location...");

    if (!navigator.geolocation) {
      setLocationMessage(
        "Geolocation is not supported by your browser."
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude
        });

        setLocationMessage(
          "Your current location has been detected."
        );

        setLoading(false);
      },
      (error) => {
        console.log(error);

        setLocationMessage(
          "Unable to detect your location. Please allow location permission."
        );

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  function openGoogleMaps() {
    if (!location) {
      alert("Please find your location first.");
      return;
    }

    const url =
      `https://www.google.com/maps/search/?api=1&query=` +
      `${location.latitude},${location.longitude}`;

    window.open(url, "_blank");
  }

  function findNearbyPolice() {
    if (!location) {
      alert("Please find your location first.");
      return;
    }

    const url =
      `https://www.google.com/maps/search/?api=1` +
      `&query=police+station+near+${location.latitude},${location.longitude}`;

    window.open(url, "_blank");
  }

  function findNearbyHospital() {
    if (!location) {
      alert("Please find your location first.");
      return;
    }

    const url =
      `https://www.google.com/maps/search/?api=1` +
      `&query=hospital+near+${location.latitude},${location.longitude}`;

    window.open(url, "_blank");
  }

  return (
    <div className="emergency-page">

      {/* HERO */}
      <section className="emergency-hero">

        <div className="emergency-hero-content">

          <span className="emergency-badge">
            🚨 EMERGENCY ASSISTANCE
          </span>

          <h1>
            Emergency Contacts
          </h1>

          <p>
            Get quick access to emergency services,
            locate your current position and find
            nearby assistance.
          </p>

          <div className="emergency-hero-buttons">

            <button
              className="hero-location-btn"
              onClick={findMyLocation}
            >
              📍 Find My Location
            </button>

            <button
              className="hero-map-btn"
              onClick={openGoogleMaps}
            >
              🗺️ Open Google Maps
            </button>

          </div>

        </div>

        <div className="emergency-hero-icon">
          🚨
        </div>

      </section>


      {/* EMERGENCY NUMBERS */}
      <section className="emergency-section">

        <div className="emergency-section-heading">

          <div>
            <span className="section-label">
              QUICK ACCESS
            </span>

            <h2>
              Emergency Services
            </h2>

            <p>
              Contact the appropriate service immediately
              during an emergency.
            </p>
          </div>

          <div className="emergency-status">
            <span></span>
            Services Available
          </div>

        </div>


        <div className="emergency-contact-grid">

          {emergencyContacts.map((contact) => (

            <div
              className={`emergency-contact-card ${contact.color}`}
              key={contact.number}
            >

              <div className="emergency-card-top">

                <div className="emergency-contact-icon">
                  {contact.icon}
                </div>

                <span className="available-badge">
                  Available
                </span>

              </div>

              <h3>
                {contact.title}
              </h3>

              <p>
                {contact.description}
              </p>

              <div className="emergency-number">
                {contact.number}
              </div>

              <div className="emergency-card-buttons">

                <button
                  className="call-button"
                  onClick={() =>
                    callNumber(contact.number)
                  }
                >
                  📞 Call Now
                </button>

                <button
                  className="copy-button"
                  onClick={() =>
                    copyNumber(contact.number)
                  }
                >
                  📋
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* LOCATION SECTION */}
      <section className="location-section">

        <div className="location-header">

          <div>
            <span className="section-label">
              LOCATION SERVICES
            </span>

            <h2>
              📍 Find Your Location
            </h2>

            <p>
              Use your device location to quickly open
              your position in Google Maps.
            </p>
          </div>

        </div>


        <div className="location-panel">

          <div className="location-info">

            <div className="location-big-icon">
              📍
            </div>

            <div>

              <h3>
                Current Location
              </h3>

              <p>
                {locationMessage}
              </p>

              {location && (
                <div className="coordinates">

                  <div>
                    <strong>Latitude</strong>
                    <span>
                      {location.latitude.toFixed(6)}
                    </span>
                  </div>

                  <div>
                    <strong>Longitude</strong>
                    <span>
                      {location.longitude.toFixed(6)}
                    </span>
                  </div>

                </div>
              )}

            </div>

          </div>


          <div className="location-actions">

            <button
              className="location-primary-btn"
              onClick={findMyLocation}
              disabled={loading}
            >
              {loading
                ? "📍 Detecting..."
                : "📍 Detect My Location"}
            </button>

            <button
              className="location-secondary-btn"
              onClick={openGoogleMaps}
            >
              🗺️ View on Google Maps
            </button>

          </div>

        </div>

      </section>


      {/* NEARBY HELP */}
      <section className="nearby-section">

        <div className="nearby-heading">

          <span className="section-label">
            NEARBY ASSISTANCE
          </span>

          <h2>
            Find Help Near You
          </h2>

          <p>
            Locate important emergency services around
            your current position.
          </p>

        </div>


        <div className="nearby-grid">

          <div className="nearby-card">

            <div className="nearby-icon">
              👮
            </div>

            <div>
              <h3>
                Nearby Police Station
              </h3>

              <p>
                Find police stations near your current
                location.
              </p>

              <button
                onClick={findNearbyPolice}
              >
                📍 Find Police Station
              </button>
            </div>

          </div>


          <div className="nearby-card">

            <div className="nearby-icon">
              🏥
            </div>

            <div>
              <h3>
                Nearby Hospital
              </h3>

              <p>
                Find hospitals and medical assistance
                near you.
              </p>

              <button
                onClick={findNearbyHospital}
              >
                📍 Find Hospital
              </button>
            </div>

          </div>

        </div>

      </section>


      {/* SAFETY TIPS */}
      <section className="safety-section">

        <div className="safety-heading">

          <span className="section-label">
            SAFETY FIRST
          </span>

          <h2>
            🛡️ Emergency Safety Guidelines
          </h2>

        </div>


        <div className="safety-grid">

          <div className="safety-card">
            <span>01</span>
            <h3>Stay Calm</h3>
            <p>
              Stay calm and clearly explain the
              emergency to the service operator.
            </p>
          </div>

          <div className="safety-card">
            <span>02</span>
            <h3>Share Your Location</h3>
            <p>
              Provide your exact location or use the
              location feature on this page.
            </p>
          </div>

          <div className="safety-card">
            <span>03</span>
            <h3>Follow Instructions</h3>
            <p>
              Follow the instructions provided by
              emergency personnel.
            </p>
          </div>

          <div className="safety-card">
            <span>04</span>
            <h3>Stay Safe</h3>
            <p>
              Move to a safe location if possible and
              avoid unnecessary risk.
            </p>
          </div>

        </div>

      </section>


      {/* IMPORTANT NOTICE */}
      <section className="emergency-notice">

        <div className="notice-icon">
          ⚠️
        </div>

        <div>

          <h2>
            Important Notice
          </h2>

          <p>
            Use emergency numbers only when immediate
            assistance is required. For non-emergency
            matters, use the complaint registration and
            tracking features available in CrimeGuard.
          </p>

        </div>

      </section>

    </div>
  );
}

export default EmergencyContacts;