import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  manifest: "./manifest.json",
  title: "supaMovie",
  description: "Watch Movies / TV for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} relative w-screen h-screen m-0 p-0 box-border overflow-x-hidden scrollbar scrollbar-w-2 scrollbar-thumb-[#696969b1] scrollbar-thumb-rounded-full scrollbar-h-2 `}
      >
        {children}
      </body>
    </html>
  );
}
