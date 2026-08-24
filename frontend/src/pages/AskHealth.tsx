import { useState } from "react";
import { askQuestion } from "../services/api";
import type { AskResponse } from "../types";

function AskHealth() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) {
      setError("Please enter a health question.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await askQuestion(question);
      setResult(data);
    } catch {
      setError("Unable to get an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div>
        <p className="text-sm font-medium text-blue-700">Health Assistant</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Ask a health question
        </h1>

        <p className="mt-3 text-slate-600">
          Ask a question and get an answer based on the health information
          available in the app.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <label
          htmlFor="question"
          className="block text-sm font-medium text-slate-900"
        >
          Your question
        </label>

        <textarea
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="For example: How can I prevent malaria?"
          rows={5}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Getting answer..." : "Ask Question"}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">Answer</h2>

            <p className="mt-4 whitespace-pre-line leading-7 text-slate-700">
              {result.answer}
            </p>
          </section>

          {result.articles.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900">
                Related articles
              </h2>

              <div className="mt-4 space-y-4">
                {result.articles.map((article) => (
                  <article
                    key={article.id}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <p className="text-sm font-medium text-blue-700">
                      {article.topic}
                    </p>

                    <h3 className="mt-1 font-semibold text-slate-900">
                      {article.title}
                    </h3>

                    {article.summary && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {article.summary}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
}

export default AskHealth;
