import React from "react";
import { Link } from "react-router-dom";

export function DesignPackIndex() {
  const surfaces = [
    {
      num: "01",
      title: "The board",
      desc: "The pitch, the counts, and the newest notices.",
      member: "Miguel Saade (Member 1)",
      route: "/",
    },
    {
      num: "02",
      title: "Browse",
      desc: "Everything posted, with filters and all four data states.",
      member: "Miguel Saade (Member 1)",
      route: "/browse",
    },
    {
      num: "03",
      title: "Notice detail",
      desc: "One item in three viewer variants, plus a pending claim.",
      member: "George Fayyad (Member 2)",
      route: "/item/1",
    },
    {
      num: "04",
      title: "Possible matches",
      desc: "The match screen, and the rule that produces it.",
      member: "George Fayyad (Member 2)",
      route: "/matches",
    },
    {
      num: "05",
      title: "Post a notice",
      desc: "One form, two shapes, with validation and the leave guard.",
      member: "Bashar Idris (Member 3)",
      route: "/report",
    },
    {
      num: "06",
      title: "My notices",
      desc: "What you posted and the claims waiting on you.",
      member: "Bashar Idris (Member 3)",
      route: "/mine",
    },
    {
      num: "07",
      title: "My claims",
      desc: "Where you stand on other people's notices.",
      member: "Wassim Chahine (Member 4)",
      route: "/my-claims",
    },
    {
      num: "08",
      title: "Sign in & register",
      desc: "Both states, plus a rejected sign-in.",
      member: "Wassim Chahine (Member 4)",
      route: "/auth",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        CSC443 &middot; design pack
      </p>
      <h1 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight text-ink">
        Mafqoud
      </h1>
      <p className="mt-2 font-display text-xl uppercase tracking-tight text-muted">
        Topic 06 &mdash; Campus Lost &amp; Found
      </p>
      <p className="mt-5 max-w-prose text-sm text-ink">
        Eight surfaces, two for each of you. Open each one, read the markup, build
        it as React components. Every class here is a real Tailwind class, so it
        carries straight across &mdash; that is why you were given HTML and not a
        picture.
      </p>

      {/* Grid of 8 Surfaces */}
      <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {surfaces.map((s) => (
          <li
            key={s.num}
            className="relative border border-line bg-surface p-5 transition hover:border-ink"
          >
            <span className="font-mono text-[11px] text-brand-600">{s.num}</span>
            <h2 className="mt-1.5 font-display text-lg font-bold uppercase tracking-tight text-ink">
              <Link to={s.route} className="after:absolute after:inset-0">
                {s.title}
              </Link>
            </h2>
            <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
            <p className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {s.member}
            </p>
          </li>
        ))}
      </ul>

      {/* Signature Component Link & House Rule Box */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Link
          to="/matches"
          className="border-2 border-ink bg-surface p-5 transition hover:bg-ink hover:text-paper"
        >
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">
            The match card &rarr;
          </h2>
          <p className="mt-1.5 text-sm opacity-75">
            Your signature component, in every strength it has. Build this first.
          </p>
        </Link>
        <div className="border border-line bg-surface p-5">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
            The house rule
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            One approved claim per item. Approving it rejects the others in the
            same operation. Nobody claims their own notice.
          </p>
        </div>
      </div>

      {/* Project Guidelines Section */}
      <section className="mt-12 max-w-prose">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
          What is fixed and what is yours
        </h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-display font-bold uppercase tracking-wide text-ink">
              Fixed
            </dt>
            <dd className="mt-0.5 text-muted">
              The eight surfaces, the four data states, the three viewer
              variants, and the house rule. These carry the marks.
            </dd>
          </div>
          <div>
            <dt className="font-display font-bold uppercase tracking-wide text-ink">
              A direction, not a cage
            </dt>
            <dd className="mt-0.5 text-muted">
              Mafqoud is a complete identity &mdash; name, palette, condensed type,
              the pinned-notice language. Implement it as given and you will do
              well. Re-skin it if your team would rather, but the new skin has to
              be applied just as consistently everywhere, and expect to be asked
              why.
            </dd>
          </div>
          <div>
            <dt className="font-display font-bold uppercase tracking-wide text-ink">
              Yours regardless
            </dt>
            <dd className="mt-0.5 text-muted">
              Component boundaries, props, state placement, routing. The design
              says nothing about those and they carry most of the marks.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}