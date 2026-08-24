import { useEffect, useState } from "react";
import TopicCard from "../components/topics/TopicCard";
import { getTopics } from "../services/api";
import type { Topic } from "../types";

function Topics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTopics() {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch {
        setError("Unable to load health topics.");
      } finally {
        setLoading(false);
      }
    }

    loadTopics();
  }, []);

  if (loading) {
    return <p className="text-slate-600">Loading topics...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <section>
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-blue-700">Health Topics</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Browse health information
        </h1>

        <p className="mt-3 text-slate-600">
          Choose a topic to view related health information.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}

export default Topics;
