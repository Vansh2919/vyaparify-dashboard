import { useMemo, useState } from "react";
import { customers as allCustomers } from "../data/mockData";
import { IconSearch, IconUsers } from "../components/Icons.jsx";
import EmptyState from "../components/EmptyState.jsx";
import "../styles/dashboard.css";
import "../styles/products.css";

export default function Customers() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Customers</h1>
          <p>{allCustomers.length} customers · Track spend and order history</p>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="topbar__search" style={{ maxWidth: 340 }}>
          <IconSearch />
          <input
            type="text"
            placeholder="Search by name, phone or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card card--flush">
          <EmptyState
            icon={IconUsers}
            title="No customers found"
            description="Try a different search term."
          />
        </div>
      ) : (
        <div className="card card--flush">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Orders</th>
                  <th>Total spent</th>
                  <th>Last order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="topbar__avatar" style={{ width: 34, height: 34, fontSize: 12 }}>
                          {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                        <span style={{ fontWeight: 600 }}>{c.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 13 }}>{c.phone}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.email}</div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{c.orders}</td>
                    <td className="table-amount">₹{c.spent.toLocaleString("en-IN")}</td>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>{c.lastOrder}</td>
                    <td>
                      <span className={`badge ${c.status === "active" ? "badge--teal" : "badge--muted"}`}>
                        {c.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
