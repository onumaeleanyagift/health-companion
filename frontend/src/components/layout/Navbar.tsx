import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-slate-900">
          Health Companion
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            to="/topics"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Topics
          </Link>

          <Link
            to="/ask"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Ask a Question
          </Link>

          <button
            type="button"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            English
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
