from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from database.db import init_db

app = FastAPI(
    title = "AI Evaluation Lab",
    description = "Evaluate AI models behavior and dependency patterns",
    version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],

)

app.include_router(router, prefix = "/api")

@app.get("/")
def root():
    return {"message": "AI Evaluation Lab API is running"}

@app.on_event("startup")
def on_startup():
    print("Initializating Database....")
    init_db()
    print("Database Initialized")