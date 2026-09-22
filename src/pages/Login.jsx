import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { IconEye, IconEyeOff, IconStore } from "../components/Icons.jsx";
import "../styles/login.css";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Enter your registered email or phone number.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "That doesn't look like a valid email.";
    if (!password) next.password = "Enter your password.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
      navigate("/dashboard");
    }, 900);
  };

  return (
    <div className="login">
      <div className="login__panel">
        <div className="login__brand">
          <span className="login__logo" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16l-1.5 12.5a2 2 0 01-2 1.5H7.5a2 2 0 01-2-1.5L4 7z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M9 7V5a3 3 0 016 0v2" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="14" r="1.5" fill="#fff"/></svg></span>
          <span>Vyaparify</span>
        </div>

        <div className="login__intro">
          <h1>Welcome back</h1>
          <p>Log in to manage your store, products and orders.</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email or phone number</label>
            <input
              id="email"
              type="text"
              placeholder="you@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "has-error" : ""}
              autoComplete="username"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="field">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="password">Password</label>
              <a href="#!" className="login__forgot">Forgot password?</a>
            </div>
            <div className="login__password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "has-error" : ""}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login__eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>

          <p className="login__hint">
            Demo — any valid-looking email + 6+ character password works.
          </p>
        </form>

        <p className="login__signup">
          New to Vyaparify? <a href="#!">Create a merchant account</a>
        </p>
      </div>

      <div className="login__showcase">
        <div className="login__showcase-content">
          <IconStore />
          <h2>Run your whole store from one screen</h2>
          <p>Track orders, manage products, and understand your sales — built for local retailers going online.</p>
          <div className="login__showcase-stats">
            <div><strong>72%</strong><span>avg. profile completion boost in first week</span></div>
            <div><strong>3.2×</strong><span>faster order turnaround for active merchants</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
