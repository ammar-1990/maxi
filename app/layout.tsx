import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ModalsProvider from "@/components/ModalsProvider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAXI - Dashboard",
  description: "Best Content Site",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <EdgeStoreProvider>
        {children}
        <ModalsProvider/>
        <Toaster richColors />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
