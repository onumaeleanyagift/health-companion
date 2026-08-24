import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-blue-700 px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-blue-100">
            Health Information Companion
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Simple health information you can understand and use.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Get clear health information on everyday topics and ask questions
            using our health content.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/topics"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Explore Topics
            </Link>

            <Link
              to="/ask"
              className="rounded-lg border border-blue-300 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Ask a Health Question
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
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
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">Malaria</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prevention and everyday malaria information.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">Maternal Health</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Information for pregnancy and maternal care.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">Nutrition</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Practical information about healthy eating.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-900">First Aid</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Basic guidance for common first-aid situations.
            </p>
          </div>
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