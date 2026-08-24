from fastapi import FastAPI
from app.routes.articles import router as articles_router
from app.routes.topics import router as topics_router
from app.routes.ask import router as ask_router
from fastapi.middleware.cors import CORSMiddleware

# Create the FastAPI application.
app = FastAPI(
    title="Health Content API",
    description="API for the Health Content Companion",
    version="1.0.0"
)

# Allow the React frontend to communicate with the FastAPI backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://frontend-seven-alpha-17.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the article and topic routes with the main application.
app.include_router(articles_router)
app.include_router(topics_router)
app.include_router(ask_router)

# Simple endpoint to confirm that the API is running.
@app.get("/")
def root():
    return {
        "message": "Health Content API is running"
    }