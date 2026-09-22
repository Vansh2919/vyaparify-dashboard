export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state__icon">
          <Icon />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && (
        <button className="btn btn--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
