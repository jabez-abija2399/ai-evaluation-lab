import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

async def call_gemini(prompt: str) -> str:
    try:
        result = model.generate_content(prompt)

        return result.text
    except Exception as e:
        return f"Error calling Gemini: {str(e)}"