from fastapi import APIRouter, Depends
from pydantic import BaseModel
from services.gemini_service import call_gemini
from services.scorer import score_response
from sqlalchemy.orm import Session
from database.db import get_db
from database.schema import ExperimentResult

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str
    model: str = "gemini"
    mode: str = "direct"

class PromptResponse(BaseModel):
    prompt: str
    model: str
    response: str
    dependency_score: int
    reflection_rate: int
    hint_rate: int
    word_count: int
    
@router.post("/test-prompt", response_model = PromptResponse)
async def test_prompt(request: PromptRequest, db: Session = Depends(get_db)):

    ai_response = await call_gemini(request.prompt, mode=request.mode)

    scores = score_response(ai_response)

    new_result = ExperimentResult(
        prompt = request.prompt,
        model = request.model,
        mode = request.mode,
        response = ai_response,
        dependency_score = scores["dependency_score"],
        reflection_rate = scores["reflection_rate"],
        hint_rate = scores["hint_rate"],
        word_count = scores["word_count"]
    )

    db.add(new_result)
    db.commit()
    db.refresh(new_result)

    return PromptResponse(
        prompt = request.prompt,
        model = request.model,
        response = ai_response,
        dependency_score = scores["dependency_score"],
        reflection_rate = scores["reflection_rate"],
        hint_rate = scores["hint_rate"],
        word_count = scores["word_count"]
    )

@router.get("/experiments")
def get_all_experiments(db: Session = Depends(get_db)):
    return db.query(ExperimentResult).all()