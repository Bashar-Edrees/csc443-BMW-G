import React from 'react';
import { Link } from 'react-router-dom';

export function MyNotices({ notices = [] }) {
  // Filter notices posted by the current user (Bashar Idris)
  const myNotices = notices.filter(n => n.authorEmail === 'bashar.idris@lau.edu');

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-ink">Mine</h1>
      
      <div className="mt-6 border-b-2 border-ink">
        <nav className="flex gap-8" aria-label="Mine">
          <Link to="/mine" className="border-b-[3px] border-brand-600 pb-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink" aria-current="page">
            My notices <span className="ml-1.5 bg-ink/10 px-1.5 py-0.5 font-mono text-[11px] tabular-nums">{myNotices.length || 3}</span>
          </Link>
          <Link to="/my-claims" className="border-b-[3px] border-transparent pb-2.5 font-display text-sm font-semibold uppercase tracking-wide text-muted hover:text-ink">
            My claims <span className="ml-1.5 bg-ink/10 px-1.5 py-0.5 font-mono text-[11px] tabular-nums">2</span>
          </Link>
        </nav>
      </div>

      {myNotices.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {myNotices.map(notice => (
            <li key={notice.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 border border-line bg-surface px-5 py-4">
              <span className="flex-none">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white ${
                  notice.kind === 'lost' ? 'bg-brand-600' : 'bg-accent-600'
                }`}>
                  {notice.kind}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <Link to={`/item/${notice.id}`} className="block font-display text-base font-bold uppercase tracking-tight text-ink hover:underline">
                  {notice.title}
                </Link>
                <span className="mt-0.5 block text-xs text-muted">Posted {notice.date} &middot; {notice.location}</span>
              </span>
              <span className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                <span className="inline-flex items-center border px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide border-ink/25 text-ink">
                  {notice.status}
                </span>
                <Link to={`/item/${notice.id}`} className="inline-flex items-center justify-center rounded bg-ink px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-paper hover:bg-brand-900">
                  Manage
                </Link>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-14 border-2 border-dashed border-ink/25 bg-surface px-6 py-14 text-center">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">You have not posted anything</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted">Lost something, or picked something up? It takes about a minute.</p>
          <div className="mt-7">
            <Link to="/report" className="inline-flex items-center justify-center rounded bg-brand-600 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-white hover:bg-brand-700">
              Post a notice
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}