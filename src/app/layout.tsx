import type { Metadata } from "next";
import { Sora, Onest } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Symbio | Radical Accountability",
  description: "A dual-sided marketplace turning public environmental pressure into actionable B2B solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${onest.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
