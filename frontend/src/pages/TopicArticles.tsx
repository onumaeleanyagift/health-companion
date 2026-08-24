import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles } from "../services/api";
import type { Article } from "../types";

function TopicArticles() {
  const { topicId } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getArticles(topicId);
        setArticles(data);
      } catch {
        setError("Unable to load articles.");
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [topicId]);

  if (loading) {
    return <p className="text-slate-600">Loading articles...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <section>
      <Link
        to="/topics"
        className="text-sm font-medium text-blue-700 hover:text-blue-800"
      >
        ← Back to topics
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-slate-900">Health Articles</h1>

        <p className="mt-2 text-slate-600">
          Browse health information for this topic.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-xl border border-slate-200 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {article.title}
            </h2>

            {article.summary && (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {article.summary}
              </p>
            )}

            <Link
              to={`/articles/${article.id}`}
              className="mt-5 inline-block text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TopicArticles;
