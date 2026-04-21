# backend/seed.py
from database.db import SessionLocal
from database.schema import ScoringKeyword

def seed_data():
    db = SessionLocal()
    
    # 📋 THE DATA TO PLANT (Reflection, Hint, Dependency)
    phrases = [
        # RELFECTION
        ("what do you think", "reflection"),
        ("try it yourself", "reflection"),
        ("what's your approach", "reflection"),
        ("think about", "reflection"),
        
        # HINTS
        ("hint:", "hint"),
        ("consider", "hint"),
        ("one approach", "hint"),
        
        # DEPENDENCY (LAZINESS)
        ("the answer is", "dependency"),
        ("the solution is", "dependency"),
        ("here is your code", "dependency")
    ]

    print("Planting Seeds...")
    for text, cat in phrases:
        # Check if it already exists to avoid errors
        exists = db.query(ScoringKeyword).filter(ScoringKeyword.phrase == text).first()
        if not exists:
            new_kw = ScoringKeyword(phrase=text, category=cat)
            db.add(new_kw)
    
    db.commit()
    db.close()
    print("Success! Your Lab is now full of knowledge. ✅")

if __name__ == "__main__":
    seed_data()
