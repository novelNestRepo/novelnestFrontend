import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";

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
        <TooltipProvider>
        <Sidebar />
        <main className="ml-20 flex flex-col py-4 px-4 *:w-full border">
          <Header />
            {children}
            <Toaster />
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
