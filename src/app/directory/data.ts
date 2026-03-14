// --- Types ---

export type ReceiptLine = {
  label: string;
  value: string;
};

export type ReceiptSection = {
  heading: string;
  lines: ReceiptLine[];
};

export type ReceiptSide = {
  sections: ReceiptSection[];
  total: ReceiptLine[];
};

export type Company = {
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

export const COMPANIES: Company[] = [
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
