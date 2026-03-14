"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

// Placeholder data for the Eco-Offense Feed
const ACTIVE_ISSUES = [
  {
    id: "sony-ps6",
    company: "Sony",
    logo: "/companies/sony.png",
    issue: "Sony is still shipping the PlayStation 6 wrapped in heavy, non-recyclable EPS foam.",
    currentVotes: 8450,
    targetVotes: 10000,
  },
  {
    id: "nike-shoeboxes",
    company: "Nike",
    logo: "/companies/nike1.jpg",
    issue: "Nike's premium line continues to use virgin cardboard despite available recycled alternatives.",
    currentVotes: 4120,
    targetVotes: 5000,
  },
  {
    id: "apple-cables",
    company: "Apple",
    logo: "/companies/apple.png",
    issue: "Apple's new braided cables lack reparability, creating immense non-recyclable e-waste.",
    currentVotes: 6100,
    targetVotes: 10000,
  },
];

// Placeholder data for the Ledger Receipts
const COMPLETED_DEALS = [
  {
    id: "target-ecovative",
    company1: "Target",
    company1Logo: "/companies/Target_logo.svg.webp",
    company2: "Ecovative",
    company2Logo: "/companies/Ecovative_logos.png",
    headline: "Target phased out 400 tons of Styrofoam by partnering with Ecovative.",
    date: "March 12, 2026",
    impactMetric: "400 tons",
    impactUnit: "of Styrofoam eliminated",
  },
  {
    id: "samsung-grownbio",
    company1: "Samsung",
    company1Logo: "/companies/samsung.png",
    company2: "Grown Bio",
    company2Logo: "/companies/Grown_bio.webp",
    headline: "Samsung replaced 1M plastic device trays with biodegradable alternatives from Grown Bio.",
    date: "February 28, 2026",
    impactMetric: "1 Million",
    impactUnit: "plastic trays replaced",
  },
];

export default function LedgerPage() {
  const [votedIssues, setVotedIssues] = useState<string[]>([]);

  const handleVote = (id: string) => {
    if (!votedIssues.includes(id)) {
      setVotedIssues([...votedIssues, id]);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
      <Header />

      {/* Hero Section */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "64px 24px 24px" }}>
        <div style={{ maxWidth: "720px" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "24px", fontFamily: "var(--font-sora)" }}>
            Digital impact receipts.
          </h1>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink-secondary)", marginBottom: "32px", maxWidth: "600px" }}>
            The Wall of Fame for completed B2B sustainability deals. We track undeniable proof that massive companies chose greener suppliers because of consumer pressure. No greenwashing, just verified action.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr", gap: "64px", paddingBottom: "120px" }}>
        
        {/* Active Issues (Eco-Offense Feed) */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Active petitions <span style={{ color: "var(--ink-tertiary)", fontWeight: 400 }}></span>
            </h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {ACTIVE_ISSUES.map((issue) => {
              const hasVoted = votedIssues.includes(issue.id);
              const displayVotes = issue.currentVotes + (hasVoted ? 1 : 0);
              const progressPercentage = (displayVotes / issue.targetVotes) * 100;
              
              return (
                <div key={issue.id} style={{ background: "oklch(98.5% 0.004 60)", border: "1px solid oklch(0% 0 0 / 0.06)", borderRadius: "12px", padding: "28px 22px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "12px", background: "white", border: "1px solid oklch(0% 0 0 / 0.06)", padding: "8px", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={issue.logo} alt={issue.company} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "8px" }} />
                    </div>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.5, color: "var(--ink)" }}>
                      <span style={{ fontWeight: 600, fontFamily: "var(--font-sora)" }}>{issue.company}</span>
                      {issue.issue.replace(issue.company, "")}
                    </p>
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    <div style={{ borderBottom: "1px dashed oklch(0% 0 0 / 0.12)", margin: "24px 0 16px" }} />
                    
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--ink-secondary)", marginBottom: "8px" }}>
                      <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500, color: "var(--ink)" }}>{displayVotes.toLocaleString()}</span>
                      <span>{issue.targetVotes.toLocaleString()} signatures</span>
                    </div>
                    
                    <div style={{ width: "100%", height: "4px", background: "oklch(0% 0 0 / 0.06)", borderRadius: "2px", overflow: "hidden", marginBottom: "20px" }}>
                      <div style={{ width: `${progressPercentage}%`, height: "100%", background: hasVoted ? "var(--ink)" : "var(--ink-secondary)", transition: "width 0.5s ease-out, background 0.3s ease" }} />
                    </div>

                    <button
                      onClick={() => handleVote(issue.id)}
                      disabled={hasVoted}
                      className={hasVoted ? "" : "btn-primary"}
                      style={{
                        width: "100%",
                        padding: "10px 22px",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        border: hasVoted ? "1px solid oklch(0% 0 0 / 0.06)" : undefined,
                        background: hasVoted ? "var(--surface)" : undefined,
                        color: hasVoted ? "var(--ink-tertiary)" : undefined,
                        cursor: hasVoted ? "default" : "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {hasVoted ? (
                         <>
                           <CheckCircle2 size={14} /> Pressure Applied
                         </>
                      ) : (
                         <>
                           Apply Pressure <AlertCircle size={14} />
                         </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* The Ledger (Completed Deals) */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Public ledger <span style={{ color: "var(--ink-tertiary)", fontWeight: 400 }}></span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {COMPLETED_DEALS.map((deal) => (
              <div key={deal.id} style={{ background: "oklch(98.5% 0.004 60)", border: "1px solid oklch(0% 0 0 / 0.06)", borderRadius: "12px", padding: "28px 22px", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "32px", alignItems: "center" }}>
                
                {/* Visual Logos representation */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
                  <div style={{ width: "120px", height: "120px", borderRadius: "16px", background: "white", border: "1px solid var(--border)", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={deal.company1Logo} alt={deal.company1} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "var(--symbio)", gap: "4px" }}>
                    <span style={{ fontFamily: "var(--font-sora)", fontSize: "1.75rem", fontWeight: 300, lineHeight: 1 }}>⇄</span>
                  </div>

                  <div style={{ width: "120px", height: "120px", borderRadius: "16px", background: "white", border: "1px solid var(--border)", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={deal.company2Logo} alt={deal.company2} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: "1px", height: "100%", borderLeft: "1px dashed oklch(0% 0 0 / 0.12)" }} />

                {/* Verified Impact Data */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--ink)" }}>
                    {deal.headline}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "6px", display: "inline-flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ color: "var(--ink)", fontWeight: 600, fontSize: "0.85rem", fontVariantNumeric: "tabular-nums" }}>{deal.impactMetric}</span>
                      <span style={{ color: "var(--ink-secondary)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{deal.impactUnit}</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--ink-tertiary)" }}>{deal.date}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>

      <footer style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "32px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", fontSize: "0.825rem", color: "var(--ink-tertiary)" }}>
        <span>&copy; 2026 Symbio</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/privacy" style={{ transition: "color 0.15s ease" }}>Privacy</Link>
          <Link href="/terms" style={{ transition: "color 0.15s ease" }}>Terms</Link>
          <Link href="/security" style={{ transition: "color 0.15s ease" }}>Security</Link>
        </div>
      </footer>
    </main>
  );
}
