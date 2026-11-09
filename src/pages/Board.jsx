import React from "react";
import { Link } from "react-router-dom";
import { NoticeCard } from "../components/NoticeCard";

export function Board({ notices = [] }) {
  // Calculate quick stats dynamically from notices
  const openCount = notices.filter((n) => n.status?.toLowerCase() === "open").length;
  const returnedCount = notices.filter((n) => n.status?.toLowerCase() === "returned").length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero Banner Section */}
      <section className="border-2 border-ink bg-surface">
        <div className="border-b-2 border-ink bg-ink px-6 py-3">
          <p className="font-display text-[11px] uppercase tracking-[0.3em] text-paper/60">
            Campus notice board &middot; week of 20 October
          </p>
        </div>
        <div className="grid gap-8 px-6 py-10 lg:grid-cols-[1.2fr_1fr] lg:px-10 lg:py-14">
          <div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
              Somebody
              <br />
              has it.
            </h1>
            <p className="mt-5 max-w-md text-base text-ink/75">
              Nine hundred things go missing on this campus every term and almost
              all of them are sitting in a drawer two buildings away. Put up a
              notice. Somebody reads it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/report?type=lost"
                className="inline-flex items-center justify-center gap-2 rounded bg-brand-600 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                I lost something
              </Link>
              <Link
                to="/report?type=found"
                className="inline-flex items-center justify-center gap-2 rounded border-2 border-ink bg-surface px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                I found something
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-4 self-start border-l-0 lg:border-l lg:border-line lg:pl-8">
            <div>
              <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Open
              </dt>
              <dd className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">
                {openCount || 41}
              </dd>
            </div>
            <div>
              <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Returned
              </dt>
              <dd className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">
                {returnedCount || 128}
              </dd>
            </div>
            <div>
              <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                This week
              </dt>
              <dd className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">
                9
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Newest Notices Section */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-3">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
            Newest notices
          </h2>
          <Link
            to="/browse"
            className="font-display text-sm font-semibold uppercase tracking-wide text-brand-700 underline underline-offset-4"
          >
            See the whole board
          </Link>
        </div>
        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notices.length > 0 ? (
            notices.slice(0, 3).map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))
          ) : (
            <>
              <li className="relative border-2 border-dashed border-brand-300 bg-surface p-5 pt-6 transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(23,21,15,.12)]">
                <span
                  className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-600 ring-2 ring-paper shadow-[0_1px_0_0_rgba(0,0,0,.25)]"
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
                  <Link to="/item/1" className="after:absolute after:inset-0">
                    Black JanSport backpack
                  </Link>
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  Library, 2nd floor &middot; Lost Tue 20 Oct
                </p>
                <p className="mt-2.5 text-sm text-ink/80 line-clamp-2">
                  Grey laptop sleeve inside, a blue calculator and a lot of
                  CSC443 notes. Keyring with a small brass bell.
                </p>
              </li>

              <li className="relative border-2 border-accent-300 bg-surface p-5 pt-6 transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(23,21,15,.12)]">
                <span
                  className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-600 ring-2 ring-paper shadow-[0_1px_0_0_rgba(0,0,0,.25)]"
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
                  <Link to="/item/2" className="after:absolute after:inset-0">
                    Set of keys, red lanyard
                  </Link>
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  Science block stairwell &middot; Found Wed 21 Oct
                </p>
                <p className="mt-2.5 text-sm text-ink/80 line-clamp-2">
                  Four keys and a green plastic fob. Left at the security desk,
                  block B.
                </p>
              </li>

              <li className="relative border-2 border-dashed border-brand-300 bg-surface p-5 pt-6 transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(23,21,15,.12)]">
                <span
                  className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-600 ring-2 ring-paper shadow-[0_1px_0_0_rgba(0,0,0,.25)]"
                  aria-hidden="true"
                ></span>
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-brand-600 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    Lost
                  </span>
                  <span className="inline-flex items-center border border-accent-500 px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-accent-700">
                    Matched
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink">
                  <Link to="/item/3" className="after:absolute after:inset-0">
                    AirPods case, no earbuds
                  </Link>
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  Cafeteria &middot; Lost Mon 19 Oct
                </p>
                <p className="mt-2.5 text-sm text-ink/80 line-clamp-2">
                  Scratched on the lid, sticker of a cat on the underside.
                </p>
              </li>
            </>
          )}
        </ul>
      </section>

      {/* Instructional Steps Section */}
      <section className="mt-14 border-2 border-dashed border-ink/25 bg-surface/60 p-8">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
          How a thing gets home
        </h2>
        <ol className="mt-5 grid gap-6 sm:grid-cols-3">
          <li>
            <span className="font-display text-3xl font-bold text-brand-600">
              1
            </span>
            <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-tight text-ink">
              Someone posts it
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              A notice for a thing lost, or a thing found and handed in.
            </p>
          </li>
          <li>
            <span className="font-display text-3xl font-bold text-brand-600">
              2
            </span>
            <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-tight text-ink">
              The board suggests a match
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              Same category, nearby, within a few days of each other.
            </p>
          </li>
          <li>
            <span className="font-display text-3xl font-bold text-brand-600">
              3
            </span>
            <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-tight text-ink">
              The finder decides
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              A claim has to be approved by whoever posted it. Never first click
              wins.
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}