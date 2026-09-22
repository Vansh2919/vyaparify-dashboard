import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { IconStore } from "../components/Icons.jsx";
import "../styles/dashboard.css";
import "../styles/product-form.css";

export default function Settings() {
  const { storeInfo, toggleStoreStatus } = useApp();
  const [form, setForm] = useState({
    name: storeInfo.name,
    location: storeInfo.location,
    phone: storeInfo.phone || "",
    email: storeInfo.email || "",
    gst: storeInfo.gst || "",
    hours: storeInfo.hours || "10:00 AM – 9:00 PM",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Store settings</h1>
          <p>Manage your store profile, hours and visibility</p>
        </div>
      </div>

      <div className="settings-grid">
        <form className="card" onSubmit={handleSave}>
          <div className="card__head">
            <h3>Store profile</h3>
          </div>

          <div className="field">
            <label>Store name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Location / Address</label>
            <input name="location" value={form.location} onChange={handleChange} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>GST number</label>
              <input name="gst" value={form.gst} onChange={handleChange} placeholder="e.g. 23AAAAA0000A1Z5" />
            </div>
            <div className="field">
              <label>Business hours</label>
              <input name="hours" value={form.hours} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
            <button type="submit" className="btn btn--primary">Save changes</button>
            {saved && <span style={{ color: "var(--teal)", fontWeight: 600, fontSize: 13.5 }}>✓ Saved</span>}
          </div>
        </form>

        <div className="card">
          <div className="card__head">
            <h3>Store visibility</h3>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 18, lineHeight: 1.5 }}>
            When your store is open, customers can place orders. Close it when you're not accepting new orders.
          </p>
          <button
            className={`store-status-btn store-status-btn--${storeInfo.status}`}
            onClick={toggleStoreStatus}
          >
            <IconStore />
            <div>
              <strong>{storeInfo.name}</strong>
              <span>{storeInfo.status === "open" ? "Open for orders" : "Currently closed"}</span>
            </div>
            <em>{storeInfo.status === "open" ? "Click to close" : "Click to open"}</em>
          </button>

          <div className="completion-widget" style={{ marginTop: 28 }}>
            <div className="completion-widget__head">
              <span>Profile completion</span>
              <strong>{storeInfo.completion}%</strong>
            </div>
            <div className="completion-widget__bar">
              <div className="completion-widget__fill" style={{ width: `${storeInfo.completion}%` }} />
            </div>
            <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 10 }}>
              Add GST number, business hours & cover banner to reach 100%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
