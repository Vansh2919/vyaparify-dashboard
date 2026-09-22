import { useMemo, useState } from "react";
import { orders as allOrders } from "../data/mockData";
import StatusBadge from "../components/StatusBadge.jsx";
import { IconSearch, IconCart } from "../components/Icons.jsx";
import EmptyState from "../components/EmptyState.jsx";
import "../styles/dashboard.css";
import "../styles/products.css";

const FILTERS = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

export default function Orders() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return allOrders.filter((o) => {
      const q = query.toLowerCase();
      const matchQ = o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
      const matchF = filter === "All" || o.status === filter.toLowerCase();
      return matchQ && matchF;
    });
  }, [query, filter]);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Orders</h1>
          <p>{allOrders.length} total orders · Manage and track customer orders</p>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="topbar__search" style={{ maxWidth: 340 }}>
          <IconSearch />
          <input
            type="text"
            placeholder="Search by order ID or customer…"
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
            icon={IconCart}
            title="No orders found"
            description="Try changing the filter or search term."
          />
        </div>
      ) : (
        <div className="card card--flush">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 600 }}>{o.id}</td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{o.customer}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{o.phone}</div>
                    </td>
                    <td style={{ maxWidth: 220, fontSize: 13 }}>{o.products}</td>
                    <td className="table-amount">₹{o.amount.toLocaleString("en-IN")}</td>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>{o.date}</td>
                    <td><StatusBadge status={o.status} /></td>
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
