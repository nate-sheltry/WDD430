import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page | Fallout PnP Project",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header className="decorative-font flex text-center items-center justify-center font-semibold text-[1.7rem] sm:text-[2rem] min-w-full min-h-20 bg-[var(--highlight-color)] border-4 border-[var(--highlight-color)]">
        Fallout PnP Project
      </header>
        {children}
        </body>
    </html>
  );
}
