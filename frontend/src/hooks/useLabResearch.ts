// src/hooks/useLabResearch.ts
import { useState, useEffect, useMemo } from "react";
import axios from "axios";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_BASE_URL = "http://localhost:8000";

export function useLabResearch() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/experiments`);
      setHistory(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchHistory(); }, []);

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

  return { history, chartData, fetchHistory, loading, setLoading, API_BASE_URL };
}
