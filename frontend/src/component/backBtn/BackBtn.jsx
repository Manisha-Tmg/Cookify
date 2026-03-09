import "../backBtn/BackBtn.css";
const BackBtn = ({ label }) => {
  return (
    <header className="profile-header">
      <button className="back-button" onClick={() => window.history.back()}>
        ←
      </button>
      <h3>{label}</h3>
    </header>
  );
};

export default BackBtn;
