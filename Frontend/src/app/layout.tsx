import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletContextProvider } from "@/components/WalletProvider";
import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DealCoin - NFT Deal Marketplace",
  description: "Own, trade, and redeem exclusive discounts as NFTs on Solana",
  keywords: ["NFT", "deals", "coupons", "Solana", "blockchain", "marketplace"],
  authors: [{ name: "MonkeyDAO" }],
  openGraph: {
    title: "DealCoin - NFT Deal Marketplace",
    description: "Own, trade, and redeem exclusive discounts as NFTs on Solana",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <QueryProvider>
          <WalletContextProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                  <p>&copy; 2024 DealCoin. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </WalletContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
