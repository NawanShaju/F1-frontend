export function AboutCard({ title, content }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h4 className="text-lg font-bold text-white mb-3">{title}</h4>
      <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
    </div>
  );
}