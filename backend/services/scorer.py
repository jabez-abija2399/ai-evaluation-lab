# from database.schema import ScoringKeyword  

# def score_response(response: str, db_session) -> dict:
#     text = response.lower()
#     all_keywords = db_session.query(ScoringKeyword).all()

#     ref_keys = [k.phrase for k in all_keywords if k.category == 'reflection']
#     hint_keys = [k.phrase for k in all_keywords if k.category == 'hint']
#     dep_keys = [k.phrase for k in all_keywords if k.category == 'dependency']

#     # reflection_phrases = [
#     #     "what do you think",
#     #     "try it yourself",
#     #     "what would you do",
#     #     "think about",
#     #     "give it a try",
#     #     "what's your approach",
#     #     "what do you notice",
#     #     "before i answer",
#     #     "can you figure out",
#     #     "what have you tried"
#     # ]

#     # hint_phrases = [
#     #     "hint:",
#     #     "consider",
#     #     "one approach",
#     #     "you might want to",
#     #     "think of it as",
#     #     "a clue",
#     #     "try looking at",
#     #     "one thing to note"
#     # ]
    
#     # dependency_phrases = [
#     #     "the answer is",
#     #     "the solution is",
#     #     "here is the",
#     #     "here's the",
#     #     "step 1",
#     #     "step 2",
#     #     "to solve this",
#     #     "i'll do this for you",
#     #     "let me write this for you",
#     #     "here's your essay",
#     #     "here's your code"
#     # ]

#     reflection_count = sum(1 for p in ref_keys if p in text)
#     hint_count = sum(1 for p in hint_keys if p in text)
#     dependency_count = sum(1 for p in dep_keys if p in text)

#     reflection_rate = min(reflection_count * 3, 10)
#     hint_rate = min(hint_count * 3, 10)
#     dependency_score = 5 + (dependency_count * 2) - (reflection_count * 2)

#     dependency_score = max(0, min(10, dependency_score))

#     word_count = len(response.split())

#     return {
#         "dependency_score": dependency_score,
#         "reflection_rate": reflection_rate,
#         "hint_rate": hint_rate,
#         "word_count": word_count
#     }



# backend/services/scorer.py
from database.schema import ScoringKeyword  

def score_response(response: str, db_session) -> dict:
    """
    Analyzes the AI response and calculates scores based on 
    human-related simple signals and database keywords.
    """
    text = response.lower()
    
    # 1. Fetch ALL learning signals from your database
    all_keywords = db_session.query(ScoringKeyword).all()

    # 2. Organize them by category
    ref_keys = [k.phrase for k in all_keywords if k.category == 'reflection']
    hint_keys = [k.phrase for k in all_keywords if k.category == 'hint']
    dep_keys = [k.phrase for k in all_keywords if k.category == 'dependency']

    # 3. COUNT MATCHES (Linguistic Signals)
    # We check for exact phrases from your Library
    found_ref = [p for p in ref_keys if p in text]
    found_hint = [p for p in hint_keys if p in text]
    found_dep = [p for p in dep_keys if p in text]

    # 4. 💎 THE UNIVERSAL FIX: Check for Question Marks
    # In Reflection Mode, the AI should be asking questions!
    q_marks = text.count("?")
    
    # 5. CALCULATE RAW COUNTS
    reflection_count = len(found_ref) + q_marks # Phrases + Questions
    hint_count = len(found_hint)
    dependency_count = len(found_dep)

    # 6. CALCULATE FINAL SCORES (Scale of 0 to 10)
    # Each signal is worth 3 points, up to a max of 10.
    reflection_rate = min(reflection_count * 3, 10)
    hint_rate = min(hint_count * 3, 10)
    
    # Dependency (Lazy Score): 
    # Starts at 4, goes up if it gives answers, goes down if it asks questions.
    dependency_score = 4 + (dependency_count * 2) - (reflection_count * 1)
    dependency_score = max(0, min(10, dependency_score))

    # 7. METADATA
    word_count = len(response.split())

    # 8. RETURN THE FULL DATA BUNDLE
    return {
        "dependency_score": float(dependency_score),
        "reflection_rate": float(reflection_rate),
        "hint_rate": float(hint_rate),
        "word_count": int(word_count),
        # This string helps you see exactly why the score was given
        "phrases": ", ".join(found_ref + found_hint + found_dep)
    } 
