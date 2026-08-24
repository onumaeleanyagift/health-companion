import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "../services/api";
import type { Article } from "../types";

function ArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await getArticle(articleId!, language);
        setArticle(data);
      } catch {
        setError("Unable to load this article.");
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [articleId, language]);

  if (loading) {
    return <p className="text-slate-600">Loading article...</p>;
  }

  if (error || !article) {
    return (
      <div>
        <p className="text-red-600">{error || "Article not found."}</p>

        <Link
          to="/topics"
          className="mt-4 inline-block text-sm font-semibold text-blue-700"
        >
          Back to topics
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          to={`/topics/${article.topic_id}`}
          className="text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          ← Back to articles
        </Link>

        <div className="mb-8 flex gap-2">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              language === "en"
                ? "bg-blue-700 text-white"
                : "border border-slate-300 text-slate-700"
            }`}
          >
            English
          </button>

          <button
            type="button"
            onClick={() => setLanguage("pcm")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              language === "pcm"
                ? "bg-blue-700 text-white"
                : "border border-slate-300 text-slate-700"
            }`}
          >
            Pidgin
          </button>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium text-blue-700">{article.topic}</p>

        <h1 className="mt-2 text-4xl font-bold leading-tight text-slate-900">
          {article.title}
        </h1>

        {article.summary && (
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {article.summary}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
          {article.author && <span>By {article.author}</span>}

          {article.last_updated && <span>Updated {article.last_updated}</span>}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="whitespace-pre-line text-base leading-8 text-slate-700">
            {article.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ArticlePage;
