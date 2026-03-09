import "../input/Input.css";
const Input = ({ label, value, id, onChange, type }) => {
  return (
    <div className="form-container">
      <label htmlFor={id} className="label1">
        {label}
      </label>
      <input type={type} name="" id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
