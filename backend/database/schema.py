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
