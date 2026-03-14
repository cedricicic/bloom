"use client";

import React from "react";
import Link from "next/link";
import { User, Bell, ArrowUpRight } from "lucide-react";

// --- Dashboard Layout & Card Component ---

const DashboardCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      background: "var(--surface-offset)",
      borderRadius: "24px",
      padding: "24px",
      boxShadow: "0 2px 16px oklch(0% 0 0 / 0.04)",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {children}
  </div>
);

export default function DashboardPage() {
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
          <Link href="/directory" style={{ fontWeight: 500 }}>Directory</Link>
          <Link href="/calculator" style={{ fontWeight: 500 }}>Calculator</Link>
          <Link href="/ledger" style={{ fontWeight: 500 }}>Ledger</Link>
          <Link href="/dashboard" style={{ fontWeight: 600, color: "var(--ink)" }}>Dashboard</Link>
          <Link href="/profile" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* ─── Dashboard Content ─── */}
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "40px 24px 80px" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontFamily: "var(--font-sora)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Impact Overview
            </h1>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem" }}>
              Active integration with <span style={{ fontWeight: 500, color: "var(--ink)" }}>Ecovative Design</span>
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
            <Link
              href="/profile"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--ink)",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "background 0.15s ease",
            }}
          >
            Edit profile <ArrowUpRight size={14} />
          </Link>
            <p style={{ fontSize: "0.8rem", color: "var(--ink-tertiary)", fontWeight: 500, letterSpacing: "0.02em", textTransform: "uppercase" }}>
              Last synced: Today, 09:41 AM
            </p>
          </div>
        </div>

        {/* CSS Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "240px 160px 280px",
            gap: "24px",
          }}
        >
          {/* Widget 1: CO2e Trajectory (Chart) - Spans Col 1-2, Row 1 */}
          <DashboardCard style={{ gridColumn: "1 / 3", gridRow: "1 / 2" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", fontWeight: 500, letterSpacing: "0.02em" }}>
                CO₂e Footprint (tons)
              </h3>
              <div style={{ display: "flex", gap: "16px", fontSize: "0.7rem", color: "var(--ink-secondary)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "3px", borderRadius: "1.5px", background: "var(--ink-tertiary)", opacity: 0.3 }} /> EPS Foam
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "3px", borderRadius: "1.5px", background: "var(--symbio)" }} /> Mycelium Gen-2
                </span>
              </div>
            </div>
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-end" }}>
              <svg width="100%" height="100%" viewBox="0 0 700 165" preserveAspectRatio="none">
                {/* Horizontal reference lines */}
                <line x1="0" y1="20" x2="700" y2="20" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="85" x2="700" y2="85" stroke="var(--border)" strokeWidth="1" />
                
                {/* Y-axis labels */}
                <text x="0" y="16" fill="var(--ink-tertiary)" fontSize="11">15k</text>
                <text x="0" y="81" fill="var(--ink-tertiary)" fontSize="11">Average</text>
                <text x="0" y="146" fill="var(--ink-tertiary)" fontSize="11">0</text>

                {/* Bars - Baseline & New Target */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const x = 50 + i * 27;
                  // First 12 months high (before), next 12 months lower (after)
                  const isBefore = i < 12;
                  const targetH = isBefore ? 100 : 35; 
                  const variance = Math.random() * 20 - 10;
                  const h1 = targetH + variance; // Dark bar
                  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                  return (
                    <g key={i} transform={`translate(${x}, 0)`}>
                      <rect
                        x="0"
                        y={150 - h1}
                        width="3"
                        height={h1}
                        rx="1.5"
                        fill={isBefore ? "var(--ink-tertiary)" : "var(--symbio)"}
                        opacity={isBefore ? 0.3 : 1}
                      />
                      <text x="1.5" y="163" fill="var(--ink-tertiary)" fontSize="9" textAnchor="middle">
                        {months[i % 12]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </DashboardCard>

          {/* Widget 2: Energy Sourcing Dial - Spans Col 3, Row 1-2 */}
          <DashboardCard style={{ gridColumn: "3 / 4", gridRow: "1 / 3", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", fontWeight: 500, letterSpacing: "0.02em", width: "100%" }}>
              Renewable Energy
            </h3>
            
            <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
              <svg width="240" height="240" viewBox="0 0 240 240">
                {/* Outer dashed ring */}
                <circle cx="120" cy="120" r="100" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 6" />
                {/* Inner solid ring */}
                <circle cx="120" cy="120" r="75" fill="none" stroke="var(--border)" strokeWidth="1" />
                
                {/* Tick marks around the dial */}
                {Array.from({ length: 48 }).map((_, i) => (
                  <line
                    key={i}
                    x1="120"
                    y1="25"
                    x2="120"
                    y2={i % 6 === 0 ? "33" : "29"}
                    stroke={i % 6 === 0 ? "var(--ink-tertiary)" : "var(--border)"}
                    strokeWidth={i % 6 === 0 ? 1.5 : 1}
                    transform={`rotate(${i * 7.5} 120 120)`}
                  />
                ))}

                {/* The highlighted value arc (representing 92%) - following the 75px radius */}
                <path
                  d="M 120 45 A 75 75 0 1 1 83.9 54.3"
                  fill="none"
                  stroke="var(--symbio)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                {/* A small dot/indicator at the end of the arc */}
                <circle cx="83.9" cy="54.3" r="4.5" fill="var(--symbio)" />
                
                {/* Compass labels */}
                <text x="120" y="16" fill="var(--ink-tertiary)" fontSize="10" textAnchor="middle" fontWeight="500">100</text>
                <text x="228" y="123" fill="var(--ink-tertiary)" fontSize="10" textAnchor="middle" fontWeight="500">25</text>
                <text x="120" y="234" fill="var(--ink-tertiary)" fontSize="10" textAnchor="middle" fontWeight="500">50</text>
                <text x="12" y="123" fill="var(--ink-tertiary)" fontSize="10" textAnchor="middle" fontWeight="500">75</text>
              </svg>
              
              <div style={{ position: "absolute", left: "0", right: "0", top: "50%", transform: "translateY(-50%)", textAlign: "center", pointerEvents: "none" }}>
                <p style={{ fontSize: "0.7rem", color: "var(--ink-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Coverage
                </p>
                <p style={{ fontSize: "3.5rem", fontFamily: "var(--font-sora)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)" }}>
                  92<span style={{ fontSize: "1rem", color: "var(--ink-secondary)", marginLeft: "2px" }}>%</span>
                </p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.65rem", color: "var(--ink-secondary)", marginBottom: "4px" }}>Solar Array</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-sora)" }}>64%</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.65rem", color: "var(--ink-secondary)", marginBottom: "4px" }}>Wind Purchase</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-sora)" }}>28%</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.65rem", color: "var(--ink-secondary)", marginBottom: "4px" }}>Grid Mix</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-sora)" }}>8%</p>
              </div>
            </div>
          </DashboardCard>

          {/* Widget 3: Total Landfill - Spans Col 1, Row 2 */}
          <DashboardCard style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}>
            <h3 style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", fontWeight: 500, letterSpacing: "0.02em", marginBottom: "16px" }}>
              Landfill Waste Eliminated
            </h3>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: "auto" }}>
              <span style={{ fontSize: "3rem", fontWeight: 300, fontFamily: "var(--font-sora)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)" }}>
                8,200
              </span>
              <span style={{ fontSize: "1rem", color: "var(--ink-tertiary)", marginLeft: "8px", paddingBottom: "4px" }}>t/yr</span>
            </div>
          </DashboardCard>

          {/* Widget 4: Water Savings - Spans Col 2, Row 2 */}
          <DashboardCard style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
            <h3 style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", fontWeight: 500, letterSpacing: "0.02em", marginBottom: "16px" }}>
              Water Usage Reduction
            </h3>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: "auto" }}>
              <span style={{ fontSize: "3rem", fontWeight: 300, fontFamily: "var(--font-sora)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)" }}>
                -700
              </span>
              <span style={{ fontSize: "1rem", color: "var(--ink-tertiary)", marginLeft: "8px", paddingBottom: "4px" }}>K m³</span>
            </div>
          </DashboardCard>

          {/* Widget 5: Overview Gauge - Spans Col 1-2, Row 3 */}
          <DashboardCard style={{ gridColumn: "1 / 3", gridRow: "3 / 4", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
             <h3 style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", fontWeight: 500, letterSpacing: "0.02em", position: "relative", zIndex: 1, marginBottom: "8px" }}>
              Integration Overview
            </h3>
            
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "400px", height: "200px", display: "flex", justifyContent: "center" }}>
                <svg width="400" height="200" viewBox="0 0 400 200" style={{ position: "absolute", bottom: 0 }}>
                  {/* Track tick marks (background) */}
                  {Array.from({ length: 41 }).map((_, i) => (
                    <line
                      key={`bg-${i}`}
                      x1="200"
                      y1="25"
                      x2="200"
                      y2="37"
                      stroke="var(--border)"
                      strokeWidth="2"
                      transform={`rotate(${i * 4.5 - 90} 200 200)`}
                    />
                  ))}
                  
                  {/* Track line outer */}
                  <path d="M 25 200 A 175 175 0 0 1 375 200" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 6" />
                  
                  {/* Active segment representing ~66% completion */}
                  <path d="M 25 200 A 175 175 0 0 1 287.5 48" fill="none" stroke="var(--symbio)" strokeWidth="4" />
                  
                  <text x="50" y="185" fill="var(--ink-tertiary)" fontSize="11" fontWeight="500">0%</text>
                  <text x="325" y="185" fill="var(--ink-tertiary)" fontSize="11" fontWeight="500">100%</text>
                </svg>

                <div style={{ position: "absolute", bottom: "16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--ink-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Rollout Phase
                  </p>
                  <p style={{ fontSize: "3.5rem", fontFamily: "var(--font-sora)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)", marginBottom: 4 }}>
                    66<span style={{ fontSize: "1rem", color: "var(--ink-secondary)", marginLeft: "2px" }}>%</span>
                  </p>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Widget 6: Resource Intensity Bars - Spans Col 3, Row 3 */}
          <DashboardCard style={{ gridColumn: "3 / 4", gridRow: "3 / 4" }}>
            <h3 style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", fontWeight: 500, letterSpacing: "0.02em", marginBottom: "auto" }}>
              Resource Intensity Limits
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "24px", marginBottom: "16px" }}>
              {[
                { label: "Mycelium Yield", value: "8.2k t", limit: "10k t", status: "warn", progress: "82%" },
                { label: "Water Constraint", value: "1.4M", limit: "1.5M", status: "good", progress: "93%" },
                { label: "Landfill Drop-off", value: "0 t", limit: "0.5k t", status: "good", progress: "4%" },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.8rem" }}>
                    <span style={{ color: "var(--ink-secondary)", fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{item.value} <span style={{ fontWeight: 400, color: "var(--ink-tertiary)" }}>/ {item.limit}</span></span>
                  </div>
                  <div style={{ position: "relative", height: "12px", width: "100%" }}>
                    {/* Tick marks background */}
                    <div
                      style={{
                        position: "absolute",
                        top: 4,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "repeating-linear-gradient(to right, var(--ink-tertiary) 0, var(--ink-tertiary) 1px, transparent 1px, transparent 5px)",
                        opacity: 0.2,
                      }}
                    />
                    {/* Progress bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 4,
                        left: 0,
                        width: item.progress,
                        height: "4px",
                        background: item.status === "warn" ? "var(--symbio)" : "var(--ink)",
                        borderRadius: "2px",
                      }}
                    />
                    {/* Warning flag */}
                    {item.status === "warn" && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: item.progress,
                          transform: "translate(-50%, -50%)",
                          background: "var(--symbio)",
                          color: "white",
                          width: "16px",
                          height: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "4px",
                          fontSize: "0.6rem",
                          fontWeight: "bold",
                        }}
                      >
                        !
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

        </div>
      </div>
    </main>
  );
}
