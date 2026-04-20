import { motion } from "framer-motion";
import { ScoreBox } from "./ScoreBox";

export function ObservationResult({ result }: { result: any }) {
  if (!result) {
    return (
      <div className="h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] text-gray-700 font-medium italic">
        Standing by for experimental input...
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
      
      {/* 1. THE LINGUISTIC OUTPUT */}
      <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 italic text-gray-200 text-lg leading-relaxed shadow-inner">
        "{result.response}"
      </div>
      
      {/* 2. PRIMARY RESEARCH METRICS */}
      <div className="grid grid-cols-2 gap-6">
        <ScoreBox 
          title="Dependency" 
          score={result.dependency_score} 
          color="text-red-500" 
          desc="Giving of final answers" 
        />
        <ScoreBox 
          title="Reflection" 
          score={result.reflection_rate} 
          color="text-green-500" 
          desc="Encouraging user thought" 
        />
      </div>

      {/* 3. SECONDARY DATA DIMENSIONS */}
      <div className="grid grid-cols-3 gap-4">
        <StatBadge value={result.hint_rate} label="Hinting" color="text-indigo-400" />
        <StatBadge value={result.word_count} label="Word Count" color="text-yellow-400" />
        <StatBadge 
          value={result.mode} 
          label="Alignment" 
          color={result.mode === "socratic" ? "text-green-400" : "text-red-400"} 
        />
      </div>

    </motion.div>
  );
}

function StatBadge({ value, label, color }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
      <div className={`text-xl font-bold uppercase ${color}`}>{value}</div>
      <div className="text-[8px] uppercase tracking-tighter text-gray-500">{label}</div>
    </div>
  );
}
