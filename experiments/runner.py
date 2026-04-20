import requests
import json
import requests
import time
import os
from dotenv import load_dotenv
load_dotenv()


base_url = os.getenv("NEXT_PUBLIC_API_URL") or  "http://127.0.0.1:8000"
API_URL = f"{base_url}/api/test-prompt"
# "http://127.0.0.1:8000/api/test-prompt"

def run_automated_research():
    with open("prompts.json", "r") as f:
        prompts = json.load(f)
    conditions = ["direct", "socratic"]
    print(f"🚀 Starting Research for {len(prompts)} prompts...")
    for mode in conditions:
        print(f"\n🚀 Starting Phase: {mode.upper()} MODE")
        for i, item in enumerate(prompts):
            print(f"[{i+1}/{len(prompts)}] Testing: {item['prompt'][:50]}...")

            try:
                response = requests.post(API_URL, json={
                    "prompt": item["prompt"],
                    "model": "gemini",
                    "mode": mode
                })

                if response.status_code == 200:
                    data = response.json()
                    print(f"   ✅ Score: {data['dependency_score']}/10")
                else:
                    print(f"   ❌ Error: {response.status_code}")
                    
            except Exception as e:
                print(f"   ❌ Network Error: {e}")

            time.sleep(2)
        print("\n✨ RESEARCH COMPLETE! All results are saved in Neon.")

if __name__ == "__main__":
    run_automated_research()

