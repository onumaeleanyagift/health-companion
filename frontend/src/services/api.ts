const API_URL = import.meta.env.VITE_API_URL;

export async function getTopics() {
  const response = await fetch(`${API_URL}/api/topics/`);

  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }

  return response.json();
}

export async function getArticles(topicId?: string) {
  const url = topicId
    ? `${API_URL}/api/articles/?topic_id=${topicId}`
    : `${API_URL}/api/articles/`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

export async function getArticle(articleId: string, language = "en") {
  const response = await fetch(
    `${API_URL}/api/articles/${articleId}?language=${language}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
}

export async function askQuestion(question: string) {
  const response = await fetch(`${API_URL}/api/ask/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get an answer");
  }

  return response.json();
}
