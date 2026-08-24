# Health Companion

A health information web application that helps users browse health articles, switch between English and Nigerian Pidgin, and ask health questions using an AI assistant.

## Features

- Browse health information by topic
- View individual health articles
- Switch between English and Nigerian Pidgin
- Fall back to English when a Pidgin translation is not available
- Ask health questions using natural language
- Get AI answers based only on the available health content
- See the articles used to provide the answer
- Responsive design for desktop and mobile

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Python
- FastAPI
- Supabase
- Google Gemini

## Project Structure

```text
health-companion/
├── backend/
│   └── app/
│       ├── routes/
│       ├── services/
│       ├── database.py
│       └── main.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── types/
│       └── App.tsx
│
├── DECISION.md
└── README.md
```

## How the AI Feature Works

When a user asks a question, the backend:

1. Extracts important keywords.
2. Searches the published health articles.
3. Scores the matching articles.
4. Gives higher scores to matches in article titles.
5. Selects the most relevant articles.
6. Sends the selected articles to Gemini as context.
7. Returns the generated answer and related articles.

The AI receives the relevant health content retrieved by the backend.

If the system cannot find useful content, it returns a fallback response instead of generating an unsupported answer.

## Language Support

The application currently supports:

- English
- Nigerian Pidgin

When a Pidgin translation exists, the application displays it.

When a translation does not exist, the application falls back to the English article.

The translation structure also allows more languages to be added later without changing the article structure.

## Running Locally

### Backend

Move into the backend folder:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Add your environment variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the API:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
https://health-companion-9jwc.onrender.com
```

FastAPI documentation:

```text
https://health-companion-9jwc.onrender.com/docs
```

### Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Add the API URL:

```env
VITE_API_URL=https://health-companion-9jwc.onrender.com
```

Start the frontend:

```bash
npm run dev
```

## API

The main API features include:

```text
GET  /api/topics/
GET  /api/articles/
GET  /api/articles/{article_id}
POST /api/ask/
```

The deployed FastAPI API also provides interactive documentation through:

```text
/docs
```

## Deployment

The backend is deployed on Render.

The frontend is deployed on Vercel.

Supabase provides the database.

The deployed API can be tested through the FastAPI `/docs` endpoint.

## Current Deployment Status

The backend API is deployed and available for testing.

The frontend is also deployed, but there is currently a connection issue between the deployed Vercel frontend and the Render backend.

The application works correctly in the local development environment.

## More Information

See [DECISION.md](./DECISION.md) for the decisions behind the project, including:

- How I interpreted the assessment
- How I handled the supplied data
- How translations are stored
- How the AI feature works
- Architecture decisions
- Trade-offs
- Possible improvements
