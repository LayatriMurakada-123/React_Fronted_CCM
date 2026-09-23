function StateCard({
  icon,
  title,
  value,
  description,
  className = ""
}) {
  return (
    <div className={`state-card ${className}`}>

      <div className="state-icon">
        {icon}
      </div>

      <div className="state-content">

        <h3>
          {title}
        </h3>

        <h2>
          {value}
        </h2>

        <p>
          {description}
        </p>

      </div>

    </div>
  );
}

export default StateCard;