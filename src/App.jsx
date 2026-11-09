import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { initialNotices } from "./data/mockData";
import { DesignPackIndex } from "./pages/DesignPackIndex";
import { Board } from "./pages/Board";
import { Browse } from "./pages/Browse";
import { ItemDetail } from "./pages/ItemDetail";
import { Matches } from "./pages/Matches";
import { ReportNotice } from "./pages/ReportNotice";
import { MyNotices } from "./pages/MyNotices";
import { MyClaims } from "./pages/MyClaims";
import { Auth } from "./pages/Auth";

export default function App() {
  const [notices, setNotices] = useState(initialNotices);
  
  // Track currently logged in user (defaulting to Bashar Idris)
  const [currentUser, setCurrentUser] = useState({
    name: "Bashar Idris",
    email: "bashar.idris@lau.edu",
    initials: "BI",
  });

  const handleAddNotice = (newNotice) => {
    setNotices((prev) => [
      { ...newNotice, authorName: currentUser.name, authorEmail: currentUser.email },
      ...prev,
    ]);
  };

  const handleUpdateNotice = (updatedNotice) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === updatedNotice.id ? updatedNotice : n))
    );
  };

  return (
    <Router>
      <div className="bg-paper font-body text-ink min-h-screen flex flex-col antialiased">
        <header className="border-b-2 border-ink bg-paper">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
            <Link to="/" className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-bold uppercase tracking-[-0.02em] text-ink">
                Mafqoud
              </span>
              <span className="hidden font-display text-[11px] uppercase tracking-[0.2em] text-brand-600 sm:inline">
                Somebody has it
              </span>
            </Link>

            <nav className="ml-2 hidden gap-6 md:flex">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `font-display text-sm font-semibold uppercase tracking-wide ${
                    isActive
                      ? "text-ink underline decoration-brand-600 decoration-2 underline-offset-[6px]"
                      : "text-muted hover:text-ink"
                  }`
                }
              >
                The board
              </NavLink>
              <NavLink
                to="/browse"
                className={({ isActive }) =>
                  `font-display text-sm font-semibold uppercase tracking-wide ${
                    isActive
                      ? "text-ink underline decoration-brand-600 decoration-2 underline-offset-[6px]"
                      : "text-muted hover:text-ink"
                  }`
                }
              >
                Browse
              </NavLink>
              <NavLink
                to="/matches"
                className={({ isActive }) =>
                  `font-display text-sm font-semibold uppercase tracking-wide ${
                    isActive
                      ? "text-ink underline decoration-brand-600 decoration-2 underline-offset-[6px]"
                      : "text-muted hover:text-ink"
                  }`
                }
              >
                Matches
              </NavLink>
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  `font-display text-sm font-semibold uppercase tracking-wide ${
                    isActive
                      ? "text-ink underline decoration-brand-600 decoration-2 underline-offset-[6px]"
                      : "text-muted hover:text-ink"
                  }`
                }
              >
                Report
              </NavLink>
              <NavLink
                to="/mine"
                className={({ isActive }) =>
                  `font-display text-sm font-semibold uppercase tracking-wide ${
                    isActive
                      ? "text-ink underline decoration-brand-600 decoration-2 underline-offset-[6px]"
                      : "text-muted hover:text-ink"
                  }`
                }
              >
                Mine
              </NavLink>
            </nav>

            <span className="flex-1"></span>

            <Link
              to="/report"
              className="inline-flex items-center justify-center gap-2 rounded bg-brand-600 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700 hidden sm:inline-flex"
            >
              Report
            </Link>

            {/* Dynamic User Avatar */}
            <Link
              to="/auth"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-xs font-bold text-paper"
              title={currentUser ? `Signed in as ${currentUser.name}` : "Sign In"}
            >
              {currentUser ? currentUser.initials : "IN"}
            </Link>
          </div>
        </header>

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Board notices={notices} />} />
            <Route path="/browse" element={<Browse notices={notices} />} />
            <Route
              path="/item/:id"
              element={
                <ItemDetail notices={notices} onUpdateNotice={handleUpdateNotice} currentUser={currentUser} />
              }
            />
            <Route path="/matches" element={<Matches notices={notices} />} />
            <Route
              path="/report"
              element={<ReportNotice onAddNotice={handleAddNotice} currentUser={currentUser} />}
            />
            <Route path="/mine" element={<MyNotices notices={notices} currentUser={currentUser} />} />
            <Route path="/my-claims" element={<MyClaims currentUser={currentUser} />} />
            <Route path="/auth" element={<Auth onLogin={setCurrentUser} currentUser={currentUser} />} />
            <Route path="/design" element={<DesignPackIndex />} />
          </Routes>
        </div>

        <footer className="mx-auto mt-20 max-w-6xl w-full border-t border-line px-4 py-8 text-xs text-muted">
          <span className="font-display font-bold tracking-wide">MAFQOUD</span>
          
        </footer>
      </div>
    </Router>
  );
}