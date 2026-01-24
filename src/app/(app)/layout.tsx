import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/config/styles/globals.css';
import { QueryProvider } from "./providers/query-provider";
import { Toaster } from "sonner";

  const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Clone",
  description: "LinkedIn Clone built with Next.js, Tailwind CSS, and Supabase",
  icons: {
    icon: "public/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
