"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Pencil,
  Check,
  X,
  Leaf,
  Users,
  TrendingDown,
  PackageCheck,
} from "lucide-react";

// --- Editable field component ---

function EditableField({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState(value);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    setCurrent(draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(current);
    setEditing(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-tertiary)",
        }}
      >
        {label}
      </p>

      {editing ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
          {multiline ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              rows={3}
              style={{
                flex: 1,
                fontSize: "0.9rem",
                color: "var(--ink)",
                background: "var(--surface)",
                border: "1px solid oklch(0% 0 0 / 0.15)",
                borderRadius: "8px",
                padding: "8px 12px",
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                lineHeight: 1.6,
              }}
            />
          ) : (
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              style={{
                flex: 1,
                fontSize: "0.9rem",
                color: "var(--ink)",
                background: "var(--surface)",
                border: "1px solid oklch(0% 0 0 / 0.15)",
                borderRadius: "8px",
                padding: "8px 12px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          )}
          <div style={{ display: "flex", gap: "4px", paddingTop: "2px" }}>
            <button
              onClick={commit}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid oklch(0% 0 0 / 0.08)",
                background: "var(--ink)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Check size={13} />
            </button>
            <button
              onClick={cancel}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid oklch(0% 0 0 / 0.08)",
                background: "var(--surface)",
                color: "var(--ink-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "text",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px dashed oklch(0% 0 0 / 0.1)",
            background: "oklch(98.5% 0.004 60)",
            transition: "border-color 0.15s ease, background 0.15s ease",
            minHeight: multiline ? "68px" : "auto",
            alignSelf: "flex-start",
            width: "100%",
          }}
          role="button"
          aria-label={`Edit ${label}`}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "oklch(0% 0 0 / 0.2)";
            (e.currentTarget as HTMLElement).style.background =
              "oklch(97.5% 0.005 60)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "oklch(0% 0 0 / 0.1)";
            (e.currentTarget as HTMLElement).style.background =
              "oklch(98.5% 0.004 60)";
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
              color: "var(--ink)",
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {current}
          </span>
          <Pencil
            size={12}
            style={{ color: "var(--ink-tertiary)", flexShrink: 0 }}
          />
        </div>
      )}
    </div>
  );
}

// --- Stat card ---

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        border: accent
          ? "1px solid oklch(0% 0 0 / 0.1)"
          : "1px solid var(--border)",
        background: accent ? "var(--ink)" : "var(--surface)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "9px",
          background: accent ? "oklch(100% 0 0 / 0.08)" : "var(--surface-offset)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent ? "oklch(100% 0 0 / 0.7)" : "var(--ink-secondary)",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: accent ? "oklch(100% 0 0 / 0.5)" : "var(--ink-tertiary)",
            marginBottom: "4px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sora)",
            fontSize: "1.35rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: accent ? "white" : "var(--ink)",
            lineHeight: 1.2,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// --- Divider ---
const Divider = () => (
  <div
    style={{ borderBottom: "1px dashed oklch(0% 0 0 / 0.1)", margin: "8px 0" }}
  />
);

// --- Page ---

export default function ProfilePage() {
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
          <Link href="/directory" style={{ fontWeight: 500 }}>
            Directory
          </Link>
          <Link href="/calculator" style={{ fontWeight: 500 }}>
            Calculator
          </Link>
          <Link href="/ledger" style={{ fontWeight: 500 }}>
            Ledger
          </Link>
          <Link
            href="/profile"
            className="btn-primary"
            style={{ padding: "8px 20px", fontSize: "0.85rem" }}
          >
            My profile
          </Link>
        </div>
      </nav>

      {/* Back link */}
      <section
        style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "8px 24px 0" }}
      >
        <Link
          href="/"
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
          <ArrowLeft size={14} /> Back to home
        </Link>
      </section>

      {/* Hero — avatar + identity */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "32px 24px 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "40px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              borderRadius: "12px",
              background: "var(--surface-offset)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 20px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hellop.png"
              alt="HelloFresh logo"
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>

          {/* Identity fields */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                HelloFresh SE
              </h1>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--ink-tertiary)",
                  paddingTop: "6px",
                  flexShrink: 0,
                }}
              >
                Member since Mar 2024
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
              }}
            >
              <EditableField label="Contact name" value="Sophie Müller" />
              <EditableField label="Job title" value="VP of Sustainable Sourcing" />
              <EditableField label="Email" value="s.muller@hellofresh.com" />
              <EditableField label="Phone" value="+49 30 2988 7600" />
            </div>
          </div>
        </div>
      </section>

      {/* Company details section */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "56px 24px 0",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Organisation
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--ink-tertiary)",
              maxWidth: "460px",
            }}
          >
            Details about your company. These are used to match you with
            verified sustainable partners in the directory.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 40px",
          }}
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <EditableField label="Company name" value="HelloFresh SE" />
            <EditableField label="Website" value="hellofresh.com" />
            <EditableField label="Industry" value="Food Technology & Meal Kits" />
            <EditableField
              label="About"
              value="HelloFresh is the world's leading meal kit company, operating across 18 markets. We source ingredients from thousands of suppliers and are committed to cutting food waste, reducing packaging, and building a transparent, regenerative supply chain by 2030."
              multiline
            />
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <EditableField label="Headquarters" value="Berlin, Germany" />
            <EditableField label="Company size" value="8,000+ employees" />
            <EditableField label="Annual revenue" value="€7.6B (FY 2023)" />
            <EditableField
              label="Current supply chain focus"
              value="Eliminating virgin plastic from all meal kit packaging by 2025 and achieving 100% responsibly sourced proteins across all markets by Q2 2027."
              multiline
            />
          </div>
        </div>
      </section>

      {/* Impact stats — mirrors MetricCard aesthetic */}
    

      {/* Sustainability preferences — receipt-style card */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "56px 24px 0",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Sustainability targets
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-tertiary)" }}>
            Your current goals and reporting commitments.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {/* Left card — receipt style */}
          <div
            style={{
              background: "oklch(98.5% 0.004 60)",
              borderRadius: "12px",
              padding: "28px 22px",
              border: "1px solid oklch(0% 0 0 / 0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sora)",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                color: "var(--ink)",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Current Commitments
            </p>
            <Divider />
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: "8px",
                marginTop: "8px",
              }}
            >
              Emissions
            </p>
            {[
              { label: "Net-zero target year", value: "2030" },
              { label: "Science-based target", value: "SBTi Validated" },
              { label: "Scope 3 reporting", value: "Published annually" },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "3px 0",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "var(--ink-secondary)" }}>{r.label}</span>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  {r.value}
                </span>
              </div>
            ))}
            <Divider />
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: "8px",
                marginTop: "8px",
              }}
            >
              Materials
            </p>
            {[
              { label: "Recyclable packaging target", value: "100% by 2025" },
              { label: "Food waste reduction", value: "−50% vs. 2020" },
              { label: "Responsibly sourced proteins", value: "78% achieved" },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "3px 0",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "var(--ink-secondary)" }}>{r.label}</span>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  {r.value}
                </span>
              </div>
            ))}
            <Divider />
          </div>

          {/* Right card — editable preferences */}
          <div
            style={{
              background: "oklch(97% 0.003 60)",
              borderRadius: "12px",
              padding: "28px 22px",
              border: "1px dashed oklch(0% 0 0 / 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sora)",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                color: "var(--ink-secondary)",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              My Preferences
            </p>
            <EditableField
              label="Priority category"
              value="Sustainable packaging & proteins"
            />
            <EditableField
              label="Max partnership budget (annual)"
              value="€2,500,000"
            />
            <EditableField
              label="Reporting framework"
              value="GRI Standards 2021 · TCFD · CDP"
            />
            <EditableField
              label="Notes for partners"
              value="Preferred suppliers hold RSPO, MSC, or equivalent certifications. Must support shelf-ready compostable or curbside-recyclable packaging formats across EU and North American markets."
              multiline
            />
          </div>
        </div>
      </section>

      {/* CTA strip */}
      

      {/* Footer */}
      <footer
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--border)",
          fontSize: "0.825rem",
          color: "var(--ink-tertiary)",
        }}
      >
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
