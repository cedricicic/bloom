"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ArrowUpRight,
  Leaf,
  X,
} from "lucide-react";
import { COMPANIES, type Company, type ReceiptLine, type ReceiptSection, type ReceiptSide } from "./data";
import Header from "@/components/Header";

const CATEGORIES = [
  "All",
  "Packaging",
  "Logistics",
  "Carbon Reduction",
  "Renewable Energy",
  "Waste Reduction",
];

const SORT_OPTIONS = [
  { value: "impact", label: "Highest impact" },
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest" },
];

const ITEMS_PER_PAGE = 6;

// --- Page ---

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("impact");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = COMPANIES;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (sortBy === "popular") {
      result = [...result].sort(
        (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
      );
    } else if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
    }

    return result;
  }, [search, activeCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
      <Header />

      {/* Page header */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "24px 24px 0" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "12px" }}>
          Directory
        </h1>
        <p style={{ fontSize: "1.05rem", maxWidth: "540px", color: "var(--ink-secondary)" }}>
          Verified sustainable partners ready to integrate into your supply chain. Search by solution, industry, or impact area.
        </p>
      </section>

      {/* Search + Filters + Sort */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-tertiary)" }} />
          <input
            type="text"
            placeholder="Search by company name, solution, or industry..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ width: "100%", padding: "13px 16px 13px 44px", borderRadius: "var(--radius)", border: "1px solid var(--border)", fontSize: "0.9rem", fontFamily: "inherit", color: "var(--ink)", background: "var(--surface)", outline: "none" }}
          />
          {search && (
            <button onClick={() => { setSearch(""); setPage(1); }} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink-tertiary)", display: "flex", alignItems: "center" }}>
              <X size={16} />
            </button>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                style={{
                  padding: "7px 16px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500, fontFamily: "inherit", cursor: "pointer",
                  border: activeCategory === cat ? "1px solid var(--ink)" : "1px solid var(--border)",
                  background: activeCategory === cat ? "var(--ink)" : "transparent",
                  color: activeCategory === cat ? "white" : "var(--ink-secondary)",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ appearance: "none", padding: "7px 32px 7px 14px", borderRadius: "var(--radius)", border: "1px solid var(--border)", fontSize: "0.8rem", fontWeight: 500, fontFamily: "inherit", color: "var(--ink-secondary)", background: "var(--surface)", cursor: "pointer", outline: "none" }}>
              {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-tertiary)" }} />
          </div>
        </div>
      </section>

      {/* Results count */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "24px 24px 0" }}>
        <p style={{ fontSize: "0.8rem", color: "var(--ink-tertiary)", fontWeight: 500 }}>
          {filtered.length} {filtered.length === 1 ? "company" : "companies"} found
        </p>
      </section>

      {/* Company cards grid */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 24px 80px" }}>
        {paginated.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--ink-tertiary)" }}>
            <p style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "8px", color: "var(--ink-secondary)" }}>No companies match your search</p>
            <p style={{ fontSize: "0.875rem" }}>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {paginated.map((company) => (
              <CompanyCard key={company.id} company={company} onOpen={() => setExpandedId(company.id)} />
            ))}
          </div>
        )}

        {expandedId && (
          <ReceiptModal
            company={COMPANIES.find((c) => c.id === expandedId)!}
            onClose={() => setExpandedId(null)}
          />
        )}

        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "48px" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: "36px", height: "36px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 500, fontFamily: "inherit", cursor: "pointer", transition: "all 0.15s ease",
                  border: page === p ? "1px solid var(--ink)" : "1px solid var(--border)",
                  background: page === p ? "var(--ink)" : "transparent",
                  color: page === p ? "white" : "var(--ink-secondary)",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "32px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", fontSize: "0.825rem", color: "var(--ink-tertiary)" }}>
        <span>&copy; 2026 Symbio</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
        </div>
      </footer>
    </main>
  );
}

// --- Receipt helpers ---

const ReceiptDivider = () => (
  <div style={{ borderBottom: "1px dashed oklch(0% 0 0 / 0.12)", margin: "12px 0" }} />
);

const ReceiptRow = ({ label, value }: ReceiptLine) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "3px 0", fontSize: "0.78rem", lineHeight: 1.5 }}>
    <span style={{ color: "var(--ink-secondary)" }}>{label}</span>
    <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500, color: "var(--ink)", textAlign: "right" }}>{value}</span>
  </div>
);

function ReceiptCard({
  title,
  side,
  muted,
}: {
  title: string;
  side: ReceiptSide;
  muted?: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: muted ? "oklch(97% 0.003 60)" : "oklch(98.5% 0.004 60)",
        borderRadius: "12px",
        padding: "28px 22px",
        border: muted ? "1px dashed oklch(0% 0 0 / 0.08)" : "1px solid oklch(0% 0 0 / 0.06)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <p
          style={{
            fontFamily: "var(--font-sora)",
            fontWeight: 600,
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            color: muted ? "var(--ink-secondary)" : "var(--ink)",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>
      </div>



      <ReceiptDivider />

      {/* Sections */}
      {side.sections.map((section: ReceiptSection, i: number) => (
        <div key={section.heading}>
          <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: muted ? "var(--ink-secondary)" : "var(--ink)", marginBottom: "6px", marginTop: i > 0 ? "8px" : "0" }}>
            {section.heading}
          </p>
          {section.lines.map((line: ReceiptLine) => (
            <ReceiptRow key={line.label} label={line.label} value={line.value} />
          ))}
          <ReceiptDivider />
        </div>
      ))}

      {/* Total */}
      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: muted ? "var(--ink-secondary)" : "var(--ink)", marginBottom: "8px", textAlign: "center" }}>
        Total
      </p>
      {side.total.map((line: ReceiptLine) => (
        <ReceiptRow key={line.label} label={line.label} value={line.value} />
      ))}
    </div>
  );
}

// --- Receipt Modal ---

function ReceiptModal({ company, onClose }: { company: Company; onClose: () => void }) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  return (
    <div className="receipt-overlay">
      <div className="receipt-backdrop" data-closing={closing} onClick={handleClose} />
      <div className="receipt-modal" data-closing={closing}>
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 24px 64px oklch(0% 0 0 / 0.12), 0 2px 4px oklch(0% 0 0 / 0.04)",
            position: "relative",
          }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute", top: "16px", right: "16px", width: "32px", height: "32px",
              borderRadius: "8px", border: "none", background: "oklch(0% 0 0 / 0.04)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--ink-tertiary)", transition: "background 0.15s ease",
            }}
          >
            <X size={16} />
          </button>

          {/* Company name */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <p style={{ fontFamily: "var(--font-sora)", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "4px" }}>
              {company.name}
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--ink-tertiary)" }}>
              {company.location} &middot; {company.industry.join(", ")}
            </p>
          </div>

          {/* Two receipts + arrow */}
          <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
            {/* Before */}
            <ReceiptCard
              title="Current Impact"
              side={company.receipt.before}
              muted
            />

            {/* Arrow connector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 16px",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sora)",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "var(--symbio)",
                  lineHeight: 1,
                }}
              >
                ⇄
              </span>
            </div>

            {/* After */}
            <ReceiptCard
              title={`With ${company.name}`}
              side={company.receipt.after}
            />
          </div>

          {/* Show more */}
          <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
            <Link
              href={`/directory/${company.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.825rem",
                fontWeight: 600,
                background: "var(--ink)",
                color: "white",
                padding: "10px 24px",
                borderRadius: "var(--radius)",
                transition: "opacity 0.15s ease",
              }}
            >
              Show more <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Company Card ---

function CompanyCard({ company, onOpen }: { company: Company; onOpen: () => void }) {
  return (
    <div style={{ background: "var(--surface-offset)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Background Image */}
      <div style={{ 
        height: "100px", 
        background: `var(--surface-offset) url(${company.bgImage}) center / cover no-repeat`, 
        position: "relative" 
      }} />

      <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Profile Image & Title Container */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginTop: "-32px", position: "relative", zIndex: 1 }}>
          <div style={{ 
            width: "64px", 
            height: "64px", 
            borderRadius: "50%", 
            backgroundColor: "#ffffff",
            backgroundImage: `url(${company.profileImage})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            border: "4px solid var(--surface-offset)",
            boxShadow: "inset 0 0 0 1px var(--border)",
            flexShrink: 0
          }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0, paddingBottom: "4px" }}>{company.name}</h3>
        </div>

        <p style={{ fontSize: "0.85rem", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden", margin: 0, paddingTop: "8px" }}>
          {company.description}
        </p>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto", paddingTop: "8px" }}>
          {company.industry.map((ind) => (
            <span key={ind} style={{ fontSize: "0.7rem", fontWeight: 500, padding: "3px 10px", borderRadius: "14px", border: "1px solid var(--border)", color: "var(--ink-tertiary)" }}>
              {ind}
            </span>
          ))}
        </div>
        <button
          onClick={onOpen}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            marginTop: "8px", padding: "10px", borderRadius: "var(--radius)", border: "1px solid var(--ink)",
            background: "var(--ink)", fontSize: "0.825rem", fontWeight: 500, fontFamily: "inherit",
            color: "white", cursor: "pointer", transition: "all 0.15s ease",
            width: "100%"
          }}
        >
          View profile <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
