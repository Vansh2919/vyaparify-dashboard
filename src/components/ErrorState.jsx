import { IconAlert } from "./Icons.jsx";

export default function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="empty-state empty-state--error">
      <div className="empty-state__icon empty-state__icon--danger">
        <IconAlert />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry && (
        <button className="btn btn--secondary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
