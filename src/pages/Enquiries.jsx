import { useMemo, useState } from "react";
import { enquiries as allEnquiries } from "../data/mockData";
import { IconSearch, IconMail } from "../components/Icons.jsx";
import EmptyState from "../components/EmptyState.jsx";
import "../styles/dashboard.css";
import "../styles/products.css";

const FILTERS = ["All", "New", "Replied", "Closed"];

export default function Enquiries() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [list, setList] = useState(allEnquiries);

  const filtered = useMemo(() => {
    return list.filter((e) => {
      const q = query.toLowerCase();
      const matchQ =
        e.name.toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q) ||
        e.phone.includes(q);
      const matchF = filter === "All" || e.status === filter.toLowerCase();
      return matchQ && matchF;
    });
  }, [list, query, filter]);

  const markReplied = (id) => {
    setList((prev) => prev.map((e) => (e.id === id ? { ...e, status: "replied" } : e)));
  };

  const markClosed = (id) => {
    setList((prev) => prev.map((e) => (e.id === id ? { ...e, status: "closed" } : e)));
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Enquiries</h1>
          <p>{list.filter((e) => e.status === "new").length} new · Customer messages & leads</p>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="topbar__search" style={{ maxWidth: 340 }}>
          <IconSearch />
          <input
            type="text"
            placeholder="Search enquiries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chip-group">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "chip--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card card--flush">
          <EmptyState
            icon={IconMail}
            title="No enquiries found"
            description="New customer messages will appear here."
          />
        </div>
      ) : (
        <div className="enquiry-list">
          {filtered.map((e) => (
            <div key={e.id} className={`enquiry-card ${e.status === "new" ? "enquiry-card--new" : ""}`}>
              <div className="enquiry-card__head">
                <div className="enquiry-card__who">
                  <span className="topbar__avatar" style={{ width: 40, height: 40, fontSize: 13 }}>
                    {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                  <div>
                    <strong>{e.name}</strong>
                    <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
                      {e.phone} · {e.email}
                    </div>
                  </div>
                </div>
                <div className="enquiry-card__meta">
                  <span className={`badge ${
                    e.status === "new" ? "badge--accent" :
                    e.status === "replied" ? "badge--teal" : "badge--muted"
                  }`}>
                    {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                  </span>
                  <time>{e.date}</time>
                </div>
              </div>
              <p className="enquiry-card__msg">{e.message}</p>
              {e.status === "new" && (
                <div className="enquiry-card__actions">
                  <button className="btn btn--primary btn--sm" onClick={() => markReplied(e.id)}>
                    Mark replied
                  </button>
                  <button className="btn btn--secondary btn--sm" onClick={() => markClosed(e.id)}>
                    Close
                  </button>
                </div>
              )}
              {e.status === "replied" && (
                <div className="enquiry-card__actions">
                  <button className="btn btn--secondary btn--sm" onClick={() => markClosed(e.id)}>
                    Close enquiry
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
