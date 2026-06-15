import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://serfp-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SerFP — Tu referencia para estudiar FP en España",
    template: "%s — SerFP",
  },
  description:
    "Información clara, honesta y útil sobre Formación Profesional en España. Testimonios reales, comparativas de ciclos y salidas profesionales sin filtros.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: BASE_URL,
    siteName: "SerFP",
    title: "SerFP — Tu referencia para estudiar FP en España",
    description: "Información clara, honesta y útil sobre FP en España. Sin humo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SerFP — Tu referencia para estudiar FP en España",
    description: "Información clara, honesta y útil sobre FP en España.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
