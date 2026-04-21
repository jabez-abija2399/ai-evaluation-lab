from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class ExperimentResult(Base):
    __tablename__ = "experiment_results"

    id = Column(Integer, primary_key = True, index = True)
    prompt = Column(String)
    model = Column(String)
    response = Column(String)

    dependency_score = Column(Float)
    reflection_rate = Column(Float)
    hint_rate = Column(Float)
    word_count = Column(Integer)
    mode = Column(String)
    created_at = Column(DateTime, default = datetime.utcnow)

class ScoringKeyword(Base):
    __tablename__ = "scoring_keywords"
    id = Column(Integer, primary_key=True)
    phrase = Column(String, unique=True, nullable=False)
    category = Column(String, nullable=False)


class SavedPrompt(Base):
    __tablename__ = "saved_prompts"
    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False)
    category = Column(String, default="General")