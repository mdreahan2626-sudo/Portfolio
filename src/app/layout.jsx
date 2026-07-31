import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Md Rehan | Backend Developer Portfolio",
  description: "Portfolio of Md Rehan, a VIT Bhopal backend developer specializing in MERN stack, FastAPI, System Design, and Python libraries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f7] selection:bg-white/10 selection:text-white">
        {children}
      </body>
    </html>
  );
}
