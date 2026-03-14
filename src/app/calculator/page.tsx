"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { COMPANIES } from "../directory/data";

// --- Types ---

type MaterialType = {
  id: string;
  label: string;
  unit: string;
  co2PerUnit: number; // kg CO₂e per unit
  costPerUnit: number; // $ per unit
  alternativeLabel: string;
  co2Reduction: number; // fraction 0–1
  costFactor: number; // cost multiplier vs. current
  supplier: string;
  supplierId: string;
};

// --- Static data ---

const MATERIAL_TYPES: MaterialType[] = [
  {
    id: "eps",
    label: "EPS / Styrofoam packaging",
    unit: "units/month",
    co2PerUnit: 0.78,
    costPerUnit: 0.12,
    alternativeLabel: "Mycelium packaging",
    co2Reduction: 0.68,
    costFactor: 1.15,
    supplier: "Ecovative Design",
    supplierId: "1",
  },
  {
    id: "plastic-bottle",
    label: "Single-use plastic bottles",
    unit: "units/month",
    co2PerUnit: 0.52,
    costPerUnit: 0.08,
    alternativeLabel: "Paper-based bottles (Pulpex)",
    co2Reduction: 0.66,
    costFactor: 1.22,
    supplier: "Pulpex",
    supplierId: "2",
  },
  {
    id: "plastic-mailer",
    label: "Plastic mailer bags",
    unit: "units/month",
    co2PerUnit: 0.34,
    costPerUnit: 0.06,
    alternativeLabel: "Compostable mailers",
    co2Reduction: 0.72,
    costFactor: 0.98,
    supplier: "TerraPack Solutions",
    supplierId: "4",
  },
  {
    id: "grid-energy",
    label: "Grid electricity (warehouse)",
    unit: "MWh/month",
    co2PerUnit: 400,
    costPerUnit: 80,
    alternativeLabel: "On-site solar + battery",
    co2Reduction: 0.62,
    costFactor: 0.42,
    supplier: "SolarEdge Industrial",
    supplierId: "5",
  },
  {
    id: "virgin-cotton",
    label: "Virgin cotton fibre",
    unit: "tonnes/month",
    co2PerUnit: 3900,
    costPerUnit: 1800,
    alternativeLabel: "Circulose (recycled textile fibre)",
    co2Reduction: 0.66,
    costFactor: 1.08,
    supplier: "Renewcell",
    supplierId: "7",
  },
];

// --- Receipt helpers (identical to /directory/[id]) ---

const ReceiptDivider = () => (
  <div style={{ borderBottom: "1px dashed oklch(0% 0 0 / 0.12)", margin: "12px 0" }} />
);

const ReceiptRow = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "3px 0",
      fontSize: "0.78rem",
      lineHeight: 1.5,
    }}
  >
    <span style={{ color: "var(--ink-secondary)" }}>{label}</span>
    <span
      style={{
        fontVariantNumeric: "tabular-nums",
        fontWeight: 500,
        color: "var(--ink)",
        textAlign: "right",
      }}
    >
      {value}
    </span>
  </div>
);

function ResultCard({
  title,
  muted,
  children,
}: {
  title: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: muted ? "oklch(97% 0.003 60)" : "oklch(98.5% 0.004 60)",
        borderRadius: "12px",
        padding: "28px 22px",
        border: muted
          ? "1px dashed oklch(0% 0 0 / 0.08)"
          : "1px solid oklch(0% 0 0 / 0.06)",
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
      {children}
    </div>
  );
}

// --- MetricCard (identical to /directory/[id]) ---

function MetricCard({
  label,
  value,
  accent,
}: {
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
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: accent ? "oklch(100% 0 0 / 0.5)" : "var(--ink-tertiary)",
          marginBottom: "6px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-sora)",
          fontSize: "1.25rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: accent ? "white" : "var(--ink)",
          lineHeight: 1.2,
        }}
      >
        {value}
      </p>
    </div>
  );
}

// --- ImpactCard (identical to /directory/[id]) ---

function ImpactCard({
  label,
  value,
  highlight,
  subtitle,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  subtitle?: string;
}) {
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
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
          marginBottom: "2px",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink-tertiary)",
            opacity: 0.8,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink)",
          }}
        >
          {value}
        </p>
      </div>
      {subtitle && (
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--ink-tertiary)",
            marginTop: "4px",
            lineHeight: 1.4,
            maxWidth: "340px",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// --- Formatters ---

function fmt(n: number, decimals = 0) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(decimals);
}

function fmtCO2(kg: number) {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)} t CO₂e`;
  return `${kg.toFixed(0)} kg CO₂e`;
}

function fmtCost(usd: number) {
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(2)}M`;
  if (usd >= 1_000) return `$${(usd / 1_000).toFixed(1)}K`;
  return `$${usd.toFixed(0)}`;
}

// --- Page ---

export default function CalculatorPage() {
  const [materialId, setMaterialId] = useState("eps");
  const [volume, setVolume] = useState(10000);
  const [hasCalculated, setHasCalculated] = useState(false);

  const material = MATERIAL_TYPES.find((m) => m.id === materialId)!;
  const supplier = COMPANIES.find((c) => c.id === material.supplierId);

  const results = useMemo(() => {
    const annualVolume = volume * 12;

    // Current
    const currentCO2 = annualVolume * material.co2PerUnit;
    const currentCost = annualVolume * material.costPerUnit;

    // After switch
    const newCO2 = currentCO2 * (1 - material.co2Reduction);
    const newCost = currentCost * material.costFactor;

    // Savings
    const co2Saved = currentCO2 - newCO2;
    const costDelta = newCost - currentCost;

    // Equivalents
    const treesEquivalent = Math.round(co2Saved / 21); // avg tree absorbs 21 kg/yr
    const carsEquivalent = Math.round(co2Saved / 4600); // avg car emits 4.6 t/yr

    return {
      annualVolume,
      currentCO2,
      currentCost,
      newCO2,
      newCost,
      co2Saved,
      costDelta,
      treesEquivalent,
      carsEquivalent,
    };
  }, [volume, material]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
      {/* Navigation — identical to /directory/[id] */}
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
          <Link
            href="/calculator"
            style={{ fontWeight: 600, color: "var(--ink)" }}
          >
            Calculator
          </Link>
          <Link href="/ledger" style={{ fontWeight: 500 }}>
            Ledger
          </Link>
          <Link href="/profile" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* Page header — mirrors /directory/[id] hero section */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "32px 24px 0",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          Switch Calculator
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.65,
            color: "var(--ink-secondary)",
            maxWidth: "540px",
          }}
        >
          Enter your current material usage and instantly see the carbon and
          cost impact of switching to a verified sustainable alternative. Every
          result is matched to a Symbio-audited supplier.
        </p>
      </section>

      {/* Input form */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "40px 24px 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: "40px",
          }}
        >
          {/* Left pane — inputs */}
          <div>
            <div
              style={{
                borderRadius: "12px",
                background: "var(--surface-offset)",
                border: "1px solid var(--border)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              {/* Material selector */}
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink-tertiary)",
                    marginBottom: "10px",
                  }}
                >
                  Current Material
                </p>
                <div style={{ position: "relative" }}>
                  <select
                    value={materialId}
                    onChange={(e) => {
                      setMaterialId(e.target.value);
                      setHasCalculated(false);
                    }}
                    style={{
                      width: "100%",
                      appearance: "none",
                      padding: "11px 36px 11px 14px",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      fontFamily: "inherit",
                      color: "var(--ink)",
                      background: "var(--surface)",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {MATERIAL_TYPES.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "var(--ink-tertiary)",
                    }}
                  />
                </div>
              </div>

              {/* Volume input */}
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink-tertiary)",
                    marginBottom: "10px",
                  }}
                >
                  Monthly volume ({material.unit.replace("/month", "")})
                </p>
                <input
                  type="number"
                  min={1}
                  value={volume}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v > 0) {
                      setVolume(v);
                      setHasCalculated(false);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    fontFamily: "inherit",
                    color: "var(--ink)",
                    background: "var(--surface)",
                    outline: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink-tertiary)",
                    marginTop: "6px",
                  }}
                >
                  Annual: {fmt(volume * 12)} {material.unit.replace("/month", "")}
                </p>
              </div>

              {/* Alternative label */}
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink-tertiary)",
                  }}
                >
                  Suggested switch
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  {material.alternativeLabel}
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--ink-secondary)",
                  }}
                >
                  via {material.supplier}
                </p>
              </div>

              {/* CTA */}
              <button
                className="btn-primary"
                onClick={() => setHasCalculated(true)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                Calculate impact <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Right pane — summary metric cards (pre-calculation) */}
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
              <div>
                <h2
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: "6px",
                  }}
                >
                  {hasCalculated
                    ? "Projected outcome"
                    : "How the calculation works"}
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--ink-tertiary)",
                    lineHeight: 1.6,
                    maxWidth: "380px",
                  }}
                >
                  {hasCalculated
                    ? `Estimated annual impact of switching ${fmt(volume * 12)} ${material.unit.replace("/month", "")} of ${material.label} to ${material.alternativeLabel}.`
                    : "We calculate your current annual CO₂ output and cost, then model the reduction by switching to the closest verified alternative in our directory."}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <MetricCard
                label="Current CO₂e / yr"
                value={fmtCO2(results.currentCO2)}
              />
              <MetricCard
                label="After switch"
                value={hasCalculated ? fmtCO2(results.newCO2) : "—"}
                accent={hasCalculated}
              />
              <MetricCard
                label="Current cost / yr"
                value={fmtCost(results.currentCost)}
              />
              <MetricCard
                label="Projected cost / yr"
                value={hasCalculated ? fmtCost(results.newCost) : "—"}
                accent={hasCalculated}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projected impact section — mirrors /directory/[id] "Projected outcome" section */}
      {hasCalculated && (
        <section
          style={{
            maxWidth: "var(--max-width)",
            margin: "0 auto",
            padding: "56px 24px 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 32px",
            }}
          >
            {/* Header row */}
            <div style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Impact breakdown
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--ink-tertiary)",
                  maxWidth: "460px",
                }}
              >
                Estimated annual improvements upon switching to{" "}
                {material.alternativeLabel} via {material.supplier}. Modeled
                from Symbio-verified supplier data and your input volume.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "var(--ink-secondary)",
                }}
              >
                {material.supplier} is a Symbio-verified partner. Your reduction
                of{" "}
                <strong style={{ color: "var(--ink)" }}>
                  {fmtCO2(results.co2Saved)}
                </strong>{" "}
                CO₂e per year is equivalent to planting{" "}
                <strong style={{ color: "var(--ink)" }}>
                  {fmt(results.treesEquivalent)} trees
                </strong>{" "}
                or removing{" "}
                <strong style={{ color: "var(--ink)" }}>
                  {fmt(results.carsEquivalent)} cars
                </strong>{" "}
                from the road.
              </p>
            </div>

            {/* Impact cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
              }}
            >
              <ImpactCard
                label="CO₂e saved"
                value={fmtCO2(results.co2Saved)}
                highlight
                subtitle={`From ${fmtCO2(results.currentCO2)} down to ${fmtCO2(results.newCO2)} annually — a ${Math.round(material.co2Reduction * 100)}% reduction in scope 3 packaging emissions.`}
              />
              <ImpactCard
                label="Cost delta"
                value={
                  results.costDelta >= 0
                    ? `+${fmtCost(results.costDelta)}/yr`
                    : `${fmtCost(results.costDelta)}/yr`
                }
                highlight
                subtitle={
                  results.costDelta <= 0
                    ? `Switching to ${material.alternativeLabel} is projected to reduce your annual spend by ${fmtCost(Math.abs(results.costDelta))}.`
                    : `The premium for ${material.alternativeLabel} adds ${fmtCost(results.costDelta)} per year — offset by avoided carbon costs and ESG risk.`
                }
              />
              <ImpactCard
                label="Reduction rate"
                value={`${Math.round(material.co2Reduction * 100)}%`}
                highlight
                subtitle={`Equivalent to removing ${results.carsEquivalent} cars from the road or planting ${fmt(results.treesEquivalent)} trees per year, based on Symbio audit coefficients.`}
              />
            </div>

            {/* Supplier match card */}
            <div
              style={{
                borderRadius: "12px",
                background: "var(--surface-offset)",
                border: "1px solid var(--border)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink-tertiary)",
                    marginBottom: "16px",
                  }}
                >
                  Matched supplier
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sora)",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    marginBottom: "8px",
                    lineHeight: 1.2,
                  }}
                >
                  {material.supplier}
                </p>
                {supplier && (
                  <>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--ink-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      {supplier.location} · {supplier.industry.join(", ")}
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        color: "var(--ink-secondary)",
                        marginBottom: "24px",
                      }}
                    >
                      {supplier.description}
                    </p>
                  </>
                )}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--ink-tertiary)",
                      marginBottom: "4px",
                    }}
                  >
                    Verified metrics
                  </p>
                  {supplier?.receipt.after.total.map((line) => (
                    <ReceiptRow
                      key={line.label}
                      label={line.label}
                      value={line.value}
                    />
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <button
                  className="btn-primary"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    fontSize: "0.85rem",
                    padding: "10px 16px",
                  }}
                >
                  Request contract <ArrowUpRight size={14} />
                </button>
                <Link
                  href={`/directory/${material.supplierId}`}
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    fontSize: "0.85rem",
                    padding: "10px 16px",
                    background: "white",
                    textAlign: "center",
                  }}
                >
                  View profile <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Attribution footer */}
            <div style={{ marginTop: "20px", gridColumn: "1 / -1" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--ink-tertiary)",
                  fontStyle: "italic",
                }}
              >
                * Projections modeled from Symbio audit coefficients. Actual
                results may vary by operational context and supplier agreement.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Verification receipts — identical structure to /directory/[id] */}
      {hasCalculated && (
        <section
          style={{
            maxWidth: "var(--max-width)",
            margin: "0 auto",
            padding: "56px 24px 0",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Verification receipts
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--ink-tertiary)",
              marginBottom: "28px",
            }}
          >
            Full audit receipts comparing your current footprint against the
            projected outcome with {material.supplier}.
          </p>

          <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
            {/* Current (before) */}
            <ResultCard title="Current impact" muted>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink-secondary)",
                  marginBottom: "6px",
                }}
              >
                Materials
              </p>
              <ReceiptRow
                label="Annual volume"
                value={`${fmt(results.annualVolume)} ${material.unit.replace("/month", "")}`}
              />
              <ReceiptRow
                label={`CO₂e from ${material.label}`}
                value={fmtCO2(results.currentCO2)}
              />
              <ReceiptRow
                label="Annual spend"
                value={fmtCost(results.currentCost)}
              />
              <ReceiptDivider />
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-secondary)",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                Total
              </p>
              <ReceiptRow label="CO₂e" value={fmtCO2(results.currentCO2)} />
              <ReceiptRow label="Cost" value={fmtCost(results.currentCost)} />
              <ReceiptRow
                label="Reduction rate"
                value="0%"
              />
            </ResultCard>

            {/* Arrow connector — same as /directory/[id] */}
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

            {/* After switch */}
            <ResultCard title={`With ${material.supplier}`}>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  marginBottom: "6px",
                }}
              >
                Materials
              </p>
              <ReceiptRow
                label="Annual volume"
                value={`${fmt(results.annualVolume)} ${material.unit.replace("/month", "")}`}
              />
              <ReceiptRow
                label={`CO₂e from ${material.alternativeLabel}`}
                value={fmtCO2(results.newCO2)}
              />
              <ReceiptRow
                label="Annual spend"
                value={fmtCost(results.newCost)}
              />
              <ReceiptDivider />
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                Total
              </p>
              <ReceiptRow label="CO₂e" value={fmtCO2(results.newCO2)} />
              <ReceiptRow label="Cost" value={fmtCost(results.newCost)} />
              <ReceiptRow
                label="Reduction rate"
                value={`${Math.round(material.co2Reduction * 100)}%`}
              />
            </ResultCard>
          </div>

          {/* Tagline */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ink-tertiary)",
              }}
            >
              Verified by Symbio audit protocols · {fmt(results.treesEquivalent)} trees equivalent
            </p>
          </div>
        </section>
      )}

      {/* CTA — identical to /directory/[id] */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "56px 24px 80px",
        }}
      >
        <div
          style={{
            background: "var(--surface-offset)",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              marginBottom: "8px",
            }}
          >
            Ready to reduce your footprint?
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--ink-secondary)",
              marginBottom: "24px",
              maxWidth: "420px",
              margin: "0 auto 24px",
            }}
          >
            Connect with verified suppliers through Symbio and turn your
            calculation into a signed, publicly ledgered partnership.
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Get matched <ArrowUpRight size={14} />
            </button>
            <Link
              href="/directory"
              className="btn-secondary"
              style={{ background: "white" }}
            >
              Browse directory
            </Link>
          </div>
        </div>
      </section>

      {/* Footer — identical to /directory/[id] */}
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
