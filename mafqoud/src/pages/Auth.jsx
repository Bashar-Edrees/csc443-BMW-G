import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Auth({ onLogin, currentUser }) {
  const navigate = useNavigate();

  // Mode: "signin" | "register"
  const [mode, setMode] = useState("signin");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // UI Error State
  const [authError, setAuthError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setAuthError("");

    if (!email || !password) {
      setAuthError("That email and password do not match");
      return;
    }

    if (!email.toLowerCase().endsWith("@lau.edu")) {
      setAuthError("That email and password do not match");
      return;
    }

    const usernamePart = email.split("@")[0];
    const nameFormatted = usernamePart
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    
    const initials = usernamePart
      .split(".")
      .map((p) => p[0].toUpperCase())
      .join("")
      .slice(0, 2);

    if (onLogin) {
      onLogin({
        name: nameFormatted || "LAU User",
        email: email,
        initials: initials || "US",
        studentId: "202305424", // Default student ID context
      });
    }

    navigate("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setAuthError("");

    if (!fullName.trim()) {
      setAuthError("Please enter your full name.");
      return;
    }

    if (!email.toLowerCase().endsWith("@lau.edu")) {
      setAuthError("University email must end in @lau.edu.");
      return;
    }

    if (password.length < 8) {
      setAuthError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== repeatPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    const initials = fullName
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2);

    if (onLogin) {
      onLogin({
        name: fullName,
        email: email,
        initials: initials || "US",
        studentId: "202305424",
      });
    }

    navigate("/");
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* If User is Already Signed In, Show Account Profile Dashboard */}
      {currentUser ? (
        <div className="mx-auto max-w-xl border-2 border-ink bg-surface p-8 shadow-sm">
          <div className="flex items-center gap-4 border-b-2 border-ink pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink font-display text-xl font-bold text-paper">
              {currentUser.initials}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                {currentUser.name}
              </h1>
              <p className="text-sm text-muted">{currentUser.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b border-line pb-3 text-sm">
              <span className="font-semibold text-muted uppercase font-display text-xs">University</span>
              <span className="text-ink font-medium">Lebanese American University (LAU)</span>
            </div>
            <div className="flex justify-between border-b border-line pb-3 text-sm">
              <span className="font-semibold text-muted uppercase font-display text-xs">Student ID</span>
              <span className="text-ink font-mono font-medium">{currentUser.studentId || "202305424"}</span>
            </div>
            <div className="flex justify-between border-b border-line pb-3 text-sm">
              <span className="font-semibold text-muted uppercase font-display text-xs">Account Status</span>
              <span className="inline-flex items-center border border-accent-600 bg-accent-50 px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-accent-800">
                Active Session
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/mine"
              className="flex-1 text-center rounded bg-ink px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900"
            >
              View my notices & claims
            </Link>
            <button
              type="button"
              onClick={() => {
                if (onLogin) onLogin(null);
              }}
              className="rounded border border-ink/25 bg-surface px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/5"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        /* Otherwise, Show Sign In / Register Forms */
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-md lg:pt-4">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Somebody has it
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
              Nobody hands
              <br />
              a thing to
              <br />
              nobody.
            </h1>
            <p className="mt-5 text-sm text-muted">
              Claims are approved by a person, so a person has to exist. Accounts use
              your university address and nothing else is asked for.
            </p>
          </div>

          <div className="w-full max-w-md border-2 border-ink bg-surface">
            {mode === "signin" ? (
              <>
                <div className="border-b-2 border-ink px-7 py-5">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                    Sign in
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    To post a notice or claim something.
                  </p>
                </div>
                <form onSubmit={handleSignIn} className="space-y-5 px-7 py-6">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="u-email"
                      className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                    >
                      University email
                    </label>
                    <input
                      id="u-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="miguel.saade@lau.edu"
                      className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="u-pass"
                      className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                    >
                      Password
                    </label>
                    <input
                      id="u-pass"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    Sign in
                  </button>

                  <p className="text-center text-xs text-muted">
                    New here?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setAuthError("");
                      }}
                      className="font-semibold text-brand-700 underline underline-offset-4"
                    >
                      Make an account
                    </button>
                  </p>
                </form>
              </>
            ) : (
              <>
                <div className="border-b-2 border-ink px-7 py-5">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                    Make an account
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Your university address, so a finder knows who they are handing something to.
                  </p>
                </div>
                <form onSubmit={handleRegister} className="space-y-5 px-7 py-6">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="u-name"
                      className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                    >
                      Full name
                    </label>
                    <input
                      id="u-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Miguel Saade"
                      className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="u-email-reg"
                      className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                    >
                      University email
                    </label>
                    <input
                      id="u-email-reg"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="miguel.saade@lau.edu"
                      className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
                      required
                    />
                    <p className="text-xs text-muted">Must end in @lau.edu.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="u-pass-reg"
                      className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                    >
                      Password
                    </label>
                    <input
                      id="u-pass-reg"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
                      required
                    />
                    <p className="text-xs text-muted">At least 8 characters.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="u-pass2"
                      className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                    >
                      Repeat password
                    </label>
                    <input
                      id="u-pass2"
                      type="password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="w-full rounded border border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    Create account
                  </button>

                  <p className="text-center text-xs text-muted">
                    Already have one?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signin");
                        setAuthError("");
                      }}
                      className="font-semibold text-brand-700 underline underline-offset-4"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {authError && (
        <div className="mx-auto mt-10 max-w-md border-2 border-brand-400 bg-brand-50 px-5 py-4">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-800">
            {authError}
          </p>
          <p className="mt-1 text-sm text-brand-900/70">
            Check both and try again, or reset your password.
          </p>
        </div>
      )}
    </main>
  );
}