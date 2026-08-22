from fastapi import APIRouter, Query
from app.database import supabase


router = APIRouter(
    prefix="/api/articles",
    tags=["Articles"]
)

@router.get("/")
def get_articles(topic_id: int | None = None):
    query = (
        supabase
        .table("articles")
        .select(
            "id, title, summary, body, last_updated, author, "
            "topic:topics(name)"
        )
        .eq("status", "published")
    )

    if topic_id:
        query = query.eq("topic_id", topic_id)

    response = query.execute()

    articles = response.data

    for article in articles:
        article["topic"] = article["topic"]["name"]

    return articles

    

@router.get("/{article_id}")
def get_articles(article_id: int, language: str = Query("en")):
    response = (
        supabase
        .table("articles")
        .select("id, title, summary, body, last_updated, author, "
        "topic:topics(name)")
        .eq("id", article_id)
        .eq("status", "published")
        .single()
        .execute()
    )

    article = response.data
    article["topic"] = article["topic"]["name"]

    if language == "pcm":
        translation_response = (
            supabase
            .table("translations")
            .select("title, body")
            .eq("article_id", article_id)
            .eq("language_code", "pcm")
            .execute()
        )

        translations = translation_response.data

        if translations:
            translation = translations[0]

            article["title"] = translation["title"]
            article["body"] = translation["body"]

    return article