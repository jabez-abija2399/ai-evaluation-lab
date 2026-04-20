"use client";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCcw, Send, Target, Beaker, Brain } from "lucide-react";

import { useLabResearch } from "@/hooks/useLabResearch";
import { StepCard } from "@/components/StepCard";
import { ObservationResult } from "@/components/ObservationResult";
import { ExperimentTable } from "@/components/ExperimentTable";

export default function Home() {
  const { history, chartData, fetchHistory, loading, setLoading, API_BASE_URL } = useLabResearch();
  const [prompt, setPrompt] = useState("");
  const [latestResult, setLatestResult] = useState<any>(null);
  const [mode, setMode] = useState("direct");

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
      fetchHistory();
    } catch (error) {
      console.error("Critical Experiment Failure:", error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans cursor-default">

      {/* 1. MISSION CONTROL */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black text-purple-400 tracking-widest">
              Fellowship Research Profile
            </span>
          </div>
          <h1 className="text-7xl font-black mb-6 tracking-tighter leading-none">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Alignment</span> Lab
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Analyzing cognitive offloading patterns and dependency loops in Large Language Models.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <StepCard
            icon={<Target className="text-purple-400" />}
            title="The Hypothesis"
            desc="System-level instructions can shift AI models from 'answering machines' to 'reasoning partners'."
          />
          <StepCard
            icon={<Beaker className="text-indigo-400" />}
            title="Automated Pipeline"
            desc="Dual-mode evaluation allows for the direct measurement of intervention success rates."
          />
          <StepCard
            icon={<Brain className="text-green-400" />}
            title="Agency Scoring"
            desc="Our NLP engine quantifies linguistic cues that encourage user reflection over imitation."
          />
        </div>
      </div>

      {/* 2. THE LABORATORY ENVIRONMENT */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* INPUT WING */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm">1</div>
              Active Stimulation
            </h2>

            <div className="bg-black/40 p-1.5 flex border border-white/10 rounded-2xl">
              <button onClick={() => setMode("direct")} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${mode === "direct" ? "bg-red-600 text-white shadow-xl shadow-red-600/20" : "text-gray-500 hover:text-white"}`}>DIRECT MODE</button>
              <button onClick={() => setMode("socratic")} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${mode === "socratic" ? "bg-green-600 text-white shadow-xl shadow-green-600/20" : "text-gray-500 hover:text-white"}`}>SOCRATIC MODE</button>
            </div>

            <textarea
              className="w-full h-54 bg-black/40 border border-white/10 rounded-[32px] p-8 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all text-xl placeholder:text-gray-800"
              placeholder="Enter research prompt to test alignment behavior..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={runTest}
              disabled={loading}
              className="w-full group bg-white text-black py-5 rounded-3xl font-black text-xs tracking-widest hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {loading ? "PROBING MODEL..." : "INITIALIZE TEST"}
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* OBSERVATION WING */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">2</div>
              Observation Result
            </h2>

            <AnimatePresence mode="wait">
              {/* MODULAR COMPONENT: ObservationResult */}
              <ObservationResult result={latestResult} />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. TREND DATA */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <header className="flex justify-between items-end mb-16 px-4">
          <div>
            <h2 className="text-5xl font-black mb-4 tracking-tighter">Empirical Trends</h2>
            <p className="text-gray-500 font-medium">Visualization of linguistic behavior across the research corpus.</p>
          </div>
          <button onClick={fetchHistory} className="p-6 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
            <RefreshCcw size={24} className={loading ? "animate-spin" : ""} />
          </button>
        </header>

        <div className="h-[600px] w-full p-12 bg-black/40 rounded-[56px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#101010" vertical={false} />
              <XAxis dataKey="prompt" hide />
              <YAxis stroke="#444" domain={[0, 10]} fontSize={12} fontStyle="bold" />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #222', borderRadius: '32px', padding: '24px' }}
              />
              <Bar dataKey="direct" fill="#ef4444" name="Direct Score" radius={[8, 8, 0, 0]} barSize={34} />
              <Bar dataKey="socratic" fill="#22c55e" name="Socratic Score" radius={[8, 8, 0, 0]} barSize={34} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ExperimentTable history={history} />
      </section>
    </main>
  );
}
