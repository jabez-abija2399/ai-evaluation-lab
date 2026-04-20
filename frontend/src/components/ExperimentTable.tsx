export function ExperimentTable({ history }: { history: any[] }) {
  return (
    <div className="mt-24 w-full">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-black italic">Research Registry</h2>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-white/5 bg-black/40 backdrop-blur-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-500 text-[10px] font-black tracking-widest border-b border-white/5">
            <tr>
              <th className="p-6">ID</th>
              <th className="p-6">How it acted</th>
              <th className="p-6"> Prompt</th>
              <th className="p-6">Metrics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {history.map((exp: any) => (
              <tr key={exp.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-6 font-mono text-purple-500/50 group-hover:text-purple-400">#{exp.id}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-tighter border ${exp.mode === "socratic"
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                    {exp.mode?.toUpperCase() || "DIRECT"}
                  </span>
                </td>
                {/* <td className="p-6 text-gray-400 group-hover:text-gray-200 transition-colors">
                   <p className="line-clamp-1 max-w-md">{exp.prompt}</p>
                </td> */}
                <td className="p-6 text-gray-400 group-hover:text-gray-200 transition-colors relative">
                  {/* The Snippet */}
                  <p className="line-clamp-1 max-w-md cursor-help">
                    {exp.prompt}
                  </p>
                  {/* 💎 THE PREMIUM TOOLTIP (Appears on Hover) */}
                  <div className=" absolute left-6 top-8 z-50 w-80 p-4 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300 -translate-y-2 group-hover:translate-y-[-100%] pointer-events-none">
                    <div className="text-[10px] font-black text-purple-400 mb-2 tracking-widest">Full Prompt</div>
                    <p className="text-xs text-gray-300 leading-relaxed italic">
                      "{exp.prompt}"
                    </p>
                    <div className="absolute bottom-[-6px] left-4 w-3 h-3 bg-gray-900 border-r border-b border-purple-500/30 rotate-45"></div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex gap-2">
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] border border-white/5">
                      Dep: <span className="text-white">{exp.dependency_score}</span>
                    </div>
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] border border-white/5">
                      Ref: <span className="text-white">{exp.reflection_rate}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
