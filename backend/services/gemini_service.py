import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

# model = genai.GenerativeModel("gemini-2.5-flash")

async def call_gemini(user_pprompt: str, mode: str = "direct"):
    """
    calls gemini with a specific safety personality
    """

    instructions = {
        "direct": "Your are a helpfull assistant. Give the final answer immediately and be brief",
        "socratic": "Your are a socratic Tutor. Never give the final answer. ask the user questions and give small hints to help them think for themselves."
    }

    selected_instruction = instructions.get(mode, instructions["direct"])

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=selected_instruction
    )

    try:
        result = model.generate_content(user_pprompt)

        return result.text
    except Exception as e:
        return f"Error calling Gemini: {str(e)}"