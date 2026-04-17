# AI Evaluation Lab — Research Analysis

## 1. Executive Summary
This research investigated the "Helpfulness vs. Dependency" trade-off in Large Language Models (LLMs). Using a custom-built scoring engine and the Google Gemini-2.0 model, I analyzed how different prompting styles affect the model's tendency to provide direct answers versus encouraging independent thought.

## 2. Methodology
- **Model Tested:** Google Gemini 2.0 (Flash)
- **Tooling:** Custom FastAPI Backend + Next.js Analytics Dashboard.
- **Metrics:** 
    - **Dependency Score (0-10):** Measures if the AI gives a direct, "done-for-you" answer.
    - **Reflection Rate (0-10):** Measures if the AI prompts the user to think or try first.

## 3. Key Findings

### Finding A: The "Helpfulness" Trap
When asked direct questions (e.g., "Solve this for me"), the model scored a **10/10 on the Dependency Scale.** It provided the full solution, steps, and even a verification check without being asked.

### Finding B: Resistance to Reflection
Even when the prompt was phrased reflectively (e.g., "What is your approach?"), the model's **Reflection Rate remained at 0.** It still prioritized giving the full answer immediately rather than asking the user for their thoughts.

### Finding C: The Appearance of Hinting
While the dependency score dropped to **5/10** on reflective prompts, the model was still "doing the homework" for the user. It shared its internal reasoning, but it never stopped the user from being lazy.

## 4. Discussion & AI Safety Implications
My research suggests that current AI models are optimized for **maximum user satisfaction (Immediate Answers)** at the cost of **long-term cognitive agency.**

If students and researchers continue to use models that prioritize direct answers over "scaffolded" learning:
1. **Skill Decay:** Humans may lose the ability to isolate variables or structure logic independently.
2. **Blind Trust:** By always getting the answer, users stop questioning the "how" and "why."

## 5. Proposed Solution
AI developers should implement **"Socratic Safety Guards."** If a prompt is identified as a learning task, the model should be restricted from giving a direct answer until it has seen the user attempt the problem or answer a guiding question first.

---
**Researcher:** Yabets Kifle
**Project:** AI-Evaluation-Lab
**Date:** April 2026
