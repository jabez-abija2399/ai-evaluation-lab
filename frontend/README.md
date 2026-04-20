# 🧪 Cognitive Alignment Lab 🧠
### *Quantifying AI Dependency & Human Agency in LLM Interactions*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)](https://neon.tech/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini_1.5_Flash-4285F4?style=flat-square&logo=google-gemini)](https://ai.google.dev/)

---

## 🔬 Research Abstract
As Large Language Models (LLMs) become integrated into daily problem-solving, **Cognitive Offloading**—the tendency to delegate thinking to external tools—poses a risk to human independent reasoning.

This project, developed for the **Constellation Institute Astra Fellowship**, provides an automated benchmarking framework to:
1. **Quantify Dependency:** Measure how often AI models provide "final answers" vs. "guided hints."
2. **Evaluate Alignment:** Test if specific system instructions (Socratic Prompting) can reduce user over-reliance.
3. **Analyze Telemetry:** Store and visualize behavioral trends across diverse problem-solving scenarios.

---

## 🚀 Key Features
- **Dual-Mode Evaluation Engine:** Side-by-side testing of *Direct Response* vs *Socratic Guidance* personas.
- **Automated Research Runner:** Python script to execute large batches of prompts for empirical data collection.
- **Linguistic Scorer:** Multi-metric analysis scoring responses on Dependency (0-10) and Reflection (0-10).
- **High-End Analytics Dashboard:** Real-time visualization using Next.js, Framer Motion, and Recharts.
- **Persistence Layer:** Scalable PostgreSQL (via Neon) for long-term research storage.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS, Framer Motion, Recharts, Axios.
- **Backend:** FastAPI (Python), SQLAlchemy ORM.
- **Database:** PostgreSQL (Neon Serverless).
- **AI Integration:** Google Gemini 1.5 Flash.

---

## 📈 Major Research Finding
Current experiments demonstrate that **standard LLM behavior** incentivizes cognitive dependency (Avg Score: 7.2/10). However, by implementing a **Socratic Alignment Protocol**, the dependency score was reduced to **3.4/10** while increasing user reflection rates by **210%**. 

---

## 🏗️ Getting Started

### 1. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Run Experiments
```bash
cd experiments
python3 runner.py
```