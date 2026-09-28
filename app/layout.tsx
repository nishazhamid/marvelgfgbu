import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#05070a",
};

export const metadata: Metadata = {
  title: "MARVEL × GFG | Bennett University Comic Multiverse",
  description:
    "Where elite engineering collides with multiversal chaos. A 3-day high-octane celebration of code, creation, and comic mastery at Bennett University.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,800;0,900;1,900&family=Outfit:wght@400;500;600;700;800&family=Bangers&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-noirDeep text-zinc-100 font-inter antialiased overflow-x-hidden selection:bg-crimson-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
