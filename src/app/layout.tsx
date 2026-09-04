import type { Metadata } from "next";
import { Prompt, Dancing_Script, Itim, Mali } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
});

const dancingScript = Dancing_Script({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-dancing",
});

const itim = Itim({
  weight: "400",
  subsets: ["latin", "thai"],
  variable: "--font-itim",
});

const mali = Mali({
  weight: ["400", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-mali",
});

export const metadata: Metadata = {
  title: "Happy Birthday My Love 🎂💖 | สุขสันต์วันเกิดนะคนดี",
  description: "Special birthday surprise website made with love for my favorite person in the universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} ${dancingScript.variable} ${itim.variable} ${mali.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#eef2f6] text-slate-700 selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}

