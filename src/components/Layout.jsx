import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { notifications as initialNotifications } from "../data/mockData";
import {
  IconGrid, IconBox, IconCart, IconUsers, IconMail, IconSettings,
  IconBell, IconSearch, IconMenu, IconClose, IconStore, IconAlert,
} from "./Icons.jsx";
import "../styles/layout.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: IconGrid },
  { to: "/products", label: "Products", icon: IconBox },
  { to: "/orders", label: "Orders", icon: IconCart },
  { to: "/customers", label: "Customers", icon: IconUsers },
  { to: "/enquiries", label: "Enquiries", icon: IconMail },
  { to: "/settings", label: "Settings", icon: IconSettings },
];

export default function Layout() {
  const { sidebarOpen, toggleSidebar, closeSidebar, logout, storeInfo, toggleStoreStatus } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications);
  const [bellSeen, setBellSeen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = notifs.filter((n) => n.unread).length;
  const navigate = useNavigate();

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

  const openNotifs = () => {
    setNotifOpen((v) => !v);
    setBellSeen(true);
    setProfileOpen(false);
  };

  return (
    <div className="shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16l-1.5 12.5a2 2 0 01-2 1.5H7.5a2 2 0 01-2-1.5L4 7z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M9 7V5a3 3 0 016 0v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="14" r="1.5" fill="#fff"/>
            </svg>
          </span>
          <span className="sidebar__brandname">Vyaparify</span>
          <button className="sidebar__close" onClick={closeSidebar} aria-label="Close menu"><IconClose /></button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button
            className="store-toggle"
            onClick={toggleStoreStatus}
            title="Toggle store visibility to customers"
          >
            <IconStore />
            <span className="store-toggle__text">
              <strong>{storeInfo.name}</strong>
              <em className={`store-toggle__status store-toggle__status--${storeInfo.status}`}>
                {storeInfo.status === "open" ? "Open for orders" : "Closed"}
              </em>
            </span>
            <span className={`store-toggle__dot store-toggle__dot--${storeInfo.status}`} />
          </button>
          <button className="sidebar__logout" onClick={() => { logout(); navigate("/login"); }}>
            Log out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar__scrim" onClick={closeSidebar} />}

      <div className="main">
        <header className="topbar">
          <button className="topbar__menu" onClick={toggleSidebar} aria-label="Open menu"><IconMenu /></button>

          <div className="topbar__search">
            <IconSearch />
            <input type="text" placeholder="Search products, orders, customers…" />
          </div>

          <div className="topbar__actions">
            <div className="notif-wrap">
              <button
                className={`topbar__icon-btn ${!bellSeen && unreadCount > 0 ? "topbar__icon-btn--shake" : ""}`}
                onClick={openNotifs}
                aria-label="Notifications"
              >
                <IconBell />
                {unreadCount > 0 && <span className="topbar__badge">{unreadCount}</span>}
              </button>
              {notifOpen && (
                <div className="notif-panel">
                  <div className="notif-panel__head">
                    <h4>Notifications</h4>
                    <button onClick={markAllRead}>Mark all read</button>
                  </div>
                  {notifs.length === 0 ? (
                    <p className="notif-panel__empty">You're all caught up.</p>
                  ) : (
                    <ul className="notif-panel__list">
                      {notifs.map((n) => (
                        <li key={n.id} className={n.unread ? "is-unread" : ""}>
                          <span className="notif-panel__dot" />
                          <div>
                            <p>{n.text}</p>
                            <time>{n.time}</time>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Cleaner profile pill */}
            <div className="profile-wrap">
              <button
                className="profile-pill"
                onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
              >
                <span className="profile-pill__avatar">TB</span>
                <span className="profile-pill__meta">
                  <strong>The Brand Store</strong>
                  <em className={storeInfo.status === "open" ? "is-open" : "is-closed"}>
                    {storeInfo.status === "open" ? "Open" : "Closed"}
                  </em>
                </span>
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <button onClick={() => { setProfileOpen(false); navigate("/settings"); }}>
                    Store settings
                  </button>
                  <button onClick={() => { setProfileOpen(false); logout(); navigate("/login"); }}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {storeInfo.completion < 100 && (
          <div className="profile-nudge">
            <div className="profile-nudge__icon"><IconAlert /></div>
            <div className="profile-nudge__body">
              <p>
                Your store profile is <strong>{storeInfo.completion}% complete</strong>
              </p>
              <span>Add {storeInfo.missingFields.join(", ").toLowerCase()} to get discovered faster.</span>
            </div>
            <div className="profile-nudge__bar">
              <div className="profile-nudge__fill" style={{ width: `${storeInfo.completion}%` }} />
            </div>
            <button className="profile-nudge__btn" onClick={() => navigate("/settings")}>Complete profile</button>
          </div>
        )}

        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
