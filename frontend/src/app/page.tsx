"use client";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Beaker, Brain, Target, RefreshCcw, Send } from "lucide-react";

// 🧠 OUR CUSTOM HOOKS & COMPONENTS
import { useLabResearch } from "@/hooks/useLabResearch";
import { StepCard } from "@/components/StepCard";
import { ScoreBox } from "@/components/ScoreBox";

export default function Home() {
  // 1. Logic handled by our Custom Hook
  const { chartData, fetchHistory, loading, setLoading } = useLabResearch();

  // 2. Local UI State
  const [prompt, setPrompt] = useState("");
  const [latestResult, setLatestResult] = useState<any>(null);
  const [mode, setMode] = useState("direct");

  // const API_BASE_URL = "http://localhost:8000";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // 3. Main Action
  const runTest = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/test-prompt`, {
        prompt,
        model: "gemini",
        mode
      });
      setLatestResult(response.data);
      fetchHistory(); // 👈 Hook automatically handles the data refresh
    } catch (error) {
      console.error("Experiment Failed:", error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">

      {/* SECTION 1: THE MISSION */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black text-purple-400 tracking-widest">
              Astra Fellowship Research Portfolio
            </span>
          </div>
          <h1 className="text-7xl font-black mb-6 tracking-tighter leading-none">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Alignment</span> Lab
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Analyzing cognitive offloading patterns in Large Language Models.
          </p>
        </motion.header>

        {/* MODULAR COMPONENTS: StepCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <StepCard
            icon={<Target className="text-purple-400" />}
            title="The Hypothesis"
            desc="Instruction-tuning can mitigate the automation bias that leads to user over-reliance on AI."
          />
          <StepCard
            icon={<Beaker className="text-indigo-400" />}
            title="Automated Testing"
            desc="We execute identical prompts through two safety-tuned personas to isolate variables."
          />
          <StepCard
            icon={<Brain className="text-green-400" />}
            title="Metric Analysis"
            desc="Evaluating output for 'Dependency' (Answers) vs 'Reflection' (Questions)."
          />
        </div>
      </div>

      {/* SECTION 2: THE LABORATORY ENVIRONMENT */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* CONTROL PANEL */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm">1</div>
              Active Laboratory
            </h2>

            <div className="glass-card p-1.5 flex bg-black/40 border border-white/10 rounded-2xl">
              <button onClick={() => setMode("direct")} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${mode === "direct" ? "bg-red-600 text-white shadow-xl shadow-red-600/20" : "text-gray-500 hover:text-white"}`}>DIRECT MODE</button>
              <button onClick={() => setMode("socratic")} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${mode === "socratic" ? "bg-green-600 text-white shadow-xl shadow-green-600/20" : "text-gray-500 hover:text-white"}`}>SOCRATIC MODE</button>
            </div>

            <textarea
              className="w-full h-48 bg-black/40 border border-white/10 rounded-[32px] p-8 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all text-xl"
              placeholder="Enter research stimulus..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={runTest}
              disabled={loading}
              className="w-full group bg-white text-black py-5 rounded-3xl font-black text-xs tracking-widest hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {loading ? "PROCESSING..." : "RUN EXPERIMENT"}
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* OBSERVATION ROOM */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">2</div>
              Observation Result
            </h2>

            <AnimatePresence mode="wait">
              {latestResult ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 italic text-gray-300 text-lg leading-relaxed shadow-inner">
                    "{latestResult.response}"
                  </div>

                  {/* MODULAR COMPONENTS: ScoreBox */}
                  <div className="grid grid-cols-2 gap-6">
                    <ScoreBox
                      title="Dependency"
                      score={latestResult.dependency_score}
                      color="text-red-500"
                      desc="Systemic giving of answers"
                    />
                    <ScoreBox
                      title="Reflection"
                      score={latestResult.reflection_rate}
                      color="text-green-500"
                      desc="Systems encourage thinking"
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] text-gray-700 font-medium italic">
                  Standing by for experimental input...
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 3: TREND ANALYSIS (CHART) */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <header className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-black mb-4">Empirical Insights</h2>
            <p className="text-gray-500 font-medium">Comparative behavior trend across the entire dataset.</p>
          </div>
          <button onClick={fetchHistory} className="p-5 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
            <RefreshCcw size={24} className={loading ? "animate-spin" : ""} />
          </button>
        </header>

        <div className="h-[600px] w-full p-12 bg-black/40 rounded-[56px] border border-white/5 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
              <XAxis dataKey="prompt" hide />
              <YAxis stroke="#444" domain={[0, 10]} fontSize={12} fontStyle="bold" />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #222', borderRadius: '24px', padding: '16px' }}
              />
              <Bar dataKey="direct" fill="#ef4444" name="Direct Score" radius={[6, 6, 0, 0]} barSize={30} />
              <Bar dataKey="socratic" fill="#22c55e" name="Socratic Score" radius={[6, 6, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
