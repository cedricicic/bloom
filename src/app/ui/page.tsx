"use client";

import React from "react";
import Header from "@/components/Header";
import { ArrowUpRight, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function DesignSystemPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)", paddingBottom: "120px" }}>
      <Header />

      <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "64px 24px 40px" }}>
        <div style={{ maxWidth: "720px", marginBottom: "64px" }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "24px", fontFamily: "var(--font-sora)" }}>
            UI Library.
          </h1>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink-secondary)", maxWidth: "600px" }}>
            A concentrated version of Symbio's UI elements. Muted, subtle, and heavily focused on typography, spatial rhythm, and structured data execution.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          
          {/* Typography */}
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>Typography</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", background: "oklch(98.5% 0.004 60)", border: "1px solid var(--border)", borderRadius: "16px", padding: "40px" }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--ink-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", display: "block" }}>Display H1 (Sora)</span>
                <h1 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, fontFamily: "var(--font-sora)" }}>The quick brown fox.</h1>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--ink-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", display: "block" }}>Section H2 (Sora)</span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em" }}>The quick brown fox.</h2>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--ink-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", display: "block" }}>Body Text (Onest)</span>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink-secondary)", maxWidth: "600px" }}>The quick brown fox jumps over the lazy dog. A dual-sided marketplace turning public environmental pressure into actionable B2B solutions.</p>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--ink-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", display: "block" }}>Microcopy & Tags</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-secondary)" }}>Data point</span>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>Colors & Surfaces</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
              {[
                { label: "Ink", var: "var(--ink)" },
                { label: "Ink Secondary", var: "var(--ink-secondary)" },
                { label: "Ink Tertiary", var: "var(--ink-tertiary)" },
                { label: "Surface", var: "var(--surface)", border: "1px solid var(--border)" },
                { label: "Surface Offset", var: "oklch(98.5% 0.004 60)", border: "1px solid var(--border)" },
                { label: "Surface Muted", var: "oklch(97% 0.003 60)", border: "1px dashed oklch(0% 0 0 / 0.08)" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ height: "80px", borderRadius: "12px", background: c.var, border: c.border }} />
                  <span style={{ fontSize: "0.75rem", color: "var(--ink-secondary)", fontWeight: 500 }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>Interactive Elements</h2>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                Action <ArrowUpRight size={14} />
              </button>

              {/* Tag / Inline Interactive */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ink-secondary)" }}>
                  Category Link
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-tertiary)" }}>&middot;</span>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>Tag element</span>
              </div>
            </div>
          </div>

          {/* Data Visualization / Cards */}
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>Components & Metric Cards</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
              
              {/* Receipt Structure */}
              <div style={{ background: "oklch(97% 0.003 60)", borderRadius: "12px", padding: "28px 22px", border: "1px dashed oklch(0% 0 0 / 0.08)" }}>
                <p style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", color: "var(--ink-secondary)", textTransform: "uppercase", textAlign: "center", marginBottom: "20px" }}>
                  Verification Receipt
                </p>
                <div style={{ borderBottom: "1px dashed oklch(0% 0 0 / 0.12)", margin: "12px 0" }} />
                
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-secondary)", marginBottom: "6px" }}>Metric Breakdown</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "3px 0", fontSize: "0.78rem", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--ink-secondary)" }}>Category item</span>
                  <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500, color: "var(--ink)", textAlign: "right" }}>1,000 unit</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "3px 0", fontSize: "0.78rem", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--ink-secondary)" }}>Second category item</span>
                  <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500, color: "var(--ink)", textAlign: "right" }}>8.4 tons</span>
                </div>
                <div style={{ borderBottom: "1px dashed oklch(0% 0 0 / 0.12)", margin: "12px 0" }} />
                
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-secondary)", marginBottom: "8px", textAlign: "center" }}>Total</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "3px 0", fontSize: "0.78rem", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--ink-secondary)" }}>Total Impact</span>
                  <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500, color: "var(--ink)", textAlign: "right" }}>15,000 tons</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  
                {/* Impact Metric Card Highlighting */}
                <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--surface-offset)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "2px" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-tertiary)", opacity: 0.8 }}>Carbon Eliminated</p>
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)" }}>4,000 tons</p>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--ink-tertiary)", marginTop: "4px", lineHeight: 1.4, maxWidth: "340px" }}>
                    Projected annual performance with Symbio-verified integration, reflecting a significant optimization of your current environmental footprint.
                  </p>
                </div>

                {/* Status Indicator Tag */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: "8px", display: "inline-flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ color: "var(--ink)", fontWeight: 600, fontSize: "0.95rem", fontVariantNumeric: "tabular-nums" }}>1 Million</span>
                    <span style={{ color: "var(--ink-secondary)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>items replaced</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
          
        </div>
      </section>

    </main>
  );
}
