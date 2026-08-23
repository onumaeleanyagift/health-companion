import re
from fastapi import APIRouter
from pydantic import BaseModel
from app.database import supabase
from app.services.ai import generate_answer

router = APIRouter(
    prefix="/api/ask",
    tags=["AI"]
)

# Defines the data the API expects from the user.
class QuestionRequest(BaseModel):
    question: str

def extract_keywords(question: str):
    stop_words = {
        "a", "an", "the", "is", "are", "was", "were",
        "what", "how", "can", "i", "do", "does",
        "for", "to", "of", "in", "on", "with", "and"
    }

    words = re.findall(r"\b\w+\b", question.lower())

    return [
        word
        for word in words
        if word not in stop_words and len(word) > 2
    ]

# Give each article a score based on how many keywords it contains.
def score_article(article, keywords):
    title = (article.get("title") or "").lower()
    summary = (article.get("summary") or "").lower()
    body = (article.get("body") or "").lower()

    score = 0

    for keyword in keywords:
        if re.search(rf"\b{re.escape(keyword)}\b", title):
            score += 3
        elif re.search(rf"\b{re.escape(keyword)}\b", summary):
            score += 2
        elif re.search(rf"\b{re.escape(keyword)}\b", body):
            score += 1

    return score

# Receive a health question and find relevant articles.
@router.post("/")
def ask_question(request: QuestionRequest):
    keywords = extract_keywords(request.question)

    articles = []

    # Search published articles using the user's question.
    for keyword in keywords:
        response = (
            supabase
            .table("articles")
            .select(
                "id, title, summary, body, "
                "topic:topics(name)"
            )
            .eq("status", "published")
            .or_(
                f"title.ilike.%{keyword}%,"
                f"summary.ilike.%{keyword}%,"
                f"body.ilike.%{keyword}%"
            )
            .limit(3)
            .execute()
        )

        articles.extend(response.data)

    # Remove duplicate articles that matched more than one keyword.
    unique_articles = {}

    # Convert the topic object into a simple topic name.
    for article in articles:
        unique_articles[article["id"]] = article

    # Score each article based on how many keywords it matches.
    scored_articles = []

    for article in unique_articles.values():
        score = score_article(article, keywords)

        if score > 0:
            scored_articles.append((score, article))

    # Sort articles from the highest score to the lowest score.
    scored_articles.sort(
        key=lambda item: item[0],
        reverse=True
    )

    # Keep the three most relevant articles.
    articles = [
        article
        for score, article in scored_articles[:3]
    ]

    # Stop here if no published content matches the question.
    if not articles:
        return {
        "question": request.question,
        "answer": "I could not find any published health information that answers this question.",
        "articles": []
    }

    # Convert the nested topic object into a simple topic name.
    for article in articles:
        article["topic"] = article["topic"]["name"]

    # Generate an answer using only the retrieved health articles.
    answer = generate_answer(
        request.question,
        articles
    )

    return {
        "question": request.question,
        "answer": answer,
        "articles": articles
    }