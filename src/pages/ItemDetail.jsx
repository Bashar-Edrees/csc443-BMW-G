import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export function ItemDetail({ notices = [], onUpdateNotice, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find notice or fallback to default reference item
  const initialNotice = notices.find((n) => String(n.id) === String(id)) || {
    id: "1",
    kind: "found",
    title: "Set of keys, red lanyard",
    category: "Keys",
    location: "Science block stairwell · handed in at block B security",
    date: "Wednesday 21 October",
    description:
      "Four keys and a green plastic fob, one of them looks like a car key. Left at the security desk in block B — I did not keep them. Ask for Miguel's notice at the desk.",
    status: "Open",
    authorName: "Miguel Saade",
    authorEmail: "miguel.saade@lau.edu",
    claims: [
      {
        id: "c-1",
        name: "Bashar Idris",
        initials: "BI",
        email: "bashar.idris@lau.edu",
        proof: "Green fob with a chip in the corner, and the car key is a Kia.",
        date: "Thu 22 Oct",
        status: "pending",
      },
      {
        id: "c-2",
        name: "George Fayyad",
        initials: "GF",
        email: "george.fayyad@lau.edu",
        proof: "Red lanyard, I think it says the name of a gym on it.",
        date: "Fri 23 Oct",
        status: "pending",
      },
    ],
  };

  const [currentNotice, setCurrentNotice] = useState(initialNotice);
  const [claimProofText, setClaimProofText] = useState("");
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit Form Inputs State
  const [editTitle, setEditTitle] = useState(currentNotice.title);
  const [editDesc, setEditDesc] = useState(currentNotice.description);
  const [editLocation, setEditLocation] = useState(currentNotice.location);

  // Determine Viewer Variant
  const isOwner = currentUser && currentUser.email === currentNotice.authorEmail;
  const existingClaim = currentUser
    ? currentNotice.claims?.find((c) => c.email === currentUser.email)
    : null;

  // Handler: Save Notice Edits
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updated = {
      ...currentNotice,
      title: editTitle,
      description: editDesc,
      location: editLocation,
    };
    setCurrentNotice(updated);
    if (onUpdateNotice) onUpdateNotice(updated);
    setIsEditing(false);
  };

  // Handler: Mark Notice as Returned
  const handleMarkReturned = () => {
    const updated = { ...currentNotice, status: "Returned" };
    setCurrentNotice(updated);
    if (onUpdateNotice) onUpdateNotice(updated);
  };

  // Handler: Submit Claim
  const handleSubmitClaim = (e) => {
    e.preventDefault();
    if (!claimProofText.trim()) return;

    const newClaim = {
      id: `claim-${Date.now()}`,
      name: currentUser?.name || "Bashar Idris",
      initials: currentUser?.initials || "BI",
      email: currentUser?.email || "bashar.idris@lau.edu",
      proof: claimProofText.trim(),
      date: "Today",
      status: "pending",
    };

    const updated = {
      ...currentNotice,
      claims: [...(currentNotice.claims || []), newClaim],
    };

    setCurrentNotice(updated);
    if (onUpdateNotice) onUpdateNotice(updated);
    setShowClaimForm(false);
    setClaimProofText("");
  };

  // Handler: Withdraw Claim
  const handleWithdrawClaim = () => {
    if (!currentUser) return;
    const updatedClaims = currentNotice.claims.filter(
      (c) => c.email !== currentUser.email
    );
    const updated = { ...currentNotice, claims: updatedClaims };
    setCurrentNotice(updated);
    if (onUpdateNotice) onUpdateNotice(updated);
  };

  // Handler: Approve Claim (House Rule: Approving one claim returns item and rejects others)
  const handleApproveClaim = (claimId) => {
    const updatedClaims = currentNotice.claims.map((c) =>
      c.id === claimId ? { ...c, status: "approved" } : { ...c, status: "rejected" }
    );
    const updated = {
      ...currentNotice,
      status: "Returned",
      claims: updatedClaims,
    };
    setCurrentNotice(updated);
    if (onUpdateNotice) onUpdateNotice(updated);
  };

  // Handler: Reject Claim
  const handleRejectClaim = (claimId) => {
    const updatedClaims = currentNotice.claims.map((c) =>
      c.id === claimId ? { ...c, status: "rejected" } : c
    );
    const updated = { ...currentNotice, claims: updatedClaims };
    setCurrentNotice(updated);
    if (onUpdateNotice) onUpdateNotice(updated);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb */}
      <nav
        className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-ink">
          Board
        </Link>{" "}
        <span className="text-brand-600">/</span>{" "}
        <span className="uppercase">{currentNotice.category || "Notice"}</span>
      </nav>

      {/* Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white ${
            currentNotice.kind === "lost" ? "bg-brand-600" : "bg-accent-600"
          }`}
        >
          {currentNotice.kind}
        </span>
        <span className="inline-flex items-center border border-ink/20 px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-ink">
          {currentNotice.status}
        </span>
      </div>

      {/* Main Content Layout */}
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="space-y-4 border-2 border-ink bg-surface p-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                Edit Notice
              </h2>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded border border-ink/20 bg-surface px-3 py-2 text-sm text-ink"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted">Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full rounded border border-ink/20 bg-surface px-3 py-2 text-sm text-ink"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted">Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows="4"
                  className="w-full rounded border border-ink/20 bg-surface px-3 py-2 text-sm text-ink"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded bg-brand-600 px-4 py-2 font-display text-xs font-semibold uppercase text-white"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded border border-ink/25 px-4 py-2 font-display text-xs font-semibold uppercase text-ink"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-ink">
                {currentNotice.title}
              </h1>
              <p className="mt-1.5 text-sm text-muted">
                {currentNotice.kind === "found" ? "Found" : "Lost"} {currentNotice.date} &middot; {currentNotice.location}
              </p>
              <div className="mt-6 border border-line bg-surface p-5 text-sm text-ink/90 whitespace-pre-wrap">
                {currentNotice.description}
              </div>
            </>
          )}
        </div>

        {/* Photo Box Placeholder */}
        <div className="flex h-56 items-center justify-center border-2 border-dashed border-ink/20 bg-surface text-xs font-semibold uppercase tracking-wider text-muted">
          Photo &middot; 4 : 3
        </div>
      </div>

      {/* VARIANT 1: Owner Toolbar & Claims List */}
      {isOwner && (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-2 border-ink bg-surface px-5 py-4">
            <p className="text-sm font-medium text-ink">
              <strong>You posted this.</strong> {currentNotice.claims?.length || 0} people say it is theirs.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
              >
                {isEditing ? "Close Editor" : "Edit notice"}
              </button>
              <button
                type="button"
                onClick={handleMarkReturned}
                className="inline-flex items-center justify-center rounded bg-brand-600 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700"
              >
                Mark returned
              </button>
            </div>
          </div>

          <div className="mt-14">
            <div className="flex items-center justify-between border-b-2 border-ink pb-2">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                Claims on this
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                Only you can see what they wrote
              </span>
            </div>

            <ul className="mt-5 space-y-4">
              {currentNotice.claims?.map((claim) => (
                <li
                  key={claim.id}
                  className={`border bg-surface p-5 transition ${
                    claim.status === "approved"
                      ? "border-2 border-accent-600 bg-accent-50"
                      : claim.status === "rejected"
                      ? "border-line opacity-60"
                      : "border-line"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ink font-display text-xs font-bold text-paper">
                        {claim.initials}
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold uppercase tracking-tight text-ink">
                          {claim.name}
                        </h3>
                        <p className="mt-1 text-sm text-ink/80 italic">
                          &ldquo;{claim.proof}&rdquo;
                        </p>
                        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">
                          Claimed {claim.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {claim.status === "approved" ? (
                        <span className="inline-flex items-center border border-accent-600 bg-accent-50 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-accent-800">
                          Approved
                        </span>
                      ) : claim.status === "rejected" ? (
                        <span className="inline-flex items-center border border-ink/15 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-muted line-through">
                          Rejected
                        </span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApproveClaim(claim.id)}
                            className="inline-flex items-center justify-center rounded bg-ink px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectClaim(claim.id)}
                            className="inline-flex items-center justify-center rounded border border-ink/25 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-muted transition hover:bg-ink/5 hover:text-ink"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-muted">
              Approving one claim closes the notice and rejects the other automatically. There is no way to approve two.
            </p>
          </div>
        </>
      )}

      {/* VARIANT 2: Signed-In Non-Owner View */}
      {!isOwner && currentUser && (
        <div className="mt-8">
          {existingClaim ? (
            /* Pending Claim View */
            <div className="border-2 border-ink bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                    Your claim is with the finder.
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Posted {existingClaim.date}, no answer yet.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleWithdrawClaim}
                  className="inline-flex items-center justify-center rounded border border-ink/25 bg-surface px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-muted transition hover:bg-ink/5 hover:text-ink"
                >
                  Withdraw claim
                </button>
              </div>

              <div className="mt-6 border-t border-dashed border-line pt-4">
                <p className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
                  Where to collect
                </p>
                <p className="mt-1 text-sm text-muted">
                  Shown once the finder approves you
                </p>
              </div>
            </div>
          ) : (
            /* Claim Submission View */
            <div className="border-2 border-ink bg-surface p-6">
              {!showClaimForm ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                      Think these are yours?
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {currentNotice.claims?.length || 0} people have claimed this. You cannot see what they said, and they cannot see you.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowClaimForm(true)}
                    className="inline-flex items-center justify-center rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900"
                  >
                    Claim these keys
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitClaim} className="space-y-4">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                    Submit proof of ownership
                  </h3>
                  <p className="text-sm text-muted">
                    Provide details only the owner would know (scratches, stickers, fob details).
                  </p>
                  <textarea
                    rows="3"
                    value={claimProofText}
                    onChange={(e) => setClaimProofText(e.target.value)}
                    placeholder="Describe specific details..."
                    className="w-full rounded border border-ink/20 bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="rounded bg-brand-600 px-4 py-2 font-display text-xs font-semibold uppercase text-white hover:bg-brand-700"
                    >
                      Submit claim
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClaimForm(false)}
                      className="rounded border border-ink/25 px-4 py-2 font-display text-xs font-semibold uppercase text-ink"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* VARIANT 3: Signed-Out View */}
      {!currentUser && (
        <div className="mt-8 border-2 border-ink bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                Sign in to claim something from the board.
              </h3>
              <p className="mt-1 text-sm text-muted">
                Accounts use your university email address.
              </p>
            </div>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}