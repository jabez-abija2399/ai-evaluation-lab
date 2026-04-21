// src/hooks/useLabResearch.ts
import { useState, useEffect, useMemo } from "react";
import axios from "axios";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_BASE_URL = "http://localhost:8000";
interface Keyword {
  id: number;
  phrase: string;
  category: string;
}
export function useLabResearch() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/history`);
      setHistory(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchKeywords = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/keywords`);
    setKeywords(res.data);
  };

  useEffect(() => { 
    fetchHistory();
    fetchKeywords();
   }, []);

  // 🧠 CALCULATION: We do the chart grouping here!
  // This keeps the UI component pure.
  const chartData = useMemo(() => {
    return history.reduce((acc: any, curr: any) => {
      let existing = acc.find((item: any) => item.prompt.substring(0, 30) === curr.prompt.substring(0, 30));
      if (!existing) { 
        existing = { prompt: curr.prompt.substring(0, 30) }; 
        acc.push(existing); 
      }
      if (curr.mode === "direct") existing.direct = curr.dependency_score;
      if (curr.mode === "socratic") existing.socratic = curr.dependency_score;
      return acc;
    }, []);
  }, [history]);

  return { history, chartData, fetchHistory, loading, setLoading, API_BASE_URL, fetchKeywords, keywords };
}
