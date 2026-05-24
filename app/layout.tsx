import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import PageIntro from "@/components/PageIntro";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JOANITA — From Logic to Motion",
  description:
    "A personal web experience by Joanita. Backend-rooted web developer learning to craft clean, interactive fullstack experiences.",
  openGraph: {
    title: "JOANITA — From Logic to Motion",
    description:
      "A personal web experience about how I think, build, and move.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
    >
      <body
        className="
          font-sans
          bg-white
          text-black
          antialiased
          overflow-x-hidden
        "
      >
        <PageIntro/>
        <CustomCursor />
        <Navbar />
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}