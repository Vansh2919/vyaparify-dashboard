const CONFIG = {
  delivered: { label: "Delivered", tone: "teal" },
  shipped: { label: "Shipped", tone: "accent" },
  pending: { label: "Pending", tone: "amber" },
  cancelled: { label: "Cancelled", tone: "danger" },
  active: { label: "Active", tone: "teal" },
  out_of_stock: { label: "Out of stock", tone: "danger" },
  low_stock: { label: "Low stock", tone: "amber" },
  draft: { label: "Draft", tone: "muted" },
};

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] || { label: status, tone: "muted" };
  return <span className={`badge badge--${cfg.tone}`}>{cfg.label}</span>;
}
