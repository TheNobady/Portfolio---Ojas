import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ojas-sharma-dev.vercel.app"),
  title: "Ojas Sharma — Backend Engineer",
  description:
    "Backend engineer and CS student at SRM IST. Java, Spring Boot, real-time systems and databases.",
  openGraph: {
    title: "Ojas Sharma — Backend Engineer",
    description: "Java, Spring Boot, real-time systems and databases.",
    images: ["/ojas.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} ${jetbrains.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
