export default function StatCard({ label, value }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <div>{label}</div>
      <strong>{value}</strong>
    </div>
  );
}
