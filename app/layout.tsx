import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { EmergencyButton } from "@/components/emergency/EmergencyButton";
import { EmergencyOverlay } from "@/components/emergency/EmergencyOverlay";
import { AuthGate } from "@/lib/auth/AuthGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel OS",
  description: "世界一周バックパッカーのためのTravel OS",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "Travel OS", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col md:flex-row overflow-hidden">
        <AuthGate>
          <GlobalNav />
          <main className="flex-1 min-h-0 flex flex-col relative pb-16 md:pb-0">
            {children}
          </main>
          <EmergencyButton />
          <EmergencyOverlay />
        </AuthGate>
      </body>
    </html>
  );
}
