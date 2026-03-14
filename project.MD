
# 🍄 Symbio: Project & Design Specification
**Version:** 2.0 (High-Fidelity Prototype Spec)
**Project Type:** Public Accountability & B2B Green Procurement Platform
**Design Philosophy:** "Notion-meets-Activism" (Minimalist, structured, transparent)
**Constraint:** 5 Core Pages

--- 

## 🎯 1. Executive Summary & The Core Loop
Symbio is a dual-sided marketplace that turns public environmental pressure into actionable B2B solutions. We replace corporate "green-hushing" with radical transparency. 

**The Core Loop (The "Circular Accountability" Model):**
1. **The Stick:** The public identifies a corporate polluter (e.g., heavy Styrofoam use) and applies visible, data-backed pressure.
2. **The Carrot:** The targeted company uses our platform to instantly find a verified green alternative (e.g., Mycelium packaging).
3. **The Resolution:** The signed B2B contract is published to the public ledger, turning negative PR into a community win.

### Primary Use Case / Target Scenario
* **The Target:** Mid-to-large e-commerce, electronics, or cosmetics companies (e.g., Lush, Adidas, Dell, or regional equivalents).
* **The Problem:** Excessive use of petroleum-based EPS (Styrofoam) in shipping logistics.
* **The Solution:** Matching them with verified Mycelium (mushroom-based) packaging suppliers for zero-waste, compostable alternatives.

---

## 🎨 2. Design System & UI Architecture
The UI must feel like a modern productivity tool (like Notion or Linear)—clean, trustworthy, and data-forward. Avoid heavy gradients, excessive shadows, or playful illustrations. 

### Typography
* **Headers/Display:** `Inter` (Bold, tight tracking) for authoritative data points.
* **Body/UI Elements:** `SF Pro` or `Roboto` (Regular/Medium) for high legibility at small sizes.

### Color Palette & Tailwind Config
We use a "Traffic Light" system grounded by soft blacks and pure whites. 

**Tailwind Integration (`tailwind.config.ts`):**
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        symbio: {
          DEFAULT: '#45B26B', // Green: Success, Verified Deals, Good Scores
          hover: '#3A965A',
          pressed: '#2E7A49',
          light: '#F0FDF4',   // Very Light Green for active backgrounds
        },
        alert: {
          amber: '#D9730D',   // Orange: Community needs, mid-tier scores
          red: '#E03E3E',     // Red: Heavy polluters, urgent actions
        },
        ink: {
          DEFAULT: '#2F3437', // Soft Black: Primary text (Notion style)
          muted: '#9CA3AF',   // Gray: Disabled text, secondary labels
        },
        surface: {
          DEFAULT: '#FFFFFF', // Pure White: Cards, main backgrounds
          hover: '#F9FAFB',   // Off-white: Table row hovers
          border: '#EDEDED',  // Subtle Gray: Dividers, card outlines
          accent: '#EAE4D9',  // Mushroom/Beige: Specific to supplier cards
        }
      }
    }
  }
}

```

### Component Library: Buttons

Buttons must clearly communicate their hierarchy.

| Variant | State | Background | Border | Text Color |
| --- | --- | --- | --- | --- |
| **Primary** | Default | `bg-symbio` | None | `text-white` |
| (Solid) | Hover | `bg-symbio-hover` | None | `text-white` |
|  | Disabled | `bg-surface-border` | None | `text-ink-muted` |
| **Secondary** | Default | `bg-transparent` | `border-surface-border` | `text-ink` |
| (Outline) | Hover | `bg-surface-hover` | `border-symbio` | `text-symbio` |
|  | Disabled | `bg-transparent` | `border-gray-200` | `text-ink-muted` |

---

## 🔄 3. Core Paradigm Shift

| Feature | Traditional Corporate Tool | Symbio (Publicly Integrated) |
| --- | --- | --- |
| **Directory** | Closed, static company lookup. | Public marketplace for sustainable brands. |
| **Problem Input** | Self-identified by the company PR team. | Community-sourced, upvoted environmental needs. |
| **Eco Profile** | Static, PDF-based sustainability report. | Interactive "Proof of Work" with live data & comments. |
| **Collaboration** | Internal project management. | Shared community goals & verified public contracts. |

---

## 🗺️ 4. Prototype Scope (The 5 Core Pages)

To maintain high fidelity within the designathon time limit, we will build exactly 5 pages.

### Page 1: The Public "Impact Feed" (Home)

* **Header:** A horizontal, auto-scrolling "Live Deal Ticker" (e.g., *🟢 Brand X + EcoPack signed 500 tons diverted*).
* **Main UI:** A Notion-style Kanban board or list view titled "Community Demands."
* **Card Details:** Users can submit issues (e.g., "TechBrand Y ships air in giant foam boxes"). Cards show upvote counts and an "Apply Pressure" primary button.

### Page 2: The Accountability Scoreboard (Directory)

* **Layout:** A clean, data-dense table resembling a modern financial dashboard.
* **Columns:** `Company Name`, `Industry`, `Primary Offense` (e.g., Plastic Packaging), `Emission Intensity Score`.
* **Visuals:** Use colored status pills (Red/Amber/Green). High-polluting companies in the Red have a prominent "Demand Change" button that triggers an automated email template.

### Page 3: Company "Proof of Work" (Profile)

* **Layout:** Split view.
* **Top Section:** A massive progress bar showing their stated carbon goals vs. actual reality.
* **Bottom Section (Interactive):** A public ledger of their actions. Includes a community comment thread where verified company reps can respond directly to users.

### Page 4: The "Switch to Mycelium" Calculator (B2B Hub)

* **Target User:** The corporate buyer trying to fix their "Red" score.
* **Layout:** A sleek, two-pane interactive form.
* **Left Pane (Input):** User inputs current metrics: "We use [10,000] units of [EPS/Styrofoam] per month."
* **Right Pane (Output):** Real-time calculation showing:
1. Carbon tonnage saved by switching.
2. Estimated cost variance.
3. **The Match:** A curated card featuring a verified Mycelium supplier (e.g., Ecovative) with a "Request Contract" primary button.



### Page 5: The Public Impact Ledger (Success State)

* **Purpose:** The PR reward for doing the right thing.
* **Layout:** A minimalist "Digital Certificate" or "Impact Receipt."
* **Data Displayed:** Shows the two company logos joined together, the date of the transition, and the exact environmental metric improved.
* **UX Goal:** Highly shareable for LinkedIn/Twitter. Features secondary buttons to "Share Impact" or "View Contract Hash."

---

## 🛠️ 5. Tech Stack & Assets

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS (using custom config above)
* **Visual Diagrams:** `@xyflow/react` (React Flow) for rendering the ecosystem node map.
* **Icons:** Lucide React (clean, minimal line icons).

## 🏆 6. Judging / Success Metrics

When presenting to judges, we will highlight these KPIs to prove viability:

1. **Public Engagement Rate:** Number of community upvotes converted into direct B2B matches.
2. **Scope 3 Emission Reduction:** The primary metric tracked in the Switch Calculator.
3. **Supplier Onboarding:** The growth rate of verified green suppliers joining the directory to win contracts.

```
