from fastapi import APIRouter
from app.database import supabase

# Groups all topic-related endpoints under /api/topics.
router = APIRouter(
    prefix="/api/topics",
    tags=["Topics"]
)

# Return all available health topics.
@router.get("/")
def get_topics():
    # Select only the fields the frontend needs and sort the topics alphabetically.
    response = (
        supabase
        .table("topics")
        .select("id, name, slug, description")
        .order("name")
        .execute()
    )

    return response.data