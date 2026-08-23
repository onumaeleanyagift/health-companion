import os
from google import genai

# Create a Gemini client using the API key stored in the environment.
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_answer(question: str, articles: list):
    # Combine the retrieved articles into a context for Gemini.
    context = "\n\n".join(
        [
            f"Title: {article['title']}\n"
            f"Topic: {article['topic']}\n"
            f"Content: {article['body']}"
            for article in articles
        ]
    )

    # Tell Gemini to answer only from the health content we provide.
    prompt = f"""
You are a health information assistant.

Answer the user's question using only the health content provided below.

If the provided content does not contain enough information to answer
the question, say that you do not have enough information from the
available health content.

Do not add medical information from your own knowledge.

Health content:
{context}

User question:
{question}
"""
    
    # Generate an answer using the retrieved health articles.
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text