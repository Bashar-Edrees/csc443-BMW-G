import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ReportNotice({ onAddNotice, currentUser }) {
  const navigate = useNavigate();

  // Get current date string (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];

  // Form State initialized cleanly
  const [kind, setKind] = useState("lost"); // "lost" or "found"
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bags");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(todayStr);
  const [description, setDescription] = useState("");

  // Validation & Control States
  const [dateError, setDateError] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Handle Date Validation
  const handleDateChange = (e) => {
    const val = e.target.value;
    setDate(val);
    setHasUnsavedChanges(true);

    if (!val) {
      setDateError(true);
      setFormErrorMsg("Please select a date.");
      return;
    }

    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      setDateError(true);
      setFormErrorMsg("That is in the future. Pick today or a day that has already happened.");
    } else {
      setDateError(false);
      setFormErrorMsg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormErrorMsg("Please provide a title for what you lost or found.");
      return;
    }

    if (dateError) {
      setFormErrorMsg("That date is in the future. Pick today or a past date.");
      return;
    }

    const newNotice = {
      id: `notice-${Date.now()}`,
      kind: kind,
      title: title.trim(),
      category: category,
      location: location.trim() || "Campus",
      date: date,
      description: description.trim(),
      status: "Open",
      authorName: currentUser?.name || "Bashar Idris",
      authorEmail: currentUser?.email || "bashar.idris@lau.edu",
      claims: [],
    };

    if (onAddNotice) {
      onAddNotice(newNotice);
    }

    navigate("/");
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Breadcrumb */}
      <nav
        className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-ink">
          Board
        </Link>{" "}
        <span className="text-brand-600">/</span> Report
      </nav>

      <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-ink">
        Post a notice
      </h1>
      <p className="mt-2 max-w-prose text-sm text-muted">
        The switch below changes the wording of everything under it. One form,
        two jobs &mdash; not two forms.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 max-w-3xl space-y-7">
        {/* Kind Toggle (Lost vs Found) */}
        <fieldset className="border-2 border-ink bg-surface p-5">
          <legend className="px-2 font-display text-sm font-bold uppercase tracking-wide text-ink">
            What are you posting?
          </legend>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <label
              onClick={() => {
                setKind("lost");
                setHasUnsavedChanges(true);
              }}
              className={`flex cursor-pointer items-start gap-3 border-2 p-4 transition ${
                kind === "lost"
                  ? "border-brand-600 bg-brand-50"
                  : "border-line bg-surface"
              }`}
            >
              <input
                type="radio"
                name="kind"
                checked={kind === "lost"}
                onChange={() => setKind("lost")}
                className="mt-1 h-4 w-4 accent-brand-600"
              />
              <span>
                <span className="block font-display text-base font-bold uppercase tracking-tight text-brand-800">
                  I lost something
                </span>
                <span className="mt-1 block text-sm text-ink/70">
                  You will be asked where you last had it.
                </span>
              </span>
            </label>

            <label
              onClick={() => {
                setKind("found");
                setHasUnsavedChanges(true);
              }}
              className={`flex cursor-pointer items-start gap-3 border-2 p-4 transition ${
                kind === "found"
                  ? "border-accent-600 bg-accent-50"
                  : "border-line bg-surface"
              }`}
            >
              <input
                type="radio"
                name="kind"
                checked={kind === "found"}
                onChange={() => setKind("found")}
                className="mt-1 h-4 w-4 accent-accent-600"
              />
              <span>
                <span className="block font-display text-base font-bold uppercase tracking-tight text-ink">
                  I found something
                </span>
                <span className="mt-1 block text-sm text-ink/70">
                  You will be asked where you left it.
                </span>
              </span>
            </label>
          </div>
        </fieldset>

        {/* Inputs Grid */}
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="i-title"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              What is it
            </label>
            <input
              id="i-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHasUnsavedChanges(true);
                if (formErrorMsg) setFormErrorMsg("");
              }}
              placeholder="Black JanSport backpack"
              className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
              required
            />
            <p className="text-xs text-muted">
              Short and plain. This is the headline on the board.
            </p>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="i-cat"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              Category
            </label>
            <select
              id="i-cat"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setHasUnsavedChanges(true);
              }}
              className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
            >
              <option value="Bags">Bags</option>
              <option value="Keys">Keys</option>
              <option value="Electronics">Electronics</option>
              <option value="Documents">Documents</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="i-where"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {kind === "lost" ? "Where you last had it" : "Where you left it"}
            </label>
            <input
              id="i-where"
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setHasUnsavedChanges(true);
              }}
              placeholder={kind === "lost" ? "Library, 2nd floor" : "Security desk, block B"}
              className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="i-when"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              When
            </label>
            <input
              id="i-when"
              type="date"
              value={date}
              onChange={handleDateChange}
              aria-invalid={dateError}
              className={`w-full rounded border bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-4 ${
                dateError
                  ? "border-brand-500 focus:border-brand-600 focus:ring-brand-100"
                  : "border-ink/20 focus:border-ink focus:ring-ink/10"
              }`}
            />
            {dateError && (
              <p className="text-xs font-semibold text-brand-700">
                That is in the future. Pick today or a day that has already happened.
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="i-desc"
            className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
          >
            Describe it
          </label>
          <textarea
            id="i-desc"
            rows="4"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setHasUnsavedChanges(true);
            }}
            placeholder="Marks, contents, stickers, anything a stranger could not guess"
            className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
          ></textarea>
          <p className="text-xs text-muted">
            The details you leave out here are what you will use later to prove it
            is yours. Do not put all of them in.
          </p>
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col gap-1.5">
          <label className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Photo
          </label>
          <div className="flex items-center gap-4 border-2 border-dashed border-ink/25 bg-surface px-5 py-6">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
            >
              Choose a file
            </button>
            <span className="text-xs text-muted">Optional. Helps enormously.</span>
          </div>
        </div>

        {/* Buttons and Validation Bar */}
        <div className="flex flex-wrap items-center gap-3 border-t-2 border-ink pt-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded bg-brand-600 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700"
          >
            Put it on the board
          </button>
          <button
            type="button"
            onClick={() => {
              if (hasUnsavedChanges) {
                setShowCancelModal(true);
              } else {
                navigate("/");
              }
            }}
            className="inline-flex items-center justify-center rounded px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-muted transition hover:bg-ink/5 hover:text-ink"
          >
            Cancel
          </button>
          <span className="flex-1"></span>
          {formErrorMsg && (
            <span className="text-xs font-semibold text-brand-700">
              {formErrorMsg}
            </span>
          )}
        </div>
      </form>

      {/* Leave Modal Guard */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="w-full max-w-md border-2 border-ink bg-surface">
            <h2 className="border-b-2 border-ink px-6 py-4 font-display text-xl font-bold uppercase tracking-tight text-ink">
              Leave without posting?
            </h2>
            <p className="px-6 py-6 text-sm text-muted">
              Your notice is not saved until it goes on the board.
            </p>
            <div className="flex justify-end gap-2 border-t border-line bg-ink/5 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
              >
                Keep writing
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center rounded bg-brand-600 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}