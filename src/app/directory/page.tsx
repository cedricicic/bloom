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

// --- Types ---

type ReceiptLine = {
  label: string;
  value: string;
};

type ReceiptSection = {
  heading: string;
  lines: ReceiptLine[];
};

type ReceiptSide = {
  sections: ReceiptSection[];
  total: ReceiptLine[];
};

type Company = {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string[];
  location: string;
  impactLabel: string;
  co2Reduction: string;
  costRange: "$" | "$$" | "$$$";
  verified: boolean;
  popular: boolean;
  dateAdded: string;
  receipt: {
    verificationId: string;
    date: string;
    before: ReceiptSide;
    after: ReceiptSide;
    tagline: string;
  };
};

// --- Mock data ---

const COMPANIES: Company[] = [
  {
    id: "1",
    name: "Ecovative Design",
    description:
      "Mycelium-based packaging and materials that replace expanded polystyrene foam across consumer electronics and food shipping.",
    category: "Packaging",
    industry: ["Consumer Electronics", "Food & Beverage"],
    location: "United States",
    impactLabel: "Up to 70% packaging waste reduction",
    co2Reduction: "12,400 tons CO₂e/yr",
    costRange: "$$",
    verified: true,
    popular: true,
    dateAdded: "2025-11-01",
    receipt: {
      verificationId: "SYM-0041",
      date: "2025-11-01",
      before: {
        sections: [
          { heading: "Materials", lines: [
            { label: "CO₂e from packaging", value: "18,600 t/yr" },
            { label: "EPS foam used", value: "8,200 t/yr" },
            { label: "Water usage", value: "2.1M m³/yr" },
          ]},
          { heading: "Operations", lines: [
            { label: "Energy (renewable)", value: "31%" },
            { label: "Waste to landfill", value: "24%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "18,600 t/yr" },
          { label: "Landfill waste", value: "8,200 t/yr" },
          { label: "Water used", value: "2.1M m³/yr" },
        ],
      },
      after: {
        sections: [
          { heading: "Materials", lines: [
            { label: "CO₂e from packaging", value: "6,200 t/yr" },
            { label: "Mycelium used", value: "8,200 t/yr" },
            { label: "Water usage", value: "1.4M m³/yr" },
          ]},
          { heading: "Operations", lines: [
            { label: "Energy (renewable)", value: "92%" },
            { label: "Waste to landfill", value: "< 2%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "6,200 t/yr" },
          { label: "Landfill waste", value: "0 t/yr" },
          { label: "Water used", value: "1.4M m³/yr" },
        ],
      },
      tagline: "Grow a better future",
    },
  },
  {
    id: "2",
    name: "Pulpex",
    description:
      "Scalable paper-based bottle technology for liquid consumer goods, replacing single-use plastic across the FMCG sector.",
    category: "Packaging",
    industry: ["FMCG", "Personal Care"],
    location: "United Kingdom",
    impactLabel: "Up to 35% packaging reduction",
    co2Reduction: "8,200 tons CO₂e/yr",
    costRange: "$$$",
    verified: true,
    popular: true,
    dateAdded: "2025-09-15",
    receipt: {
      verificationId: "SYM-0028",
      date: "2025-09-15",
      before: {
        sections: [
          { heading: "Materials", lines: [
            { label: "CO₂e from bottles", value: "12,400 t/yr" },
            { label: "Virgin plastic used", value: "3,400 t/yr" },
            { label: "Recyclability rate", value: "28%" },
          ]},
          { heading: "Operations", lines: [
            { label: "Energy (renewable)", value: "22%" },
            { label: "Production waste", value: "12%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "12,400 t/yr" },
          { label: "Plastic consumed", value: "3,400 t/yr" },
          { label: "Water used", value: "1.8M m³/yr" },
        ],
      },
      after: {
        sections: [
          { heading: "Materials", lines: [
            { label: "CO₂e from bottles", value: "4,200 t/yr" },
            { label: "Paper fibre used", value: "3,400 t/yr" },
            { label: "Recyclability rate", value: "97%" },
          ]},
          { heading: "Operations", lines: [
            { label: "Energy (renewable)", value: "78%" },
            { label: "Production waste", value: "4.1%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "4,200 t/yr" },
          { label: "Plastic consumed", value: "0 t/yr" },
          { label: "Water used", value: "1.16M m³/yr" },
        ],
      },
      tagline: "Paper is the new plastic",
    },
  },
  {
    id: "3",
    name: "GreenFlow Logistics",
    description:
      "Route-optimized last-mile delivery using electric fleets and consolidated shipment algorithms for urban markets.",
    category: "Logistics",
    industry: ["Retail", "E-commerce"],
    location: "Netherlands",
    impactLabel: "Up to 45% delivery emissions cut",
    co2Reduction: "22,000 tons CO₂e/yr",
    costRange: "$$",
    verified: true,
    popular: false,
    dateAdded: "2026-01-20",
    receipt: {
      verificationId: "SYM-0063",
      date: "2026-01-20",
      before: {
        sections: [
          { heading: "Fleet", lines: [
            { label: "CO₂e from delivery", value: "40,000 t/yr" },
            { label: "Diesel vehicles", value: "340 units" },
            { label: "Diesel consumed", value: "6.8M L/yr" },
          ]},
          { heading: "Efficiency", lines: [
            { label: "Avg route distance", value: "48 km" },
            { label: "Consolidation rate", value: "34%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "40,000 t/yr" },
          { label: "Fuel consumed", value: "6.8M L/yr" },
          { label: "Deliveries/day", value: "12,200" },
        ],
      },
      after: {
        sections: [
          { heading: "Fleet", lines: [
            { label: "CO₂e from delivery", value: "18,000 t/yr" },
            { label: "Electric vehicles", value: "340 units" },
            { label: "Diesel consumed", value: "0 L/yr" },
          ]},
          { heading: "Efficiency", lines: [
            { label: "Avg route distance", value: "30 km" },
            { label: "Consolidation rate", value: "72%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "18,000 t/yr" },
          { label: "Fuel consumed", value: "0 L/yr" },
          { label: "Deliveries/day", value: "18,400" },
        ],
      },
      tagline: "Smarter miles, cleaner cities",
    },
  },
  {
    id: "4",
    name: "TerraPack Solutions",
    description:
      "Compostable mailer bags and void-fill made from agricultural waste streams. Certified home-compostable in 90 days.",
    category: "Packaging",
    industry: ["E-commerce", "Fashion"],
    location: "Germany",
    impactLabel: "Up to 90% plastic elimination",
    co2Reduction: "5,600 tons CO₂e/yr",
    costRange: "$",
    verified: true,
    popular: false,
    dateAdded: "2025-12-10",
    receipt: {
      verificationId: "SYM-0052",
      date: "2025-12-10",
      before: {
        sections: [
          { heading: "Materials", lines: [
            { label: "CO₂e from mailers", value: "7,800 t/yr" },
            { label: "Plastic film used", value: "2,100 t/yr" },
            { label: "Decomposition time", value: "400+ yrs" },
          ]},
          { heading: "Sourcing", lines: [
            { label: "Fossil feedstock", value: "100%" },
            { label: "Local sourcing", value: "12%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "7,800 t/yr" },
          { label: "Plastic waste", value: "2,100 t/yr" },
          { label: "Landfill volume", value: "4,800 m³/yr" },
        ],
      },
      after: {
        sections: [
          { heading: "Materials", lines: [
            { label: "CO₂e from mailers", value: "2,200 t/yr" },
            { label: "Compostable film", value: "2,100 t/yr" },
            { label: "Decomposition time", value: "90 days" },
          ]},
          { heading: "Sourcing", lines: [
            { label: "Agri-waste feedstock", value: "100%" },
            { label: "Local sourcing", value: "94%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "2,200 t/yr" },
          { label: "Plastic waste", value: "0 t/yr" },
          { label: "Landfill volume", value: "0 m³/yr" },
        ],
      },
      tagline: "From farm waste to your doorstep",
    },
  },
  {
    id: "5",
    name: "SolarEdge Industrial",
    description:
      "On-site solar and battery storage systems designed for warehouse and manufacturing facility rooftops.",
    category: "Renewable Energy",
    industry: ["Manufacturing", "Logistics"],
    location: "Israel",
    impactLabel: "Up to 60% energy cost reduction",
    co2Reduction: "34,000 tons CO₂e/yr",
    costRange: "$$$",
    verified: true,
    popular: true,
    dateAdded: "2025-08-01",
    receipt: {
      verificationId: "SYM-0019",
      date: "2025-08-01",
      before: {
        sections: [
          { heading: "Energy", lines: [
            { label: "CO₂e from power", value: "55,000 t/yr" },
            { label: "Grid dependence", value: "100%" },
            { label: "Renewable share", value: "18%" },
          ]},
          { heading: "Costs", lines: [
            { label: "Annual energy cost", value: "$4.2M" },
            { label: "Peak demand charges", value: "$890K" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "55,000 t/yr" },
          { label: "Energy cost", value: "$5.09M/yr" },
          { label: "Renewable share", value: "18%" },
        ],
      },
      after: {
        sections: [
          { heading: "Energy", lines: [
            { label: "CO₂e from power", value: "21,000 t/yr" },
            { label: "Grid dependence", value: "38%" },
            { label: "Renewable share", value: "80%" },
          ]},
          { heading: "Costs", lines: [
            { label: "Annual energy cost", value: "$1.8M" },
            { label: "Peak demand charges", value: "$520K" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "21,000 t/yr" },
          { label: "Energy cost", value: "$2.32M/yr" },
          { label: "Renewable share", value: "80%" },
        ],
      },
      tagline: "Power your operations with the sun",
    },
  },
  {
    id: "6",
    name: "Circulor",
    description:
      "Supply chain traceability platform using real-time data to verify ethical sourcing and carbon footprint across raw materials.",
    category: "Carbon Reduction",
    industry: ["Automotive", "Consumer Electronics"],
    location: "United Kingdom",
    impactLabel: "Full supply chain transparency",
    co2Reduction: "Varies by client",
    costRange: "$$",
    verified: true,
    popular: false,
    dateAdded: "2026-02-05",
    receipt: {
      verificationId: "SYM-0071",
      date: "2026-02-05",
      before: {
        sections: [
          { heading: "Traceability", lines: [
            { label: "Materials tracked", value: "3 types" },
            { label: "Suppliers mapped", value: "120" },
            { label: "Data points/day", value: "8,400" },
          ]},
          { heading: "Compliance", lines: [
            { label: "Audit pass rate", value: "74%" },
            { label: "Incident detection", value: "~14 days" },
          ]},
        ],
        total: [
          { label: "Suppliers verified", value: "120" },
          { label: "Risk events missed", value: "~180/yr" },
          { label: "Avg response time", value: "14 days" },
        ],
      },
      after: {
        sections: [
          { heading: "Traceability", lines: [
            { label: "Materials tracked", value: "24 types" },
            { label: "Suppliers mapped", value: "1,840" },
            { label: "Data points/day", value: "2.4M" },
          ]},
          { heading: "Compliance", lines: [
            { label: "Audit pass rate", value: "99.2%" },
            { label: "Incident detection", value: "< 4 hrs" },
          ]},
        ],
        total: [
          { label: "Suppliers verified", value: "1,840" },
          { label: "Risk events missed", value: "< 5/yr" },
          { label: "Avg response time", value: "3.8 hrs" },
        ],
      },
      tagline: "See every link in the chain",
    },
  },
  {
    id: "7",
    name: "Renewcell",
    description:
      "Textile-to-textile recycling technology that dissolves used cotton and viscose garments into a new raw material called Circulose.",
    category: "Waste Reduction",
    industry: ["Fashion", "Textiles"],
    location: "Sweden",
    impactLabel: "Up to 80% textile waste diverted",
    co2Reduction: "15,800 tons CO₂e/yr",
    costRange: "$$",
    verified: true,
    popular: true,
    dateAdded: "2025-10-22",
    receipt: {
      verificationId: "SYM-0037",
      date: "2025-10-22",
      before: {
        sections: [
          { heading: "Raw Materials", lines: [
            { label: "CO₂e from fibre", value: "24,000 t/yr" },
            { label: "Virgin cotton used", value: "6,100 t/yr" },
            { label: "Textile waste generated", value: "7,200 t/yr" },
          ]},
          { heading: "Resources", lines: [
            { label: "Water consumed", value: "4.8M m³/yr" },
            { label: "Chemical usage", value: "1,200 t/yr" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "24,000 t/yr" },
          { label: "Textile waste", value: "7,200 t/yr" },
          { label: "Water consumed", value: "4.8M m³/yr" },
        ],
      },
      after: {
        sections: [
          { heading: "Raw Materials", lines: [
            { label: "CO₂e from fibre", value: "8,200 t/yr" },
            { label: "Circulose used", value: "6,100 t/yr" },
            { label: "Textile waste generated", value: "1,440 t/yr" },
          ]},
          { heading: "Resources", lines: [
            { label: "Water consumed", value: "860K m³/yr" },
            { label: "Chemical usage", value: "430 t/yr" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "8,200 t/yr" },
          { label: "Textile waste", value: "1,440 t/yr" },
          { label: "Water consumed", value: "860K m³/yr" },
        ],
      },
      tagline: "Wear it again, differently",
    },
  },
  {
    id: "8",
    name: "CarbonCure Technologies",
    description:
      "Injects captured CO₂ into fresh concrete during mixing, permanently mineralizing it while improving compressive strength.",
    category: "Carbon Reduction",
    industry: ["Construction", "Infrastructure"],
    location: "Canada",
    impactLabel: "Up to 25% concrete emissions cut",
    co2Reduction: "42,000 tons CO₂e/yr",
    costRange: "$",
    verified: true,
    popular: true,
    dateAdded: "2025-07-18",
    receipt: {
      verificationId: "SYM-0012",
      date: "2025-07-18",
      before: {
        sections: [
          { heading: "Production", lines: [
            { label: "CO₂e from concrete", value: "56,000 t/yr" },
            { label: "Cement per batch", value: "320 kg/m³" },
            { label: "Compressive strength", value: "Base" },
          ]},
          { heading: "Scale", lines: [
            { label: "Plants active", value: "780" },
            { label: "CO₂ captured", value: "0 t/yr" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "56,000 t/yr" },
          { label: "CO₂ sequestered", value: "0 t/yr" },
          { label: "Cost impact", value: "Baseline" },
        ],
      },
      after: {
        sections: [
          { heading: "Production", lines: [
            { label: "CO₂e from concrete", value: "14,000 t/yr" },
            { label: "Cement per batch", value: "280 kg/m³" },
            { label: "Compressive strength", value: "+8%" },
          ]},
          { heading: "Scale", lines: [
            { label: "Plants active", value: "780" },
            { label: "CO₂ captured", value: "42,000 t/yr" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "14,000 t/yr" },
          { label: "CO₂ sequestered", value: "42,000 t/yr" },
          { label: "Cost impact", value: "Neutral" },
        ],
      },
      tagline: "Concrete proof of change",
    },
  },
  {
    id: "9",
    name: "Bower Collective",
    description:
      "Reusable container subscription service for household and personal care products, eliminating single-use packaging entirely.",
    category: "Waste Reduction",
    industry: ["FMCG", "Personal Care"],
    location: "United Kingdom",
    impactLabel: "Zero single-use packaging",
    co2Reduction: "3,200 tons CO₂e/yr",
    costRange: "$",
    verified: false,
    popular: false,
    dateAdded: "2026-03-01",
    receipt: {
      verificationId: "SYM-0078",
      date: "2026-03-01",
      before: {
        sections: [
          { heading: "Packaging", lines: [
            { label: "CO₂e from packaging", value: "4,800 t/yr" },
            { label: "Single-use containers", value: "580K/yr" },
            { label: "Plastic waste", value: "420 t/yr" },
          ]},
          { heading: "Model", lines: [
            { label: "Container reuse", value: "0x" },
            { label: "Return infrastructure", value: "None" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "4,800 t/yr" },
          { label: "Containers wasted", value: "580K/yr" },
          { label: "Plastic to landfill", value: "420 t/yr" },
        ],
      },
      after: {
        sections: [
          { heading: "Packaging", lines: [
            { label: "CO₂e from packaging", value: "1,600 t/yr" },
            { label: "Reusable containers", value: "48K active" },
            { label: "Plastic waste", value: "0 t/yr" },
          ]},
          { heading: "Model", lines: [
            { label: "Container reuse", value: "24x avg" },
            { label: "Return rate", value: "89%" },
          ]},
        ],
        total: [
          { label: "CO₂e", value: "1,600 t/yr" },
          { label: "Containers wasted", value: "0/yr" },
          { label: "Plastic to landfill", value: "0 t/yr" },
        ],
      },
      tagline: "Refill, return, repeat",
    },
  },
];

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
  verificationId,
  date,
  muted,
}: {
  title: string;
  side: ReceiptSide;
  verificationId: string;
  date: string;
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

      {/* Meta */}
      <div style={{ textAlign: "center", fontSize: "0.68rem", color: "var(--ink-tertiary)", marginBottom: "4px", letterSpacing: "0.02em" }}>
        <p style={{ color: "var(--ink-tertiary)", fontSize: "0.68rem" }}>ID: {verificationId}</p>
        <p style={{ color: "var(--ink-tertiary)", fontSize: "0.68rem" }}>Date: {date}</p>
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
              verificationId={company.receipt.verificationId}
              date={company.receipt.date}
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
              verificationId={company.receipt.verificationId}
              date={company.receipt.date}
            />
          </div>

          {/* Tagline */}
          <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-tertiary)" }}>
              {company.receipt.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Company Card ---

function CompanyCard({ company, onOpen }: { company: Company; onOpen: () => void }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--ink-tertiary)", letterSpacing: "0.02em" }}>{company.category}</span>
        {company.verified && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", fontWeight: 500, color: "var(--symbio)" }}>
            <Leaf size={12} /> Verified
          </span>
        )}
      </div>
      <div>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "6px" }}>{company.name}</h3>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
          {company.description}
        </p>
      </div>
      <div style={{ background: "var(--surface-offset)", borderRadius: "8px", padding: "10px 14px", fontSize: "0.8rem", fontWeight: 500, color: "var(--ink)" }}>
        {company.impactLabel}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--ink-tertiary)", fontWeight: 500 }}>
        <span>{company.co2Reduction}</span>
        <span style={{ letterSpacing: "0.05em" }}>{company.costRange}</span>
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
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
          marginTop: "auto", padding: "10px", borderRadius: "var(--radius)", border: "1px solid var(--border)",
          background: "transparent", fontSize: "0.825rem", fontWeight: 500, fontFamily: "inherit",
          color: "var(--ink)", cursor: "pointer", transition: "border-color 0.15s ease",
        }}
      >
        View profile <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
