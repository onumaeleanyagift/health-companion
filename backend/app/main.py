from fastapi import FastAPI
from app.routes.articles import router as articles_router
from app.routes.topics import router as topics_router

app = FastAPI(
    title="Health Content API",
    description="API for the Health Content Companion",
    version="1.0.0"
)

app.include_router(articles_router)
app.include_router(topics_router)

@app.get("/")
def root():
    return {
        "message": "Health Content API is running"
    }