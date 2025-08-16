// TODO: Reponsive.

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";
import QueryProvider from "@/lib/providers/QueryProvider";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovelNest",
  description: "Track your reading progress and discover new books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        <QueryProvider>
          <TooltipProvider>
            <Sidebar />
            <main className="ml-24 flex flex-col py-4 px-8 *:w-full h-screen">
              <Header />
              {children}
              <Toaster />
            </main>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
