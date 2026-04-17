# 🧪 AI Evaluation Lab
**Evaluating Cognitive Dependency in Large Language Models**

## 🎯 The Research
This project investigates how AI model response styles contribute to human "Cognitive Offloading." Specifically, it measures if models prioritize **direct answers** (High Dependency) over **guiding reflection** (Low Reflection).

### 🛠️ The Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS, Recharts (for data viz), Framer Motion.
- **Backend:** Python FastAPI, SQLAlchemy.
- **AI:** Google Gemini-2.0 via Generative AI SDK.
- **Database:** Serverless PostgreSQL (Neon.tech).

## 🔬 Methodology
I ran an automated batch of tests across different categories (Homework, Coding, Critical Thinking). 
- **Scoring Engine:** A rule-based NLP processor developed in Python to detect linguistic patterns of dependency and reflection.

## 📊 Findings
My findings suggest that current models are optimized for **Helpfulness**, resulting in a baseline Dependency Score of **5.0 - 7.0**. Even when prompted to provide "approaches" or "hints," the models consistently provided the final answer, bypassing user reasoning.

## 🚀 How to Run
1. **Backend:** `cd backend && source venv/bin/activate && uvicorn main:app --reload`
2. **Frontend:** `cd frontend && npm run dev`
3. **Run Experiments:** `cd experiments && python3 runner.py`

---
**Developed by Yabets Kifle**  
*Built for the Astra Fellowship Application, April 2026*
