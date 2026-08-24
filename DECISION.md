# Health Companion Decision Document

## 1. What I built

I built a health information website where users can:

- Read health articles by topic.
- Switch between English and Nigerian Pidgin.
- Read articles in Pidgin when a translation is available.
- Fall back to English when a Pidgin translation is not available.
- Ask health questions and get answers based on the health articles.

I focused on the main requirements in the assessment and kept the project simple.

I did not build an admin dashboard because it was not required for the assessment.

## 2. How I handled the health data

I stored the health content in Supabase instead of keeping it inside the frontend code.

I separated the data into topics, articles, and translations.

I also removed duplicate content where necessary and handled fields that could be empty, such as article summaries.

This means the content can change in the database without changing the frontend code.

## 3. How I stored translations

I created a separate translations table for translated articles.

Each translation connects to an article using its article ID.

For example:

```text
Article
  |
  ├── English
  |
  └── Pidgin
```

If an article has a Pidgin translation, the user can view it.

If there is no Pidgin translation, the app shows the English version instead.

This also makes it easier to add more languages later, such as:

```text
English
Pidgin
Igbo
Yoruba
Hausa
```

Adding a new language would only require adding new translation records.

## 4. How the application works

I used this structure:

```text
React Frontend
      |
      v
FastAPI Backend
      |
      ├── Supabase
      |
      └── Gemini AI
```

The React frontend communicates with the FastAPI backend.

The backend communicates with Supabase to get the health content.

The backend also communicates with Gemini for the AI question feature.

I kept the Supabase and Gemini keys on the backend instead of exposing them in the frontend.

## 5. The AI feature

I added an "Ask a Health Question" feature.

When a user asks a question, the backend:

1. Extracts important words from the question.
2. Searches the published health articles.
3. Scores the articles based on how closely they match the question.
4. Selects the most relevant articles.
5. Sends those articles to the AI as context.
6. Returns the answer to the user.

For the article scoring, I gave more points to matches in the title than matches in the summary or article body.

For example:

```text
Title match   = 3 points
Summary match = 2 points
Body match    = 1 point
```

This helps articles with more relevant titles appear first.

The AI should only answer using the health content provided to it.

If the system cannot find useful health content, it returns a message instead of trying to make up an answer.

## 6. Why I used this approach

I chose a simple keyword search instead of adding a more complex search system.

The dataset for this assessment is small, so keyword matching was enough to provide useful results.

It also made the system easier for me to understand, test, and debug as an intern.

If the application grew to contain thousands of articles, I would consider a more advanced search system.

## 7. Frontend

I built the frontend with:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

The main pages are:

```text
Home
Topics
Topic Articles
Article
Ask a Question
```

The frontend is responsive and works on both desktop and mobile screens.

## 8. Deployment

I deployed the FastAPI backend on Render.

I deployed the React frontend on Vercel.

Supabase stores the application data.

The backend API is available through the deployed FastAPI `/docs` page.

The frontend works correctly in the local development environment. I also deployed the frontend, but I ran into a connection issue between the deployed Vercel frontend and the Render backend close to the submission deadline.

Because of the time limit, I left the deployed API available for testing directly.

## 9. What I would improve

If I had more time, I would improve:

- The connection between the deployed frontend and backend.
- Automated tests for the API.
- Article search and ranking.
- Handling of questions that are not related to the health content.
- Better error messages.
- Better loading states.
- A simple admin area for managing articles.
- Support for more languages.
- More detailed testing of the AI responses.
