export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <input
        className="border rounded px-3 py-2"
        placeholder="Search stocks..."
      />

      <div>
        <strong>SnehaS</strong>
      </div>
    </div>
  );
}