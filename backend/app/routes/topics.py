from fastapi import APIRouter
from app.database import supabase


router = APIRouter(
    prefix="/api/topics",
    tags=["Topics"]
)


@router.get("/")
def get_topics():
    response = (
        supabase
        .table("topics")
        .select("id, name, slug, description")
        .order("name")
        .execute()
    )

    return response.data