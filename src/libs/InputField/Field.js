const Icon = ({ path }) => (
  <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const Field = ({ label, name, type = "text", placeholder, icon, value, onChange, onBlur, error, helperText }) => (
  <div className="field-wrap">
    <label className="field-label" htmlFor={name}>{label}</label>
    <div className="field-input-wrap">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`field-input${error ? " is-error" : ""}`}
        autoComplete="off"
      />
      <Icon path={icon} />
    </div>
    {error && helperText && <span className="field-error">{helperText}</span>}
  </div>
);
export default Field;