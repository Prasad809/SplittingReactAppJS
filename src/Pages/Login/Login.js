import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "./Store/Action";
import { signInVals, signValidation } from "./validationSchema";
import "./Login.css";
import Field from "../../libs/InputField/Field";


const ICONS = {
  email: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  lock:  "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
};


function Login({ setNxt }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errStatus, setErrStatus] = useState("");
  const errClose = () => setErrStatus("");

  const handleSubmit = (values) => {
    const isPhone = (v) => /^[0-9]{10}$/.test(v);
    const value = values.email;
    const payload = {
      password: values.password,
      ...(isPhone(value) ? { phone: value } : { email: value }),
    };
    dispatch(authAction(payload)).then((res) => {
      if (res?.payload?.data?.status) {
        navigate("/Dashboard");
        setNxt("1");
      } else {
        setErrStatus(res?.payload?.data?.message?.[0]?.description);
      }
    });
  };

  return (
    <div className="login-page">

      {/* ── Right: branding panel (desktop only, renders on right side) ── */}
      <div className="login-panel-left">
        <div>
          <div className="login-logo">
            <div className="login-logo-icon">✂️</div>
            <span className="login-logo-text">Split<span>Wise</span></span>
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.4rem",
            color: "var(--text)", lineHeight: 1.15, marginTop: "56px", letterSpacing: "-1px"
          }}>
            Welcome<br />
            <span style={{ color: "var(--accent)" }}>back.</span>
          </h1>
          <p style={{
            color: "var(--muted)", marginTop: "18px", fontSize: "1rem",
            fontWeight: 300, lineHeight: 1.7, maxWidth: "300px"
          }}>
            Pick up where you left off — your balances, groups, and history are waiting.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "70px" }}>
          {[
            { icon: "👥", label: "See who owes who" },
            { icon: "⚡", label: "Settle up in one tap" },
            { icon: "📅", label: "Full expense history" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.2rem" }}>{icon}</span>
              <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Left: form panel ── */}
      <div className="login-panel-right">

        {/* Mobile top bar */}
        {/* <div className="login-topbar">
          <div className="login-logo">
            <div className="login-logo-icon">✂️</div>
            <span className="login-logo-text">Split<span>Wise</span></span>
          </div>
        </div> */}

        <div className="login-card">

          {/* In-card logo — desktop only */}
          <div className="login-logo login-logo--mobile">
            <div className="login-logo-icon">✂️</div>
            <span className="login-logo-text">Split<span>Wise</span></span>
          </div>

          <h2 className="login-heading">Sign in</h2>
          <p className="login-subtext">Good to see you again 👋</p>

          {/* Error alert */}
          {errStatus && (
            <div className="login-alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errStatus}
              <button className="login-alert-close" onClick={errClose} aria-label="Close">×</button>
            </div>
          )}

          <Formik
            initialValues={signInVals}
            validationSchema={signValidation}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form noValidate>
                <div className="login-field-group">
                  <Field
                    label="Email or Phone"
                    name="email"
                    placeholder="jane@example.com or 9876543210"
                    iconPath={ICONS.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <div>
                    <Field
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      iconPath={ICONS.lock}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <div className="login-forgot">
                      <a href="#">Forgot password?</a>
                    </div>
                  </div>
                </div>

                <button type="submit" className="login-btn">
                  Sign In →
                </button>
              </Form>
            )}
          </Formik>

          <p className="login-footer">
            Don't have an account?
            <a onClick={() => navigate("/")} role="button" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/")}>
              Sign Up
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
