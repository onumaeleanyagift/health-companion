export interface Topic {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  topic_id: number;
  title: string;
  summary: string | null;
  body: string;
  last_updated: string | null;
  author: string | null;
  topic: string;
}

export interface AskResponse {
  question: string;
  answer: string;
  articles: Article[];
}
