"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, BarChart3, ArrowUpRight } from "lucide-react";

export default function Home() {
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
          <button
            className="btn-primary"
            style={{ padding: "8px 20px", fontSize: "0.85rem" }}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "100px 24px 120px",
          textAlign: "center",
        }}
      >
      

        <h1
          className="animate-reveal"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            maxWidth: "750px",
            margin: "0 auto 20px",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            animationDelay: "0.05s",
          }}
        >
          Demand better products.
        </h1>

        <p
          className="animate-reveal"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            maxWidth: "520px",
            margin: "0 auto 40px",
            color: "var(--ink-tertiary)",
            lineHeight: 1.6,
            animationDelay: "0.1s",
          }}
        >
          The accountability platform that replaces corporate green-hushing with
          data-backed transparency and verified alternatives.
        </p>

        <div
          className="animate-reveal"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            animationDelay: "0.15s",
          }}
        >
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            View impact feed <ArrowRight size={16} />
          </button>
          <button className="btn-secondary">Verify a brand</button>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          borderTop: "1px solid var(--border)",
        }}
      />

      {/* Features */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "100px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            marginBottom: "64px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              marginBottom: "12px",
            }}
          >
            How it works
          </h2>
          <p style={{ fontSize: "1rem" }}>
            We bridge the gap between organizations and verified sustainable
            partners through rigorous environmental auditing.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px",
          }}
        >
          {[
            {
              icon: <BarChart3 size={22} strokeWidth={1.5} />,
              title: "Evaluate",
              description:
                "We audit companies against real environmental metrics — carbon output, waste streams, supply chain transparency — not self-reported ESG scores.",
            },
            {
              icon: <Shield size={22} strokeWidth={1.5} />,
              title: "Match",
              description:
                "Our network identifies verified green partners capable of fulfilling supply needs with measurably lower environmental impact.",
            },
            {
              icon: <Leaf size={22} strokeWidth={1.5} />,
              title: "Track",
              description:
                "Every partnership generates a public impact receipt. Verified reductions in CO2e, waste diverted, and materials recovered — all on the ledger.",
            },
          ].map((feature) => (
            <div key={feature.title}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "var(--surface-offset)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink)",
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {feature.title}
                </h3>
              </div>
              <p style={{ fontSize: "0.925rem", lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community demands — simplified preview */}
      <section
        style={{
          background: "var(--surface-offset)",
          padding: "100px 24px",
        }}
      >
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "48px",
            }}
          >
            <div style={{ maxWidth: "480px" }}>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  marginBottom: "12px",
                }}
              >
                Community demands
              </h2>
              <p style={{ fontSize: "1rem" }}>
                Publicly sourced environmental issues, ranked by urgency and
                awaiting resolution.
              </p>
            </div>
            <Link
              href="/demands"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--ink-secondary)",
              }}
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                title: "End the polystyrene loop",
                company: "Samsung Electronics",
                upvotes: 1840,
                description:
                  "EPS foam in oversized TV shipping remains high. Community demands transition to molded pulp or mycelium alternatives.",
              },
              {
                title: "100% rPET target by 2027",
                company: "Coca-Cola Europacific",
                upvotes: 620,
                description:
                  "Evaluating supply chain capacity for total recycled plastic transition across Western Europe.",
              },
              {
                title: "Aluminum loop closure",
                company: "Perrier",
                upvotes: 2100,
                resolved: true,
                description:
                  "Achieved 100% post-consumer aluminum for 330ml cans. Verified reduction of 40k tons CO2e.",
              },
            ].map((demand) => (
              <div
                key={demand.title}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: demand.resolved
                        ? "var(--symbio)"
                        : "var(--ink-tertiary)",
                    }}
                  >
                    {demand.resolved ? "Resolved" : `${demand.upvotes.toLocaleString()} upvotes`}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}
                  >
                    {demand.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--ink-tertiary)",
                      fontWeight: 500,
                    }}
                  >
                    {demand.company}
                  </p>
                </div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>
                  {demand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ padding: "64px 24px" }}>
        <div
          style={{
            maxWidth: "var(--max-width)",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--ink-tertiary)",
              marginBottom: "28px",
              letterSpacing: "0.02em",
            }}
          >
            Powering transparent procurement switches for
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "56px",
              color: "var(--ink-tertiary)",
            }}
          >
            {["Ecovative", "MycoMaterials", "GreenFlow", "TerraPack"].map(
              (name) => (
                <span
                  key={name}
                  style={{
                    fontFamily: "var(--font-sora)",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "40px 24px 100px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "var(--surface-offset)",
            borderRadius: "16px",
            padding: "64px 24px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              marginBottom: "12px",
            }}
          >
            Ready to make the switch?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "420px",
              margin: "0 auto 32px",
            }}
          >
            Join the companies building supply chains that are good for business
            and good for the planet.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <button className="btn-primary">Get started free</button>
            <button className="btn-secondary">Request a demo</button>
          </div>
        </div>
      </section>

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
