import React from "react";
import { Link } from "react-router-dom";

export function NoticeCard({ notice }) {
  const isLost = notice.kind?.toLowerCase() === "lost";

  return (
    <li
      className={`relative border-2 bg-surface p-5 pt-6 transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(23,21,15,.12)] ${
        isLost ? "border-dashed border-brand-300" : "border-accent-300"
      }`}
    >
      {/* Visual top pin / tape decoration matching design pack specs */}
      {isLost ? (
        <span
          className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-600 ring-2 ring-paper shadow-[0_1px_0_0_rgba(0,0,0,.25)]"
          aria-hidden="true"
        ></span>
      ) : (
        <span
          className="absolute -top-2.5 left-6 h-5 w-16 -rotate-3 bg-accent-200/70 ring-1 ring-accent-300/50"
          aria-hidden="true"
        ></span>
      )}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white ${
            isLost ? "bg-brand-600" : "bg-accent-600"
          }`}
        >
          {notice.kind || "Lost"}
        </span>
        <span className="inline-flex items-center border border-ink/20 px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-ink">
          {notice.status || "Open"}
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink">
        <Link to={`/item/${notice.id}`} className="after:absolute after:inset-0">
          {notice.title}
        </Link>
      </h3>

      <p className="mt-1.5 text-sm text-muted">
        {notice.location} &middot; {notice.date}
      </p>

      <p className="mt-2.5 text-sm text-ink/80 line-clamp-2">
        {notice.description}
      </p>
    </li>
  );
}