export function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-700/40 hover:bg-gray-700/20 transition-colors px-3 -mx-3">
      <span className="text-gray-400 text-sm font-medium pr-4">{label}</span>
      <span className="text-white text-2xl font-bold tabular-nums shrink-0">{value || '0'}</span>
    </div>
  );
}
