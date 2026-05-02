import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterAction } from "./Store/Action";
import { initialValues, validation } from "./validationSchema";
import "./SignUp.css";

// Simple icon components (swap with your icon lib if preferred)
const Icon = ({ path }) => (
  <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const ICONS = {
  user:  "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  email: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  lock:  "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
};

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

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const payload = {
      email:    values.email,
      name:     values.fullName,
      password: values.password,
      phone:    values.phone,
    };
    dispatch(RegisterAction(payload)).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="signup-page">

      {/* ── Left branding panel (desktop only) ── */}
      <div className="signup-panel-left">
        <div>
          <div className="signup-logo">
            <div className="signup-logo-icon">✂️</div>
            <span className="signup-logo-text">Split<span>Wise</span></span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.4rem",
            color: "var(--text)", lineHeight: 1.15, marginTop: "56px", letterSpacing: "-1px" }}>
            Split bills.<br />
            <span style={{ color: "var(--accent)" }}>Zero drama.</span>
          </h1>
          <p style={{ color: "var(--muted)", marginTop: "18px", fontSize: "1rem",
            fontWeight: 300, lineHeight: 1.7, maxWidth: "320px" }}>
            Add expenses, split with friends, and settle up instantly — all in one place.
          </p>
        </div>

        {/* Feature bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
          {[
            { icon: "💸", label: "Instant expense splitting" },
            { icon: "📊", label: "Track balances in real time" },
            { icon: "🔒", label: "Secure & private" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.2rem" }}>{icon}</span>
              <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="signup-panel-right">

        {/* Mobile top bar — visible only on mobile */}
        {/* <div className="mobile-topbar">
          <div className="signup-logo">
            <div className="signup-logo-icon">✂️</div>
            <span className="signup-logo-text">Split<span>Wise</span></span>
          </div>
        </div> */}

        <div className="signup-card">

          {/* Logo inside card — visible only on desktop */}
          <div className="signup-logo signup-logo--mobile">
            <div className="signup-logo-icon">✂️</div>
            <span className="signup-logo-text">Split<span>Wise</span></span>
          </div>

        {/* Heading */}
        <h2 className="signup-heading">Create your account</h2>
        <p className="signup-subtext">Split bills. Settle up. Stay friends.</p>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form noValidate>
              <div className="field-group">
                <Field
                  label="Full Name"
                  name="fullName"
                  placeholder="Jane Doe"
                  icon={ICONS.user}
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />
                <Field
                  label="Email"
                  name="email"
                  placeholder="jane@example.com"
                  icon={ICONS.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  placeholder="+91 98765 43210"
                  icon={ICONS.phone}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  icon={ICONS.lock}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>

              <button type="submit" className="signup-btn">
                Create Account →
              </button>
            </Form>
          )}
        </Formik>

        <p className="signup-footer">
          Already have an account?
          <a onClick={() => navigate("/login")} role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/login")}>
            Sign In
          </a>
        </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
