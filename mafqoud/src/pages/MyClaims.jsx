import React, { useState } from "react";
import { Link } from "react-router-dom";

export function MyClaims() {
  // Demonstration state for switching between standard list view and the approved claim state
  const [viewMode, setViewMode] = useState("standard"); // "standard" or "approved"

  // Claims list state so "Withdraw" can remove an item interactively
  const [claims, setClaims] = useState([
    {
      id: "claim-1",
      title: "Set of keys, red lanyard",
      kind: "Found",
      dateClaimed: "22 Oct",
      finder: "Miguel S.",
      status: "With the finder",
    },
    {
      id: "claim-2",
      title: "Prescription glasses, tortoiseshell",
      kind: "Found",
      dateClaimed: "23 Oct",
      finder: "Hana A.",
      status: "Not yours",
    },
  ]);

  const handleWithdraw = (id) => {
    setClaims((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-ink">
        Mine
      </h1>

      {/* Tab Navigation matching Surface 06/07 layout */}
      <div className="mt-6 border-b-2 border-ink">
        <nav className="flex gap-8" aria-label="Mine">
          <Link
            to="/mine"
            className="border-b-[3px] border-transparent pb-2.5 font-display text-sm font-semibold uppercase tracking-wide text-muted hover:text-ink"
          >
            My notices{" "}
            <span className="ml-1.5 bg-ink/10 px-1.5 py-0.5 font-mono text-[11px] tabular-nums">
              3
            </span>
          </Link>
          <Link
            to="/my-claims"
            className="border-b-[3px] border-brand-600 pb-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink"
            aria-current="page"
          >
            My claims{" "}
            <span className="ml-1.5 bg-ink/10 px-1.5 py-0.5 font-mono text-[11px] tabular-nums">
              {claims.length}
            </span>
          </Link>
        </nav>
      </div>

      {viewMode === "approved" && (
        <div className="mt-6 border-2 border-accent-500 bg-accent-50 px-5 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center border border-accent-600 bg-accent-50 px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-accent-800">
              Approved
            </span>
            <span className="font-display text-base font-bold uppercase tracking-tight text-accent-900">
              Miguel says these are yours
            </span>
          </div>
          <p className="mt-2.5 text-sm text-accent-900/80">
            Collect from the block B security desk, weekdays before 17:00. Ask for
            the notice number <span className="font-mono">MF-0412</span>.
          </p>
          <p className="mt-1.5 text-sm text-accent-900/80">
            Miguel Saade &middot; <span className="font-mono">miguel.saade@lau.edu</span>
          </p>
        </div>
      )}

      {/* Claims List */}
      <ul className="mt-5 space-y-3">
        {claims.length > 0 ? (
          claims.map((claim) => (
            <li
              key={claim.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-3 border border-line bg-surface px-5 py-4"
            >
              <span className="flex-none">
                <span className="inline-flex items-center gap-1.5 bg-accent-600 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  {claim.kind}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-bold uppercase tracking-tight text-ink">
                  {claim.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Claimed {claim.dateClaimed} &middot; posted by {claim.finder}
                </span>
              </span>
              <span className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                <span
                  className={`inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide ${
                    claim.status === "Not yours"
                      ? "border-ink/15 text-muted line-through"
                      : "border-brand-400 text-brand-700"
                  }`}
                >
                  {claim.status}
                </span>
                <span className="flex-1 sm:flex-none"></span>
                {claim.status !== "Not yours" && (
                  <button
                    type="button"
                    onClick={() => handleWithdraw(claim.id)}
                    className="inline-flex items-center justify-center rounded px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-muted transition hover:bg-ink/5 hover:text-ink"
                  >
                    Withdraw
                  </button>
                )}
              </span>
            </li>
          ))
        ) : (
          <div className="border border-line bg-surface p-8 text-center text-sm text-muted">
            You have no active claims.
          </div>
        )}
      </ul>

      {/* Developer State Switcher Toolbar */}
      <div className="mt-16 flex items-center gap-4 border-t border-dashed border-line pt-4 text-xs text-muted">
        <span className="font-mono font-semibold uppercase tracking-wider">
          Test States:
        </span>
        <button
          onClick={() => setViewMode("standard")}
          className={`underline ${viewMode === "standard" ? "font-bold text-ink" : ""}`}
        >
          Standard View
        </button>
        <button
          onClick={() => setViewMode("approved")}
          className={`underline ${viewMode === "approved" ? "font-bold text-ink" : ""}`}
        >
          Approved State (Reveal Contact)
        </button>
      </div>
    </main>
  );
}