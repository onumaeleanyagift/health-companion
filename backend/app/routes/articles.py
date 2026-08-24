from fastapi import APIRouter, Query
from app.database import supabase

# Groups all article-related endpoints under /api/articles.
router = APIRouter(
    prefix="/api/articles",
    tags=["Articles"]
)

# Return published articles.
# Optional topic and pagination parameters let the client narrow the results.
@router.get("/")
def get_articles(topic_id: int | None = None, page: int = Query(1, ge=1), limit: int = Query(10, ge=1, le=50)):

    # Calculate which records to retrieve for the requested page. For example, page 2 with a limit of 10 starts at record 10.
    start = (page - 1) * limit
    end = start + limit - 1

    # Start with all published articles and select only the fields that the frontend needs.
    query = (
        supabase
        .table("articles")
        .select(
            "id, title, summary, body, last_updated, author, "
            "topic:topics(name)"
        )
        .eq("status", "published")
    )

    # If a topic_id was provided, only return articles that belong to that topic.
    if topic_id:
        query = query.eq("topic_id", topic_id)

    # Apply pagination and execute the Supabase query.
    response = (query.range(start, end).execute())

    articles = response.data

    # Supabase returns the related topic as an object. We only need the topic name in the API response.
    for article in articles:
        article["topic"] = article["topic"]["name"]

    return articles

# Search published articles by title, summary, or body.
@router.get("/search")
def search_articles(q: str):
    # ilike performs a case-insensitive text search. This allows searches such as "malaria" and "Malaria" to match.
    response = (
        supabase
        .table("articles")
        .select(
            "id, title, summary, body, last_updated, author, "
            "topic:topics(name)"
        )
        .eq("status", "published")
        .or_(
            f"title.ilike.%{q}%,"
            f"summary.ilike.%{q}%,"
            f"body.ilike.%{q}%"
        )
        .execute()
    )

    articles = response.data

    # Supabase returns the related topic as an object. We only need the topic name in the API response.
    for article in articles:
        article["topic"] = article["topic"]["name"]

    return articles

# Return one published article by its ID. The language parameter allows the client to request a Pidgin translation.
@router.get("/{article_id}")
def get_articles(article_id: int, language: str = Query("en")):
    # Find the requested article and make sure it is published.
    response = (
        supabase
        .table("articles")
        .select("id, topic_id, title, summary, body, last_updated, author, "
        "topic:topics(name)")
        .eq("id", article_id)
        .eq("status", "published")
        .single()
        .execute()
    )

    article = response.data

    # Supabase returns the related topic as an object. We only need the topic name in the API response.
    article["topic"] = article["topic"]["name"]

    # Only check the translations table when the client requests Pidgin.
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

        # If a Pidgin translation exists, replace the English title and body with the translated versions.
        if translations:
            translation = translations[0]

            article["title"] = translation["title"]
            article["body"] = translation["body"]

    # If no Pidgin translation exists, the original English article remains unchanged.
    return article