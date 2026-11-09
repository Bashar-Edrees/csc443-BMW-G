import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Matches({ notices = [] }) {
  // Demonstration states for matching design reference variants:
  // "multiple" | "single" | "empty"
  const [matchState, setMatchState] = useState("multiple");

  // Sample match cards data reflecting the design reference specifications
  const multiMatches = [
    {
      id: "m-1",
      title: "Keys with green fob",
      location: "Science block, 1st floor · Lost Wed 21 Oct",
      score: 4,
      reasons: [
        "Same category — keys",
        "Same building, one floor apart",
        "Lost the same day it was found",
        "Both mention a green fob",
      ],
    },
    {
      id: "m-2",
      title: "House keys on a lanyard",
      location: "Library · Lost Mon 19 Oct",
      score: 3,
      reasons: [
        "Same category — keys",
        "Lost two days before it was found",
        "Lanyard mentioned in both",
      ],
    },
    {
      id: "m-3",
      title: "Car key, no ring",
      location: "Main car park · Lost Fri 16 Oct",
      score: 2,
      reasons: [
        "Same category — keys",
        "Five days before it was found",
      ],
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb Navigation */}
      <nav
        className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-ink">
          Board
        </Link>{" "}
        <span className="text-brand-600">/</span> Possible matches
      </nav>

      <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-ink">
        Possible matches
      </h1>
      <p className="mt-2 max-w-prose text-sm text-muted">
        For <strong className="font-semibold text-ink">Set of keys, red lanyard</strong>{" "}
        &mdash; found Wed 21 Oct, Science block. These are lost notices the board
        thinks could be the same object. Nothing here is decided: a claim still
        has to be made and approved.
      </p>

      {/* Render based on selected match state */}
      {matchState === "multiple" && (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {multiMatches.map((match) => (
            <li key={match.id} className="relative border-2 border-line bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 bg-brand-600 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  Lost
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Match
                  </span>
                  <span className="flex gap-0.5" role="img" aria-label={`${match.score} of 4`}>
                    {[1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-6 ${
                          i <= match.score ? "bg-accent-500" : "bg-line"
                        }`}
                      ></span>
                    ))}
                  </span>
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight tracking-tight text-ink">
                <Link to={`/item/${match.id}`} className="after:absolute after:inset-0">
                  {match.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted">{match.location}</p>
              <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                {match.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-ink/80">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-none bg-accent-500"
                      aria-hidden="true"
                    ></span>
                    {reason}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {matchState === "single" && (
        <>
          <div className="mt-10 border-2 border-accent-500 bg-accent-50 px-5 py-4">
            <p className="font-display text-sm font-bold uppercase tracking-wide text-accent-800">
              One notice matches on everything
            </p>
            <p className="mt-1 text-sm text-accent-900/80">
              Same category, same building, same day, and both describe a green fob. Worth
              messaging first.
            </p>
          </div>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <li className="relative border-2 border-line bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 bg-brand-600 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  Lost
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Match
                  </span>
                  <span className="flex gap-0.5" role="img" aria-label="4 of 4">
                    <span className="h-1.5 w-6 bg-accent-500"></span>
                    <span className="h-1.5 w-6 bg-accent-500"></span>
                    <span className="h-1.5 w-6 bg-accent-500"></span>
                    <span className="h-1.5 w-6 bg-accent-500"></span>
                  </span>
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight tracking-tight text-ink">
                <Link to="/item/m-1" className="after:absolute after:inset-0">
                  Keys with green fob
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted">Science block, 1st floor &middot; Lost Wed 21 Oct</p>
              <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                <li className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-accent-500" aria-hidden="true"></span>
                  Same category &mdash; keys
                </li>
                <li className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-accent-500" aria-hidden="true"></span>
                  Same building, one floor apart
                </li>
                <li className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-accent-500" aria-hidden="true"></span>
                  Lost the same day it was found
                </li>
                <li className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-accent-500" aria-hidden="true"></span>
                  Both mention a green fob
                </li>
              </ul>
            </li>
          </ul>
        </>
      )}

      {matchState === "empty" && (
        <div className="mt-10 border-2 border-dashed border-ink/25 bg-surface px-6 py-14 text-center">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
            Nothing on the board looks like this
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            No lost notice shares the category, and nothing was lost nearby in the last
            week. The notice stays up &mdash; matches are checked again whenever somebody
            posts.
          </p>
        </div>
      )}

    

      {/* Developer State Switcher Toolbar */}
      <div className="mt-16 flex items-center gap-4 border-t border-dashed border-line pt-4 text-xs text-muted">
        <span className="font-mono font-semibold uppercase tracking-wider">
          Test States:
        </span>
        <button
          onClick={() => setMatchState("multiple")}
          className={`underline ${matchState === "multiple" ? "font-bold text-ink" : ""}`}
        >
          Multiple Matches
        </button>
        <button
          onClick={() => setMatchState("single")}
          className={`underline ${matchState === "single" ? "font-bold text-ink" : ""}`}
        >
          One Strong Match
        </button>
        <button
          onClick={() => setMatchState("empty")}
          className={`underline ${matchState === "empty" ? "font-bold text-ink" : ""}`}
        >
          Nothing Matches
        </button>
      </div>
    </main>
  );
}