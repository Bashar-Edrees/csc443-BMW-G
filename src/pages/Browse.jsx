import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NoticeCard } from "../components/NoticeCard";

export function Browse({ notices = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showingType, setShowingType] = useState("everything"); // everything, lost, found
  const [category, setCategory] = useState("Any");
  const [location, setLocation] = useState("Anywhere");
  
  // Simulation states for demonstration matching your HTML design reference sections
  const [viewState, setViewState] = useState("normal"); // normal, loading, empty, error

  // Filter logic based on inputs
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesShowing =
      showingType === "everything" || notice.kind?.toLowerCase() === showingType;
    
    const matchesCategory =
      category === "Any" || notice.category?.toLowerCase() === category.toLowerCase();
    
    const matchesLocation =
      location === "Anywhere" || notice.location?.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesShowing && matchesCategory && matchesLocation;
  });

  const handleClear = () => {
    setSearchTerm("");
    setShowingType("everything");
    setCategory("Any");
    setLocation("Anywhere");
    setViewState("normal");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-ink">
        The board
      </h1>
      <p className="mt-2 max-w-prose text-sm text-muted">
        Everything currently posted. Lost notices have a torn edge, found notices
        a solid one &mdash; and both say which they are, because an edge is not
        a word.
      </p>

      <div className="mt-7 space-y-7">
        {/* Filter Form Controls */}
        <div className="flex flex-wrap items-end gap-3 border-2 border-ink bg-surface p-4">
          <div className="flex min-w-[10rem] flex-1 flex-col gap-1.5">
            <label
              htmlFor="f-q"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              Search
            </label>
            <input
              id="f-q"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
              placeholder="backpack, keys, glasses"
            />
          </div>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted mb-1.5">
              Showing
            </legend>
            <div className="flex overflow-hidden rounded border border-ink/20">
              <button
                type="button"
                onClick={() => setShowingType("everything")}
                className={`px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide transition ${
                  showingType === "everything"
                    ? "bg-ink text-paper"
                    : "bg-surface text-muted hover:text-ink"
                }`}
              >
                Everything
              </button>
              <button
                type="button"
                onClick={() => setShowingType("lost")}
                className={`border-l border-ink/25 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide transition ${
                  showingType === "lost"
                    ? "bg-ink text-paper"
                    : "bg-surface text-muted hover:text-ink"
                }`}
              >
                Lost
              </button>
              <button
                type="button"
                onClick={() => setShowingType("found")}
                className={`border-l border-ink/25 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide transition ${
                  showingType === "found"
                    ? "bg-ink text-paper"
                    : "bg-surface text-muted hover:text-ink"
                }`}
              >
                Found
              </button>
            </div>
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="f-cat"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              Category
            </label>
            <select
              id="f-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-40 rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
            >
              <option>Any</option>
              <option>Bags</option>
              <option>Keys</option>
              <option>Electronics</option>
              <option>Documents</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="f-loc"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              Where
            </label>
            <select
              id="f-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-40 rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
            >
              <option>Anywhere</option>
              <option>Library</option>
              <option>Cafeteria</option>
              <option>Science block</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 rounded px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-muted transition hover:bg-ink/5 hover:text-ink"
          >
            Clear
          </button>
          
          <span className="flex-1"></span>
          <span className="font-display text-xs uppercase tracking-wide text-muted">
            {filteredNotices.length} notices
          </span>
        </div>

        {/* Dynamic State Handling: Normal vs Loading vs Empty vs Error */}
        {viewState === "loading" ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <li key={n} className="relative border-2 border-line bg-surface p-5 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="h-6 w-16 animate-pulse bg-line"></span>
                  <span className="h-6 w-14 animate-pulse bg-line"></span>
                </div>
                <span className="mt-3 block h-6 w-4/5 animate-pulse bg-line"></span>
                <span className="mt-2 block h-4 w-3/5 animate-pulse bg-line"></span>
                <span className="mt-3 block h-4 w-full animate-pulse bg-line"></span>
                <span className="mt-1.5 block h-4 w-2/3 animate-pulse bg-line"></span>
              </li>
            ))}
          </ul>
        ) : viewState === "empty" || filteredNotices.length === 0 ? (
          <div className="border-2 border-dashed border-ink/25 bg-surface px-6 py-14 text-center">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
              No notices match your filter
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
              Widen your filter settings or post a new notice to the board.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
              >
                Search everywhere
              </button>
              <Link
                to="/report"
                className="inline-flex items-center justify-center rounded bg-brand-600 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700"
              >
                Post a notice
              </Link>
            </div>
          </div>
        ) : viewState === "error" ? (
          <div className="border-2 border-brand-300 bg-brand-50 px-6 py-14 text-center">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-brand-800">
              The board would not load
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-brand-900/70">
              The server did not answer. This usually passes in a moment.
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => setViewState("normal")}
                className="inline-flex items-center justify-center rounded bg-ink px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </ul>
        )}

        {/* Pagination Bar */}
        <nav className="flex items-center gap-2 pt-4" aria-label="Pagination">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
          >
            Previous
          </button>
          <button
            type="button"
            aria-current="page"
            className="inline-flex items-center justify-center rounded bg-ink px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-paper"
          >
            1
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
          >
            2
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
          >
            3
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
          >
            Next
          </button>
        </nav>
      </div>

      {/* Developer state toggle helper for testing UI states from HTML template */}
      <div className="mt-16 flex items-center gap-4 border-t border-dashed border-line pt-4 text-xs text-muted">
        <span className="font-mono font-semibold uppercase tracking-wider">Test States:</span>
        <button onClick={() => setViewState("normal")} className="underline hover:text-ink">Normal</button>
        <button onClick={() => setViewState("loading")} className="underline hover:text-ink">Loading Skeleton</button>
        <button onClick={() => setViewState("empty")} className="underline hover:text-ink">Empty State</button>
        <button onClick={() => setViewState("error")} className="underline hover:text-ink">Error State</button>
      </div>
    </main>
  );
}