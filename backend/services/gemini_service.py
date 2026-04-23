# backend/services/gemini_service.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

# 1. Load the environment variables from your .env file
load_dotenv()

# 2. Get your Secret Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# 3. Tell Google which key to use
genai.configure(api_key=GEMINI_API_KEY)

async def call_gemini(user_prompt: str, mode: str = "direct"):
    """
    This function handles four different AI personalities (modes).
    """

    # 🎯 DEFINING THE PERSONALITIES
    instructions = {
        # The 'Direct' mode gives answers immediately.
        "direct": "Provide a fast, direct answer. Be brief and do not ask questions.",
        
        # The 'Reflection' mode ONLY asks questions to make the user think.
        "reflection": "DO NOT GIVE ANSWERS. Ask 2 deep questions to help the user solve it themselves.",
        
        # The 'Hint' mode gives a small clue but no answer.
        "hint": "Provide a tiny hint or a concept, but do not provide the final solution.",
        
        # The 'Socratic' mode is a full tutor (hints + questions).
        "socratic": "Act as a kind tutor. Never give the answer. Use hints and questions together."
    }

    # 4. Pick the instruction based on the button the user clicked
    selected_instruction = instructions.get(mode, instructions["direct"])

    # 5. Initialize the AI with the specific instruction
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash", # Using the stable 1.5-flash model
        system_instruction=selected_instruction
    )

    try:
        # 6. Send the user's text to Gemini and wait for the reply
        result = model.generate_content(user_prompt)
        return result.text
    except Exception as e:
        # 7. If something breaks, show the error message
        return f"Error calling Gemini: {str(e)}"
