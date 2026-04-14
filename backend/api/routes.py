from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import call_gemini
from services.scorer import score_response

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str
    model: str = "gemini"

class PromptResponse(BaseModel):
    prompt: str
    model: str
    response: str
    dependency_score: int
    reflection_rate: int
    hint_rate: int
    word_count: int
    
@router.post("/test-prompt", response_model = PromptResponse)
async def test_prompt(request: PromptRequest):
    ai_response = await call_gemini(request.prompt)

    scores = score_response(ai_response)

    return PromptResponse(
        prompt = request.prompt,
        model = request.model,
        response = ai_response,
        dependency_score = scores["dependency_score"],
        reflection_rate = scores["reflection_rate"],
        hint_rate = scores["hint_rate"],
        word_count = scores["word_count"]
    )