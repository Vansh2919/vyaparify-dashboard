import { IconArrowUp, IconArrowDown } from "./Icons.jsx";

export default function StatCard({ label, value, growth, icon: Icon }) {
  const isPositive = growth >= 0;
  return (
    <div className="stat-card stat-card--dark">
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        {Icon && (
          <span className="stat-card__icon-wrap">
            <Icon className="stat-card__icon" />
          </span>
        )}
      </div>
      <div className="stat-card__value">{value}</div>
      {typeof growth === "number" && (
        <div className={`stat-card__growth ${isPositive ? "is-up" : "is-down"}`}>
          {isPositive ? <IconArrowUp /> : <IconArrowDown />}
          <span>{Math.abs(growth)}% vs last week</span>
        </div>
      )}
    </div>
  );
}
