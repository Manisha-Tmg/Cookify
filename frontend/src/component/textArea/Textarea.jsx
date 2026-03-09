import "../textArea/TextArea.css";

const Textarea = ({ label, id, value, onChange }) => {
  return (
    <div className="form-container">
      <label className="label1" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className="text-field"
      ></textarea>
    </div>
  );
};

export default Textarea;
