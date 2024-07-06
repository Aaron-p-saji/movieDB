import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  manifest: "./manifest.json",
  title: {
    default: "supaMovie",
    template: "%s | supaMovie",
  },
  description: "Watch Movies / TV for free",
  openGraph: {
    title: "supaMovies",
    description: "Watch Movies and TV Shows for free",
    images:
      "https://ucarecdn.com/99fd6ef1-61c4-457a-8ac7-f948cee34fdb/-/preview/1000x441/",
    type: "website",
  },
  twitter: {
    title: "supaMovies",
    description: "Watch Movies and TV Shows for free",
    images:
      "https://ucarecdn.com/99fd6ef1-61c4-457a-8ac7-f948cee34fdb/-/preview/1000x441/",
    card: "summary_large_image",
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
        className={`${poppins.className} relative w-screen h-screen m-0 p-0 box-border overflow-x-hidden scrollbar scrollbar-w-2 scrollbar-thumb-[#696969b1] scrollbar-thumb-rounded-full scrollbar-h-2 `}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
