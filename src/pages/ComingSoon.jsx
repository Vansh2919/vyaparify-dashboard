import EmptyState from "../components/EmptyState.jsx";
import { IconBox } from "../components/Icons.jsx";

export default function ComingSoon({ title }) {
  return (
    <div className="card card--flush">
      <EmptyState
        icon={IconBox}
        title={`${title} — in progress`}
        description="This section is part of the next build phase. The current assignment focuses on Dashboard and Product management."
      />
    </div>
  );
}
