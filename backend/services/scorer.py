
def score_response(response: str) -> dict:
    text = response.lower()

    reflection_phrases = [
        "what do you think",
        "try it yourself",
        "what would you do",
        "think about",
        "give it a try",
        "what's your approach",
        "what do you notice",
        "before i answer",
        "can you figure out",
        "what have you tried"
    ]

    hint_phrases = [
        "hint:",
        "consider",
        "one approach",
        "you might want to",
        "think of it as",
        "a clue",
        "try looking at",
        "one thing to note"
    ]
    
    dependency_phrases = [
        "the answer is",
        "the solution is",
        "here is the",
        "here's the",
        "step 1",
        "step 2",
        "to solve this",
        "i'll do this for you",
        "let me write this for you",
        "here's your essay",
        "here's your code"
    ]

    reflection_count = sum(1 for p in reflection_phrases if p in text)
    hint_count = sum(1 for p in hint_phrases if p in text)
    dependency_count = sum(1 for p in dependency_phrases if p in text)

    reflection_rate = min(reflection_count * 3, 10)
    hint_rate = min(hint_count * 3, 10)
    dependency_score = 5 + (dependency_count * 2) - (reflection_count * 2)

    dependency_score = max(0, min(10, dependency_score))

    word_count = len(response.split())

    return {
        "dependency_score": dependency_score,
        "reflection_rate": reflection_rate,
        "hint_rate": hint_rate,
        "word_count": word_count
    }