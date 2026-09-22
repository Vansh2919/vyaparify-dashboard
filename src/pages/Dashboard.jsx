import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stats, orders, salesTrend, products, topProducts, offlineStores } from "../data/mockData";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import SalesChart from "../components/SalesChart.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { SkeletonStatCard, SkeletonRow } from "../components/Skeleton.jsx";
import {
  IconBox, IconCart, IconUsers, IconPlus, IconChevronRight,
  IconMail, IconSettings, IconCart as IconOrdersSm, IconStore,
} from "../components/Icons.jsx";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [ordersState, setOrdersState] = useState("loading");
  const [storesOpen, setStoresOpen] = useState(false);
  const [timer, setTimer] = useState({ h: 22, m: 30, s: 0 });
  const navigate = useNavigate();

  const loadOrders = () => {
    setOrdersState("loading");
    setTimeout(() => setOrdersState("success"), 700);
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 750);
    loadOrders();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => {
        let { h, m, s } = prev;
        if (h === 0 && m === 0 && s === 0) return prev;
        if (s > 0) s -= 1;
        else if (m > 0) { m -= 1; s = 59; }
        else if (h > 0) { h -= 1; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Good morning, Team Brand Store</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <button className="btn btn--primary" onClick={() => navigate("/products/new")}>
          <IconPlus /> Add product
        </button>
      </div>

      <div className="sale-banner">
        <p className="sale-banner__text">
          <span>Sale ending soon</span> on clothing · Limited time offer
        </p>
        <div className="sale-banner__timer">
          <div className="sale-banner__unit"><span>{String(timer.h).padStart(2, "0")}</span><small>HRS</small></div>
          <div className="sale-banner__unit"><span>{String(timer.m).padStart(2, "0")}</span><small>MIN</small></div>
          <div className="sale-banner__unit"><span>{String(timer.s).padStart(2, "0")}</span><small>SEC</small></div>
        </div>
      </div>

      <div className="stat-grid">
        {loading ? (
          <>
            <SkeletonStatCard /><SkeletonStatCard /><SkeletonStatCard /><SkeletonStatCard />
          </>
        ) : (
          <>
            <StatCard label="Total sales (7d)" value={`₹${stats.totalSales.toLocaleString("en-IN")}`} growth={stats.salesGrowth} icon={IconOrdersSm}  />
            <StatCard label="Total products" value={products.length} icon={IconBox}  />
            <StatCard label="Orders" value={stats.totalOrders} growth={stats.ordersGrowth} icon={IconCart}  />
            <StatCard label="Customers" value={stats.totalCustomers} growth={stats.customersGrowth} icon={IconUsers}  />
          </>
        )}
      </div>

      <div className="dashboard__grid">
        <div className="card">
          <div className="card__head">
            <div>
              <h3>Sales summary</h3>
              <p className="card__head-sub">Last 7 days</p>
            </div>
          </div>
          {loading ? (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 200 }}>
              {[40, 65, 30, 80, 95, 60, 70].map((h, i) => (
                <div key={i} className="skeleton" style={{ flex: 1, height: `${h}%`, borderRadius: 6 }} />
              ))}
            </div>
          ) : (
            <SalesChart data={salesTrend} />
          )}
        </div>

        <div className="card">
          <div className="card__head">
            <h3>Quick actions</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action" onClick={() => navigate("/products/new")}>
              <span className="quick-action__icon"><IconPlus /></span>
              <span>Add product</span>
            </button>
            <button className="quick-action" onClick={() => navigate("/products")}>
              <span className="quick-action__icon"><IconBox /></span>
              <span>Manage catalog</span>
            </button>
            <button className="quick-action" onClick={() => navigate("/enquiries")}>
              <span className="quick-action__icon"><IconMail /></span>
              <span>View enquiries</span>
            </button>
            <button className="quick-action" onClick={() => navigate("/settings")}>
              <span className="quick-action__icon"><IconSettings /></span>
              <span>Store settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard__grid" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card__head">
            <div>
              <h3>Top selling products</h3>
              <p className="card__head-sub">This week</p>
            </div>
          </div>
          <div className="top-products">
            {topProducts.map((p, i) => (
              <div key={p.name} className="top-product-row">
                <span className="top-product-rank">{i + 1}</span>
                <div className="top-product-info">
                  <strong>{p.name}</strong>
                  <span>{p.sold} sold</span>
                </div>
                <span className="top-product-rev">₹{p.revenue.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card--flush" style={{ overflow: "hidden" }}>
          <div className="card__head" style={{ padding: "20px 22px 0" }}>
            <div>
              <h3>Recent orders</h3>
              <p className="card__head-sub">Latest activity</p>
            </div>
            <button className="btn btn--ghost btn--sm" onClick={() => navigate("/orders")}>
              View all <IconChevronRight />
            </button>
          </div>

          {ordersState === "error" ? (
            <ErrorState
              title="Couldn't load recent orders"
              description="There was a problem reaching the server. Check your connection and try again."
              onRetry={() => loadOrders(false)}
            />
          ) : !loading && ordersState === "success" && orders.length === 0 ? (
            <EmptyState
              icon={IconCart}
              title="No orders yet"
              description="Once customers start placing orders, they'll show up here in real time."
            />
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading || ordersState === "loading"
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                    : orders.slice(0, 5).map((o) => (
                        <tr key={o.id}>
                          <td style={{ fontWeight: 600 }}>{o.id}</td>
                          <td>{o.customer}</td>
                          <td className="table-amount">₹{o.amount.toLocaleString("en-IN")}</td>
                          <td><StatusBadge status={o.status} /></td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>


      {/* Floating offline stores widget */}
      <div className="stores-fab">
        {storesOpen && (
          <div className="stores-fab__panel">
            <div className="stores-fab__panel-head">
              <span>Offline stores</span>
              <button onClick={() => setStoresOpen(false)} aria-label="Close">×</button>
            </div>
            {offlineStores.map((s) => (
              <div key={s.id} className="stores-fab__item">
                <span className={`stores-fab__dot stores-fab__dot--${s.status}`} />
                <div>
                  <strong>{s.name}</strong>
                  <span>{s.address}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="stores-fab__btn" onClick={() => setStoresOpen((v) => !v)} title="Offline stores">
          <IconStore />
          Stores
        </button>
      </div>
    </div>
  );
}
