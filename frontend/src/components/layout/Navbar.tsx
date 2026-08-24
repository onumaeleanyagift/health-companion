import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex items-center max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-xl font-bold text-slate-900">
          Health Companion
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
