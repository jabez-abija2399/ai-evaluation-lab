# 🧪 AI Evaluation Lab: The Agency Spectrum

> **Research Submission for Astra Fellowship**  
> *Quantifying the impact of AI persona on human cognitive offloading.*

## 🌟 The Vision
As Large Language Models (LLMs) become more integrated into daily life, we face a risk of **"Cognitive Offloading"**—where humans stop thinking and start copy-pasting. This lab provides a framework to measure and mitigate this risk by testing four distinct AI behavioral modes.

---

## 🔬 The 4-Mode Framework
Our lab evaluates AI responses along a spectrum of assistance. Instead of a single "helpfulness" score, we measure **Pedagogical Agency**:

1.  🔴 **DIRECT MODE**: The Baseline assistant. Gives answers immediately. Measures high user dependency.
2.  🟣 **REFLECTION MODE**: The Philosopher. Never gives answers. Uses inquiry to trigger user thought.
3.  🟡 **HINT MODE**: The Guide. Provides conceptual clues without solving the core problem.
4.  🟢 **SOCRATIC MODE**: The Hybrid. A blend of encouragement and leading questions.

---

## 🛠️ The Tech Stack (Modular & Modern)
-   **Frontend**: Next.js 14, Tailwind CSS, Framer Motion (for smooth lab UI).
-   **Intelligence**: Google Gemini-1.5-Flash (Integrated via `system_instruction` for high precision).
-   **Persistence**: Neon Database (Serverless PostgreSQL) + SQLAlchemy ORM.
-   **Backend**: FastAPI (Python) for asynchronous research processing.
-   **Visualization**: Recharts (Dynamic Bar graphs comparing Direct vs Socratic performance).

---

## 🧬 Key Features

### 1. Dynamic Keyword Scorer
A custom-built NLP engine that analyzes AI responses for "Learning Signals." It looks for:
-   **Reflection Rate**: Questions and triggers that force user thinking.
-   **Dependency Score**: How many "lazy" answer phrases were provided.
-   **Hint Rate**: The frequency of conceptual clues.

### 2. Live Keyword Registry
The lab includes a UI to **Add, List, and Manage** the phrases our scorer looks for. Researchers can update the "Magic Words list" instantly without rebooting the server.

### 3. Empirical Trend Analysis
A real-time data cockpit that visualizes the "Thinking Score" across the entire history of tests.

---

## 🚀 Getting Started


### 1. Backend Setup
```bash
# 🔑 IMPORTANT: Create a .env file and add your GEMINI_API_KEY="..."

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 reset_db.py  # 🧪 Creates the database tables
python3 seed.py      # 🌱 Plants the initial phrases
uvicorn main.py:app --reload
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

## 📑 Research Documents
- [Full Research Plan](docs/RESEARCH_PLAN.md)
- [Preliminary Analysis](docs/ANALYSIS.md)