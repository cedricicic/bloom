"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Leaf, MapPin, ArrowUpRight } from "lucide-react";
import { COMPANIES, type ReceiptLine, type ReceiptSection, type ReceiptSide } from "../data";

// --- Receipt helpers (shared visual language with directory) ---

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

      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: muted ? "var(--ink-secondary)" : "var(--ink)", marginBottom: "8px", textAlign: "center" }}>
        Total
      </p>
      {side.total.map((line: ReceiptLine) => (
        <ReceiptRow key={line.label} label={line.label} value={line.value} />
      ))}
    </div>
  );
}

// --- Detail metric card ---

function MetricCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        border: accent ? "1px solid oklch(0% 0 0 / 0.1)" : "1px solid var(--border)",
        background: accent ? "var(--ink)" : "var(--surface)",
      }}
    >
      <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: accent ? "oklch(100% 0 0 / 0.5)" : "var(--ink-tertiary)", marginBottom: "6px" }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--font-sora)", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", color: accent ? "white" : "var(--ink)", lineHeight: 1.2 }}>
        {value}
      </p>
    </div>
  );
}

// --- Improvement row ---

function ImpactCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        background: highlight ? "var(--surface-offset)" : "var(--surface)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "2px" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-tertiary)", opacity: 0.8 }}>
          {label}
        </p>
        <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)" }}>
          {value}
        </p>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--ink-tertiary)", marginTop: "4px", lineHeight: 1.4, maxWidth: "340px" }}>
        Projected annual performance with Symbio-verified integration, reflecting a significant optimization of your current environmental footprint.
      </p>
    </div>
  );
}

// --- Page ---

export default function CompanyDetailPage() {
  const params = useParams();
  const company = COMPANIES.find((c) => c.id === params.id);

  if (!company) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "12px" }}>Company not found</h1>
          <Link href="/directory" style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <ArrowLeft size={14} /> Back to directory
          </Link>
        </div>
      </main>
    );
  }

  // We'll focus on the Totals for the breakdown to keep it punchy and height-aligned
  const impactTotals = company.receipt.before.total.map((beforeTotal, i) => {
    const afterTotal = company.receipt.after.total[i];
    return {
      label: beforeTotal.label,
      value: afterTotal?.value ?? "—",
    };
  });

  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
      {/* Navigation */}
      <nav
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-sora)",
            fontWeight: 700,
            fontSize: "1.15rem",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          Symbio
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontSize: "0.875rem",
            color: "var(--ink-secondary)",
          }}
        >
          <Link href="/directory" style={{ fontWeight: 600, color: "var(--ink)" }}>
            Directory
          </Link>
          <Link href="/calculator" style={{ fontWeight: 500 }}>Calculator</Link>
          <Link href="/ledger" style={{ fontWeight: 500 }}>Ledger</Link>
          <button className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
            Get started
          </button>
        </div>
      </nav>

      {/* Back link */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "8px 24px 0" }}>
        <Link
          href="/directory"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "var(--ink-tertiary)",
            transition: "color 0.15s ease",
          }}
        >
          <ArrowLeft size={14} /> Back to directory
        </Link>
      </section>

      {/* Hero */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "40px" }}>
          {/* Left: placeholder image */}
          <div
            style={{
              borderRadius: "12px",
              background: "var(--surface-offset)",
              border: "1px solid var(--border)",
              height: "100%",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <img
              src="/site-logo-grown-bio.webp"
              alt={company.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                maxWidth: "200px",
              }}
            />
          </div>

          {/* Right: company info */}
          <div>
            {/* Top row: name + CTA */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", marginBottom: "6px" }}>
              <h1 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {company.name}
              </h1>
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.85rem", flexShrink: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                Start Partnership <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Category + industries */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ink-secondary)" }}>
                {company.category}
              </span>
              {company.industry.map((ind) => (
                <React.Fragment key={ind}>
                  <span style={{ fontSize: "0.8rem", color: "var(--ink-tertiary)" }}>&middot;</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>{ind}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink-secondary)", marginBottom: "24px" }}>
              {company.description}
            </p>



            {/* Value Prop + How They Help */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "12px" }}>
                  Value Prop
                </p>
                <ul style={{ listStyle: "disc", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "0.825rem", lineHeight: 1.5, color: "var(--ink-secondary)" }}>Drop-in replacement for existing materials</li>
                  <li style={{ fontSize: "0.825rem", lineHeight: 1.5, color: "var(--ink-secondary)" }}>No retooling required on production lines</li>
                  <li style={{ fontSize: "0.825rem", lineHeight: 1.5, color: "var(--ink-secondary)" }}>Certified by third-party auditors</li>
                  <li style={{ fontSize: "0.825rem", lineHeight: 1.5, color: "var(--ink-secondary)" }}>Competitive pricing at scale</li>
                </ul>
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "12px" }}>
                  How They Help
                </p>
                <ol style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "0.825rem", lineHeight: 1.5, color: "var(--ink-secondary)" }}>Audit your current supply chain footprint</li>
                  <li style={{ fontSize: "0.825rem", lineHeight: 1.5, color: "var(--ink-secondary)" }}>Integrate sustainable alternatives</li>
                  <li style={{ fontSize: "0.825rem", lineHeight: 1.5, color: "var(--ink-secondary)" }}>Monitor and report verified impact</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Impact breakdown + placeholder image */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "56px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
          {/* Header Row */}
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Projected outcome
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--ink-tertiary)", maxWidth: "460px" }}>
              Estimated performance indicators upon full integration of {company!.name} into your value chain. These projections are modeled based on your current operational volume and reflect the potential for significant environmental optimization across key resource areas.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "24px" }}>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--ink-secondary)" }}>
              {company!.name} operates out of {company!.location}, serving the {company!.industry.join(" and ")} {company!.industry.length === 1 ? "industry" : "industries"}.
            </p>
          </div>

          {/* Metrics + Image Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
            {impactTotals.map((metric) => (
              <ImpactCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                highlight
              />
            ))}
          </div>

          <div
            style={{
              borderRadius: "12px",
              background: "var(--surface-offset)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/2.png"
              alt="Operational Proof"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Attribution Footer */}
          <div style={{ marginTop: "20px", gridColumn: "1 / -1" }}>
             <p style={{ fontSize: "0.75rem", color: "var(--ink-tertiary)", fontStyle: "italic" }}>
               * Data verified by Symbio audit protocols. Full receipt below.
             </p>
          </div>
        </div>
      </section>

      {/* Full receipts */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "8px" }}>
          Verification receipts
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--ink-tertiary)", marginBottom: "28px" }}>
          Full audit receipts showing verified environmental data.
        </p>

        <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
          <ReceiptCard
            title="Current Impact"
            side={company.receipt.before}
            muted
          />
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
          <ReceiptCard
            title={`With ${company.name}`}
            side={company.receipt.after}
          />
        </div>

        {/* Tagline */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-tertiary)" }}>
            {company.receipt.tagline}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ background: "var(--surface-offset)", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "8px" }}>
            Interested in partnering with {company.name}?
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", marginBottom: "24px", maxWidth: "420px", margin: "0 auto 24px" }}>
            Get connected through Symbio and start reducing your supply chain&apos;s environmental impact.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Request introduction <ArrowUpRight size={14} />
            </button>
            <Link href="/directory" className="btn-secondary" style={{ background: "white" }}>
              Browse more
            </Link>
          </div>
        </div>
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
