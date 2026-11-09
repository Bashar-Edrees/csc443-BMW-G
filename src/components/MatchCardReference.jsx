import React from "react";
import { Link } from "react-router-dom";

export function MatchCardReference() {
  // Sample match cards at 4 strengths as specified in the reference
  const strengthMatches = [
    {
      id: "s-4",
      title: "Keys with green fob",
      location: "Science block · Wed 21 Oct",
      score: 4,
      reasons: ["Same category", "Same building", "Same day", "Green fob in both"],
    },
    {
      id: "s-3",
      title: "House keys on a lanyard",
      location: "Library · Mon 19 Oct",
      score: 3,
      reasons: ["Same category", "Two days apart", "Lanyard in both"],
    },
    {
      id: "s-2",
      title: "Car key, no ring",
      location: "Main car park · Fri 16 Oct",
      score: 2,
      reasons: ["Same category", "Five days apart"],
    },
    {
      id: "s-1",
      title: "Keyring, no keys",
      location: "Cafeteria · Sat 10 Oct",
      score: 1,
      reasons: ["Same category"],
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-ink">
        The match card
      </h1>
      <p className="mt-2 max-w-prose text-sm text-muted">
        The signature component of Mafqoud, and where your house rule becomes
        visible: an item may hold at most one approved claim, approving one
        rejects the rest in the same operation, and nobody may claim their own
        notice. Build this and the notice card before any screen &mdash; six of
        your eight surfaces use one or the other.
      </p>

      {/* Anatomy Section: Lost vs Found Visual Distinction */}
      <div className="mt-14 border-t border-dashed border-slate-300 pt-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Anatomy &middot; Lost and found are never only a colour
          </span>
          <span className="text-xs text-slate-500">
            Different word, different fill, different border — torn and dashed
            for lost, solid for found. A notice board printed in black and white
            still has to work.
          </span>
        </div>
      </div>

      <ul className="mt-5 grid gap-5 sm:grid-cols-2">
        <li className="relative border-2 border-dashed border-brand-300 bg-surface p-5 pt-6">
          <span
            className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-600 shadow-[0_1px_0_0_rgba(0,0,0,.25)] ring-2 ring-paper"
            aria-hidden="true"
          ></span>
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 bg-brand-600 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Lost
            </span>
            <span className="inline-flex items-center border border-ink/20 px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-ink">
              Open
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink">
            Black JanSport backpack
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Library, 2nd floor &middot; Lost Tue 20 Oct
          </p>
        </li>

        <li className="relative border-2 border-accent-300 bg-surface p-5 pt-6">
          <span
            className="absolute -top-2.5 left-6 h-5 w-16 -rotate-3 bg-accent-200/70 ring-1 ring-accent-300/50"
            aria-hidden="true"
          ></span>
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 bg-accent-600 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Found
            </span>
            <span className="inline-flex items-center border border-ink/20 px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-ink">
              Open
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink">
            Set of keys, red lanyard
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Science block stairwell &middot; Found Wed 21 Oct
          </p>
        </li>
      </ul>

      {/* Component Section: Match Cards at Four Strengths */}
      <div className="mt-14 border-t border-dashed border-slate-300 pt-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Component &middot; The match card, at four strengths
          </span>
          <span className="text-xs text-slate-500">
            The bar count is the score. The reasons underneath are not optional —
            they are what makes the score believable.
          </span>
        </div>
      </div>

      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {strengthMatches.map((m) => (
          <li key={m.id} className="relative border-2 border-line bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 bg-brand-600 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                Lost
              </span>
              <span className="flex items-center gap-2">
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Match
                </span>
                <span className="flex gap-0.5" role="img" aria-label={`${m.score} of 4`}>
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-6 ${
                        i <= m.score ? "bg-accent-500" : "bg-line"
                      }`}
                    ></span>
                  ))}
                </span>
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight tracking-tight text-ink">
              <Link to="/item/1" className="after:absolute after:inset-0">
                {m.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted">{m.location}</p>
            <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
              {m.reasons.map((reason, idx) => (
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
      <p className="mt-3 text-xs text-muted">
        A score of 1 is below the threshold and would not normally be shown. It is
        here so you can see where the cut falls.
      </p>

      {/* Reference Section: Status Vocabulary */}
      <div className="mt-14 border-t border-dashed border-slate-300 pt-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Reference &middot; Status vocabulary
          </span>
          <span className="text-xs text-slate-500">
            Every status Mafqoud shows. Each is a word in a box, so none of them
            depends on colour.
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-ink/20 text-ink">
          Open
        </span>
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-brand-400 text-brand-700">
          2 claims waiting
        </span>
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-accent-500 text-accent-700">
          Matched
        </span>
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-accent-600 bg-accent-50 text-accent-800">
          Returned
        </span>
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-ink/15 text-muted">
          Expired
        </span>
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-brand-400 text-brand-700">
          With the finder
        </span>
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-accent-600 bg-accent-50 text-accent-800">
          Approved
        </span>
        <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-ink/15 text-muted line-through">
          Not yours
        </span>
      </div>

      {/* Reference Section: Buttons */}
      <div className="mt-14 border-t border-dashed border-slate-300 pt-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Reference &middot; Buttons
          </span>
          <span className="text-xs text-slate-500">
            One primary per screen. Red is for posting and for destructive answers
            — it is the brand, so it is never decoration.
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Claim these keys
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded bg-brand-600 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Post a notice
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Edit notice
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-muted transition hover:bg-ink/5 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Withdraw
        </button>
      </div>
    </main>
  );
}