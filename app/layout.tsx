import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#050507",
};

export const metadata: Metadata = {
  title: "MARVEL × GFG | Bennett University Multiverse Event Summit",
  description:
    "Official event microsite for the GeeksForGeeks Student Chapter at Bennett University. A cinematic Marvel-themed celebration of code, collaboration, and comic-book storytelling.",
  keywords: [
    "GeeksForGeeks",
    "GFG",
    "Bennett University",
    "Marvel",
    "Hackathon",
    "Code Summit",
    "Spider-Man",
    "Student Chapter",
  ],
  authors: [{ name: "GFG Student Chapter Bennett University" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#050507] text-zinc-100 antialiased overflow-x-hidden selection:bg-red-600 selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
