"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
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
        <Link href="/directory" style={{ fontWeight: pathname === "/directory" ? 600 : 500, color: pathname === "/directory" ? "var(--ink)" : undefined }}>
          Directory
        </Link>
        <Link href="/calculator" style={{ fontWeight: pathname === "/calculator" ? 600 : 500, color: pathname === "/calculator" ? "var(--ink)" : undefined }}>
          Calculator
        </Link>
        <Link href="/ledger" style={{ fontWeight: pathname === "/ledger" ? 600 : 500, color: pathname === "/ledger" ? "var(--ink)" : undefined }}>
          Ledger
        </Link>
        <Link
          href="/dashboard"
          className="btn-primary"
          style={{ padding: "8px 20px", fontSize: "0.85rem" }}
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
