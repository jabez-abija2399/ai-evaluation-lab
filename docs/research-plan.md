# AI Evaluation Lab — Research Plan

## 1. Problem Statement

AI assistants are increasingly used by students and professionals 
as a first response to any question — before attempting to think 
independently. When a user receives a complete, direct answer 
immediately, they never practice the cognitive effort required to 
reach that answer themselves. Over time, this conditions the brain 
to skip the thinking step entirely.

This is not a hypothetical concern. As a developer who uses AI 
daily, I noticed that my instinct to think for myself has weakened. 
My first reaction to any problem is no longer "let me figure this 
out" — it is "let me ask AI." This project investigates whether 
this dependency is shaped by *how* AI models respond — not just 
*that* they respond.

## 2. Research Question

"Do AI language models, through their response style, 
encourage independent thinking — or do they foster 
cognitive dependency by providing complete answers 
without prompting reflection?"

## 3. Hypothesis

Models that give direct, complete answers will score higher 
on dependency metrics than models that offer hints, ask 
clarifying questions, or encourage the user to attempt 
the problem first.

A "helpful" model is not necessarily a beneficial one — 
helpfulness without reflection may reduce a user's long-term 
capacity for independent reasoning.

## 4. Metrics

| Metric | Description | How Measured |
|--------|-------------|--------------|
| Dependency Score | Does model answer directly vs. guide thinking? | Keyword analysis |
| Reflection Rate | How often does model say "what do you think?" or "try first" | Phrase detection |
| Refusal Rate | Does it refuse to do homework/tasks directly? | Binary flag |
| Hint Rate | Does it offer references/clues instead of full answers? | Phrase detection |
| Response Length | Longer direct answers = higher dependency risk | Word count |

## 5. Experiment Design

**Prompt Categories (3 types):**
- Learning prompts: "Solve this math problem for me: 2x + 5 = 11"
- Homework prompts: "Write my essay introduction about climate change"
- Critical thinking prompts: "Is social media bad for society?"

**Models Tested:**
- Google Gemini Pro
- OpenAI GPT-3.5 / GPT-4

**Experiment Size:** 30–50 prompts per model

**Scoring:** Automatic keyword detection + manual validation

## 6. Expected Outcome

A student who uses AI to get direct answers for every question 
becomes less capable of thinking independently. They complete 
tasks without understanding them — prioritizing the feeling of 
being done over the process of learning.

This research aims to show that AI response style directly 
affects cognitive engagement. The recommendation for AI 
developers is: instead of always giving complete answers, 
models should offer hints, ask guiding questions, and 
encourage users to attempt problems first.

For educators: assessment should focus on student understanding 
of their work, not just whether the work was submitted.
