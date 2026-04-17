"use client";

import axios from "axios";
import { Beaker, Brain, ListCheck, MessagesSquare, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const runTest = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/test-prompt", {
        prompt: prompt,
        model: "gemini"
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to run test");
    } finally {
      setLoading(false);
    }
  }

  const fetchHistory = async () => {
    try {
      const res = await 
      axios.get("http://localhost:8000/api/experiments");
      setHistory(res.data);
      
    } catch (error) {
      console.error(error);
      alert("Failed to fetch history");
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-gradient">
          AI Evaluation Lab
        </h1>
        <p className="text-gray-400 text-lg">
          Quantifying AI Dependency & Cognitive Reflection Patterns
        </p>
      </header>

      {/* Input section  */}
      <div className="glass p-6 mb-8">
        <div className="flex items-center gap-2 mb-4 text-purple-400">

          <Beaker size={20} />
          <span className="font-semibold tracking-wider text-sm">New Experiment</span>
        </div>

        <textarea
          className="w-full bg-black/40 border border-white/10 rounded-xl
           text-white p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        ></textarea>

        <button
          className="mt-4 flex items-center justify-center gap-2 w-full bg-purple-600 
        hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          onClick={runTest}
          disabled={loading}
        >
          {loading ? "Analyzing behavior..." : "Run Laboratory Test"}
          <Send size={18} />
        </button>
      </div>

      {/* Result section */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in 
        slide-in-from-bottom-4 duration-500">

          <div className="glass p-6 md:col-span-2">
            <h3 className="text-gray-400 mb-2 flex items-center gap-2">
              <MessagesSquare size={16} />
              AI Observation
            </h3>
            <p className="text-white leading-relaxed">
              {data.response}
            </p>
          </div>

          <MetricCard
            title="Dependency Score"
            value={data.dependency_score}
            icon={<Brain className="text-red-400" />}
            description="How much the AI 'took over' the thinking."
          />
          <MetricCard
            title="Reflection Rate"
            value={data.reflection_rate}
            icon={<ListCheck className="text-blue-400" />}
            desc="How much the AI asked YOU to think."
          />

        </div>
      )}

      {/* DashBoard secton */}
      <section className="mt-20 border-t border-white/10 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Beaker className="text-purple-500" /> Research Analytics
          </h2>
          <button
          onClick={fetchHistory}
          className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
          >
            Refresh Data

          </button>
        </div>
        {/* char showing trend of Dependency */}
        <div className="glass p-8 h-[400px]">
          <h3 className="text-gray-400 mb-4 tracking-widest text-xs font-bold">
            Dependency Score Trend ( Per Experiment)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="id" stroke="#666" 
              label={{value: 'Experiment #', position: 'insideBottom', offset: -10}} />
              <YAxis stroke="#666" domain={[0, 10]} />
              <Tooltip 
              contentStyle={{backgroundColor: '#111', border: '1px solid #333'}}
              itemStyle={{color: '#a855f7'}}
               />
              <Bar dataKey="dependency_score" fill="#a855f7" 
                radius={[4, 4, 0, 0]}
                name="Dependency Score"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Prompt Substring</th>
                <th className="p-4">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-black/20">
              {history.map((exp: any) => (
                <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-purple-400">#{exp.id}</td>
                  <td className="p-4 truncate max-w-xs">{exp.prompt}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold
                    ${
                      exp.dependency_score > 7 ? 'bg-red-500/20 text-red-400'
                      :'bg-green-500/20 text-green-400'
                    }
                      `}>
                    {exp.dependency_score}/10
                    </span>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}


function MetricCard({ title, value, icon, desc }: any) {
  return (
    <div className="glass p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        <span className="text-3xl font-bold">{value}/10</span>
      </div>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{desc}</p>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 h-2 mt-4 rounded-full overflow-hidden">
        <div
          className="bg-purple-500 h-full transition-all duration-1000"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}