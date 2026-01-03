export const Stat = ({ label, value }) => {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between border-b border-gray-700 pb-1">
      <span className="text-white text-3xl">
        {label}
      </span>
      <span className="text-white font-semibold text-3xl">
        {value}
      </span>
    </div>
  );
};
