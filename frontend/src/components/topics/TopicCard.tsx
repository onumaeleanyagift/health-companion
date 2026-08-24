import { Link } from "react-router-dom";
import type { Topic } from "../../types";

interface TopicCardProps {
  topic: Topic;
}

function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      to={`/topics/${topic.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm"
    >
      <h2 className="font-semibold text-slate-900">{topic.name}</h2>

      <p className="mt-2 text-sm text-slate-600">
        View health information about {topic.name.toLowerCase()}.
      </p>
    </Link>
  );
}

export default TopicCard;
