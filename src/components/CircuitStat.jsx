export function CircuitStat({ label, value, subtitle }) {
  return (
    <div className="border-b border-gray-700 pb-3">
      <div className="flex justify-between items-baseline">
        <span className="text-gray-400 text-sm pb-5">{label}</span>
        <div className="text-right">
          <span className="text-white text-[23px] font-semibold">{value}</span>
          {subtitle && (
            <div className="text-gray-400 text-xs mt-1 capitalize">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}