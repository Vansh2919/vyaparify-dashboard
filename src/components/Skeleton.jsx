export function SkeletonLine({ width = "100%", height = 14 }) {
  return <div className="skeleton" style={{ width, height, borderRadius: 6 }} />;
}

export function SkeletonStatCard() {
  return (
    <div className="stat-card">
      <SkeletonLine width="60%" height={12} />
      <div style={{ height: 12 }} />
      <SkeletonLine width="40%" height={26} />
      <div style={{ height: 10 }} />
      <SkeletonLine width="50%" height={11} />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <tr>
      <td><SkeletonLine width="80%" /></td>
      <td><SkeletonLine width="60%" /></td>
      <td><SkeletonLine width="40%" /></td>
      <td><SkeletonLine width="70%" /></td>
      <td><SkeletonLine width="50%" /></td>
    </tr>
  );
}
