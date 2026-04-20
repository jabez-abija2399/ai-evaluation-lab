export function StepCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
      <div className="mb-4">{icon}</div>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
