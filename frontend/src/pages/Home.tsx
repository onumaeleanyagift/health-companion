import { useEffect, useState } from "react";
import { getTopics } from "../services/api";
import type { Topic } from "../types";
import { Link } from "react-router-dom";

function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);

  useEffect(() => {
    async function loadTopics() {
      try {
        const data = await getTopics();
        setTopics(data);
      } finally {
        setLoadingTopics(false);
      }
    }

    loadTopics();
  }, []);

  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-blue-700 px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-blue-100">
            Health Information Companion
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Simple health information you can understand and use.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:mt-6 sm:text-lg sm:leading-8">
            Get clear health information on everyday topics and ask questions
            using our health content.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              to="/topics"
              className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Explore Topics
            </Link>

            <Link
              to="/ask"
              className="rounded-lg border border-blue-300 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-600"
            >
              Ask a Health Question
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">Health Topics</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Find information by topic
            </h2>
          </div>

          <Link
            to="/topics"
            className="text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loadingTopics ? (
            <p className="text-slate-600">Loading topics...</p>
          ) : (
            topics.slice(0, 4).map((topic) => (
              <Link
                key={topic.id}
                to={`/topics/${topic.id}`}
                className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{topic.name}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  View health information about {topic.name.toLowerCase()}.
                </p>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-700">Need an answer?</p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Ask a health question
          </h2>

          <p className="mt-3 text-slate-600">
            Ask a question and get an answer based on the published health
            information available in the app.
          </p>

          <Link
            to="/ask"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Ask a Question
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
